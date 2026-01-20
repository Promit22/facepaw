<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import imag from '$lib/assets/IMG-20250822-WA0001.jpg';
	import { ThumbsUp } from '@lucide/svelte';
	import { MessageCircleMore } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	let { data, form } = $props();
	let { posts, user } = data;
	console.log('posts', posts);
</script>

{#each posts as { postId, title, content, likes_count, imagePath } (postId)}
	<article class="relative top-5 z-0 m-2 mx-auto my-5 max-w-2xl">
		<Card.Root>
			<Card.Header>
				<a href="/users/id" class="flex flex-row items-center gap-4">
					<!-- <img src={imagePath} alt="" class="h-8 w-8 rounded-full" /> -->
					<p>{user?.name}</p>
				</a>
			</Card.Header>
			<Card.Content>
				<h1 class="my-2.5 mb-6 text-2xl">{title}</h1>
				<section>
					<div class="overflow-hidden rounded-xs border p-3 lg:h-[500px] lg:w-[500px]">
						<img src={imagePath} alt="" class="h-full w-full object-contain" />
					</div>
				</section>
				<section>
					<div class="mt-4">
						<p>
							{content}
						</p>
					</div>
				</section>
			</Card.Content>
			<Card.Footer>
				<form
					method="POST"
					use:enhance
					class="flex w-full cursor-pointer flex-row items-center gap-2"
				>
					<input type="hidden" name="postId" value={postId} />
					<input type="hidden" name="userId" value={user?.id} />
					<button
						type="submit"
						formaction="?/like"
						class="flex w-2.5 flex-1 cursor-pointer justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-gray-200"
					>
						<ThumbsUp class="font-bold text-green-600" /><span>{likes_count}</span>
					</button>
					<button
						class="flex flex-1 justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-gray-200"
					>
						<MessageCircleMore />
					</button>
				</form>
			</Card.Footer>
		</Card.Root>
	</article>
{/each}
