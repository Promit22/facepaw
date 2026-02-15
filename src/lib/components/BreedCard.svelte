<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { CatBreed } from '$lib/types/cat';
	// import type { DogBreed } from '$lib/types/dog';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	let { data } = $props();
	let { breed, type } = data;
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
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>
