<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import AppSidebar from '$lib/components/AppSidebar.svelte';
	import '../app.css';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import Input from '$lib/components/ui/input/input.svelte';
	const sbar = useSidebar();
	let { children } = $props();
</script>

<!-- <Navbar /> -->
 <header class="absolute right-5 text-2xl">
	<h1>FacePaw</h1>
 </header>
 <Input class=""/>
<nav class="m-5">
	<Sidebar.Provider>
		<AppSidebar />
			<main>
				<Sidebar.Trigger class="text-2xl cursor-pointer" />
				<!-- <button onclick={() => sbar.toggle()}>toggle sidebar</button> -->
				{@render children?.()}
			</main>
	</Sidebar.Provider>
</nav>
