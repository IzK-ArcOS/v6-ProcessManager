import { AppRuntime } from "$ts/apps/runtime";
import { Process } from "$ts/process";
import { Store } from "$ts/writable";
import type { App, AppMutator } from "$types/app";

export class Runtime extends AppRuntime {
  public selected = Store<number>();

  constructor(app: App, mutator: AppMutator, process: Process) {
    super(app, mutator, process);
  }
}