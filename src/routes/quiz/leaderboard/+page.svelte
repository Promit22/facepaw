<script lang="ts">
	// import type { PageData } from './$types';

	// export let data: PageData;

	let { data } = $props();
	type Mode = 'cat' | 'dog' | 'hybrid';
	let activeTab: Mode = $state('cat');

	const tabs: { label: string; value: Mode }[] = [
		{ label: '🐱 Cat', value: 'cat' },
		{ label: '🐶 Dog', value: 'dog' },
		{ label: '🐾 Hybrid', value: 'hybrid' }
	];

	let rows = $derived(data.leaderboard[activeTab]);
</script>

<div class="mx-auto w-full max-w-2xl px-4 py-10">
	<h1 class="mb-2 text-3xl font-bold">Facepaw quiz Leaderboard</h1>
	<p class="mb-8 text-card">Top scores across all quiz modes.</p>

	<!-- Tab switcher -->
	<div class="mb-6 flex gap-2">
		{#each tabs as tab (tab.value)}
			<button
				class="rounded-full px-4 py-2 text-sm font-medium transition-colors
                    {activeTab === tab.value
					? 'bg-primary text-black'
					: 'bg-muted text-black hover:bg-muted/80'}"
				onclick={() => (activeTab = tab.value)}
			>
				{tab.label}
			</button>
		{/each}
	</div>

	<!-- Table -->
	{#if rows.length === 0}
		<p class="py-16 text-center text-muted-foreground">
			No scores yet for this mode. Be the first!
		</p>
	{:else}
		<div class="overflow-hidden rounded-lg border">
			<table class="w-full text-sm">
				<thead class="bg-card text-white">
					<tr>
						<th class="w-12 px-4 py-3 text-left">Rank</th>
						<th class="px-4 py-3 text-left">Username</th>
						<th class="px-4 py-3 text-right">Best Score</th>
					</tr>
				</thead>
				<tbody>
					{#each rows as row, i (row.name)}
						<tr
							class="border-t transition-colors hover:bg-muted/40
                            {i === 0 ? 'bg-green-500/10' : ''}
                            {i === 1 ? 'bg-green-400/10' : ''}
                            {i === 2 ? 'bg-amber-700/10' : ''}"
						>
							<td class="px-4 py-3 font-mono text-muted-foreground">
								{#if i === 0}🥇
								{:else if i === 1}🥈
								{:else if i === 2}🥉
								{:else}#{i + 1}
								{/if}
							</td>
							<td class="px-4 py-3 font-medium">{row.name}</td>
							<td class="px-4 py-3 text-right font-mono">{row.best_score} / 10</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
