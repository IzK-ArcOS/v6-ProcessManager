<script lang="ts">
  import { PartialUser } from "$types/user";
  import User from "./List/User.svelte";

  export let filtered: PartialUser[];
</script>

<div class="user-list">
  {#each filtered as user}
    <User {user} />
  {/each}
</div>
