import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

const KEY = "rs-physics-progress-v1";

export type ProgressState = {
  lessons: Record<string, true>;
  labs: Record<string, true>;
  quizzes: Record<string, { correct: number; total: number }>;
  problems: Record<string, true>;
  missions: Record<string, true>;
};

const empty: ProgressState = { lessons: {}, labs: {}, quizzes: {}, problems: {}, missions: {} };

type Api = {
  data: ProgressState;
  ready: boolean;
  toggleLesson: (slug: string) => void;
  toggleProblem: (slug: string) => void;
  markLab: (id: string) => void;
  markMission: (id: string) => void;
  saveQuiz: (id: string, correct: number, total: number) => void;
  reset: () => void;
};

const Ctx = createContext<Api | null>(null);

function sanitize(raw: unknown): ProgressState {
  if (!raw || typeof raw !== "object") return empty;
  const v = raw as Partial<ProgressState>;
  return {
    lessons: v.lessons && typeof v.lessons === "object" ? v.lessons : {},
    labs: v.labs && typeof v.labs === "object" ? v.labs : {},
    quizzes: v.quizzes && typeof v.quizzes === "object" ? v.quizzes : {},
    problems: v.problems && typeof v.problems === "object" ? v.problems : {},
    missions: v.missions && typeof v.missions === "object" ? v.missions : {},
  };
}

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<ProgressState>(empty);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setData(sanitize(JSON.parse(raw)));
    } catch {
      /* keep empty */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(data));
    } catch {
      /* ignore quota / private-mode storage errors */
    }
  }, [data, ready]);

  const api = useMemo<Api>(
    () => ({
      data,
      ready,
      toggleLesson(slug) {
        setData((d) => {
          const lessons = { ...d.lessons };
          if (lessons[slug]) delete lessons[slug];
          else lessons[slug] = true;
          return { ...d, lessons };
        });
      },
      toggleProblem(slug) {
        setData((d) => {
          const problems = { ...d.problems };
          if (problems[slug]) delete problems[slug];
          else problems[slug] = true;
          return { ...d, problems };
        });
      },
      markLab(id) {
        setData((d) => (d.labs[id] ? d : { ...d, labs: { ...d.labs, [id]: true } }));
      },
      markMission(id) {
        setData((d) => (d.missions[id] ? d : { ...d, missions: { ...d.missions, [id]: true } }));
      },
      saveQuiz(id, correct, total) {
        setData((d) => {
          const prev = d.quizzes[id];
          if (prev && prev.correct / prev.total > correct / total) return d;
          return { ...d, quizzes: { ...d.quizzes, [id]: { correct, total } } };
        });
      },
      reset() {
        setData(empty);
      },
    }),
    [data, ready],
  );

  return <Ctx.Provider value={api}>{children}</Ctx.Provider>;
}

export function useProgress(): Api {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProgress outside provider");
  return ctx;
}
