<script lang="ts">
 import * as Card from "$lib/components/ui/card/index.js";
 import {Input} from "$lib/components/ui/input";
</script>
<section>
<Card.Root>
<Card.Header>
  <Card.Title>Create your post</Card.Title>
  <Card.Description>Card Description</Card.Description>
 </Card.Header>
 <Card.Content>
  <form action="">
    <div>
      <label for="title">Post Title</label>
      <Input id="title"/>
    </div>
  </form>
 </Card.Content>
 <Card.Footer>
  <p>Card Footer</p>
 </Card.Footer>
</Card.Root> 
 
 </section>

