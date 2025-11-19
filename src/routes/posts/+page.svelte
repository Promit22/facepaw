<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import imag from '$lib/assets/IMG-20250822-WA0001.jpg';
	import { ThumbsUp } from '@lucide/svelte';
	import { MessageCircleMore } from '@lucide/svelte';
</script>

<article class="m-2">
	<Card.Root>
		<Card.Header>
			<a href="" class="flex flex-row items-center gap-4">
				<img src={imag} alt="" class="h-[2rem] w-[2rem] rounded-full" />
				<p>Users name</p>
			</a>
		</Card.Header>
		<Card.Content>
			<h1 class="my-2.5 mb-6 text-2xl">Post Header</h1>
			<section>
				<div class="w-full rounded-xs border p-3">
					<img src={imag} alt="" />
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
				<div class="flex flex-1 justify-center rounded-lg bg-cyan-100 p-2">
					<ThumbsUp class="" />
				</div>
				<div class="flex flex-1 justify-center rounded-lg bg-cyan-100 p-2">
					<MessageCircleMore />
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</article>

<article class="m-2">
	<Card.Root>
		<Card.Header>
			<a href="" class="flex flex-row items-center gap-4">
				<img src={imag} alt="imag" class="h-[2rem] w-[2rem] rounded-full" />
				<p>Users name</p>
			</a>
		</Card.Header>
		<Card.Content>
			<section>
				<div class="w-full rounded-xs border p-3">
					<img src={imag} alt="iag" />
				</div>
			</section>
			<section>
				<div class="mt-4">
					<p>This is a test descripttio auto: Fl</p>
				</div>
			</section>
		</Card.Content>
		<Card.Footer>
			<div class="flex w-full flex-row items-center">
				<div class="flex flex-1 bg-cyan-100 p-2">
					<ThumbsUp class="" />
				</div>
				<div class="flex flex-1 justify-center bg-cyan-100">
					<MessageCircleMore />
				</div>
			</div>
		</Card.Footer>
	</Card.Root>
</article>
