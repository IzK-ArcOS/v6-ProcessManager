<script lang="ts">
  import Header from "./Components/Header.svelte";
  import Toolbar from "./Components/Toolbar.svelte";
  import Tree from "./Components/Tree.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;
</script>

<div class="top">
  <Header />
  <Tree {runtime} />
</div>
<Toolbar {runtime} />
