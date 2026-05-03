<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	// import HouseIcon from '@lucide/svelte/icons/house';
	// import { HamburgerIcon, User } from '@lucide/svelte';
	// import CircleUserIcon from '@lucide/svelte/icons/circle-user';
	// import HameburgerIcon from '@lucide/svelte/icons/hamburger';
	import UserIcon from '$lib/components/UserIcon.svelte';
	// import { Menu } from '@lucide/svelte';
	import {
		Cat,
		Dog,
		Bone,
		BadgeQuestionMark,
		Pencil,
		Newspaper,
		ChevronDown,
		HamburgerIcon,
		CircleUserIcon,
		HouseIcon,
		ChartNoAxesColumnIncreasing
	} from '@lucide/svelte';
	// import { Dog } from '@lucide/svelte';
	// import { Bone } from '@lucide/svelte';
	// import { BadgeQuestionMark } from '@lucide/svelte';
	// import { Pencil } from '@lucide/svelte';
	// import { Newspaper } from '@lucide/svelte';
	// import { ChevronDown } from '@lucide/svelte';

	let { children, data } = $props();

	console.log('user from layout svelte', data.user);

	const items = [
		{
			name: data.user ? 'Account' : 'Sign in',
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
			icon: HamburgerIcon
		},
		{
			name: 'Quiz',
			url: '/quiz',
			icon: BadgeQuestionMark
		},
		{
			name: 'Leader-Board',
			url: '/quiz/leaderboard',
			icon: ChartNoAxesColumnIncreasing
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
		},
		{
			name: 'Posts',
			icon: HamburgerIcon,
			sItems: [
				{
					name: 'Create',
					url: '/posts/create',
					icon: Pencil
				},
				{
					name: 'Feed',
					url: '/posts',
					icon: Newspaper
				}
			]
		}
	];
</script>

<!-- <Navbar /> -->

<div class="fixed top-0 z-7 h-12 w-full bg-[#422701]"></div>
<header
	class="fixed top-1.5 z-8 flex w-full flex-row justify-end gap-11 text-white md:justify-center"
>
	<ul class=" hidden list-none gap-20 text-2xl font-light md:flex md:flex-row">
		<li><a href="/">Home</a></li>
		<li>
			<a href={data.user ? `/account/profile/${data.user.id}` : '/account/connect'}
				>{data.user ? 'Account' : 'Sign in'}</a
			>
		</li>
		<li class=" group relative cursor-pointer">
			<span class=" flex flex-row items-center gap-1"> Posts <ChevronDown /></span>
			<ul
				class=" absolute top-full left-0 hidden w-40 flex-col gap-1.5 bg-card p-2 shadow-md group-hover:flex"
			>
				<!-- <div class=" flex-col gap-1.5 group-hover:flex"></div> -->
				<li class=" m-0.5 p-1 hover:underline"><a href="/posts/create">Create</a></li>
				<li class=" m-0.5 p-1 hover:underline"><a href="/posts">Feed</a></li>
			</ul>
		</li>
		<li class=" group relative cursor-pointer">
			<span class=" flex flex-row items-center gap-1"> Breeds <ChevronDown /> </span>
			<ul
				class=" absolute top-full left-0 hidden w-40 flex-col gap-1.5 bg-card p-2 shadow-md group-hover:flex"
			>
				<!-- <div class=" flex-col gap-1.5 group-hover:flex"></div> -->
				<li class=" m-0.5 p-1 hover:underline"><a href="/breed/cat">Cats</a></li>
				<li class=" m-0.5 p-1 hover:underline"><a href="/breed/dog">Dogs</a></li>
			</ul>
		</li>
		<li><a href="/quiz">Quiz</a></li>
		<li><a href="/quiz/leaderboard">Leaderboard</a></li>
	</ul>
	<!-- {#if !data.user}
		<a href="/account/connect" class=" mt-0.5 hidden p-1 md:block md:w-fit">Log In</a>
	{/if} -->
	<h1 class=" mr-1 text-2xl md:absolute md:right-1.5">FacePaw</h1>
</header>
<nav class="m-5">
	<Sidebar.Provider>
		<div class=" md:hidden xl:hidden">
			<AppSidebar {items} {subItems} />
		</div>
		<main class="flex-1">
			<div class="fixed top-2 z-10 md:hidden">
				<UserIcon user={data.user ? data.user : {}} />
				<!-- <Menu class=" cursor-pointer text-white" /> -->
			</div>
			<div class=" mt-[5vh] flex flex-col items-center justify-center md:mt-[8vh]">
				{@render children?.()}
			</div>
		</main>
	</Sidebar.Provider>
</nav>
