<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar';
	import { useSidebar } from './ui/sidebar';
	import { User } from '@lucide/svelte';
	const sbar = useSidebar();
	let { user } = $props();
	console.log('puser from usericon', user);
</script>

<Avatar.Root class="cursor-pointer" onclick={() => sbar.toggle()}>
	<Avatar.Image src={user.image} alt="" />
	<Avatar.Fallback>
		<User />
	</Avatar.Fallback>
</Avatar.Root>
