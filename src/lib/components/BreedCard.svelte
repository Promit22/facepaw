<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Cats, Dogs } from '$lib/types/breed.ts';
	import { ArrowRight } from '@lucide/svelte';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	let { breed, type } = $props();
	// let { breed, type } = data;
</script>

<div>
	<Card.Root>
		<Card.Header>
			{#if breed.name && breed.description}
				<Card.Title>{breed.name}</Card.Title>
				<Card.Description>Card Description</Card.Description>
			{/if}
		</Card.Header>
		<Card.Content>
			<div>
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
</div>
