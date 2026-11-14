import { floodWaterModule } from './flood-water';
import type { ChangeModule } from './types';

const modules: ChangeModule[] = [floodWaterModule];

export function listModules(): ChangeModule[] {
  return [...modules];
}

export function getModule(id: string): ChangeModule | undefined {
  return modules.find((m) => m.id === id);
}

export function registerModule(mod: ChangeModule): void {
  const idx = modules.findIndex((m) => m.id === mod.id);
  if (idx >= 0) modules[idx] = mod;
  else modules.push(mod);
}

/** v1 ships only flood-water; wildfire/subsidence plug in later */
export const DEFAULT_MODULE_ID = 'flood-water';
