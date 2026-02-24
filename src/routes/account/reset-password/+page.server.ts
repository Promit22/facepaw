import {
	deleteToken,
	getRecord,
	hashPassword,
	hashToken,
	updatePassword
} from '$lib/server/models/users';
import { error } from 'console';
import type { PageServerLoad } from './$types';
import { redirect } from '@sveltejs/kit';

export const load = (async ({ url }) => {
	const token = url.searchParams.get('token');
	if (!token) {
		throw error(400, 'invalid reset token');
	}
	const tokenHash = hashToken(token);
	const record = getRecord(tokenHash.tokenHash);
	if (!record) {
		throw error(400, 'Invalid or expired reset link.');
	}

	if (new Date(record.expires_at) < new Date()) {
		throw error(400, 'Reset link has expired.');
	}

	return {
		token
	};
}) satisfies PageServerLoad;

export const actions = {
	reset: async ({ request }) => {
		const formData = await request.formData();
		const token = formData.get('token')?.toString();
		const password = formData.get('password')?.toString();
		const confirm = formData.get('confirm')?.toString();

		if (!token || !password || !confirm) {
			return { error: 'Invalid request.' };
		}

		if (password !== confirm) {
			return { error: 'Passwords do not match.' };
		}

		const tokenHash = hashToken(token);

		const record = getRecord(tokenHash.tokenHash);

		if (!record) {
			return { error: 'Invalid or expired link.' };
		}

		if (new Date(record.expires_at) < new Date()) {
			return { error: 'Link expired.' };
		}

		const hashedPassword = await hashPassword(password);

		updatePassword(hashedPassword, record.user_id);

		// Delete only this token
		deleteToken(tokenHash.tokenHash);
		throw redirect(303, '/account/connect?reset=success');
	}
};
