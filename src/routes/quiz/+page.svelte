<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import * as Card from '$lib/components/ui/card';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import { Clock } from '@lucide/svelte';

	import hero from '$lib/assets/quizHero.webp';
	let { data }: PageProps = $props();
</script>

<article class=" rounded-2x mt-5 flex h-full w-full max-w-7xl flex-col gap-8 bg-blue-300">
	<section class=" flex flex-row items-center justify-center gap-1.5 bg-[#A8C6C7]">
		<div class=" flex-1 text-center">
			<h1 class="text-5xl/16 font-extrabold">Ready to test your breed knowledge?</h1>
			<p class=" text-foreground">Select one breed and prove</p>
		</div>
		<div class=" relative max-w-[50%] flex-2 self-end">
			<img src={hero} alt="" class=" rounded-2xl" />
			<span class=" absolute right-2 bottom-0.5">Image by Gemini</span>
		</div>
	</section>
	<section class=" flex w-full flex-row gap-2.5 p-2.5">
		<div class=" flex-1">
			<Card.Root class=" flex flex-col text-center">
				<Card.Header class=" ">
					<Card.Title class=" text-3xl/snug">Cat Quiz</Card.Title>
					<Card.Description>Identify cat breeds from images and facts.</Card.Description>
				</Card.Header>
				<Card.Content>
					<ul>
						<li class=" flex items-center justify-center text-xl">
							<span><Clock /></span> 10 Questions
						</li>
						<li class=" flex items-center justify-center text-xl">
							<span><Clock /></span> 10 Questions
						</li>
						<li class=" flex items-center justify-center text-xl">
							<span><Clock /></span> 10 Questions
						</li>
					</ul>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		</div>
		<div class=" flex-1">
			<Card.Root>
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		</div>
		<div class=" flex-1">
			<Card.Root>
				<Card.Header>
					<Card.Title>Card Title</Card.Title>
					<Card.Description>Card Description</Card.Description>
				</Card.Header>
				<Card.Content>
					<p>Card Content</p>
				</Card.Content>
				<Card.Footer>
					<p>Card Footer</p>
				</Card.Footer>
			</Card.Root>
		</div>
	</section>
</article>
