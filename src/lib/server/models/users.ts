import type { LeaderboardEntry, User } from '$lib/types/user';
import { db } from '../db/db';
import bcrypt from 'bcrypt';
import { randomBytes, createHash } from 'node:crypto';

export function createUser(
	imagePath: string | null,
	name: string,
	email: string,
	password: string
) {
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

export function getFullUser(id: number) {
	return db
		.prepare(
			`
		SELECT users.name, users.id, users.image, users.password FROM users WHERE users.id = ?
		`
		)
		.get(id) as { name: string; id: number; image: string; password: string };
}

export async function hashPassword(password: string) {
	return await bcrypt.hash(password, 10);
}

export async function verifyPassword(password: string, hash: string) {
	return await bcrypt.compare(password, hash);
}

export function updatePassword(hashedPassword: string, userId: number) {
	db.prepare(
		`
			UPDATE users SET password = ?
			WHERE id = ?
		`
	).run(hashedPassword, userId);
}

export function updateUser(
	name: string,
	email: string,
	password: string,
	id: number,
	imagePath: string | null
) {
	if (!imagePath) {
		db.prepare(
			`
			  UPDATE users
		  SET name = ?, email = ?, password = ?
		  WHERE id = ?
			`
		).run(name, email, password, id);
	} else {
		db.prepare(
			`
			  UPDATE users
		  SET name = ?, email = ?, password = ?, image = ?
		  WHERE id = ?
			`
		).run(name, email, password, imagePath, id);
		console.log('did image update');
	}
}

export function checkIfEmailExists(email: string) {
	return db
		.prepare(
			`
			SELECT users.id FROM users WHERE email = ?
		`
		)
		.get(email) as { id: number } | undefined;
}

export function deleteToken(token_hash?: string | null, id?: number) {
	if (id) {
		db.prepare(`DELETE FROM password_reset WHERE user_id = ?`).run(id);
	} else {
		db.prepare(`DELETE FROM password_reset WHERE token_hash = ?`).run(token_hash);
	}
}

export function hashToken(token?: string) {
	const tkn = token ? token : randomBytes(32).toString('hex');
	const tokenHash = createHash('sha256').update(tkn).digest('hex');

	const expiresAt = token ? '' : new Date(Date.now() + 30 * 60 * 1000).toISOString();

	return { tkn, tokenHash, expiresAt };
}

export function storeTokenHash(userId: number, tokenHash: string, expiresAt: string) {
	db.prepare(
		`
        INSERT INTO password_reset (user_id, token_hash, expires_at)
        VALUES (?, ?, ?)
      `
	).run(userId, tokenHash, expiresAt);
}

export function getRecord(tokenHash: string) {
	return db
		.prepare(
			`
			SELECT user_id, expires_at
			FROM password_reset
			WHERE token_hash = ?
		`
		)
		.get(tokenHash) as { user_id: number; expires_at: string };
}

export function updateBestScore(
	user_id: number,
	score: number,
	accuracy: number,
	mode: 'cat' | 'dog' | 'hybrid'
) {
	db.prepare(
		`
        UPDATE users 
        SET best_score_${mode} = ?, best_accuracy_${mode} = ?
        WHERE id = ? AND (best_score_${mode} IS NULL OR ? > best_score_${mode})
    `
	).run(score, accuracy, user_id, score);
}

export function getBestScore(mode: string) {
	return db
		.prepare(
			`
	SELECT name, best_score_${mode} AS best_score
	FROM users 
	WHERE best_score_${mode} IS NOT NULL 
	ORDER BY best_score_${mode} DESC, best_accuracy_${mode} DESC
	LIMIT 10
		`
		)
		.all() as LeaderboardEntry[];
}
