<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import List from "./Services/List.svelte";
  import Toolbar from "./Services/Toolbar.svelte";

  export let runtime: Runtime;
  export let current: string;
</script>

<div class="top">
  <List {runtime} />
</div>
<Toolbar {runtime} bind:current />
