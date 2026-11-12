const express = require('express');
const pool = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');
const mycashEnv = require('../config/mycash');
const { getMycashConfig } = require('../config/mycash-loader');
const mycashService = require('../payments/mycash.service');

const router = express.Router();

const MYCASH_KEYS = ['apiUrl', 'apiKey', 'username', 'password', 'merchantMobile', 'productId'];

function maskSecret(str, showLast = 4) {
  if (!str || str.length <= showLast) return str ? '••••' : '';
  return '••••' + str.slice(-showLast);
}

// M-Vatu API connection status (admin only) – must be before GET /mvatu
router.get('/mvatu/status', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    return res.json(await mycashService.connectionStatus());
  } catch (error) {
    return res.json({
      connected: false,
      configured: false,
      code: error.code || 'mvatu_not_configured',
      message: error.message || 'M-Vatu is not configured'
    });
  }
});

// Get M-Vatu settings (admin only) – returns masked secrets
router.get('/mvatu', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT key, value FROM system_settings WHERE key = ANY($1)",
      [MYCASH_KEYS.flatMap(k => ['mvatu_' + k, 'mycash_' + k])]
    );
    const fromDb = {};
    result.rows.forEach(r => {
      const name = r.key.replace(/^mvatu_|^mycash_/, '');
      if (r.key.startsWith('mvatu_') || fromDb[name] == null) fromDb[name] = r.value;
    });

    const apiUrl = fromDb.apiUrl ?? mycashEnv.apiUrl ?? '';
    const apiKey = fromDb.apiKey != null ? maskSecret(fromDb.apiKey) : (mycashEnv.apiKey ? maskSecret(mycashEnv.apiKey) : '');
    const username = fromDb.username ?? mycashEnv.username ?? '';
    const password = fromDb.password != null ? '••••••••' : (mycashEnv.password ? '••••••••' : '');
    const merchantMobile = fromDb.merchantMobile ?? mycashEnv.merchantMobile ?? '';
    const productId = fromDb.productId ?? mycashEnv.productId ?? '';

    res.json({
      apiUrl,
      apiKey,
      username,
      password,
      merchantMobile,
      productId
    });
  } catch (error) {
    console.error('GET settings/mvatu error:', error);
    res.status(500).json({ error: 'Failed to load M-Vatu settings' });
  }
});

// Update M-Vatu settings (admin only) – only updates provided fields
router.put('/mvatu', authenticateToken, authorize('admin'), async (req, res) => {
  try {
    const { apiUrl, apiKey, username, password, merchantMobile, productId } = req.body;
    const updates = [];

    if (apiUrl !== undefined) updates.push({ key: 'mvatu_apiUrl', value: String(apiUrl).trim() });
    if (apiKey !== undefined && String(apiKey).trim() !== '') updates.push({ key: 'mvatu_apiKey', value: String(apiKey).trim() });
    if (username !== undefined) updates.push({ key: 'mvatu_username', value: String(username).trim() });
    if (password !== undefined && String(password).trim() !== '') updates.push({ key: 'mvatu_password', value: String(password).trim() });
    if (merchantMobile !== undefined) updates.push({ key: 'mvatu_merchantMobile', value: String(merchantMobile).trim() });
    if (productId !== undefined) updates.push({ key: 'mvatu_productId', value: String(productId).trim() });

    for (const u of updates) {
      await pool.query(
        `INSERT INTO system_settings (key, value, updated_at) VALUES ($1, $2, CURRENT_TIMESTAMP)
         ON CONFLICT (key) DO UPDATE SET value = $2, updated_at = CURRENT_TIMESTAMP`,
        [u.key, u.value]
      );
    }

    res.json({ success: true, message: 'M-Vatu settings updated' });
  } catch (error) {
    console.error('PUT settings/mvatu error:', error);
    res.status(500).json({ error: 'Failed to update M-Vatu settings' });
  }
});

module.exports = router;
