import { redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { Actions } from './$types';
import { fail } from '@sveltejs/kit';
import {
	getFullUser,
	hashPassword,
	updateUser,
	checkIfEmailExists,
	verifyPassword,
	getOldImage
} from '$lib/server/models/users';
import { getRandomId } from '$lib/helper/randomid';
import { processImage } from '$lib/server/models/imageService';
import { deleteUploadedFile } from '$lib/server/models/cleaner';
import path from 'node:path';

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
		const pimage = formData.get('pimage') as File;
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
		const fileName = `${getRandomId()}.webp`;
		// const filePath = path.join('static', 'images', 'profile', fileName);
		const uploadDir = process.env.UPLOAD_DIR_PROFILE ?? path.join('static', 'images', 'profile');
		const filePath = path.join(uploadDir, fileName);
		const existing = getOldImage(user.id);
		await deleteUploadedFile(existing.image);
		if (pimage.size > 0) {
			const buffer = await pimage.arrayBuffer();
			await processImage(buffer, filePath, 196, 196);
		}
		console.log('pimage from edir profile', pimage);

		// const resolvedFilePath = pimage.size > 0 ? filePath.replace('static', '') : null;
		const resolvedFilePath = pimage.size > 0 ? `/images/profile/${fileName}` : null;
		console.log('resolvedFilePath from edit', resolvedFilePath);

		if (newPassword) {
			if (newPassword !== confirmPassword) {
				return fail(400, { error: 'Passwords do not match' });
			}
			passwordHash = await hashPassword(newPassword);
		}
		try {
			if (pimage.size > 0) {
				console.log('doing image update');

				updateUser(name, email, passwordHash, user.id, resolvedFilePath);
			} else {
				updateUser(name, email, passwordHash, user.id, null);
			}
			return { success: true };
		} catch (error) {
			console.log(error);

			return fail(500, { error: 'server faced an unknown problem' });
		}
	}
} satisfies Actions;
