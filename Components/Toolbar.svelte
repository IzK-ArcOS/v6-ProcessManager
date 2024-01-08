<script lang="ts">
  import { getAppById, spawnOverlay } from "$ts/apps";
  import { WarningIcon } from "$ts/images/dialog";
  import { Process } from "$ts/process";
  import { createErrorDialog } from "$ts/process/error";
  import { focusedPid } from "$ts/stores/apps";
  import { ProcessStack } from "$ts/stores/process";
  import { sleep } from "$ts/util";
  import { Runtime } from "../ts/runtime";

  export let runtime: Runtime;

  let proc: Process;
  let amount = 0;

  runtime.selected.subscribe((v) => {
    proc = ProcessStack.getProcess(v);
  });

  ProcessStack.processes.subscribe((v) => {
    amount = [...v].filter(([_, proc]) => !proc._disposed).length;
  });

  function info() {
    spawnOverlay(getAppById("AppInfo"), runtime.process.pid, [proc.app.id]);
  }

  async function focus() {
    await sleep();

    focusedPid.set(proc.pid);
  }

  function close() {
    ProcessStack.kill(runtime.process.pid);
  }

  async function kill() {
    const name = proc.app ? proc.app.metadata.name : proc.name;
    createErrorDialog(
      {
        title: `Do you want to end ${name}?`,
        message:
          "By killing this process, it's window will close and you will lose any unsaved information. If you end a system process, it might make ArcOS unstable. Are you sure you want to continue?",
        image: WarningIcon,
        buttons: [
          { caption: "Cancel", action() {} },
          {
            caption: "End process",
            async action() {
              if (!proc) return;
              await ProcessStack.kill(proc.pid);

              runtime.selected.set(null);
            },
            suggested: true,
          },
        ],
        sound: "arcos.dialog.warning",
      },
      runtime.process.pid,
      true
    );
  }
</script>

{#if runtime}
  <div class="toolbar">
    <div class="left">
      <p class="running">{amount} running tasks</p>
    </div>
    <div class="right">
      <button disabled={!proc || !proc.app} on:click={info}>App Info</button>
      <button disabled={!proc || !proc.app} on:click={focus}>Focus</button>
      <div class="sep" />
      <button class="suggested" on:click={kill} disabled={!proc}>
        Kill {proc && proc.app ? "App" : "Process"}
      </button>
      {#if runtime.app && runtime.app.isOverlay}
        <div class="sep" />
        <button class="close" on:click={close}>Done</button>
      {/if}
    </div>
  </div>
{/if}
