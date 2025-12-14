<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import HouseIcon from '@lucide/svelte/icons/house';
	import CircleUserIcon from '@lucide/svelte/icons/circle-user';
	import HameburgerIcon from '@lucide/svelte/icons/hamburger';
	import UserIcon from '$lib/components/UserIcon.svelte';
	import Input from '$lib/components/ui/input/input.svelte';

	let { children, data } = $props();

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
<div class="fixed top-0 z-2 h-12 w-full bg-amber-200"></div>
<header class="fixed top-0.5 right-5 z-5 text-2xl">
	<h1>FacePaw</h1>
</header>
<nav class="m-5">
	<Sidebar.Provider>
		<AppSidebar {items} />
		<main>
			<UserIcon user={data.user ? data.user : ''} />
			<!-- <Sidebar.Trigger  class="fixed cursor-pointer text-2xl" /> -->
			<!-- <button onclick={() => sbar.toggle()}>toggle sidebar</button> -->
			{@render children?.()}
		</main>
	</Sidebar.Provider>
</nav>
