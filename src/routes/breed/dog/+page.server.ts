import type { PageServerLoad } from './$types';
import { readBreed } from '$lib/server/models/breedCache';
export const load = (async () => {
	const dogs = await readBreed('dog');
	// console.log('cats from breedcache', cats);

	return { dogs };
}) satisfies PageServerLoad;
