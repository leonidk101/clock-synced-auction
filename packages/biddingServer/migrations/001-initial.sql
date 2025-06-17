-- 001-initial.sql
-- Example migration: create a migrations table
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    run_on TIMESTAMP NOT NULL DEFAULT NOW()
);
