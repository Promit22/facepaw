<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Cat, Brain, Trophy, Clock } from '@lucide/svelte';
	let { data, form }: PageProps = $props();
	const { questions, sessionId } = data;
	let currentIndex = $state(0);
	let selectedAnswer: string | null = $state(null);
	let answers: Record<string, string>[] = [];
	let finished = $state(false);
	let result: any = $state(null);

	console.log(questions);

	function next() {
		if (!selectedAnswer) return;

		const q = questions[currentIndex];
		const ansObj: Record<string, string> = {};

		ansObj[q.id] = selectedAnswer;

		answers.push(ansObj);

		selectedAnswer = null;

		if (currentIndex < questions.length - 1) {
			currentIndex++;
		} else {
			submit();
		}
	}

	async function submit() {
		console.log('called submit');

		const formData = new FormData();
		formData.append('sessionId', data.sessionId);
		formData.append('answers', JSON.stringify(answers));
		const res = await fetch('/quiz/cat-quiz?/submitAns', {
			method: 'POST',
			body: formData
		});

		const response = await res.json();
		console.log('response', response);

		result = response.data.result;
		finished = true;
		console.log('result from quiz page', result);
	}
</script>

<div class=" w-full max-w-3xl">
	<Card.Root class=" flex flex-col ">
		<Card.Header class=" text-center">
			<Cat size={80} class=" mx-auto" />
			<Card.Title class=" text-3xl md:text-4xl">Cat Quiz</Card.Title>
			<Card.Description class=" text-[16px]"
				>Idenify 10 random cats from images or breed information</Card.Description
			>
		</Card.Header>
		<Card.Content>
			<h2 class=" mb-2.5 text-2xl font-bold">Rules:</h2>
			<ul class=" flex w-full list-disc flex-col gap-3.5 text-[1rem] font-medium">
				<li class=" flex gap-1.5 self-start">
					<span><Brain class=" h-5 w-5" /></span> Answer 10 Questions within the time limit
				</li>
				<li class=" mt-2.5 flex gap-1.5 self-start">
					<span><Clock class=" h-5 w-5" /></span> You have 2 minutes to complete the quiz.
				</li>
				<li class=" mt-2.5 flex gap-1.5 self-start">
					<span><Trophy class=" h-5 w-5" /></span> Your score determines your leaderboard rank
				</li>
				<li class=" text-red-500">
					<strong class=" font-black">Note:</strong> If you are not logged in(logged out/unregistered)
					your result won't be saved and you can't participate in the leaderboard
				</li>
			</ul>
		</Card.Content>
		<Card.Footer>
			<form action="?/startQuiz" method="POST" class=" flex w-full justify-center">
				<input type="hidden" name="id" value={sessionId} />
				<Button type="submit" class=" w-[50%] cursor-pointer p-6 text-2xl md:w-[30%]">Start</Button>
			</form>
		</Card.Footer>
	</Card.Root>
</div>

<!-- 
{#if !finished}
	<Card.Root class="mx-auto mt-10 max-w-xl p-6">
		<Card.Header>
			<Card.Title>
				Question {currentIndex + 1} / {questions.length}
			</Card.Title>
		</Card.Header>

		<Card.Content class="space-y-6">
			{#if questions[currentIndex].image}
				<img
					src={questions[currentIndex].image}
					alt="Breed image"
					class="h-60 w-full rounded-lg object-cover"
				/>
			{/if}

			<p class="text-lg font-medium">
				{questions[currentIndex].question}
			</p>

			<div class="space-y-2">
				{#each questions[currentIndex].options as option}
					<button
						class="w-full rounded-lg border p-2 text-left
					{selectedAnswer === option ? 'bg-muted' : ''}"
						onclick={() => (selectedAnswer = option)}
					>
						{option}
					</button>
				{/each}
			</div>

			<Button class="mt-4 w-full" disabled={!selectedAnswer} onclick={next}>
				{currentIndex === questions.length - 1 ? 'Submit' : 'Next'}
			</Button>
		</Card.Content>
	</Card.Root>
{:else}
	<Card.Root class="mx-auto mt-10 max-w-xl p-6 text-center">
		<Card.Header>
			<Card.Title>Quiz Result</Card.Title>
		</Card.Header>

		<Card.Content class="space-y-4">
			<p class="text-xl font-semibold">
				Score: {result.score} / {result.total}
			</p>
			<p>Accuracy: {result.accuracy}%</p>

			<Button onclick={() => location.reload()}>Play Again</Button>
		</Card.Content>
	</Card.Root>
{/if} -->
