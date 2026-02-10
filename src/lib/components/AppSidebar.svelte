<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Collapsible } from 'bits-ui';
	import XIcon from '@lucide/svelte/icons/x';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	const sbar = useSidebar();
	let { items, subItems } = $props();

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
					<Collapsible.Root open class="group/collapsible">
						<Sidebar.MenuItem>
							<Collapsible.Trigger>
								{#snippet child({ props })}
									<Sidebar.MenuButton {...props}>
										{#each subItems as sItem}
											<sItem.icon />
											<span>{sItem.name}</span>
										{/each}
									</Sidebar.MenuButton>
								{/snippet}
								<!-- <Sidebar.MenuButton>Breed</Sidebar.MenuButton> -->
							</Collapsible.Trigger>
							<Collapsible.Content>
								<Sidebar.MenuSub>
									{#each subItems[0].sItems as sItem}
										<Sidebar.MenuSubItem class="w-full">
											<a href={sItem.url} class="">
												<sItem.icon />
												<span>{sItem.name}</span>
											</a>
										</Sidebar.MenuSubItem>
									{/each}
									<!-- <Sidebar.MenuSubItem>Cat</Sidebar.MenuSubItem>
									<Sidebar.MenuSubItem>Dog</Sidebar.MenuSubItem> -->
								</Sidebar.MenuSub>
							</Collapsible.Content>
						</Sidebar.MenuItem>
					</Collapsible.Root>
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
