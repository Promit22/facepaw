<script lang="ts">
	import type { PageProps } from './$types';
	import type { Cats } from '$lib/types/breed';
	import BreedCard from '$lib/components/BreedCard.svelte';
	let { data }: PageProps = $props();
	let { cats } = data;
	let breeds: Cats[] = $state([]);
	const limit = 20;
	let loading = false;
	let allBreads: Cats[] = [];
	let index = 0;
	function loadMore() {
		if (loading) return;
		loading = true;
		const start = index * limit;
		const end = start + limit < allBreads.length ? limit : allBreads.length;
		const nextBatch = allBreads.slice(start, end);
		breeds = [...breeds, ...nextBatch];
		index++;
		loading = false;
	}
</script>

<div>
	<div class="m-0 flex flex-col justify-center p-0">
		<h1 class=" mt-0 pt-0 text-center text-3xl">Cats</h1>
		<p>Click cats for details</p>
	</div>
	<div>
		{#each breeds as breed}
			<BreedCard {breed} type="cat" />
		{/each}
	</div>
</div>
