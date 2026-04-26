<script lang="ts">
	import * as Sidebar from '$lib/components/ui/sidebar/index.js';
	import { Collapsible } from 'bits-ui';
	import XIcon from '@lucide/svelte/icons/x';
	import { useSidebar } from '$lib/components/ui/sidebar/index.js';
	import { ChevronDown } from '@lucide/svelte';
	// import { it } from 'node:test';
	const sbar = useSidebar();
	let { items, subItems } = $props();

	function toggleSbar() {
		sbar.toggle();
	}
</script>

<Sidebar.Root>
	<Sidebar.Content class=" bg-[#c6c0b9]">
		<Sidebar.Group>
			<Sidebar.GroupLabel>FacePaw</Sidebar.GroupLabel>
			<Sidebar.GroupContent>
				<XIcon class="absolute top-3 right-5 cursor-pointer" onclick={toggleSbar} />
				<Sidebar.Menu class="mt-5 ml-1">
					{#each items as item (item.name)}
						<Sidebar.MenuItem
							class="mt-2.5 rounded-2xl p-1.5 text-[18px] transition-colors hover:bg-gray-400"
						>
							<Sidebar.MenuButton>
								{#snippet child({ props })}
									<a href={item.url} {...props} class="flex flex-row items-center gap-2">
										<item.icon class=" h-5 w-5" />
										<span>{item.name}</span>
									</a>
								{/snippet}
							</Sidebar.MenuButton>
						</Sidebar.MenuItem>
					{/each}
					{#each subItems as item (item.name)}
						<Collapsible.Root open class="group/collapsible">
							<Sidebar.MenuItem class="mt-2.5">
								<Collapsible.Trigger
									class=" rounded-2xl p-1.5  transition-colors hover:bg-gray-400"
								>
									{#snippet child({ props })}
										<Sidebar.MenuButton
											{...props}
											class=" rounded-2xl p-1.5 text-[18px]  transition-colors hover:bg-gray-400"
										>
											<item.icon />
											<span>{item.name}</span>
											<ChevronDown />
										</Sidebar.MenuButton>
									{/snippet}
								</Collapsible.Trigger>
								<Collapsible.Content>
									<Sidebar.MenuSub>
										{#each item.sItems as sItem (sItem.name)}
											<Sidebar.MenuSubItem
												class="mt-1 w-full rounded-2xl p-1.5 transition-colors hover:bg-gray-300"
											>
												<a href={sItem.url} class="flex flex-row gap-1.5 text-sm">
													<sItem.icon class="h-5 w-5" />

													<span>{sItem.name}</span>
												</a>
											</Sidebar.MenuSubItem>
										{/each}
									</Sidebar.MenuSub>
								</Collapsible.Content>
							</Sidebar.MenuItem>
						</Collapsible.Root>
					{/each}
				</Sidebar.Menu>
			</Sidebar.GroupContent>
		</Sidebar.Group>
	</Sidebar.Content>
</Sidebar.Root>
