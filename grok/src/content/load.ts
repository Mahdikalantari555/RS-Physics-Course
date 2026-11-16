import {
  isFormula,
  isLesson,
  isPrimer,
  isProblem,
  isQuiz,
  type Formula,
  type Lesson,
  type Primer,
  type Problem,
  type Quiz,
} from "./types";

function gather<T>(mods: Record<string, unknown>, guard: (value: unknown) => value is T): T[] {
  const out: T[] = [];
  for (const mod of Object.values(mods)) {
    if (!mod || typeof mod !== "object") continue;
    for (const value of Object.values(mod as Record<string, unknown>)) {
      if (guard(value)) out.push(value);
    }
  }
  return out;
}

const formulaMods = import.meta.glob("./formulas/*.ts", { eager: true });
const lessonMods = import.meta.glob("./lessons/*.ts", { eager: true });
const primerMods = import.meta.glob("./math/*.ts", { eager: true });
const quizMods = import.meta.glob("./quizzes/*.ts", { eager: true });
const examMods = import.meta.glob("./exams/*.ts", { eager: true });
const problemMods = import.meta.glob("./problems/*.ts", { eager: true });

export const formulas: Formula[] = gather(formulaMods, isFormula);
export const lessons: Lesson[] = gather(lessonMods, isLesson).sort((a, b) => a.order - b.order);
export const primers: Primer[] = gather(primerMods, isPrimer).sort((a, b) => a.order - b.order);
export const quizzes: Quiz[] = gather({ ...quizMods, ...examMods }, isQuiz);
export const problems: Problem[] = gather(problemMods, isProblem).sort((a, b) => a.order - b.order);

const formulaMap = new Map(formulas.map((item) => [item.id, item]));
const lessonMap = new Map(lessons.map((item) => [item.slug, item]));
const primerMap = new Map(primers.map((item) => [item.slug, item]));
const quizMap = new Map(quizzes.map((item) => [item.id, item]));
const problemMap = new Map(problems.map((item) => [item.slug, item]));

export function getFormula(id: string): Formula | undefined {
  return formulaMap.get(id);
}

export function getLesson(slug: string): Lesson | undefined {
  return lessonMap.get(slug);
}

export function getPrimer(slug: string): Primer | undefined {
  return primerMap.get(slug);
}

export function getQuiz(id: string): Quiz | undefined {
  return quizMap.get(id);
}

export function getProblem(slug: string): Problem | undefined {
  return problemMap.get(slug);
}

export function lessonQuizzes(): Quiz[] {
  return quizzes.filter((item) => item.kind === "quiz");
}

export function exams(): Quiz[] {
  return quizzes.filter((item) => item.kind === "exam");
}

export function neighbors(slug: string): { prev?: Lesson; next?: Lesson } {
  const index = lessons.findIndex((item) => item.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? lessons[index - 1] : undefined,
    next: index < lessons.length - 1 ? lessons[index + 1] : undefined,
  };
}

export function problemNeighbors(slug: string): { prev?: Problem; next?: Problem } {
  const index = problems.findIndex((item) => item.slug === slug);
  if (index < 0) return {};
  return {
    prev: index > 0 ? problems[index - 1] : undefined,
    next: index < problems.length - 1 ? problems[index + 1] : undefined,
  };
}
