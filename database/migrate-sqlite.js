/**
 * Run migrations for SQLite (development/test).
 * Usage: DB_TYPE=sqlite node database/migrate-sqlite.js
 *    or: npm run migrate:sqlite (from repo root or backend)
 */
process.env.DB_TYPE = process.env.DB_TYPE || 'sqlite';

const fs = require('fs');
const path = require('path');

const backendPath = path.join(__dirname, '..', 'backend');
require('module')._resolveFilename = ((originalResolveFilename) => {
  return function (request, parent) {
    if (!request.startsWith('.') && !path.isAbsolute(request)) {
      const backendModules = path.join(backendPath, 'node_modules', request);
      try {
        return require.resolve(backendModules);
      } catch (e) {}
    }
    return originalResolveFilename(request, parent);
  };
})(require('module')._resolveFilename);

const pool = require(path.join(backendPath, 'src/config/database'));

async function migrate() {
  try {
    const schemaPath = path.join(__dirname, 'schema.sqlite.sql');
    const schema = fs.readFileSync(schemaPath, 'utf8');
    console.log('Running SQLite migrations...');
    pool.exec(schema);
    console.log('✅ Schema applied');

    const initialPassword = process.env.ADMIN_INITIAL_PASSWORD;
    const adminCheck = await pool.query('SELECT id FROM users WHERE username = $1', ['admin']);
    if (adminCheck.rows.length === 0 && initialPassword) {
      const bcrypt = require(path.join(backendPath, 'node_modules/bcryptjs'));
      const hashedPassword = await bcrypt.hash(initialPassword, 10);
      await pool.query(
        'INSERT INTO users (username, password_hash, role, full_name) VALUES ($1, $2, $3, $4)',
        ['admin', hashedPassword, 'admin', 'System Administrator']
      );
      console.log('✅ Admin user created from ADMIN_INITIAL_PASSWORD');
    }

    const fareCheck = await pool.query('SELECT id FROM fare_config LIMIT 1');
    if (fareCheck.rows.length === 0) {
      await pool.query(
        'INSERT INTO fare_config (route_name, fare_amount, transport_type) VALUES ($1, $2, $3)',
        ['Default Route', 2.50, 'bus']
      );
      console.log('✅ Default fare configuration created');
    }

    console.log('✅ SQLite migrations completed successfully');
    if (pool.db) pool.db.close();
    process.exit(0);
  } catch (error) {
    console.error('❌ Migration failed:', error);
    if (pool.db) pool.db.close();
    process.exit(1);
  }
}

migrate();
