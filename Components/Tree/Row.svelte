<script lang="ts">
  import { Runtime } from "$apps/ProcessManager/ts/runtime";
  import { DefaultIcon } from "$ts/images/apps";
  import { Process, ProcessHandler } from "$ts/process";
  import { ProcessMap } from "$types/process";
  import { onMount } from "svelte";
  import Row from "./Row.svelte";

  export let handler: ProcessHandler;
  export let pid: number;
  export let proc: Process;
  export let runtime: Runtime;

  let selected = false;
  let children: ProcessMap;
  let icon = DefaultIcon;
  let name = "";
  let appId = "";

  onMount(() => {
    if (proc.app) {
      appId = proc.app.id;
      name = proc.app.metadata.name;
      icon = proc.app.metadata.icon;

      return;
    }

    name = proc.name;
  });

  runtime.selected.subscribe((v) => {
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
    <div class="segment pid">{pid}</div>
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
