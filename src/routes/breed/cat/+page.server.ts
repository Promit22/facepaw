import type { PageServerLoad } from './$types';
import { readBreed } from '$lib/server/models/breedCache';

export const load = (async () => {
	const cats = readBreed('cat');
	return { cats };
}) satisfies PageServerLoad;
