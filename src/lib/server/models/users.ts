import type { User } from '$lib/types/user';
import { db } from '../db/db';
import bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'node:crypto';

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
		SELECT users.name, users.id, users.image FROM users WHERE users.id = ?
		`
		)
		.get(id) as { name: string; id: number; image: string };
}

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export function checkIfEmailExists(email: string) {
	return db
		.prepare(
			`
			SELECT users.id FROM users WHERE email = ?
		`
		)
		.get(email) as { id: number };
}

export function deleteToken(id: number) {
	db.prepare(`DELETE FROM password_reset WHERE user_id = ?`);
}

export function hashToken() {
	const token = randomBytes(32).toString('hex');
	const tokenHash = createHash('sha256').update(token).digest('hex');

	const expiresAt = new Date(Date.now() + 30 * 60 * 1000).toISOString();

	return { token, tokenHash, expiresAt };
}

export function storeTokenHash(userId: number, tokenHash: string, expiresAt: string) {
	db.prepare(
		`
        INSERT INTO password_reset (user_id, token_hash, expires_at)
        VALUES (?, ?, ?)
      `
	).run(userId, tokenHash, expiresAt);
}
