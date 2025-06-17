import { readdirSync, readFileSync } from 'fs'
import path from 'path'
import { Client } from 'pg'

const MIGRATIONS_DIR = path.join(__dirname, '../migrations')

async function runMigrations() {
	const client = new Client({
		connectionString: process.env.DATABASE_URL,
	})
	await client.connect()

	// Ensure migrations table exists
	await client.query(`
    CREATE TABLE IF NOT EXISTS migrations (
      id SERIAL PRIMARY KEY,
      name VARCHAR(255) NOT NULL UNIQUE,
      run_on TIMESTAMP NOT NULL DEFAULT NOW()
    );
  `)

	const files = readdirSync(MIGRATIONS_DIR)
		.filter(f => f.endsWith('.sql'))
		.sort()

	for (const file of files) {
		const res = await client.query('SELECT 1 FROM migrations WHERE name = $1', [file])
		if (res.rowCount === 0) {
			const sql = readFileSync(path.join(MIGRATIONS_DIR, file), 'utf8')
			console.log(`Running migration: ${file}`)
			await client.query(sql)
			await client.query('INSERT INTO migrations (name) VALUES ($1)', [file])
		}
	}

	await client.end()
	console.log('Migrations complete.')
}

runMigrations().catch(err => {
	console.error('Migration failed:', err)
	process.exit(1)
})
