import type { PageServerLoad } from './$types';
import type { Actions } from './$types';

export const load = (async () => {
	return {};
}) satisfies PageServerLoad;

export const actions = {
	verifyPassword: async ({ request, locals }) => {
		const data = await request.formData();
		const password = data.get('password');
		const userID = locals.user;
		// const Passed =
		// if()
	}
} satisfies Actions;
