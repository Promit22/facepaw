<script lang="ts">
	import type { PageProps } from './$types';
	import * as Card from '$lib/components/ui/card';
	import { Input } from '$lib/components/ui/input';

	let { data }: PageProps = $props();
	const user = data.user;
</script>

<div>
	<Card.Root>
		<Card.Header>
			<Card.Title>Edit your profile</Card.Title>
			<Card.Description></Card.Description>
		</Card.Header>
		<Card.Content>
			<div>
				<form action="">
					<Input value={user?.name} />
				</form>
			</div>
		</Card.Content>
		<Card.Footer>
			<p>Card Footer</p>
		</Card.Footer>
	</Card.Root>
</div>
