import type { User } from '$lib/types/user';
import { db } from '../db/db';
export function createUser(imagePath: string, name: string, email: string, password: string) {
	return db
		.prepare(`INSERT INTO users (image, name, email, password) VALUES(?, ?, ?, ?)`)
		.run(imagePath, name, email, password);
}

export function getUserByEmail(email: string): User | undefined {
	return db.prepare(`SELECT * FROM users WHERE email = ?`).get(email) as User | undefined;
}

export function getUserById(id: number) {
	return db
		.prepare(
			`
		SELECT users.name, users.id FROM users WHERE users.id = ?
		`
		)
		.get(id) as { name: string; id: number };
}
