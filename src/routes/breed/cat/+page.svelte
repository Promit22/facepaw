<script lang="ts">
	import type { PageProps } from './$types';
	import type { Cats } from '$lib/types/breed';
	import BreedCard from '$lib/components/BreedCard.svelte';
	import { onMount } from 'svelte';
	let { data }: PageProps = $props();
	let cats: Cats[] = data.cats;
	let breeds: Cats[] = $state([]);
	const limit = 20;
	let loading = false;
	let allBreads: Cats[] = cats;
	let index = 0;
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
		console.log(target);

		if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
			loadMore();
		}
	}
	onMount(() => {
		loadMore();
		console.log('mounted');
	});
</script>

<div onscroll={handleScroll} class=" max-w[90vw] h-[80vh] w-full overflow-y-auto">
	<div class="m-0 flex flex-col justify-center p-0">
		<h1 class=" mt-0 pt-0 text-center text-3xl">Cats</h1>
		<p>Click cats for details</p>
	</div>
	<div class=" flex w-full flex-wrap items-center justify-center">
		{#each breeds as breed (breed.id)}
			<BreedCard {breed} type="cat" />
		{/each}
	</div>
</div>
