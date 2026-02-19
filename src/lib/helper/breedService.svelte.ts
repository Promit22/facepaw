import type { Cats } from '$lib/types/breed';

let loading = false;
let index = 0;
const limit = 40;
export let breeds: Cats[] = $state([]);

export function loadMore(allBreads: Cats[]) {
	if (loading) return;
	loading = true;
	const start = index * limit;
	const end = start + limit < allBreads.length ? start + limit : allBreads.length;
	const nextBatch = allBreads.slice(start, end);
	console.log('before update', breeds.length);

	breeds = [...breeds, ...nextBatch];
	console.log('after updata', breeds.length);

	index++;
	loading = false;
	console.log('end', end);
}
//it became server side code need to make it client side only
