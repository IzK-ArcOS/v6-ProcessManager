<script lang="ts">
  import Tabs from "$state/Desktop/Components/ProcessRenderer/Window/Tabs.svelte";
  import Tab from "$state/Desktop/Components/ProcessRenderer/Window/Tabs/Tab.svelte";
  import { onMount } from "svelte";
  import Processes from "./Components/Processes.svelte";
  import Services from "./Components/Services.svelte";
  import "./css/main.css";
  import { Runtime } from "./ts/runtime";
  import { ProcessStack } from "$ts/stores/process";
  import Users from "./Components/Users.svelte";
  import Security from "./Components/Security.svelte";

  export let runtime: Runtime;
  let current: string;

  onMount(() => {
    if (runtime.process.args && typeof runtime.process.args[0] == "string")
      current = runtime.process.args[0];

    ProcessStack.dispatch.subscribe(runtime.pid, "change-tab", (data) => {
      current = data[0];
    });
  });
</script>

<Tabs tabs={["Processes", "Services", "Users", "Security"]} bind:current>
  <div class="renderer" slot="renderer">
    <Tab {current} selector="Processes"><Processes {runtime} /></Tab>
    <Tab {current} selector="Services"><Services {runtime} bind:current /></Tab>
    <Tab {current} selector="Users"><Users /></Tab>
    <Tab {current} selector="Security"><Security /></Tab>
  </div>
</Tabs>
