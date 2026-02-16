import type { PageServerLoad } from './$types';
import { readBreed } from '$lib/server/models/breedCache';

export const load = (async () => {
	const cats = await readBreed('cat');
	// console.log('cats from breedcache', cats);

	return { cats };
}) satisfies PageServerLoad;
