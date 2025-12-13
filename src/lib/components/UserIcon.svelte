<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { useSidebar } from './ui/sidebar';
	const sbar = useSidebar();
	let { user } = $props();
</script>

<Avatar.Root class="fixed top-0.5 z-5 cursor-pointer text-2xl" onclick={() => sbar.toggle()}>
	<!-- <Avatar.Image src="https://github.com/shadcn.png" alt="@shadcn" /> -->
	<Avatar.Fallback>{user.name[0]}</Avatar.Fallback>
</Avatar.Root>
