import { redirect } from '@sveltejs/kit';
import { createUser, getUserByEmail, hashPassword, verifyPassword } from '$lib/server/models/users';
import { createSession } from '$lib/server/models/sessions.js';
import type { User } from '$lib/types/user.js';
import path from 'node:path';
import { getRandomId } from '$lib/helper/randomid.js';
import { processImage } from '$lib/server/models/imageService.js';
import { fail } from '@sveltejs/kit';

export const actions = {
	register: async ({ request, cookies }) => {
		const formDt = await request.formData();
		const pimage = formDt.get('pimage') as File;
		const name = formDt.get('name')?.toString();
		const email = formDt.get('email')?.toString();
		const password = formDt.get('password')?.toString();

		console.log(pimage);

		const buffer = await pimage.arrayBuffer();
		console.log('bffer', buffer);

		const fileName = `${getRandomId()}.webp`;
		const filePath = path.join('static', 'images', 'profile', fileName);
		if (!name || !email || !password) {
			return fail(400, {
				missing: true,
				message: !name
					? 'Name is missing'
					: !email
						? 'Email is missing'
						: !password
							? 'Password is missing'
							: ''
			});
		}
		if (password.length < 8) {
			return fail(400, {
				missing: true,
				message: 'Password must be greater than or equal to 8 character'
			});
		}

		const hash = await hashPassword(password);
		await processImage(buffer, filePath, 196, 196);
		try {
			const userId = createUser(filePath.replace('static', ''), name, email, hash).lastInsertRowid;
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
			return fail(400, { missing: true, message: 'missinig fields' });
		}

		const user: User | undefined = getUserByEmail(email);
		const hash = user ? user.password : '';
		const isValidUser = verifyPassword(password, hash);

		if (!isValidUser) {
			return fail(401, { message: 'Invalid credentials', missing: true });

			// return 'invalid user';
		}

		const id = createSession(user ? user.id : 0);

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
