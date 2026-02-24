import { checkIfEmailExists, deleteToken } from '$lib/server/models/users.js';
import type { PageServerLoad } from './$types';
import { fail } from '@sveltejs/kit';
import { hashToken, storeTokenHash } from '$lib/server/models/users.js';
import { sendResetEmail } from '$lib/server/models/email.js';
export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	verify: async ({ request, url }) => {
		const formData = await request.formData();
		const email = formData.get('email')?.toString().trim();
		console.log('inside verification');
		console.log(email);

		if (!email) {
			return fail(400, { message: 'Invalid request.' });
		}
		const user = checkIfEmailExists(email);
		if (user) {
			deleteToken(null, user.id);
			const token = hashToken();
			storeTokenHash(Number(user.id), token.tokenHash, token.expiresAt);
			const resetLink = `${url.origin}/account/reset-password?token=${token.tkn}`;

			console.log('RESET LINK:', resetLink);
			await sendResetEmail(email, resetLink);
		} else {
			return { message: 'Something went wrong' };
		}
		return {
			message: 'If an account with that email exists, a reset link has been sent.'
		};
	}
};
