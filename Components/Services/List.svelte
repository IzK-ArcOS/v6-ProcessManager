<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { ErrorIcon } from "$ts/images/dialog";
  import { getAllServices } from "$ts/service/interact";
  import { ProcessStack } from "$ts/stores/process";
  import { ServiceStore } from "$types/service";
  import Header from "./Header.svelte";
  import Row from "./List/Row.svelte";

  export let runtime: Runtime;

  let services: ServiceStore;

  ProcessStack.processes.subscribe(() => {
    services = getAllServices();
  });
</script>

{#if services}
  <Header />
  <div class="process-tree">
    {#each [...services] as [id, service]}
      <Row {runtime} {id} />
    {/each}
  </div>
{:else}
  <div class="error">
    <img src={ErrorIcon} alt="" />
    <p>Could not contact Service Manager!</p>
  </div>
{/if}
