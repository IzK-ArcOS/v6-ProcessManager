import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";

export class Runtime extends AppRuntime {
  public selected = Store<number>();
  public selectedService = Store<string>();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);

    process.accelerator.store.push({
      key: "escape",
      action() {
        if (app.isOverlay)
          process.handler.kill(process.pid, true);
      }
    })
  }
}