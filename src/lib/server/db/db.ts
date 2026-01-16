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

db.exec(`
CREATE TABLE IF NOT EXISTS sessions (
	id TEXT PRIMARY KEY,
	user_id INTEGER NOT NULL,
	created_at TEXT DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (user_id) REFERENCES users(id)
);
`);
db.exec(`
	CREATE TABLE IF NOT EXISTS posts (
		id INTEGER PRIMARY KEY,
		created_At TEXT DEFAULT CURRENT_TIMESTAMP,
		user_id INTEGER NOT NULL,
		title TEXT,
		content TEXT,
		likes_count INTEGER DEFAULT 0,
		FOREIGN KEY (user_id) REFERENCES users(id)
	);
	`);

db.exec(`
	CREATE TABLE IF NOT EXISTS image (
		id INTEGER PRIMARY KEY,
		post_id INTEGER NOT NULL,
		path TEXT,
		FOREIGN KEY (post_id) REFERENCES posts(id)
	);	
	`);

db.exec(`
	CREATE TABLE  IF NOT EXISTS post_likes (
		post_id INTEGER NOT NULL,
		user_id	INTEGER NOT NULL,

		PRIMARY KEY (post_id, user_id) ,

		FOREIGN KEY(post_id)
		REFERENCES posts(id) ON DELETE CASCADE,

		FOREIGN KEY (user_id)
		REFERENCES users(id) ON DELETE CASCADE
	);
	`);
