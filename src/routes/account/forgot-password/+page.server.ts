import { checkIfEmailExists } from '$lib/server/models/users.js';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { hashToken, storeTokenHash } from '$lib/server/models/users.js';
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	verify: async ({ request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();

		if (!email) {
			return fail(400, { message: 'Invalid request.' });
		}
		const user = checkIfEmailExists(email);
		const token = hashToken();
		storeTokenHash(Number(user.id), token.tokenHash, token.expiresAt);
	}
};
