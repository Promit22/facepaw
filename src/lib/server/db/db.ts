import Database from 'better-sqlite3';

export const db = new Database('facepaw.db');

db.exec(`
CREATE TABLE IF NOT EXISTS users (
	id INTEGER PRIMARY KEY,
	name TEXT NOT NULL,
	email TEXT NOT NULL UNIQUE,
	password TEXT NOT NULL
);
`);
