import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/models/posts';
import { getUserById } from '$lib/server/models/users';
import { deleteSessioin } from '$lib/server/models/sessions.js';
import { redirect } from '@sveltejs/kit';
export const load: PageServerLoad = async ({ params }) => {
	// const { id }: { id: string } = params;
	const id = Number(params.id);
	const puser = getUserById(id);
	console.log('puser from profile', puser);
	const posts = getPosts(id);

	return { posts, puser };
};

export const actions = {
	logout: async (event) => {
		const id = event.cookies.get('session');
		console.log('id', id);
		deleteSessioin(id ? id : '');
		event.locals.user = null;
		event.cookies.delete('session', { path: '/' });
		throw redirect(303, '/account/connect');
	}
};
