<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import HouseIcon from '@lucide/svelte/icons/house';
	import CircleUserIcon from '@lucide/svelte/icons/circle-user';
	import HameburgerIcon from '@lucide/svelte/icons/hamburger';

	import Input from '$lib/components/ui/input/input.svelte';

	let { children } = $props();

	const items = [
		{
			name: 'Account',
			url: '/account/connect',
			icon: CircleUserIcon
		},
		{
			name: 'Home',
			url: '/',
			icon: HouseIcon
		},
		{
			name: 'Posts',
			url: '/posts',
			icon: HameburgerIcon
		}
	];
</script>

<!-- <Navbar /> -->
<header class="fixed right-5 text-2xl">
	<h1>FacePaw</h1>
</header>
<nav class="m-5">
	<Sidebar.Provider>
		<AppSidebar {items} />
		<main>
			<Sidebar.Trigger class="cursor-pointer text-2xl" />
			<!-- <button onclick={() => sbar.toggle()}>toggle sidebar</button> -->
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</nav>
