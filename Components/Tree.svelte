<script lang="ts">
  import { ProcessStack } from "$ts/stores/process";
  import { ProcessMap } from "$types/process";
  import { Runtime } from "../ts/runtime";
  import Row from "./Tree/Row.svelte";

  export let handler = ProcessStack;
  export let runtime: Runtime;

  let map: ProcessMap;

  handler.processes.subscribe((v) => {
    map = null;
    map = v;
  });
</script>

<div class="process-tree">
  {#each [...map] as [pid, proc]}
    {#if !proc.parentPid}
      <Row {proc} {pid} {handler} {runtime} />
    {/if}
  {/each}
</div>
