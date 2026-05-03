<script lang="ts">
	import { deserialize } from '$app/forms';
	import type { PageProps } from './$types';
	import { Hourglass } from '@lucide/svelte';
	import * as Card from '$lib/components/ui/card';
	import { Button } from '$lib/components/ui/button';
	import { Cat, Dog, Brain, Trophy, Clock, Plus } from '@lucide/svelte';
	import { enhance } from '$app/forms';
	let { form, data }: PageProps = $props();
	let sucs = $derived(form?.success);
	const expiresAt = $derived(form?.expiresAt);
	let dataSession = $state(data.questions);
	const dataExpiresAt = data.expiresAt;

	const dataSessionId = data.sessionId;
	const formSessoinId = $derived(form?.sessionId);

	console.log('dataSession', dataSession);
	const started = () => {
		if (sucs) {
			return true;
		} else {
			if (dataSession && dataSession.length > 0) {
				return true;
			}
		}
		return false;
	};

	let currentIndex = $state(data.currentIndex ?? 0);

	let selectedAnswer: string | null = $state(null);

	let remaining = $state(0);
	let countDownFinished = $state(false);
	let result: {
		score: number;
		total: number;
		accuracy: number;
		review: {
			id: string;
			question: string;
			yourAnswer: string;
			correctAnswer: string;
			isCorrect: boolean;
		}[];
	} = $state();
	let timer: number = $state(3);
	let finished = $state(false);

	let activeQuestions = $derived(form?.questions?.length ? form.questions : (data.questions ?? []));
	let currentQuestion = $derived(activeQuestions[currentIndex]);
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
	function getSessionId() {
		if (dataSessionId && dataSessionId !== undefined) {
			return dataSessionId;
		} else {
			if (formSessoinId && formSessoinId !== undefined) {
				return formSessoinId;
			}
		}
		return '0';
	}

	console.log('expiresAt raw', getExpiration());

	let submitting = $state(false);

	async function next() {
		if (!selectedAnswer || submitting) return;
		submitting = true;

		const qId = activeQuestions[currentIndex].id;
		const ans = selectedAnswer;
		const isLast = currentIndex === activeQuestions.length - 1;

		selectedAnswer = null;

		if (!isLast) {
			currentIndex++;
		}

		await submit(qId, ans);

		if (isLast) {
			const formData = new FormData();
			const res = await fetch('/quiz/hybrid-quiz?/getResult', {
				method: 'POST',
				body: formData
			});
			const text = await res.text();
			const action = deserialize(text);

			console.log('action', action);

			if (action.type === 'success' && action.data) {
				result = {
					score: action.data.score as number,
					total: action.data.total as number,
					accuracy: action.data.accuracy as number,
					review: action.data.review as {
						id: string;
						question: string;
						yourAnswer: string;
						correctAnswer: string;
						isCorrect: boolean;
					}[]
				};
				finished = true;
			}
		}
		submitting = false;
	}

	async function submit(qId: string, ans: string) {
		const id = getSessionId();
		const formData = new FormData();
		formData.append('sessionId', id); // matches server
		formData.append('questionId', qId); // matches server
		formData.append('answer', ans); // matches server
		await fetch('/quiz/hybrid-quiz?/answer', {
			// action is named 'answer' not 'submitAnswer'
			method: 'POST',
			body: formData
		});
	}

	function startCounting() {
		const expiresAt = getExpiration() * 1000;
		const timer = setInterval(() => {
			remaining = Math.ceil((expiresAt - Date.now()) / 1000);
			console.log(remaining);

			if (Date.now() > expiresAt) {
				clearInterval(timer);
				handleTimeUp();
			}
		}, 1000);
	}

	async function handleTimeUp() {
		if (finished) return;

		const qId = activeQuestions[currentIndex].id;
		await submit(qId, selectedAnswer ?? '');

		// fetch result
		const formData = new FormData();
		const res = await fetch('/quiz/hybrid-quiz?/getResult', {
			method: 'POST',
			body: formData
		});
		const text = await res.text();
		const action = deserialize(text);

		if (action.type === 'success' && action.data) {
			result = {
				score: action.data.score as number,
				total: action.data.total as number,
				accuracy: action.data.accuracy as number,
				review: action.data.review as {
					id: string;
					question: string;
					yourAnswer: string;
					correctAnswer: string;
					isCorrect: boolean;
				}[]
			};
		}
		finished = true;
	}

	$effect(() => {
		if (started()) {
			if (dataSession && dataSession.length > 0) {
				countDownFinished = true;

				if (dataSession && dataSession.length > 0) {
					countDownFinished = true;
				}
				console.log('currentindex', currentIndex);
			} else {
				const count = setInterval(() => {
					timer--;
					if (timer < 1) {
						clearInterval(count);
						countDownFinished = true;
					}
				}, 1000);
			}
			startCounting();
		}
		$inspect(result);
	});
</script>

<div class=" flex h-full w-full max-w-3xl items-center justify-center">
	{#if !started()}
		<Card.Root class=" flex flex-col ">
			<Card.Header class=" text-center">
				<span class=" "
					><Cat size={80} class=" mx-auto" /><Plus size="60" class=" mx-auto" />
					<Dog size={80} class=" mx-auto" /></span
				>
				<Card.Title class=" text-3xl md:text-4xl">Hybrid Quiz</Card.Title>
				<Card.Description class=" text-[16px]"
					>Idenify 10 random dogs from images or breed information</Card.Description
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
				<form method="POST" action="?/start" class=" flex w-full justify-center" use:enhance>
					<Button type="submit" class=" w-[50%] cursor-pointer p-6 text-2xl md:w-[30%]"
						>Start</Button
					>
				</form>
			</Card.Footer>
		</Card.Root>
	{:else if !countDownFinished}
		<div class=" my-auto h-full text-9xl">{timer}</div>
	{:else if !finished && activeQuestions}
		<Card.Root class="mx-auto mt-1.5  h-fit w-full max-w-3xl p-6">
			<Card.Header>
				<Card.Title class=" flex items-center justify-between">
					Question {currentIndex + 1} / {activeQuestions.length}
					<div class="flex items-center gap-1.5 text-[18px]">
						<span class=" animate-spin"><Hourglass size={20} /></span><span>{remaining}s</span>
					</div>
				</Card.Title>
			</Card.Header>

			<Card.Content class="space-y-6">
				{#if currentQuestion.imageUrl}
					<img
						src={currentQuestion.imageUrl}
						alt="Breed image"
						class="h-auto w-full rounded-lg object-cover"
					/>
				{/if}

				<p class="text-2xl font-medium">
					{currentQuestion.question}
				</p>

				<div class="space-y-2">
					{#each activeQuestions[currentIndex].options as option (option)}
						<button
							class="w-full rounded-lg border p-2 text-left
					{selectedAnswer === option ? 'bg-muted text-black' : ''}"
							onclick={() => (selectedAnswer = option)}
							type="button"
						>
							{option}
						</button>
					{/each}
				</div>

				<Button class="mt-4 w-full" disabled={!selectedAnswer} onclick={next}>
					{currentIndex === activeQuestions.length - 1 ? 'Submit' : 'Next'}
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

				<div>
					{#each result.review as r, i (r.id)}
						<ol type="1">
							<li class=" text-left">
								{#if r.type === 'image'}
									<div>
										<img src={r.imageUrl} alt="breed image url" />
									</div>
								{/if}
								<h2 class=" mt-5 text-[18px] font-medium">{i + 1}.Question: {r.question}</h2>
								<p>Correct answer: {r.correctAnswer}</p>
								<p class=" mb-5">Your answer: {r.yourAnswer}</p>
							</li>
						</ol>
					{/each}
				</div>
				<Button onclick={() => location.reload()}>Play Again</Button>
			</Card.Content>
		</Card.Root>
	{/if}
</div>
