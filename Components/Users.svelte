<script lang="ts">
  import { PartialUser } from "$types/user";
  import Header from "./Users/Header.svelte";
  import List from "./Users/List.svelte";

  let filtered: PartialUser[] = [];
</script>

<div class="top users">
  <Header bind:filtered />
  <List {filtered} />
</div>
<div class="toolbar"></div>
