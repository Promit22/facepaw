<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import Navbar from '$lib/components/Navbar.svelte';
	const sbar = useSidebar();
	let { children } = $props();
</script>

<!-- <Navbar /> -->
 <header class="absolute right-5 text-2xl">
	<h1>FacePaw</h1>
 </header>
<nav class="m-5">
	<Sidebar.Provider>
		<AppSidebar />
			<main>
				<Sidebar.Trigger class="text-2xl" />
				<!-- <button onclick={() => sbar.toggle()}>toggle sidebar</button> -->
				{@render children?.()}
			</main>
	</Sidebar.Provider>
</nav>
