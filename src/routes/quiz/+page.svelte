<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import { resolve } from '$app/paths';
	import * as Card from '$lib/components/ui/card';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	import { Button } from '$lib/components/ui/button';
	import * as Alert from '$lib/components/ui/alert';
	import { Clock } from '@lucide/svelte';
	import { Trophy } from '@lucide/svelte';
	import { Brain } from '@lucide/svelte';
	import { PawPrint } from '@lucide/svelte';
	import hero from '$lib/assets/quizHero.webp';
	let { data }: PageProps = $props();
	const user = data.logged;
	function takeToQuiz(type: 'cat' | 'dog' | 'hybrid') {
		goto(resolve(`/quiz/${type}-quiz/`));
	}
</script>

<article
	class=" rounded-2x m-1 mt-5 flex h-full w-full max-w-7xl flex-col items-center gap-8 bg-conic-150"
>
	<section class=" flex flex-col items-center justify-center gap-1.5 bg-[#A8C6C7] md:flex-row">
		<div class="  flex-1 text-center">
			<h1 class="text-5xl/16 font-extrabold md:text-7xl/20">Ready to test your breed knowledge?</h1>
			<p class=" text-foreground">Select one quiz and prove</p>
		</div>
		<div class=" relative flex-2 self-end md:max-w-[50%]">
			<img src={hero} alt="" class=" rounded-2xl" />
			<span class=" absolute right-2 bottom-0.5">Image by Gemini</span>
		</div>
	</section>
	<section class=" flex w-full flex-col gap-5 p-2.5 md:w-[70%] md:flex-row">
		<div class="flex-1">
			<Card.Root class=" flex flex-col  text-center">
				<Card.Header class=" ">
					<Cat class=" mx-auto" size={50} />
					<Card.Title class=" text-3xl/snug font-bold">Cat Quiz</Card.Title>
					<Card.Description class=" font-medium"
						>Identify cat breeds from images and facts.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<ul class=" flex w-full flex-col text-[1rem]">
						<li class=" flex gap-1.5 self-start">
							<span><Brain class=" h-5 w-5" /></span> 10 Questions
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Clock class=" h-5 w-5" /></span> Timed
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Trophy class=" h-5 w-5" /></span> Ranked
						</li>
					</ul>
				</Card.Content>
				<Card.Footer class=" mx-auto my-0">
					<Button onclick={() => takeToQuiz('cat')}>Start Quiz</Button>
				</Card.Footer>
			</Card.Root>
		</div>
		<div class=" flex-1">
			<Card.Root class=" flex flex-col  text-center">
				<Card.Header class=" ">
					<Dog class=" mx-auto" size={50} />
					<Card.Title class=" text-3xl/snug font-bold">Dog Quiz</Card.Title>
					<Card.Description class=" font-medium"
						>Identify dog breeds from images and facts.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<ul class=" flex w-full flex-col text-[1rem]">
						<li class=" flex gap-1.5 self-start">
							<span><Brain class=" h-5 w-5" /></span> 10 Questions
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Clock class=" h-5 w-5" /></span> Timed
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Trophy class=" h-5 w-5" /></span> Ranked
						</li>
					</ul>
				</Card.Content>
				<Card.Footer class=" mx-auto my-0">
					<Button onclick={() => takeToQuiz('dog')}>Start Quiz</Button>
				</Card.Footer>
			</Card.Root>
		</div>
		<div class=" flex-1">
			<Card.Root class=" flex flex-col  text-center">
				<Card.Header class=" ">
					<PawPrint class=" mx-auto" size={50} />
					<Card.Title class=" text-3xl/snug font-bold">Hybrid</Card.Title>
					<Card.Description class=" font-medium">Identify both cat and dog breeds.</Card.Description
					>
				</Card.Header>
				<Card.Content>
					<ul class=" flex w-full flex-col text-[1rem]">
						<li class=" flex gap-1.5 self-start">
							<span><Brain class=" h-5 w-5" /></span> 10 Questions
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Clock class=" h-5 w-5" /></span> Timed
						</li>
						<li class=" mt-2.5 flex gap-1.5 self-start">
							<span><Trophy class=" h-5 w-5" /></span> Ranked
						</li>
					</ul>
				</Card.Content>
				<Card.Footer class=" mx-auto my-0">
					<Button onclick={() => takeToQuiz('hybrid')}>Start Quiz</Button>
				</Card.Footer>
			</Card.Root>
		</div>
	</section>
	{#if true}
		<div class="  w-full md:max-w-[50%]">
			<Alert.Root variant="destructive" class=" p-5">
				<Alert.Title class=" text-[1.2rem]"
					>You are not logged in. You won't be able to:</Alert.Title
				>
				<Alert.Description>
					<ul class=" list-disc text-[1rem]">
						<li>save your score</li>
						<li>Compete in the leaderboard</li>
					</ul>
				</Alert.Description>
			</Alert.Root>
		</div>
	{/if}
</article>
