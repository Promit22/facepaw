<script lang="ts">
	import type { PageProps } from '../$types';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button';
	import { User } from '@lucide/svelte';
	import Post from '$lib/components/Post.svelte';
	import PostPreview from '$lib/components/PostPreview.svelte';
	let { data }: PageProps = $props();
	const { user, posts } = data;

	/**
	 todo:
	 show the posts posted by the user on their profile
	 provide deeplink to the displayed posts
	 more?
	 */
</script>

<article class="relative top-15 m-2 mb-3 h-full w-full max-w-2xl">
	<Card.Root>
		<Card.Header class="flex flex-1 items-center justify-between">
			<div>
				<div class="flex items-center">
					<User class="mr-2 h-7 w-7 rounded-full bg-amber-300 p-1.5" />
					<Card.Title>{user?.name}</Card.Title>
				</div>
				<Card.Description>{user?.email}</Card.Description>
			</div>
			<!-- {#if user.id === }
				
			{/if} -->
			<Button>Edit Profile</Button>
		</Card.Header>
		<Card.Content>
			<PostPreview {posts} />
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</article>
