<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import imag from '$lib/assets/IMG-20250822-WA0001.jpg';
	import { ThumbsUp } from '@lucide/svelte';
	import { MessageCircleMore } from '@lucide/svelte';
	let { data } = $props();
	let { posts } = data;
	console.log('posts', posts);
</script>

<article class="relative top-5 z-0 m-2 mx-auto my-5 max-w-2xl">
	<Card.Root>
		<Card.Header>
			<a href="/users/id" class="flex flex-row items-center gap-4">
				<img src={imag} alt="" class="h-8 w-8 rounded-full" />
				<p>Users name</p>
			</a>
		</Card.Header>
		<Card.Content>
			<h1 class="my-2.5 mb-6 text-2xl">Post Header</h1>
			<section>
				<div class="overflow-hidden rounded-xs border p-3 lg:h-[500px] lg:w-[500px]">
					<img src={imag} alt="" class="h-full w-full object-contain" />
				</div>
			</section>
			<section>
				<div class="mt-4">
					<p>
						This is a test descripttio auto: Flex item can grow and shrink. This value expands to
						flex: 1 1 auto. The item is sized according to its width or height properties, depending
						on the flex-direction, but grows to absorb available positive space in the flex
						container or shrink down to its minimum size to fit the container in the case of
						negative space. The flex item is fully flexible.
					</p>
				</div>
			</section>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full cursor-pointer flex-row items-center gap-2">
				<div
					class="flex w-2.5 flex-1 justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-gray-200"
				>
					<ThumbsUp class="" />
				</div>
				<div
					class="flex flex-1 justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-gray-200"
				>
					<MessageCircleMore />
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</article>
