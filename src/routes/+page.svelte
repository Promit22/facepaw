<script lang="ts">
	import hero from '$lib/assets/hero.webp';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { PawPrint } from '@lucide/svelte';
</script>

<div class=" ">
	<section>
		<div class=" flex flex-row">
			<div class=" ">
				<!-- <h1 class=" text-9xl">FacePaw</h1> -->
				<h1 class="  text-7xl/20 font-medium">
					<!-- Explore breeds. Share moments. Learn. Compete in quizes -->
					Inpaws, Posts, Play
				</h1>
			</div>
			<div class="  flex">
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
					<Card.Content>
						<Button>Explore Dogs</Button>
						<Button>Explore Cats</Button>
					</Card.Content>
				</Card.Root>
			</div>
			<div class=" w-full">
				<img src={hero} alt="An static image with cat dog footprints on it" />
			</div>
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
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
			<PawPrint />
		</div> -->
	</section>
</div>

<style>
	.paws:nth-child(even) {
		margin-left: 50px;
	}
</style>
