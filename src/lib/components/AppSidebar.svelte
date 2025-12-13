<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';

	import XIcon from '@lucide/svelte/icons/x';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sbar = useSidebar();
	let { items } = $props();

	function toggleSbar() {
		sbar.toggle();
	}
</script>

<Sidebar.Root>
	<Sidebar.Content>
		<Sidebar.Group>
			<Sidebar.GroupLabel>FacePaw</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<XIcon
					class="absolute top-3 right-5 cursor-pointer hover:bg-amber-200"
					onclick={toggleSbar}
				/>
				<Sidebar.Menu class="mt-5">
					{#each items as item (item.name)}
						<Sidebar.MenuItem class="mt-2.5" onclick={toggleSbar}>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props}>
										<item.icon />
										<span>{item.name}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
