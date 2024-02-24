<script lang="ts">
  import Tabs from "$state/Desktop/Components/ProcessRenderer/Window/Tabs.svelte";
  import Tab from "$state/Desktop/Components/ProcessRenderer/Window/Tabs/Tab.svelte";
  import { ProcessStack } from "$ts/stores/process";
  import { onMount } from "svelte";
  import Processes from "./Components/Processes.svelte";
  import Security from "./Components/Security.svelte";
  import Services from "./Components/Services.svelte";
  import Users from "./Components/Users.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";

  export let runtime: Runtime;
  let current: string;

  onMount(() => {
    if (runtime.process.args && typeof runtime.process.args[0] == "string")
      current = runtime.process.args[0];

    ProcessStack.dispatch.subscribe(runtime.pid, "change-tab", (data) => {
      current = data[0];
    });
  });

  function closeThis() {
    runtime.closeApp();
  }
</script>

<Tabs tabs={["Processes", "Services", "Users", "Security"]} bind:current>
  <div class="renderer" slot="renderer">
    <Tab {current} selector="Processes"><Processes {runtime} /></Tab>
    <Tab {current} selector="Services"><Services {runtime} bind:current /></Tab>
    <Tab {current} selector="Users"><Users /></Tab>
    <Tab {current} selector="Security"><Security /></Tab>
  </div>
  <button class="close material-icons-round" slot="right" on:click={closeThis}>close</button>
</Tabs>
