import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import {
	getFullUser,
	hashPassword,
	updateUser,
	checkIfEmailExists,
	verifyPassword
} from '$lib/server/models/users';

export const load = (async ({ locals }) => {
	const user = locals.user;
	if (!user) {
		throw redirect(302, '/account/connect');
	}
	return { user };
}) satisfies PageServerLoad;

export const actions = {
	update: async ({ request, locals }) => {
		const user = locals.user;
		if (!user) {
			return fail(401, { error: 'Unauthorized' });
		}
		const formData = await request.formData();
		const name = formData.get('name')?.toString();
		const email = formData.get('email')?.toString();
		const password = formData.get('password')?.toString();
		if (!name || !email || !password) {
			return fail(400, {
				error: !name
					? 'Name is missing'
					: !email
						? 'Email is missing'
						: !password
							? 'Enter your password'
							: ''
			});
		}
		const fullUser = getFullUser(user.id);
		const valid = verifyPassword(password, fullUser.password);
		if (!valid) {
			return fail(400, { error: 'Incorrect password' });
		}

		const emailExists = checkIfEmailExists(email);
		if (emailExists && emailExists.id !== user.id) {
			return fail(400, { error: 'email already in use' });
		}

		let passwordHash = fullUser.password;
		const newPassword = formData.get('new')?.toString();
		const confirmPassword = formData.get('confirm')?.toString();
		if (newPassword) {
			if (newPassword !== confirmPassword) {
				return fail(400, { error: 'Passwords do not match' });
			}
			passwordHash = await hashPassword(newPassword);
		}
		try {
			updateUser(name, email, passwordHash, user.id);
			return { success: true };
		} catch (error) {
			return fail(500, { error: 'server faced an unknown problem' });
		}
	}
} satisfies Actions;
