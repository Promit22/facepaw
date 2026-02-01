import { redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail } from '$lib/server/models/users';
import { createSession } from '$lib/server/models/sessions.js';
import type { User } from '$lib/types/user.js';
import path from 'node:path';
import { getRandomId } from '$lib/helper/randomid.js';
import { processImage } from '$lib/server/models/imageService.js';

export const actions = {
	register: async ({ request, cookies }) => {
		const formDt = await request.formData();
		const pimage = formDt.get('pimage') as File;
		const name = formDt.get('name')?.toString();
		const email = formDt.get('email')?.toString();
		const password = formDt.get('password')?.toString();

		const buffer = await pimage.arrayBuffer();
		const fileName = `${getRandomId()}.webp`;
		const filePath = path.join('static', 'images', 'profile', fileName);
		if (!name || !email || !password) {
			return 'missing';
		}
		processImage(buffer, filePath, 196, 196);
		try {
			const userId = createUser(name, email, password).lastInsertRowid;
			const id = createSession(userId as number);
			cookies.set('session', id.toString(), {
				path: '/',
				httpOnly: true,
				sameSite: 'strict',
				maxAge: 60 * 60 * 24 * 60
			});
		} catch (e) {
			if (String(e).includes('UNIQUE')) {
				return 'Email already exists';
			}

			return 'hujubuju';
		}

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

			return 'invalid user';
		}

		const id = createSession(user.id);

		cookies.set('session', id.toString(), {
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
