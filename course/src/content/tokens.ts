import type { FormulaToken } from "./types";

export function tex(latex: string): FormulaToken {
  return { t: "tex", latex };
}

export function sym(id: string, latex?: string): FormulaToken {
  return { t: "part", id, latex };
}
