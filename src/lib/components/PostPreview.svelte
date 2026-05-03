<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Post, PostWithImage } from '$lib/types/post';
	import { Button } from '$lib/components/ui/button';

	let { posts, canDelete = false }: { posts: PostWithImage[]; canDelete: boolean } = $props();
</script>

{#each posts as { postId, title, imagePath, content, likes_count } (postId)}
	<Card.Root>
		<Card.Header>
			<h1 class=" text-2xl">{title}</h1>
		</Card.Header>
		<Card.Content>
			<section class="flex flex-col">
				<div class=" mx-auto overflow-hidden rounded-xs lg:h-auto lg:w-[500px]">
					<img src={imagePath} alt="" class=" w-full object-contain" />
				</div>
				<p class=" mt-2.5">{content}</p>
			</section>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full justify-between">
				<Button>{likes_count} {likes_count > 0 ? 'likes' : 'like'}</Button>
				{#if canDelete}
					<form method="POST" action="?/deletePost">
						<input type="hidden" name="postId" value={postId} />
						<Button type="submit" variant="destructive">Delete</Button>
					</form>
				{/if}
			</div>
		</Card.Footer>
	</Card.Root>
{/each}
