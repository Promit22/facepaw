<script lang="ts">
	import { onMount } from 'svelte';
	import type { PageProps } from './$types';
	import { Hourglass } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Cat, Brain, Trophy, Clock } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	let { form, data }: PageProps = $props();
	// const { sessionId } = data;
	// console.log('form', data);

	let questions = $derived(form?.questions ?? []);
	const expiresAt = $derived(form?.expiresAt ?? 0);
	const dataSession = data.questions;
	const dataExpiresAt = data.expiresAt;
	// const score = $derived(form?.score ?? 0);
	// const accuracy = $derived(form?.accuracy ?? 0);
	// const total = $derived(form?.total ?? 0);
	// onMount(() => {
	// 	if (data.session) {
	// 		questions = data.session;
	// 	}
	// });
	console.log('dataSession', dataSession);

	const started = () => {
		console.log('question', questions, 'dataSession', dataSession);

		if (questions && questions.length > 0) {
			return true;
		} else {
			if (dataSession && dataSession.length > 0) {
				return true;
			}
		}
		return false;
	};
	// let started = $state(false);
	// console.log('questions after refresh', () => questions);

	// let sessionId = $derived(form?.sessionId ?? '');
	let sessionId = data.sessionId;

	let currentIndex = $state(0);
	let selectedAnswer: string | null = $state(null);
	// let answers: Record<string, string>[] = [];
	let remaining = $state(0);
	// let countDownStarted = $state(false);
	let countDownFinished = $state(false);
	let result = $state();
	let timer: number = $state(3);
	let finished = $state(false);
	// console.log(questions);

	function getQuestion() {
		if (questions && questions.length !== 0) {
			return questions;
		} else {
			if (dataSession && dataSession.length !== 0) {
				return dataSession;
			}
		}

		return [];
	}

	function getExpiration() {
		if (expiresAt && expiresAt !== 0) {
			return expiresAt;
		} else {
			if (dataExpiresAt) {
				return dataExpiresAt;
			}
		}
		return 0;
	}

	function next() {
		if (!selectedAnswer) selectedAnswer = null;
		const question = getQuestion();
		const qId = question[currentIndex].id;
		// const ansObj: Record<string, string> = {};

		// ansObj['questionId'] = q.id;
		// ansObj['answer'] = selectedAnswer;

		// answers.push(ansObj);

		if (currentIndex < question.length - 1) {
			currentIndex++;
		}
		submit(qId, JSON.stringify(selectedAnswer));
		selectedAnswer = null;
		// } else {
		// 	console.log('answers from quiz page', answers);

		// 	submit();
		// }
	}

	async function submit(qId: string, ans: string) {
		const id = sessionId;
		const formData = new FormData();
		formData.append('sessionId', id);
		formData.append('qId', qId);
		formData.append('selectedAnswer', ans);
		formData.append('index', JSON.stringify(currentIndex));
		await fetch('/quiz/cat-quiz?/submitAnswer', {
			method: 'POST',
			body: formData
		});
	}

	// async function submit() {
	// 	console.log('answers from submit', answers);

	// 	const formData = new FormData();
	// 	formData.append('sessionId', sessionId);
	// 	formData.append('answers', JSON.stringify(answers));
	// 	// formData.append('sessionId', JSON.stringify(sessionId));
	// 	const res = await fetch('/quiz/cat-quiz?/submitAns', {
	// 		method: 'POST',
	// 		body: formData
	// 	});

	// 	const response = await res.json();
	// 	console.log('response', response);

	// 	const parsed = JSON.parse(response.data);
	// 	console.log('paresed response', parsed);

	// 	result = {
	// 		score: parsed[parsed[0]['score']],
	// 		total: parsed[parsed[0]['total']],
	// 		accuracy: parsed[parsed[0]['accuracy']]
	// 	};
	// 	finished = true;
	// 	// console.log('result from quiz page', result);
	// }

	// function beginQuiz() {
	// 	console.log('called begin function');
	// 	countDownStarted = true;

	// 	console.log('form from beginquiz:', form);
	// }

	function startCounting() {
		const expiresAt = getExpiration();
		const timer = setInterval(() => {
			remaining = Math.ceil((expiresAt - Date.now()) / 1000);
			if (Date.now() > expiresAt) {
				clearInterval(timer);
			}
		}, 1000);
	}

	$effect(() => {
		if (started()) {
			const count = setInterval(() => {
				timer--;
				if (timer < 1) {
					clearInterval(count);
					countDownFinished = true;
				}
			}, 1000);
			startCounting();
		}
		$inspect(result);
	});
	// beginQuiz();
</script>

<div class=" flex h-full w-full max-w-3xl items-center justify-center">
	{#if !started()}
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
				<form method="POST" action="?/startQuiz" class=" flex w-full justify-center" use:enhance>
					<!-- <input type="hidden" name="sessionId" value={sessionId} /> -->
					<Button type="submit" class=" w-[50%] cursor-pointer p-6 text-2xl md:w-[30%]"
						>Start</Button
					>
				</form>
			</Card.Footer>
		</Card.Root>
	{:else if !countDownFinished}
		<div class=" my-auto h-full text-9xl">{timer}</div>
	{:else if !finished}
		<Card.Root class="mx-auto mt-10 p-6">
			<Card.Header>
				<Card.Title class=" flex items-center justify-between">
					Question {currentIndex + 1} / {questions.length}
					<div class="flex items-center gap-1.5 text-[18px]">
						<span class=" animate-spin"><Hourglass size={20} /></span><span>{remaining}s</span>
					</div>
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
					{#each questions[currentIndex].options as option (option)}
						<button
							class="w-full rounded-lg border p-2 text-left
					{selectedAnswer === option ? 'bg-muted' : ''}"
							onclick={() => (selectedAnswer = option)}
							type="button"
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
</div>
