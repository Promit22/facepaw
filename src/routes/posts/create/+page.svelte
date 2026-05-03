<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input';
	import Label from '$lib/components/ui/label/label.svelte';
	import Textarea from '$lib/components/ui/textarea/textarea.svelte';

	let { posts, data } = $props();
	console.log('posts from posts page', posts);

	let inp: HTMLDivElement;
	let previmg: HTMLImageElement;
	let span: HTMLSpanElement;

	function showpreview(e: Event) {
		let elm = e.target as HTMLInputElement;
		if (!elm.files) return console.log('file selection failed');
		let files2 = URL.createObjectURL(elm.files[0]);
		previmg.src = files2;
		console.log(files2);
		inp.style.display = 'none';
		span.style.display = 'none';
	}
</script>

{#if data.user}
	<section class="mt-5 w-full max-w-3xl lg:mx-auto">
		<Card.Root>
			<Card.Header>
				<div class="relative">
					<Button variant="destructive" class="absolute right-0 w-[10ch] p-1.5">Cancel</Button>
				</div>
				<Card.Title>Create your post</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" action="?/compress" enctype="multipart/form-data">
					<div>
						<label for="title">Post Title</label>
						<Input id="title" name="title" required class=" text-black" />
					</div>
					<div class="mt-3.5">
						<Label
							for="image"
							class="mx-auto my-0 max-h-[500px] w-full max-w-[500px] overflow-hidden"
						>
							<span class="my-2.5 mb-2 inline-block" bind:this={span}
								>Select an Image for your post</span
							>
							<img src="" alt="" bind:this={previmg} class="h-full w-full object-cover" />
						</Label>
						<div bind:this={inp}>
							<Input
								id="image"
								type="file"
								accept="image/jpeg, image/png"
								class="hover:cursor-pointer"
								name="image"
								onchange={showpreview}
								required
							/>
						</div>
					</div>
					<div class="mt-5">
						<label for="description">Share your story</label>
						<Textarea class="h-60" id="description" name="description" required />
					</div>
					<div class="my-5">
						<Button class="w-full" type="submit">Publish post</Button>
					</div>
				</form>
			</Card.Content>
		</Card.Root>
	</section>
{:else}
	<p class=" text-2xl">You are not logged in. Sign in/Register to publish post or</p>
	<a href="/posts" class=" text-[20px] hover:underline">View others post instead</a>
{/if}
