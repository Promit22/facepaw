<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ThumbsUp } from '@lucide/svelte';
	import { MessageCircleMore } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	import { User } from '@lucide/svelte';
	let { posts, user, form } = $props();
	console.log('posts from post component', posts);
</script>

{#each posts as { postId, title, content, likes_count, imagePath }, i (postId)}
	<article class="relative z-0 mt-20 w-full max-w-3xl">
		<Card.Root>
			<Card.Header>
				<a href="/account/profile/{user.id}" class="flex flex-row items-center gap-4">
					{#if imagePath}
						<img src={imagePath} alt="" class="h-8 w-8 rounded-full" />
					{:else}
						<User class="mr-2 h-7 w-7 rounded-full bg-amber-300 p-1.5" />
					{/if}
					<p>{user?.name}</p>
				</a>
			</Card.Header>
			<Card.Content>
				<h1 class="m-0 text-2xl">{title}</h1>
				<section class="flex justify-center">
					<div class="   mt-10 mb-10 rounded-xs lg:mt-16 lg:mb-16 lg:h-auto lg:w-[500px]">
						<img src={imagePath} alt="" class=" h-full w-full object-contain" />
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
						onclick={() => console.log('form', form)}
					>
						<ThumbsUp class="font-bold text-green-600" /><span
							>{form?.likes_count ?? likes_count}</span
						>
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
