<script lang="ts">
	// import type { PageProps } from './$types';

	// let { data }: PageProps = $props();
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let prevImg: HTMLImageElement;
	let imgSrc: string;

	function showPreview(e: Event) {
		const elm = e.target as HTMLInputElement;
		if (!elm.files) return '';
		const image = elm.files[0];
		if (imgSrc) URL.revokeObjectURL(imgSrc);
		imgSrc = URL.createObjectURL(image);
	}

	let register = false;
</script>

<div class=" w-full max-w-3xl">
	{#if register}
		<section>
			<Card.Root class="">
				<Card.Header>
					<div class="relative">
						<Button
							variant="destructive"
							class="absolute right-0 w-[10ch] p-1.5 text-[10px]"
							onclick={() => (register = false)}>Cancel</Button
						>
					</div>
					<Card.Title class=" text-[20px] lg:text-2xl">Register to Facepaw</Card.Title>
				</Card.Header>
				<Card.Content>
					<form method="POST" action="?/register" enctype="multipart/form-data">
						<div class=" mb-5 flex justify-center">
							<div></div>
							<div>
								<Label for="pimage" class="flex flex-col">
									Upload profile image
									<Input
										type="file"
										accept="image/*"
										id="pimage"
										name="pimage"
										class=" w-20"
										onchange={showPreview}
										hidden
									/>
									<div class=" max-h-80 max-w-80 rounded-full">
										<img src={imgSrc} alt="" class="h-full w-full rounded-full" />
									</div>
								</Label>
							</div>
						</div>
						<div class="grid gap-2">
							<Label for="name">Full Name</Label>
							<Input id="name" name="name" type="text" placeholder="John Wick" required />
						</div>
						<div class="grid gap-2">
							<Label for="email">Email</Label>
							<Input id="email" name="email" type="email" placeholder="m@example.com" required />
						</div>
						<div class="grid gap-2">
							<div class="flex items-center">
								<Label for="password">Password</Label>
							</div>
							<Input id="password" name="password" type="password" required />
						</div>
						<div class="mt-6 flex flex-col gap-2">
							<Button class="w-full" type="submit">Register</Button>
							<Button class="w-full">Log in with google</Button>
						</div>
					</form>
				</Card.Content>
			</Card.Root>
		</section>
	{:else}
		<section>
			<Card.Root>
				<Card.Header>
					<Card.Title class="text-2xl">Log into your account</Card.Title>
				</Card.Header>
				<Card.Content>
					<form method="POST" action="?/login">
						<div class="flex flex-col gap-6">
							<div class="grid gap-2">
								<Label for="email">Email</Label>
								<Input id="email" name="email" type="email" placeholder="m@example.com" required />
							</div>
							<div class="grid gap-2">
								<div class="flex items-center">
									<Label for="password">Password</Label>
									<a
										href="##"
										class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
									>
										Forgot your password?
									</a>
								</div>
								<Input id="password" name="password" type="password" required />
							</div>
						</div>
						<div class="mt-7 flex flex-col">
							<Button class="w-full" type="submit">Log in</Button>
						</div>
					</form>
				</Card.Content>
				<Card.Footer class="flex flex-col gap-2">
					<Button class="w-full">Log in with google</Button>
					<p>
						Don't have an account? <Button
							variant="link"
							onclick={() => {
								register = true;
							}}
							href=""
							class="cursor-pointer pl-0 text-green-500 hover:text-red-700">Register</Button
						>
					</p>
				</Card.Footer>
			</Card.Root>
		</section>
	{/if}
</div>
