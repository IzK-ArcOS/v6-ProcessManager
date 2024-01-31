<script lang="ts">
  import { getUserList } from "$ts/server/user/get";
  import { ConnectedServer } from "$ts/stores/server";
  import { sleep } from "$ts/util";
  import { PartialUser } from "$types/user";
  import Fuse from "fuse.js";
  import { onMount } from "svelte";

  let users: PartialUser[] = [];
  export let filtered: PartialUser[] = [];
  let search = "";

  onMount(async () => {
    users = await getUserList();

    filtered = users;
  });

  function filter() {
    if (!search) return updateFiltered(users);

    const options: Fuse.IFuseOptions<PartialUser> = {
      includeScore: true,
      keys: ["username"],
    };

    const fuse = new Fuse(
      users.map((a) => ({ ...a, username: a.username.toLowerCase() })),
      options
    );

    updateFiltered(fuse.search(search).map((v) => v.item));
  }

  async function updateFiltered(data: PartialUser[]) {
    filtered = [];
    await sleep(1);
    filtered = data.sort((a, b) =>
      a.username.toLowerCase() < b.username.toLowerCase() ? -1 : 1
    );
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
