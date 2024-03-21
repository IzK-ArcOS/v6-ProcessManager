<script lang="ts">
  import { getUserList } from "$ts/server/user/get";
  import { ConnectedServer } from "$ts/stores/server";
  import { PartialUser } from "$types/user";
  import { onMount } from "svelte";

  let users: PartialUser[] = [];
  export let filtered: PartialUser[] = [];

  onMount(async () => {
    users = await getUserList();

    filtered = users;
  });
</script>

<div class="header">
  <p class="user-count">
    {#if filtered.length && users.length != filtered.length}
      Showing {filtered.length} of {users.length} users on {$ConnectedServer.host}.
    {:else}
      Showing {users.length} users on {$ConnectedServer.host}.
    {/if}
  </p>
</div>
