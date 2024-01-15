<script lang="ts">
  import { getUserList, getUsers } from "$ts/server/user/get";
  import { PartialUser } from "$types/user";
  import { onMount } from "svelte";
  import Fuse from "fuse.js";
  import { ConnectedServer } from "$ts/stores/server";

  let users: PartialUser[] = [];
  export let filtered: PartialUser[] = [];
  let search = "";

  onMount(async () => {
    users = await getUserList();

    filtered = users;
  });

  function filter() {
    if (!search) return (filtered = users);

    const options: Fuse.IFuseOptions<PartialUser> = {
      includeScore: true,
      keys: ["username"],
      threshold: 1.4,
    };
    const fuse = new Fuse(users, options);

    filtered = fuse.search(search).map((v) => v.item);

    console.log(filtered);
  }
</script>

<div class="header">
  <p class="user-count">
    {#if filtered.length && users.length != filtered.length}
      Showing {filtered.length} of {users.length} users on {$ConnectedServer.host}.
    {:else}
      Showing {users.length} users on {$ConnectedServer.host}.
    {/if}
  </p>
  <div class="search-field">
    <span class="material-icons-round icon">search</span>
    <input
      type="text"
      bind:value={search}
      placeholder="Search..."
      on:keyup={filter}
    />
  </div>
</div>
