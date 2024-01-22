<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { ProcessStack } from "$ts/stores/process";
  import { ProcessMap } from "$types/process";
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
