import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/models/posts';
import { getUserById } from '$lib/server/models/users';
export const load: PageServerLoad = async ({ params }) => {
	// const { id }: { id: string } = params;
	const id = Number(params.id);
	const puser = getUserById(id);
	console.log('puser from profile', puser);
	const posts = getPosts(id);

	return { posts, puser };
};
