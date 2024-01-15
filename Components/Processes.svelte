<script lang="ts">
  import { Runtime } from "../ts/runtime";
  import Header from "./Processes/Header.svelte";
  import Toolbar from "./Processes/Toolbar.svelte";
  import Tree from "./Processes/Tree.svelte";

  export let runtime: Runtime;
</script>

<div class="top">
  <Header />
  <Tree {runtime} />
</div>
<Toolbar {runtime} />
