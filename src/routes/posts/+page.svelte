<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	let { data, form } = $props();
	let { posts, user } = data;
	console.log('posts', posts);
</script>

<Post {posts} {user} {form} />
