const pool = require('./database');
const envConfig = require('./mycash');

const KEY_PREFIX = 'mvatu_';
const LEGACY_PREFIX = 'mycash_';
const KEYS = ['apiUrl', 'apiKey', 'username', 'password', 'merchantMobile', 'productId'];

/**
 * M-Vatu settings. Saved values are not a published Vodafone API.
 * mvatu_* overrides any leftover mycash_* values, then environment.
 */
async function getMycashConfig() {
  try {
    const result = await pool.query(
      "SELECT key, value FROM system_settings WHERE key = ANY($1)",
      [KEYS.flatMap(k => [KEY_PREFIX + k, LEGACY_PREFIX + k])]
    );
    const fromDb = {};
    result.rows.forEach(r => {
      const legacy = r.key.startsWith(LEGACY_PREFIX);
      const name = r.key.replace(legacy ? LEGACY_PREFIX : KEY_PREFIX, '');
      if (!legacy || fromDb[name] == null) fromDb[name] = r.value;
    });

    return {
      apiUrl: fromDb.apiUrl ?? envConfig.apiUrl ?? '',
      apiKey: fromDb.apiKey ?? envConfig.apiKey ?? '',
      username: fromDb.username ?? envConfig.username ?? '',
      password: fromDb.password ?? envConfig.password ?? '',
      merchantMobile: fromDb.merchantMobile ?? envConfig.merchantMobile ?? '',
      productId: fromDb.productId ?? envConfig.productId ?? ''
    };
  } catch (err) {
    console.error('getMycashConfig error:', err.message);
    return { ...envConfig, apiUrl: envConfig.apiUrl || '' };
  }
}

module.exports = { getMycashConfig };
