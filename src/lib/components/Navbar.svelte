<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { user } = $props();
	// let user = fals`e;
	console.log('user', user);
	function toggleMenu() {

	}
</script>

<nav class="m-5 flex flex-row justify-between">
	<div><h1>FacePaw</h1></div>
	{#if user}
		<Button class="h-5 w-5 rounded-full bg-amber-200 text-center cursor-pointer" onclick={toggleMenu}>
			{user.name[0]}
		</Button>
		<aside>
			<nav>
				
			</nav>
		</aside>
	{:else}
		<div>
			<Button>Log In</Button>
		</div>
	{/if}
</nav>
