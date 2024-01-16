<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { getAppById, spawnOverlay } from "$ts/apps";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import {
    getAllServices,
    getService,
    restartService,
    startService,
    stopService,
  } from "$ts/service/interact";
  import { ProcessStack } from "$ts/stores/process";
  import { Service } from "$types/service";

  export let runtime: Runtime;
  export let current: string;

  let amount = 0;
  let selected: string;
  let data: Service;

  function update() {
    data = getService(selected);
  }

  runtime.selectedService.subscribe((v) => {
    selected = v;
    update();
  });

  GlobalDispatch.subscribe("services-flush", update);

  ProcessStack.processes.subscribe(() => {
    const services = getAllServices();

    amount = services ? services.size : 0;
  });

  function close() {
    ProcessStack.kill(runtime.process.pid);
  }

  async function flip() {
    if (data.pid) stopService(selected);
    else startService(selected);
  }

  async function restart() {
    restartService(selected);
  }

  function gotoProcess() {
    if (!data || !data.pid) return;
    current = "Processes";
    runtime.selected.set(data.pid);
  }

  function openServiceInfo() {
    spawnOverlay(getAppById("ArcTerm"), runtime.pid, [
      [
        `verbose --off`,
        `service status ${selected}`,
        `echo " "`,
        `pause`,
        `exit`,
      ],
    ]);
  }
</script>

{#if runtime}
  <div class="toolbar">
    <div class="left">
      <p class="running">{amount} running services</p>
    </div>
    <div class="right">
      <button on:click={openServiceInfo}>Service Info</button>
      <button on:click={gotoProcess}>Go to process</button>
      <div class="sep"></div>
      <button on:click={restart} disabled={!selected} class="restart">
        Restart Service
      </button>
      <button
        class:running={data && data.pid}
        on:click={flip}
        disabled={!selected}
        class="flip"
      >
        {data && data.pid ? "Stop Service" : "Start Service"}
      </button>
      {#if runtime.app && runtime.app.isOverlay}
        <div class="sep" />
        <button class="close" on:click={close}>Done</button>
      {/if}
    </div>
  </div>
{/if}
