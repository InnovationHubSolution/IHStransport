const express = require('express');
const pool = require('../config/database');
const { authenticateToken, authorize } = require('../middleware/auth');

const router = express.Router();

function roundMoney(value) {
  return Math.round((Number(value) + Number.EPSILON) * 100) / 100;
}

async function commissionRate() {
  const result = await pool.query("SELECT value FROM system_settings WHERE key = 'commission_rate'");
  const rate = parseFloat(result.rows[0]?.value);
  return Number.isFinite(rate) ? rate : 5;
}

async function ownerForUser(userId) {
  const result = await pool.query('SELECT * FROM bus_owners WHERE user_id = $1', [userId]);
  return result.rows[0] || null;
}

router.get('/config', authenticateToken, async (req, res) => {
  res.json({
    commission_rate: await commissionRate(),
    currency: 'VUV',
    note: 'Commission is taken from operator fare revenue at settlement. The passenger tap still spends only the card balance.'
  });
});

router.put('/config', authenticateToken, authorize('admin'), async (req, res) => {
  const rate = parseFloat(req.body.commission_rate);
  if (!Number.isFinite(rate) || rate < 0 || rate > 100) {
    return res.status(400).json({ error: 'Commission rate must be a number from 0 to 100.' });
  }
  await pool.query(
    `INSERT INTO system_settings (key, value, updated_at)
     VALUES ('commission_rate', $1, CURRENT_TIMESTAMP)
     ON CONFLICT (key) DO UPDATE SET value = EXCLUDED.value, updated_at = CURRENT_TIMESTAMP`,
    [String(rate)]
  );
  res.json({ commission_rate: rate });
});

router.get('/', authenticateToken, async (req, res) => {
  try {
    const rate = await commissionRate();
    if (req.user.role === 'bus_owner') {
      const owner = await ownerForUser(req.user.id);
      if (!owner) return res.json({ settlements: [], owner: null, commission_rate: rate });
      const list = await pool.query(
        'SELECT * FROM settlements WHERE bus_owner_id = $1 ORDER BY created_at DESC',
        [owner.id]
      );
      return res.json({ settlements: list.rows, owner, commission_rate: rate });
    }
    if (req.user.role !== 'admin') {
      return res.status(403).json({ error: 'Forbidden' });
    }
    const list = await pool.query(
      `SELECT s.*, bo.name AS owner_name, bo.settlement_method, bo.phone
       FROM settlements s
       JOIN bus_owners bo ON bo.id = s.bus_owner_id
       ORDER BY s.created_at DESC`
    );
    const owners = await pool.query(
      `SELECT id, name, phone, settlement_method, pending_settlement, total_revenue
       FROM bus_owners ORDER BY name`
    );
    res.json({ settlements: list.rows, owners: owners.rows, commission_rate: rate });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', authenticateToken, authorize('admin'), async (req, res) => {
  const { bus_owner_id, period_start, period_end } = req.body;
  if (!bus_owner_id || !period_start || !period_end) {
    return res.status(400).json({ error: 'Operator, period start, and period end are required.' });
  }
  if (period_end < period_start) {
    return res.status(400).json({ error: 'Period end is before period start.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const fares = await client.query(
      `SELECT t.id, t.fare_amount
       FROM transactions t
       JOIN buses b ON b.id = t.bus_id
       WHERE b.bus_owner_id = $1
         AND t.transaction_type = 'fare_payment'
         AND t.status = 'completed'
         AND t.settlement_id IS NULL
         AND t.created_at >= $2::date
         AND t.created_at < ($3::date + INTERVAL '1 day')
       FOR UPDATE`,
      [bus_owner_id, period_start, period_end]
    );
    if (fares.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: 'No unsettled completed fares in that period.' });
    }

    const gross = roundMoney(fares.rows.reduce((sum, row) => sum + parseFloat(row.fare_amount || 0), 0));
    const rate = await commissionRate();
    const commission = roundMoney(gross * rate / 100);
    const net = roundMoney(gross - commission);

    const created = await client.query(
      `INSERT INTO settlements (
         bus_owner_id, period_start, period_end, total_amount,
         commission_rate, commission_amount, net_amount, status
       ) VALUES ($1, $2, $3, $4, $5, $6, $7, 'pending')
       RETURNING *`,
      [bus_owner_id, period_start, period_end, gross, rate, commission, net]
    );
    const settlement = created.rows[0];
    const ids = fares.rows.map((row) => row.id);
    await client.query(
      'UPDATE transactions SET settlement_id = $1 WHERE id = ANY($2::int[])',
      [settlement.id, ids]
    );
    await client.query(
      `UPDATE bus_owners
       SET pending_settlement = GREATEST(COALESCE(pending_settlement, 0) - $1, 0),
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $2`,
      [gross, bus_owner_id]
    );
    await client.query('COMMIT');
    res.status(201).json({ settlement, fare_count: ids.length });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

router.patch('/:id', authenticateToken, authorize('admin'), async (req, res) => {
  const { status, payment_reference } = req.body;
  const allowed = ['approved', 'paid', 'cancelled'];
  if (!allowed.includes(status)) {
    return res.status(400).json({ error: 'Status must be approved, paid, or cancelled.' });
  }
  if (status === 'paid' && !String(payment_reference || '').trim()) {
    return res.status(400).json({ error: 'A payment reference is required to mark a settlement paid.' });
  }

  const client = await pool.connect();
  try {
    await client.query('BEGIN');
    const current = await client.query('SELECT * FROM settlements WHERE id = $1 FOR UPDATE', [req.params.id]);
    if (current.rows.length === 0) {
      await client.query('ROLLBACK');
      return res.status(404).json({ error: 'Settlement not found.' });
    }
    const settlement = current.rows[0];
    if (settlement.status === 'paid' || settlement.status === 'cancelled') {
      await client.query('ROLLBACK');
      return res.status(400).json({ error: `Settlement is already ${settlement.status}.` });
    }
    if (status === 'cancelled') {
      await client.query('UPDATE transactions SET settlement_id = NULL WHERE settlement_id = $1', [settlement.id]);
      await client.query(
        `UPDATE bus_owners
         SET pending_settlement = COALESCE(pending_settlement, 0) + $1,
             updated_at = CURRENT_TIMESTAMP
         WHERE id = $2`,
        [settlement.total_amount, settlement.bus_owner_id]
      );
    }
    const updated = await client.query(
      `UPDATE settlements
       SET status = $1,
           payment_reference = COALESCE($2, payment_reference),
           paid_at = CASE WHEN $1 = 'paid' THEN CURRENT_TIMESTAMP ELSE paid_at END,
           updated_at = CURRENT_TIMESTAMP
       WHERE id = $3
       RETURNING *`,
      [status, payment_reference ? String(payment_reference).trim() : null, settlement.id]
    );
    await client.query('COMMIT');
    res.json({ settlement: updated.rows[0] });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(500).json({ error: error.message });
  } finally {
    client.release();
  }
});

module.exports = router;
