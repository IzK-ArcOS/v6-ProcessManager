<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { WindowSettingsIcon } from "$ts/images/general";
  import { GlobalDispatch } from "$ts/process/dispatch/global";
  import { getService } from "$ts/service/interact";
  import { Service } from "$types/service";
  import { onMount } from "svelte";

  export let runtime: Runtime;
  export let id: string;

  const { selectedService } = runtime;

  let service: Service;
  let selected = false;

  selectedService.subscribe((v) => {
    selected = v == id;
    update();
  });

  GlobalDispatch.subscribe("services-flush", update);
  onMount(update);

  function update() {
    service = getService(id);
  }

  function select() {
    runtime.selectedService.set(id);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if service}
  <div class="row service" class:selected on:click={select}>
    <div class="segment name">
      <img src={WindowSettingsIcon} alt="" />
      <span>{service.name}</span>
    </div>
    <div class="segment description">{service.description}</div>
    <div class="segment pid">{service.pid || "-"}</div>
    <div class="segment status">{service.pid ? "Running" : "Stopped"}</div>
  </div>
{/if}
