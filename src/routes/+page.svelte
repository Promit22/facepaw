<script lang="ts">
	import hero from '$lib/assets/hero.webp';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { PawPrint } from '@lucide/svelte';
	import ctaOne from '$lib/assets/ctaImageOne.webp';
	const { data } = $props();
</script>

<div class=" mt-9 w-full max-w-7xl">
	<section
		class=" relative h-full w-full rounded-2xl bg-[linear-gradient(90deg,rgba(214,181,136,1)_0%,rgba(112,94,70,1)_50%,rgba(198,192,185,1)_100%)] p-8"
	>
		<div class=" flex flex-col justify-between gap-3 md:flex-row">
			<div class="">
				<!-- <h1 class=" text-9xl">FacePaw</h1> -->
				<h1 class=" text-6xl/15 font-medium md:text-8xl/30">
					<!-- Explore breeds. Share moments. Learn. Compete in quizes -->
					Home for every breed lover
				</h1>
				<p class=" mt-2.5 text-[20px] font-extralight md:font-medium">
					A place to explore breeds, post moments and test knowledge of breeds
				</p>
				{#if !data.user}
					<a
						href="/account/connect"
						class=" mt-10 hidden w-fit rounded-sm bg-card p-3 text-2xl text-white md:block"
						>Sign in</a
					>
				{/if}
			</div>
			<div class=" flex w-full flex-2 flex-col gap-1.5">
				<Card.Root>
					<Card.Header>
						<Card.Title>Breed Quiz</Card.Title>
						<Card.Description>Test you knowledge about breeds</Card.Description>
					</Card.Header>
					<Card.Content>
						<Button>Go to Quiz</Button>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>Share your moments</Card.Title>
					</Card.Header>
					<Card.Content>
						<Button>Publish post</Button>
					</Card.Content>
				</Card.Root>
				<Card.Root>
					<Card.Header>
						<Card.Title>Explore breeds</Card.Title>
						<Card.Description>Learn about different kinds of breeds</Card.Description>
					</Card.Header>
					<Card.Content class=" flex flex-col gap-2">
						<Button>Explore Dogs</Button>
						<Button>Explore Cats</Button>
					</Card.Content>
				</Card.Root>
			</div>
			<!-- <div class=" w-full opacity-50">
				<img src={hero} alt="An static image with cat dog footprints on it" /> 
			</div> -->
		</div>
		<!-- <div class=" paws absolute top-2.5 grid h-full grid-cols-6 gap-7 opacity-50">
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />P </sp
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
		</div> -->
	</section>
</div>

<section class="mx-auto flex max-w-6xl flex-col gap-24 px-6 py-20">
	<!-- Breed Explorer -->
	<div class="flex flex-col items-center gap-12 md:flex-row">
		<div class="aspect-16/7 w-full rounded-2xl bg-muted md:w-1/2">
			<!-- placeholder or actual screenshot/illustration -->
			<img src={ctaOne} alt="" class=" object-cover" />
		</div>
		<div class="flex w-full flex-col gap-4 md:w-1/2">
			<h2 class="text-3xl font-bold">Explore Every Breed</h2>
			<p class="text-muted-foreground">
				Browse hundreds of cat and dog breeds. Tap any breed to open a detailed panel with traits,
				lifespan, origin, and more.
			</p>
			<a href="/breed/cat" class="w-fit ...">Go to Cat Explorer →</a>
			<a href="breed/dog" class="w-fit ...">Go to Dog Explorer →</a>
		</div>
	</div>

	<!-- Posts — reversed -->
	<div class="flex flex-col items-center gap-12 md:flex-row-reverse">
		<div class="aspect-video w-full rounded-2xl bg-muted md:w-1/2"></div>
		<div class="flex w-full flex-col gap-4 md:w-1/2">
			<h2 class="text-3xl font-bold">Share Your Pet Moments</h2>
			<p class="text-muted-foreground">
				Post photos of your pets and discover what the community is sharing.
			</p>
			<a href="/posts" class="w-fit ...">Browse Posts →</a>
		</div>
	</div>

	<!-- PawLand Quiz — normal -->
	<div class="flex flex-col items-center gap-12 md:flex-row">
		<div class="aspect-video w-full rounded-2xl bg-muted md:w-1/2"></div>
		<div class="flex w-full flex-col gap-4 md:w-1/2">
			<h2 class="text-3xl font-bold">Test Your Breed Knowledge</h2>
			<p class="text-muted-foreground">
				Take the PawLand quiz, earn XP, and climb the leaderboard against other pet lovers.
			</p>
			<a href="/quiz" class="w-fit ...">Take the Quiz →</a>
		</div>
	</div>
</section>
