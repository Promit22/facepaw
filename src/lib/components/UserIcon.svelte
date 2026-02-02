<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { useSidebar } from './ui/sidebar';
	import { User } from '@lucide/svelte';
	const sbar = useSidebar();
	let { user } = $props();
</script>

<Avatar.Root class="cursor-pointer" onclick={() => sbar.toggle()}>
	<Avatar.Image src={user.image} alt="@shadcn" />
	<Avatar.Fallback>
		<User />
	</Avatar.Fallback>
</Avatar.Root>
