<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Cats, Dogs } from '$lib/types/breed.ts';
	import { ArrowRight } from '@lucide/svelte';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	import unavailable from '$lib/assets/unavailable.webp';
	let { breed, type, selected } = $props();
	// let { breed, type } = data;
	// let caption: HTMLElement;
	// if (!breed.image.url) {
	// 	caption.style.color = 'black';
	// }
</script>

<!-- <div class=" h-96 w-full max-w-[320px] overflow-y-auto">
	<Card.Root class=" p-2">
		<Card.Header>
			{#if breed.name && breed.description}
				<Card.Title>{breed.name}</Card.Title>
				<Card.Description>Card Description</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content>
			<div class=" h-full w-full max-w-3xs">
				{#if breed.image?.url}
					<img src={breed.image.url} alt="" />
				{:else}
					<div>
						{#if type === 'cat'}
							<Cat />
						{:else}
							<Dog />
						{/if}
					</div>
				{/if}
			</div>
		</Card.Content>
		<Card.Footer>
			<p>Details <span><ArrowRight /></span></p>
		</Card.Footer>
	</Card.Root>
	</div> -->
<figure class=" group relative grid grid-cols-(--g-cols-f) grid-rows-(--g-rows-f) overflow-hidden">
	{#if !breed.image}
		<img src={unavailable} alt="" class=" col-span-full row-span-full h-full w-full object-cover" />
	{:else}
		<img
			src={breed.image.url}
			alt={breed.name}
			class=" col-span-full row-span-full h-full w-full object-cover transition-[scale] duration-1000 ease-in-out group-hover:scale-105"
		/>
	{/if}
	<button
		class=" absolute inset-0 z-20 h-full w-full cursor-pointer opacity-0"
		aria-label="clickable area"
		onclick={() => selected(breed)}
	></button>
	<figcaption
		class=" z-10 col-span-full row-span-full m-1 flex justify-center self-end rounded-2xl bg-(--bg-f) text-[1.2rem] text-white"
	>
		<h3 class=" p-1.5">{breed.name}</h3>
	</figcaption>
</figure>

<style>
	@media (width > 600px) {
		figure:nth-child(1) {
			grid-area: span 2 / span 2;
		}

		figure:nth-child(4n + 1) {
			grid-row: span 2;
		}

		figure:nth-child(4n + 2) {
			grid-column: span 2;
		}
	}

	/* button {
		all: unset;
	} */
</style>
