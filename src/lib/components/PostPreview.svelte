<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import type { Post, PostWithImage } from '$lib/types/post';
	import { Button } from '$lib/components/ui/button';

	let { posts }: { posts: PostWithImage[] } = $props();
</script>

{#each posts as { postId, title, imagePath } (postId)}
	<Card.Root>
		<Card.Header>
			<h1 class=" text-2xl">{title}</h1>
		</Card.Header>
		<Card.Content>
			<section class="flex justify-center">
				<div class=" overflow-hidden rounded-xs lg:h-auto lg:w-[500px]">
					<img src={imagePath} alt="" class=" w-full object-contain" />
				</div>
			</section>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full justify-center">
				<Button>View post</Button>
			</div>
		</Card.Footer>
	</Card.Root>
{/each}
