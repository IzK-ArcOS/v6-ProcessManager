import { ProcessManagerIcon } from "$ts/images/apps";
import { App } from "$types/app";
import AppSvelte from "../App.svelte";
import { Runtime } from "./runtime";

export const ProcessManager: App = {
  metadata: {
    name: "Processes",
    description: "Manage running processes",
    author: "The ArcOS Team",
    version: "2.0.0",
    icon: ProcessManagerIcon
  },
  runtime: Runtime,
  content: AppSvelte,
  id: "ProcessManager",
  size: { w: 750, h: 500 },
  minSize: { w: 750, h: 500 },
  maxSize: { w: 950, h: 700 },
  pos: { x: 200, y: 150 },
  state: {
    minimized: false,
    maximized: false,
    headless: false,
    fullscreen: false,
    resizable: true
  },
  controls: {
    minimize: false,
    maximize: true,
    close: true
  },
  singleInstance: true,
  glass: true
}