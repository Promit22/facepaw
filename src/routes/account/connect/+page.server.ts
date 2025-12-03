import { redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/server/models/users';
import { createSession } from '$lib/server/models/sessions.js';
import type { User } from '$lib/types/user.js';

export const actions = {
	register: async ({ request, cookies }) => {
		console.log('in register');

		const formDt = await request.formData();
		const name = formDt.get('name')?.toString();
		const email = formDt.get('email')?.toString();
		const password = formDt.get('password')?.toString();
		console.log(name, email, password);
		console.log(formDt);

		if (!name || !email || !password) {
			return 'missing';
		}
		console.log('passed the undefined checking');

		try {
			const userId = createUser(name, email, password).lastInsertRowid;
			createSession(userId as number);
			cookies.set('session', userId.toString(), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 60
			});
		} catch (e) {
			if (String(e).includes('UNIQUE')) {
				console.log('Duplicate email');

				return 'Email already exists';
			}
			console.log('error occured');

			return 'hujubuju';
		}
		console.log('redirecting to posts');

		throw redirect(303, '../posts');
	},
	login: async ({ request, cookies }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();

		if (!email || !password) {
			return 'missing fields';
		}

		const user: User | undefined = getUserByEmail(email);
		if (!user) {
			// return fail(400, { message: 'Invalid credentials' });
			console.log('invalid user');

			return 'invalid user';
		}

		createSession(user.id);
		cookies.set('session', user.id.toString(), {
			path: '/',
			httpOnly: true,
			sameSite: 'strict',
			maxAge: 60 * 60 * 24 * 60
		});

		// const valid = await verify(user.password, password);
		// if (!valid) {
		// 	return "Invalid";
		// }

		throw redirect(303, '../posts');
	}
};
