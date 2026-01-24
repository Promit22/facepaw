<script lang="ts">
	import type { PageProps } from '../$types';
	import * as Card from '$lib/components/ui/card/index.js';
	let { data }: PageProps = $props();
	const user = data.user;
</script>

<article class="relative top-15 m-2 h-full w-full max-w-2xl">
	<Card.Root>
		<Card.Header>
			<Card.Title>{user?.name}</Card.Title>
			<Card.Description>{user?.email}</Card.Description>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</article>
