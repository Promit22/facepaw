import { getRecord, hashToken } from '$lib/server/models/users';
import { error } from 'console';
import type { PageServerLoad } from './$types';

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
