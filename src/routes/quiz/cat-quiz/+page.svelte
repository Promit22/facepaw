<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';

	let { data }: PageProps = $props();
	const { questions } = data;
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
{/if}
