<script lang="ts">
	import type { Cats, Dogs } from '$lib/types/breed';
	import unavailable from '$lib/assets/unavailable.webp';
	let { breed }: { breed: Cats | Dogs } = $props();
</script>

<aside>
	<div>
		<h1>{breed.name ? breed.name : 'name not found'}</h1>
		<img src={breed.image?.url ? breed.image.url : unavailable} alt="" />
	</div>
</aside>
