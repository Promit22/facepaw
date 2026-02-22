<script lang="ts">
	import type { PageProps } from './$types';
	import type { Cats } from '$lib/types/breed';
	import BreedCard from '$lib/components/BreedCard.svelte';
	import { onMount } from 'svelte';
	import BreedDetailPannel from '$lib/components/BreedDetailPannel.svelte';
	// import { loadMore, breeds } from '$lib/helper/breedService.svelte';
	let { data }: PageProps = $props();
	let cats: Cats[] = data.cats;
	let breeds: Cats[] = $state([]);
	const limit = 40;
	let loading = false;
	let index = 0;
	let allBreads: Cats[] = cats;
	let selectedBreed: null | Cats = $state(null);
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

	function handleSelect(breed: Cats) {
		selectedBreed = breed;
	}

	function closePanel() {
		selectedBreed = null;
	}
</script>

<!-- <div
	class="max-w[90vw] m-0 flex h-[95vh] w-full flex-col justify-center overflow-y-auto p-0"
	
></div> -->
<!-- <div class=" mt-0w-full mb-3.5 flex h-20 flex-col items-center justify-center">
	<h1 class=" m-0 p-0 text-3xl">Cats</h1>
	<p>Click cats for details</p>
</div> -->
<div
	class=" grid h-[95vh] w-full max-w-[90vw] grid-flow-dense auto-rows-[12.5rem] grid-cols-(--g-cols) gap-3 overflow-hidden overflow-y-auto"
	onscroll={handleScroll}
>
	{#each breeds as breed (breed.id)}
		<BreedCard {breed} type="cat" selected={handleSelect} />
	{/each}
</div>
{#if selectedBreed}
	<BreedDetailPannel breed={selectedBreed} type="cat" open={!!selectedBreed} {closePanel} />
{/if}
