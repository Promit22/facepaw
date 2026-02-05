<script lang="ts">
	import type { PageProps } from '../$types';
	import * as Card from '$lib/components/ui/card/index.js';
	// import UserIcon from '$lib/components/UserIcon.svelte'
	import { Button } from '$lib/components/ui/button';
	import { User } from '@lucide/svelte';
	// import Post from '$lib/components/Post.svelte';
	import type { User as Cuser } from '$lib/types/user';
	import type { Post, PostWithImage } from '$lib/types/post';
	import PostPreview from '$lib/components/PostPreview.svelte';
	import UserIcon from '$lib/components/UserIcon.svelte';
	let { data }: PageProps = $props();
	// const { user, posts } = data;
	const user: Cuser = data.user;
	const posts: PostWithImage[] = data.posts;
	const puser: { image: string; name: string; id: number } = data.puser;

	/**
	 todo:
	 show the posts posted by the user on their profile
	 provide deeplink to the displayed posts
	 more?

	 current stat: undone

	 a user clicks the post in the feed. when the user clicks the post owners username/profile pic it takes them to 
	 the profile. However, the spectator should not be allowed to edit the profile aka the other users profile. 
	 to achieve this the script needs to verify that the viewing user is not the owner.
	 */
</script>

<article class="relative top-15 m-2 mb-3 h-full w-full max-w-3xl">
	<Card.Root>
		<Card.Header class="flex flex-1 flex-col items-center justify-between">
			<div class=" w-full">
				<div class="flex items-center gap-2">
					<UserIcon user={puser} />
					<Card.Title>{puser?.name}</Card.Title>
				</div>
				<div class=" mt-3 mb-3 flex w-full justify-center">
					{#if puser.image}
						<img src={puser.image} alt="" class=" h-[80%] w-[80%] rounded-full" />
					{:else}
						<User class=" h-[80%] w-[80%] rounded-full p-2 opacity-15" />
					{/if}
				</div>
				<!-- <Card.Description>{puser?.email}</Card.Description> -->
			</div>
		</Card.Header>
		<Card.Content>
			<PostPreview {posts} />
		</Card.Content>
		<Card.Footer>
			{#if user.id === puser.id}
				<div class="flex w-full justify-between">
					<a href="/account/edit" class=" w-[13ch] bg-amber-500 p-0.5 text-center">Edit Profile</a>
					<!-- <Button variant="link">Edit Profile</Button> -->
					<Button>Log Out</Button>
				</div>
			{/if}
		</Card.Footer>
	</Card.Root>
</article>
