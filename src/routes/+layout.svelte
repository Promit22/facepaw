<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import HouseIcon from '@lucide/svelte/icons/house';
	import { User } from '@lucide/svelte';
	import CircleUserIcon from '@lucide/svelte/icons/circle-user';
	import HameburgerIcon from '@lucide/svelte/icons/hamburger';
	import UserIcon from '$lib/components/UserIcon.svelte';
	import { Cat } from '@lucide/svelte';
	import { Dog } from '@lucide/svelte';
	import { Bone } from '@lucide/svelte';
	import { BadgeQuestionMark } from '@lucide/svelte';

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
		},
		{
			name: 'Quiz',
			url: '/quiz',
			icon: BadgeQuestionMark
		}
	];

	const subItems = [
		{
			name: 'Breed',
			icon: Bone,
			sItems: [
				{
					name: 'Cat',
					url: '/breed/cat',
					icon: Cat
				},
				{
					name: 'Dog',
					url: '/breed/dog',
					icon: Dog
				}
			]
		}
	];
</script>

<!-- <Navbar /> -->

<div class="fixed top-0 z-7 h-12 w-full bg-[#422701]"></div>
<header class="fixed top-1.5 z-8 flex w-full flex-row justify-center gap-11 text-white">
	<ul class=" hidden list-none flex-row gap-20 text-2xl font-light md:flex">
		<li><a href="">Home</a></li>
		<li><a href="Account">Account</a></li>
		<li><a href="Posts">Posts</a></li>
		<li class=" group relative cursor-pointer">
			<span>
				Breeds
				<ul
					class=" group absolute top-[130%] left-0 hidden w-40 bg-[#705E46] p-2 shadow-md group-hover:block"
				>
					<div class=" flex-col gap-1.5 group-hover:flex">
						<li class=" border-b-2 p-1">Cats</li>
						<li>Dogs</li>
					</div>
				</ul>
			</span>
		</li>
		<li><a href="">Quiz</a></li>
	</ul>
	<!-- {#if !data.user}
		<a href="/account/connect" class=" mt-0.5 hidden p-1 md:block md:w-fit">Log In</a>
	{/if} -->
	<h1 class=" absolute right-1.5 self-end text-2xl">FacePaw</h1>
</header>
<nav class="m-5">
	<Sidebar.Provider>
		<div class=" md:hidden xl:hidden">
			<AppSidebar {items} {subItems} />
		</div>
		<main class="flex-1">
			<div class="fixed top-2 z-10">
				<UserIcon user={data.user ? data.user : {}} />
			</div>
			<div class="mt-[10vh] flex flex-col items-center justify-center">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Provider>
</nav>
