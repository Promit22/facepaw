import type { PageServerLoad } from './$types';
import { getPosts } from '$lib/server/models/posts';
export const load: PageServerLoad = async ({ params }) => {
	// const { id }: { id: string } = params;
	const id = Number(params.id);
	console.log(id);
	const posts = getPosts(id);

	return { posts, id };
};
