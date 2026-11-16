import type { ComponentType } from "react";
import type { LabMeta } from "@/content/types";

type LabModule = {
  labMeta?: LabMeta;
  Lab?: ComponentType;
};

const modules = import.meta.glob("./*-lab.tsx", { eager: true }) as Record<string, LabModule>;

export type LabEntry = LabMeta & { Component: ComponentType };

export const labs: LabEntry[] = Object.values(modules)
  .filter((mod): mod is { labMeta: LabMeta; Lab: ComponentType } => Boolean(mod.labMeta && mod.Lab))
  .map((mod) => ({ ...mod.labMeta, Component: mod.Lab }))
  .sort((a, b) => a.order - b.order);

export function getLab(id: string): LabEntry | undefined {
  return labs.find((lab) => lab.id === id);
}
