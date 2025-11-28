import { redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/server/models/users';

export const actions = {
	register: async ({ request }) => {
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
			createUser(name, email, password);
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
	login: async ({ request }) => {
		const form = await request.formData();
		const email = form.get('email')?.toString();
		const password = form.get('password')?.toString();

		if (!email || !password) {
			return 'missing fields';
		}

		const user = getUserByEmail(email);
		if (!user) {
			// return fail(400, { message: 'Invalid credentials' });
			console.log('invalid user');

			return 'invalid user';
		}

		// const valid = await verify(user.password, password);
		// if (!valid) {
		// 	return "Invalid";
		// }

		throw redirect(303, '../posts');
	}
};
