<script lang="ts">
	import { Button } from '$lib/components/ui/button';

	let { user } = $props();
	// let user = fals`e;
	console.log('user', user);
	function toggleMenu() {}
</script>

<nav class="relative m-5 bg-neutral-300">
	<div class="absolute left-1"><h1>FacePaw</h1></div>
	{#if user}
		<Button
			class="absolute right-1 h-5 w-5 cursor-pointer rounded-full bg-amber-200 p-5 text-center transition-colors delay-300"
			onclick={toggleMenu}
		>
			{user.name[0]}
		</Button>
		<aside>
			<nav>
				<ul>
					<li>
						<Button>Log Out</Button>
					</li>
					<li><a href="/profile">Profile</a></li>
					<li><a href="/posts">Posts</a></li>
					<li><a href="/home">Home</a></li>
					<li><a href="/create">Create</a></li>
				</ul>
			</nav>
		</aside>
	{:else}
		<div>
			<Button>Log In</Button>
		</div>
	{/if}
</nav>
