import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { exams } from "@/content/load";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/exams/")({
  component: ExamIndex,
  head: () => ({ meta: [{ title: "آزمون · فیزیک سنجش از دور" }] }),
});

function ExamIndex() {
  const { data, ready } = useProgress();
  return (
    <Shell>
      <h1 className="text-3xl font-semibold">آزمون</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        سؤال‌های داخل هر درس همان لحظه توضیح می‌دهند. این‌جا جواب تا وقتی همه‌ی گزینه‌ها را ثبت نکنی پنهان است.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {exams().map((exam) => {
          const score = data.quizzes[exam.id];
          return (
            <li key={exam.id}>
              <Link
                to="/exams/$id"
                params={{ id: exam.id }}
                className="block rounded-2xl border border-line bg-card p-4 hover:border-cane"
              >
                <span className="font-semibold">{exam.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted">{exam.summary}</span>
                {ready && score ? (
                  <span className="mt-2 block text-sm tabular-nums text-cane">
                    بهترین نتیجه: {faInt(score.correct)} از {faInt(score.total)}
                  </span>
                ) : null}
              </Link>
            </li>
          );
        })}
      </ul>
    </Shell>
  );
}
