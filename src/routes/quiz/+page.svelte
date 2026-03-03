<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	import hero from '$lib/assets/quizHero.webp';
	let { data }: PageProps = $props();
</script>

<article class=" mt-5 h-full w-full rounded-2xl bg-amber-100">
	<section class=" flex flex-row items-center justify-center gap-1.5">
		<div class=" flex-1 text-center">
			<h1 class="text-5xl/16">Ready to test your breed knowledge?</h1>
			<p class=" text-foreground">Select one breed and prove</p>
		</div>
		<div class=" relative flex-2">
			<img src={hero} alt="" />
			<span class=" absolute right-2 bottom-0.5">Image by Gemini</span>
		</div>
	</section>
</article>
