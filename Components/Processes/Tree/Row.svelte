<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { DefaultIcon } from "$ts/images/apps";
  import { ComponentIcon, FlagIcon } from "$ts/images/general";
  import { Process, ProcessHandler } from "$ts/process";
  import { focusedPid } from "$ts/stores/apps/focus";
  import { ProcessMap } from "$types/process";
  import { onMount } from "svelte";
  import Row from "./Row.svelte";

  export let handler: ProcessHandler;
  export let pid: number;
  export let proc: Process;
  export let runtime: Runtime;

  const { selected: selectedStore } = runtime;
  const { mutator: app } = proc;

  let selected = false;
  let children: ProcessMap;
  let icon = DefaultIcon;
  let name = "";
  let appId = "";

  onMount(() => {
    if (proc.name.startsWith("svc#")) icon = ComponentIcon;

    name = proc.name;

    if (runtime.app) {
      app.subscribe((v) => {
        if (!v) return;

        appId = v.id;
        name = v.metadata.name;
        icon = v.metadata.icon;
      });

      return;
    }
  });

  selectedStore.subscribe((v) => {
    selected = v == pid;
  });

  handler.processes.subscribe(() => {
    children = handler.getSubProcesses(pid);
  });

  function select() {
    runtime.selected.set(pid);
  }
</script>

<!-- svelte-ignore a11y-click-events-have-key-events -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if !proc._disposed}
  <div class="row" on:click={select} class:selected>
    <div class="segment name">
      <img src={icon} alt="" /><span>{name}</span>
    </div>
    <div class="segment pid" class:flagged={proc.pid == $focusedPid}>
      <img src={FlagIcon} alt="" class="flag" />
      <span>{pid}</span>
    </div>
    <div class="segment app-id">{appId}</div>
  </div>

  {#if children.size}
    <div class="indent" data-pid={pid}>
      {#each [...children] as [pid, proc]}
        <Row {pid} {proc} {handler} {runtime} />
      {/each}
    </div>
  {/if}
{/if}
