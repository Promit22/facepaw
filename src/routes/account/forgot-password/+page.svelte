<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import Input from '$lib/components/ui/input/input.svelte';
	import Label from '$lib/components/ui/label/label.svelte';
	import Button from '$lib/components/ui/button/button.svelte';
	let { data, form }: PageProps = $props();
</script>

<div class=" w-full max-w-3xl">
	<Card.Root>
		<Card.Header>
			<Card.Title>Enter the email you used to register in Facepaw</Card.Title>
		</Card.Header>
		<Card.Content>
			<form action="?/verify" method="POST" class=" flex flex-col items-center gap-5">
				<Label class=" self-start">Email:</Label>
				<Input type="email" name="email" placeholder="Enter email example@gmail.com" />
				<Button type="submit" class="w-full max-w-fit">Confirm email</Button>
				{#if form?.message}
					<p>{form.message}</p>
				{/if}
			</form>
		</Card.Content>
		<Card.Footer></Card.Footer>
	</Card.Root>
</div>
