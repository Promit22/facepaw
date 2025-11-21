<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import imag from '$lib/assets/IMG-20250822-WA0001.jpg';
	import { ThumbsUp } from '@lucide/svelte';
	import { MessageCircleMore } from '@lucide/svelte';
</script>

<article class="m-2 max-w-2xl my-5 mx-auto">
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
				<div class="rounded-xs border p-3 lg:w-[500px] lg:h-[500px] overflow-hidden">
					<img src={imag} alt="" class="w-full h-full object-contain" />
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
				<div class="flex w-2.5 flex-1 justify-center rounded-lg p-2 hover:bg-gray-200 duration-300 ease-in-out">
					<ThumbsUp class="" />
				</div>
				<div class="flex flex-1 justify-center rounded-lg p-2 hover:bg-gray-200 duration-300 ease-in-out ">
					<MessageCircleMore />
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</article>
