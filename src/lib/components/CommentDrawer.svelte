<script lang="ts">
	import * as Drawer from '$lib/components/ui/drawer/index.js';
	import { enhance } from '$app/forms';
	import { MessageCircleMore, Trash2, Pencil, X, Check } from '@lucide/svelte';
	// import Drawer from './ui/drawer/drawer.svelte';
	// import { Trigger } from './ui/sheet';

	let { postId, userId, initialComments, form } = $props();

	let open = $state(false);
	let comments = $state(initialComments ?? []);
	let editingId = $state<number | null>(null);
	let editContent = $state('');
	const testComment = () => comments;
	console.log('comments', testComment());
	console.log('usrid from commentdrawer', userId);

	// Keep comments in sync when a form action returns fresh comments
	$effect(() => {
		if (form?.comments) {
			comments = form.comments;
		}
	});

	function startEdit(comment: any) {
		editingId = comment.id;
		editContent = comment.content;
	}

	function cancelEdit() {
		editingId = null;
		editContent = '';
	}
</script>

<!-- Trigger button -->
<!-- <button
	type="button"
	onclick={() => (open = true)}
	aria-label="Open comments"
	class="flex flex-1 justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-background hover:text-black"
>
</button> -->
<!-- <div
	class="flex flex-1 justify-center rounded-lg p-2 duration-300 ease-in-out hover:bg-background hover:text-black"
>
</div> -->
<Drawer.Root>
	<Drawer.Trigger class=" flex w-full cursor-pointer justify-center">
		<MessageCircleMore />
	</Drawer.Trigger>
	<Drawer.Content class="mx-auto my-0 flex max-h-[75vh] max-w-3xl">
		<Drawer.Header>
			<Drawer.Title>Comments</Drawer.Title>
		</Drawer.Header>

		<!-- Comment list -->
		<div class="flex flex-col gap-3 overflow-y-auto px-4 pb-4">
			{#if comments.length === 0}
				<p class="text-center text-sm text-black">No comments yet. Be the first!</p>
			{/if}

			{#each comments as comment (comment.id)}
				<div class="rounded-lg border p-3">
					<div class="flex items-center justify-between">
						<span class="text-sm font-semibold">{comment.name}</span>
						<span class="text-xs text-black">
							{comment.updated_at ? 'edited' : new Date(comment.created_at).toLocaleDateString()}
						</span>
					</div>

					{#if editingId === comment.id}
						<!-- Edit form -->
						<form
							method="POST"
							action="?/editComment"
							use:enhance={() => {
								return async ({ update }) => {
									await update();
									cancelEdit();
								};
							}}
						>
							<input type="hidden" name="commentId" value={comment.id} />
							<input type="hidden" name="userId" value={userId} />
							<input type="hidden" name="postId" value={postId} />
							<textarea
								name="content"
								bind:value={editContent}
								class="mt-2 w-full rounded border p-2 text-sm"
								rows="2"
							></textarea>
							<div class="mt-1 flex gap-2">
								<button type="submit" class="text-green-600"><Check class="h-4 w-4" /></button>
								<button type="button" onclick={cancelEdit} class="text-red-500"
									><X class="h-4 w-4" /></button
								>
							</div>
						</form>
					{:else}
						<p class="mt-1 text-sm">{comment.content}</p>

						<!-- Only show edit/delete for comment owner -->
						{#if comment.userId === userId}
							<div class="mt-2 flex gap-3">
								<button
									type="button"
									onclick={() => startEdit(comment)}
									class="cursor-pointer text-black hover:text-foreground"
									aria-label="Edit comment"
								>
									<Pencil class="h-3.5 w-3.5" />
								</button>

								<form method="POST" action="?/deleteComment" use:enhance>
									<input type="hidden" name="commentId" value={comment.id} />
									<input type="hidden" name="userId" value={userId} />
									<input type="hidden" name="postId" value={postId} />
									<button
										type="submit"
										class="cursor-pointer text-black hover:text-red-500"
										aria-label="Delete comment"
									>
										<Trash2 class="h-3.5 w-3.5" />
									</button>
								</form>
							</div>
						{/if}
					{/if}
				</div>
			{/each}
		</div>

		<!-- Add comment form -->
		<div class="border-t px-4 py-3">
			<form method="POST" action="?/addComment" use:enhance class="flex gap-2">
				<input type="hidden" name="postId" value={postId} />
				<input type="hidden" name="userId" value={userId} />
				<input
					type="text"
					name="content"
					placeholder="Write a comment..."
					class="flex-1 rounded-lg border px-3 py-2 text-sm"
					required
				/>
				<button
					type="submit"
					class="rounded-lg bg-primary px-4 py-2 text-sm text-primary-foreground"
				>
					Post
				</button>
			</form>
		</div>
	</Drawer.Content>
</Drawer.Root>
