<script lang="ts">
	import Post from '$lib/components/Post.svelte';
	let { data, form } = $props();
	let { postsAndUsers, user } = data;
	console.log('posts', postsAndUsers);
</script>

<Post {postsAndUsers} {user} {form} />
