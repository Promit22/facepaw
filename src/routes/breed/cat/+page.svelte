<script lang="ts">
	import type { PageProps } from './$types';
	import type { CatBreed } from '$lib/types/cat';
	let { data }: PageProps = $props();
	let { cats } = data;
	let breeds: CatBreed[] = [];
	const limit = 20;
	let loading = false;
	let allBreads: CatBreed[] = [];
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
</div>
