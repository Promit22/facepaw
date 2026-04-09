<script lang="ts">
	import type { HTMLAttributes } from 'svelte/elements';
	import { cn, type WithElementRef } from '$lib/utils.js';

	let {
		ref = $bindable(null),
		class: className,
		children,
		...restProps
	}: WithElementRef<HTMLAttributes<HTMLParagraphElement>> = $props();
	//default text color = text-muted-foreground
</script>

<p
	bind:this={ref}
	data-slot="card-description"
	class={cn('text-sm text-white opacity-75 ', className)}
	{...restProps}
>
	{@render children?.()}
</p>
