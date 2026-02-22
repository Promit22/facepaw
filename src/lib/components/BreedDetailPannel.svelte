<script lang="ts">
	import type { Cats, Dogs } from '$lib/types/breed';
	import unavailable from '$lib/assets/unavailable.webp';
	import { fade, fly } from 'svelte/transition';
	let {
		breed,
		type,
		open,
		closePanel
	}: { breed: Cats | Dogs; type: 'cat' | 'dog'; open: boolean; closePanel: () => void } = $props();

	const shouldNotInclude: string[] = [
		'reference_image_id',
		'weight',
		'height',
		'image',
		'history',
		'id',
		'country_codes',
		'country_code',
		'description',
		'history',
		'cfa_url',
		'vetstreet_url',
		'vcahospitals_url',
		'wikipedia_url'
	];
</script>

{#if open}
	<div
		class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
		onclick={closePanel}
		transition:fade
	></div>
	<aside
		transition:fly={{ x: 500, duration: 2000 }}
		class="fixed top-0 right-0 z-50 h-full w-full
		       overflow-y-auto bg-white
		       p-6 shadow-2xl md:top-16 md:h-screen md:w-1/2"
	>
		<div>
			<h1>{breed.name ? breed.name : 'name not found'}</h1>
			<img src={breed.image?.url ? breed.image.url : unavailable} alt="" />
		</div>
		{#if type === 'cat'}
			{#each Object.entries(breed) as [key, value]}
				{#if !shouldNotInclude.includes(key)}
					<div class=" flex flex-row justify-center">
						<div>{key}:</div>
						<div>{value}</div>
					</div>
				{/if}
			{/each}
		{/if}
	</aside>
{/if}
