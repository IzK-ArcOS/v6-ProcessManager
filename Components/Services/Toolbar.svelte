<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import HtmlSpinner from "$lib/Components/HtmlSpinner.svelte";
  import { getAppById, spawnOverlay } from "$ts/apps";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { getAllServices, getService, restartService } from "$ts/service/interact";
  import { startServiceNotified, stopServiceNotified } from "$ts/service/wrapper";
  import { ProcessStack } from "$ts/stores/process";
  import { Service } from "$types/service";

  export let runtime: Runtime;
  export let current: string;

  let amount = 0;
  let selected: string;
  let data: Service;
  let flipping = false;
  let restarting = false;

  function update() {
    data = getService(selected);
  }

  const { selectedService } = runtime;

  selectedService.subscribe((v) => {
    selected = v;
    update();
  });

  GlobalDispatch.subscribe("services-flush", update);

  ProcessStack.processes.subscribe(() => {
    const services = getAllServices();

    amount = services ? services.size : 0;
  });

  function close() {
    ProcessStack.kill(runtime.process.pid, true);
  }

  async function flip() {
    flipping = true;

    if (data.pid) await stopServiceNotified(selected);
    else await startServiceNotified(selected);

    flipping = false;
  }

  async function restart() {
    restarting = true;
    await restartService(selected);
    restarting = false;
  }

  function gotoProcess() {
    if (!data || !data.pid) return;
    current = "Processes";
    runtime.selected.set(data.pid);
  }

  function openServiceInfo() {
    spawnOverlay(getAppById("ServiceInfo"), runtime.pid, [selected]);
  }
</script>

{#if runtime}
  <div class="toolbar">
    <div class="left">
      <p class="running">{amount} total services</p>
    </div>
    <div class="right">
      <button on:click={openServiceInfo} disabled={!selected}>Service Info</button>
      <button on:click={gotoProcess} disabled={!selected}>Go to process</button>
      <div class="sep" />
      <button class="restart" on:click={restart} disabled={!selected || restarting}>
        {#if !restarting}
          Restart
        {:else}
          <HtmlSpinner height={16} />
        {/if}
      </button>
      <button
        class="flip"
        class:running={data && data.pid}
        on:click={flip}
        disabled={!selected || flipping}
      >
        {#if !flipping}
          {data && data.pid ? "Stop" : "Start"}
        {:else}
          <HtmlSpinner height={16} />
        {/if}
      </button>

      {#if runtime.app && runtime.app.isOverlay}
        <div class="sep" />
        <button class="close" on:click={close}>Done</button>
      {/if}
    </div>
  </div>
{/if}
