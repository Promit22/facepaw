<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff, User } from '@lucide/svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	import { Label } from '$lib/components/ui/label';
	import { enhance } from '$app/forms';

	let visible = $state(false);
	let { data, form }: PageProps = $props();
	const user = data.user;
	function toggleVisibility() {
		return visible ? (visible = false) : (visible = true);
	}
</script>

<div class=" w-full max-w-3xl">
	<Card.Root>
		<Card.Header>
			<Card.Title>Edit your profile</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<form
					action="?/update"
					method="POST"
					enctype="multipart/form-data"
					class="flex flex-col gap-4"
					use:enhance
				>
					<div class=" flex w-full justify-center">
						{#if !user?.image}
							<div class="rounded-full border-2">
								<User class="h-full w-full p-4 opacity-20" />
							</div>
						{:else}
							<img src={user?.image} alt="" class=" m-5 w-full" />
						{/if}
					</div>
					<Label for="name">Name</Label>
					<Input type="text" id="name" name="name" value={user?.name} />
					<Label for="email">Email</Label>
					<Input type="email" id="email" name="email" value={user?.email} />

					<Label for="password">Password</Label>
					<div class=" relative">
						<Input
							type={visible ? 'text' : 'password'}
							id="password"
							name="password"
							placeholder="password"
						/>
						<button
							class="absolute top-1.5 right-1 cursor-pointer"
							onclick={toggleVisibility}
							type="button"
						>
							{#if visible}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>

					<Label for="new">Enter New Password</Label>
					<div class=" relative">
						<Input
							type={visible ? 'text' : 'password'}
							id="new"
							name="new"
							placeholder="New Password"
						/>
						<button
							class="absolute top-1.5 right-1 cursor-pointer"
							onclick={toggleVisibility}
							type="button"
						>
							{#if visible}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>
					<Label for="confirm">Confirm New Password</Label>
					<div class=" relative">
						<Input
							type={visible ? 'text' : 'password'}
							id="confirm"
							name="confirm"
							placeholder="Confirm Password"
						/>
						<button
							class="absolute top-1.5 right-1 cursor-pointer"
							onclick={toggleVisibility}
							type="button"
						>
							{#if visible}
								<EyeOff />
							{:else}
								<Eye />
							{/if}
						</button>
					</div>

					<Button class="mx-auto w-fit" type="submit">Submit</Button>
				</form>
			</div>
		</Card.Content>
		<Card.Footer>
			{#if form?.error}
				<p class=" text-red-700">{form.error}</p>
			{/if}
			{#if form?.success}
				<p class=" text-green-600">Success</p>
			{/if}
		</Card.Footer>
	</Card.Root>
</div>
