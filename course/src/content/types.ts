export type FormulaToken =
  | { t: "tex"; latex: string }
  | { t: "part"; id: string; latex?: string };

export type FormulaPartKind = "var" | "const" | "op";

export type FormulaPart = {
  id: string;
  latex: string;
  name: string;
  explanation: string;
  kind?: FormulaPartKind;
  unitOrValue?: string;
  mathRole?: string;
  intuition?: string;
};

export type Formula = {
  kind: "formula";
  id: string;
  title: string;
  summary: string;
  tokens: FormulaToken[];
  parts: FormulaPart[];
  derivationNotes?: string;
  relatedLabs?: string[];
  relatedMath?: string[];
};

export type Block =
  | { type: "h2"; text: string }
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "note"; text: string }
  | { type: "formula"; id: string }
  | { type: "math"; primer: string; text: string }
  | { type: "lab"; id: string }
  | { type: "quiz"; id: string }
  | { type: "widget"; id: "exp" | "stefan-slope" }
  | { type: "display"; latex: string }
  | { type: "problem"; id: string };

export type Lesson = {
  kind: "lesson";
  slug: string;
  title: string;
  order: number;
  summary: string;
  prerequisites: string[];
  blocks: Block[];
};

export type Primer = {
  kind: "primer";
  slug: string;
  title: string;
  order: number;
  summary: string;
  blocks: Block[];
};

export type Question = {
  id: string;
  prompt: string;
  choices: string[];
  answer: number;
  explain: string;
};

export type Quiz = {
  kind: "quiz" | "exam";
  id: string;
  title: string;
  summary: string;
  questions: Question[];
};

export type LabMeta = {
  id: string;
  title: string;
  summary: string;
  order: number;
};

export type ProblemStep = {
  title: string;
  text: string;
  latex?: string;
};

export type ProblemFormula = {
  id?: string;
  name: string;
  latex: string;
  why: string;
};

export type Problem = {
  kind: "problem";
  slug: string;
  title: string;
  order: number;
  topic: string;
  summary: string;
  scene: string;
  givens: { symbol: string; meaning: string; value: string }[];
  ask: string;
  formulas: ProblemFormula[];
  steps: ProblemStep[];
  answerLatex: string;
  answerText: string;
  meaning: string;
  traps: string[];
  relatedMath: string[];
  relatedLabs?: string[];
};

export function isFormula(value: unknown): value is Formula {
  if (!value || typeof value !== "object") return false;
  const v = value as Formula;
  return v.kind === "formula" && typeof v.id === "string" && Array.isArray(v.parts);
}

export function isLesson(value: unknown): value is Lesson {
  if (!value || typeof value !== "object") return false;
  const v = value as Lesson;
  return v.kind === "lesson" && typeof v.slug === "string" && Array.isArray(v.blocks);
}

export function isPrimer(value: unknown): value is Primer {
  if (!value || typeof value !== "object") return false;
  const v = value as Primer;
  return v.kind === "primer" && typeof v.slug === "string" && Array.isArray(v.blocks);
}

export function isQuiz(value: unknown): value is Quiz {
  if (!value || typeof value !== "object") return false;
  const v = value as Quiz;
  return (v.kind === "quiz" || v.kind === "exam") && typeof v.id === "string" && Array.isArray(v.questions);
}

export function isProblem(value: unknown): value is Problem {
  if (!value || typeof value !== "object") return false;
  const v = value as Problem;
  return v.kind === "problem" && typeof v.slug === "string" && Array.isArray(v.steps) && Array.isArray(v.givens);
}
