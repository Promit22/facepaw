<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { user } = $props();
	// let user = fals`e;
	console.log('user', user);
</script>

<nav class="">
	<div><h1>FacePaw</h1></div>
	{#if user}
		<div>
			{user.name}
		</div>
	{:else}
		<div>
			<Button>Log In</Button>
		</div>
	{/if}
</nav>
