<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import HouseIcon from '@lucide/svelte/icons/house';
	import CircleUserIcon from '@lucide/svelte/icons/circle-user';
	import HameburgerIcon from '@lucide/svelte/icons/hamburger';
	import UserIcon from '$lib/components/UserIcon.svelte';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	import { Bone } from '@lucide/svelte';

	let { children, data } = $props();

	console.log('user from layout svelte', data.user);

	const items = [
		{
			name: 'Account',
			url: data.user ? `/account/profile/${data.user.id}` : '/account/connect',
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

	const subItems = [
		{
			name: 'Breed',
			icon: Bone,
			sItems: [
				{
					name: 'Cat',
					url: '/cat',
					icon: Cat
				},
				{
					name: 'Dog',
					url: '/dog',
					icon: Dog
				}
			]
		}
	];
</script>

<!-- <Navbar /> -->
<div class="fixed top-0 z-2 h-12 w-full bg-amber-200"></div>
<header class="fixed top-0.5 right-5 z-5 flex flex-row items-center justify-center gap-10">
	{#if !data.user}
		<a href="/account/connect" class="w-[7ch mt-0.5 p-1">Log In</a>
	{/if}
	<h1 class="text-2xl">FacePaw</h1>
</header>
<nav class="m-5">
	<Sidebar.Provider>
		<AppSidebar {items} {subItems} />
		<main class="flex-1">
			{#if !data.user}
				<div class="fixed top-2 z-5">
					<UserIcon user={data.user ? data.user : ''} />
				</div>
			{/if}
			<div class="mt-[10vh] flex justify-center">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Provider>
</nav>
