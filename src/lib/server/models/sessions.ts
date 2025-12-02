import { db } from '../db/db';
import crypto from 'node:crypto';

export function createSession(user_id: number) {
	const id = crypto.randomUUID();
	db.prepare(`INSERT INTO sessions (id, user_id) VALUES(?, ?)`).run(id, user_id);
	return id;
}

export function getUserFromSession(id: string) {
	return db
		.prepare(
			`SELECT users.* FROM sessions JOIN users ON user.id = sessions.user_id WHERE sessions.id = ?`
		)
		.get(id);
}
