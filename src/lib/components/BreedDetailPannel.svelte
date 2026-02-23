<script lang="ts">
	import type { Cats, Dogs } from '$lib/types/breed';
	import unavailable from '$lib/assets/unavailable.webp';
	import { fade, fly } from 'svelte/transition';
	import { Badge } from '$lib/components/ui/badge';
	import { X } from '@lucide/svelte';

	// import { cubicOut } from 'svelte/transition';
	let {
		breed,
		type,
		closePanel
	}: { breed: Cats | Dogs; type: 'cat' | 'dog'; closePanel: () => void } = $props();

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

<div
	class="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
	onclick={closePanel}
	transition:fade
></div>
<aside
	class="fixed top-0 right-0 z-50 mt-0 h-full w-full
		       overflow-y-auto bg-white
		       p-6 shadow-2xl md:h-screen md:w-2/5"
	transition:fly={{ x: '50%', duration: 1000 }}
>
	<button class=" cursor-pointer bg-red-500 text-white" onclick={closePanel}>
		<X />
	</button>
	<div class="mb-5 flex flex-col items-center gap-1.5">
		<h1 class="text-3xl">{breed.name ? breed.name : 'name not found'}</h1>
		<img src={breed.image?.url ? breed.image.url : unavailable} alt="" class="w-11/12" />
	</div>
	{#if type === 'cat'}{/if}
	{#each Object.entries(breed) as [key, value]}
		{#if !shouldNotInclude.includes(key)}
			<div class=" mt-5 flex flex-wrap items-center gap-2.5 font-medium">
				{#if key === 'temperament'}
					<span class=" ">{key.toUpperCase()}:</span>
					{#each value.split(',') as temp}
						<Badge class="text-[0.9rem]">{temp}</Badge>
					{/each}
				{:else}
					<span>{key.toUpperCase().replace('_', ' ')}:</span>
					<Badge class="text-[0.9rem]">{value}</Badge>
				{/if}
			</div>
		{/if}
	{/each}
</aside>
