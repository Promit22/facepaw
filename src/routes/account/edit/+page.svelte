<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';
	import { Eye, EyeOff, User } from '@lucide/svelte';

	let visible = $state(false);
	let { data }: PageProps = $props();
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
				<form action="" class="flex flex-col gap-4">
					<div class=" flex w-full justify-center">
						{#if !user?.image}
							<div class="rounded-full border-2">
								<User class="h-full w-full p-4 opacity-20" />
							</div>
						{:else}
							<img src={user?.image} alt="" class=" m-5 w-[60%]" />
						{/if}
					</div>
					<label for="name">
						<Input type="text" id="name" value={user?.name} />
					</label>
					<label for="email">
						<Input type="email" id="email" value={user?.email} />
					</label>
					<label for="password" class=" relative">
						<Input type={visible ? 'text' : 'password'} id="password" value={user?.email} />
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
					</label>
				</form>
			</div>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>
