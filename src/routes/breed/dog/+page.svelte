<script lang="ts">
	import type { PageProps } from './$types';

	import BreedCard from '$lib/components/BreedCard.svelte';
	import { onMount } from 'svelte';
	import type { Dogs } from '$lib/types/breed';
	let { data }: PageProps = $props();
	// import { loadMore, breeds } from '$lib/helper/breedService.svelte';
	let dogs: Dogs[] = data.dogs;
	let breeds: Dogs[] = $state([]);
	const limit = 40;
	let loading = false;
	let index = 0;
	let allBreads: Dogs[] = dogs;
	function loadMore() {
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

	function handleScroll(e: Event) {
		const target = e.target as HTMLElement;
		// console.log(target);

		if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
			loadMore();
		}
	}
	onMount(() => {
		loadMore();
		console.log('mounted');
	});
</script>

<div
	class=" grid h-[95vh] w-full max-w-[90vw] grid-flow-dense auto-rows-[12.5rem] grid-cols-(--g-cols) gap-3 overflow-hidden overflow-y-auto"
	onscroll={handleScroll}
>
	{#each breeds as breed (breed.id)}
		<BreedCard {breed} type="cat" />
	{/each}
</div>
