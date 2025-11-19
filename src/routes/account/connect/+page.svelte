<script lang="ts">
	// import type { PageProps } from './$types';

	// let { data }: PageProps = $props();
	import { Button } from '$lib/components/ui/button';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Label } from '$lib/components/ui/label';

	let register = false;
</script>

<section class="my-50 flex items-center justify-center">
	<Card.Root class="m-5 w-full max-w-lg">
		<Card.Header>
			<Card.Title class="text-2xl">Log into your account</Card.Title>
		</Card.Header>
		<Card.Content>
			<form>
				<div class="flex flex-col gap-6">
					<div class="grid gap-2">
						<Label for="email">Email</Label>
						<Input id="email" type="email" placeholder="m@example.com" required />
					</div>
					<div class="grid gap-2">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a href="##" class="ml-auto inline-block text-sm underline-offset-4 hover:underline">
								Forgot your password?
							</a>
						</div>
						<Input id="password" type="password" required />
					</div>
				</div>
			</form>
			<div class="mt-3 flex flex-col">
				<Button class="w-full">Log in</Button>
			</div>
		</Card.Content>
		<Card.Footer class="flex flex-col gap-2">
			<Button class="w-full">Log in with google</Button>
			<p>
				Don't have an account? <Button
					variant="link"
					onclick={() => {
						register = true;
						console.log(register);
					}}
					href=""
					class="pl-0 text-green-500 hover:text-red-700">Register</Button
				>
			</p>
		</Card.Footer>
	</Card.Root>
</section>
