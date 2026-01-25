<script lang="ts">
	import type { PageProps } from '../$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { User } from '@lucide/svelte';
	let { data }: PageProps = $props();
	const user = data.user;

	/**
	 todo:
	 show the posts posted by the user on their profile
	 provide deeplink to the displayed posts
	 more?
	 */
</script>

<article class="relative top-15 m-2 h-full w-full max-w-2xl">
	<Card.Root>
		<Card.Header class="flex flex-1 items-center justify-between">
			<div>
				<div class="flex items-center">
					<User class="mr-2 h-7 w-7 rounded-full bg-amber-300 p-1.5" />
					<Card.Title>{user?.name}</Card.Title>
				</div>
				<Card.Description>{user?.email}</Card.Description>
			</div>
			<Button>Edit Profile</Button>
		</Card.Header>
		<Card.Content>
			<p>Card Content</p>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</article>
