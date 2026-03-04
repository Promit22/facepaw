import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	if (!locals.user) {
		return { logged: false };
	}
	return { logged: true };
}) satisfies PageServerLoad;
