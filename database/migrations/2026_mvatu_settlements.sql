-- M-Vatu rename, account lock, and fare settlements.
-- Safe to run more than once.

ALTER TABLE users ADD COLUMN IF NOT EXISTS active BOOLEAN DEFAULT TRUE;

UPDATE users
SET active = FALSE
WHERE username IN ('busowner', 'agent', 'customer', 'test_busowner');

DO $$
BEGIN
  IF EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'mycash_transactions'
  ) AND NOT EXISTS (
    SELECT 1 FROM information_schema.tables
    WHERE table_schema = 'public' AND table_name = 'mvatu_transactions'
  ) THEN
    ALTER TABLE mycash_transactions RENAME TO mvatu_transactions;
  END IF;
END $$;

ALTER TABLE transactions
  ADD COLUMN IF NOT EXISTS settlement_id INTEGER REFERENCES settlements(id);

INSERT INTO system_settings (key, value)
VALUES ('commission_rate', '5')
ON CONFLICT (key) DO NOTHING;

-- Lifetime fare revenue is every completed fare, including ones already settled.
UPDATE bus_owners bo
SET total_revenue = COALESCE((
  SELECT SUM(t.fare_amount)
  FROM transactions t
  JOIN buses b ON b.id = t.bus_id
  WHERE b.bus_owner_id = bo.id
    AND t.transaction_type = 'fare_payment'
    AND t.status = 'completed'
), 0),
updated_at = CURRENT_TIMESTAMP;
UPDATE bus_owners bo
SET pending_settlement = COALESCE((
  SELECT SUM(t.fare_amount)
  FROM transactions t
  JOIN buses b ON b.id = t.bus_id
  WHERE b.bus_owner_id = bo.id
    AND t.transaction_type = 'fare_payment'
    AND t.status = 'completed'
    AND t.settlement_id IS NULL
), 0),
updated_at = CURRENT_TIMESTAMP;
