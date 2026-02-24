<script lang="ts">
	import type { PageProps } from './$types';
  import { Button } from '$lib/components/ui/button';
  import * as Card from '$lib/components/ui/card';
  import { Input } from '$lib/components/ui/input';
  import { Label } from '$lib/components/ui/label';
	let { data, form }: PageProps = $props();
</script>

<div class=" w-full max-w-3xl">
  <Card.Root>
 <Card.Header>
  <Card.Title>Reset Password</Card.Title>
 </Card.Header>
 <Card.Content>
  <form action="?/reset" method="POST">
    <Input type="hidden" name="token" value={data.token} />
    <label for="password">Enter new password</label>
    <Input
    id="password"
		type="password"
		name="password"
		placeholder="New password"
		required
	/>
<label for="confirm">
  Confirm new password
</label>
	<Input
	  id="confirm"
		type="password"
		name="confirm"
		placeholder="Confirm password"
		required
	/>
	<Button type="submit">Reset Password<Button>
  </form>
 </Card.Content>
 <Card.Footer>
  <p>Card Footer</p>
 </Card.Footer>
</Card.Root>
</div>