import type { CheckpointQuestion } from '../data/courseCurriculum';

export interface CourseProgressState {
  completedModuleIds: string[];
  checkpointSelections: Record<string, string>;
  finalQuizAnswers: Record<string, string>;
  finalQuizSubmitted: boolean;
  lastActiveModuleId: string;
}

const STORAGE_KEY = 'madar_teif_rs_course_v1';

export const DEFAULT_COURSE_PROGRESS: CourseProgressState = {
  completedModuleIds: [],
  checkpointSelections: {},
  finalQuizAnswers: {},
  finalQuizSubmitted: false,
  lastActiveModuleId: 'em-spectrum',
};

export function loadCourseProgress(): CourseProgressState {
  if (typeof window === 'undefined' || !window.localStorage) {
    return DEFAULT_COURSE_PROGRESS;
  }
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_COURSE_PROGRESS;
    const parsed = JSON.parse(raw) as Partial<CourseProgressState>;
    return {
      completedModuleIds: Array.isArray(parsed.completedModuleIds)
        ? parsed.completedModuleIds
        : [],
      checkpointSelections:
        parsed.checkpointSelections && typeof parsed.checkpointSelections === 'object'
          ? parsed.checkpointSelections
          : {},
      finalQuizAnswers:
        parsed.finalQuizAnswers && typeof parsed.finalQuizAnswers === 'object'
          ? parsed.finalQuizAnswers
          : {},
      finalQuizSubmitted: Boolean(parsed.finalQuizSubmitted),
      lastActiveModuleId:
        typeof parsed.lastActiveModuleId === 'string' && parsed.lastActiveModuleId
          ? parsed.lastActiveModuleId
          : 'em-spectrum',
    };
  } catch {
    return DEFAULT_COURSE_PROGRESS;
  }
}

export function saveCourseProgress(state: CourseProgressState): void {
  if (typeof window === 'undefined' || !window.localStorage) return;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Ignore storage quota errors in restricted sandboxes
  }
}

export function clearCourseProgress(): CourseProgressState {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // ignore
    }
  }
  return { ...DEFAULT_COURSE_PROGRESS };
}

export function calculateCompletionStats(
  completedModuleIds: string[],
  totalModules: number
): {
  completedCount: number;
  totalCount: number;
  percentage: number;
} {
  const unique = new Set(completedModuleIds);
  const completedCount = Math.min(unique.size, totalModules);
  const percentage = totalModules > 0 ? Math.round((completedCount / totalModules) * 100) : 0;
  return { completedCount, totalCount: totalModules, percentage };
}

export function gradeQuiz(
  questions: CheckpointQuestion[],
  answers: Record<string, string>
): {
  correctCount: number;
  totalQuestions: number;
  scorePercent: number;
  passed: boolean;
} {
  const totalQuestions = questions.length;
  let correctCount = 0;
  for (const q of questions) {
    if (answers[q.id] === q.correctOptionId) {
      correctCount += 1;
    }
  }
  const scorePercent = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;
  return {
    correctCount,
    totalQuestions,
    scorePercent,
    passed: scorePercent >= 70,
  };
}
