<script lang="ts">
	import type { PageProps } from './$types';
	import { goto } from '$app/navigation';
	let { data }: PageProps = $props();
</script>

<article class=" mt-5 h-full w-full rounded-2xl bg-amber-100">
	<section class=" flex flex-col items-center justify-center gap-1.5">
		<h1 class=" self-start text-3xl">FacePaw</h1>
		<h2 class=" text-4xl">Ready to test your knowlwdge about cat and dog breed?</h2>
		<p class=" font-light">Choose a mode and see how well you really know your paws.</p>
	</section>
</article>
