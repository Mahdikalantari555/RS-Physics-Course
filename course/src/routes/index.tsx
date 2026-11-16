import { createFileRoute, Link } from "@tanstack/react-router";
import { FlaskConical, ListChecks, PenLine, Sigma } from "lucide-react";
import { Shell } from "@/components/course/shell";
import { exams, lessons } from "@/content/load";
import { labs } from "@/components/labs/load-labs";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import type { ReactNode } from "react";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "فیزیک سنجش از دور" }],
  }),
});

const order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });

function Home() {
  const { data, ready, reset } = useProgress();
  const read = lessons.filter((lesson) => data.lessons[lesson.slug]).length;
  const labsDone = labs.filter((lab) => data.labs[lab.id]).length;
  const exam = exams()[0];
  const examScore = exam ? data.quizzes[exam.id] : undefined;

  return (
    <Shell>
      <p className="text-sm font-medium text-cane">از موج تا مدار</p>
      <h1 className="mt-2 max-w-2xl text-4xl font-semibold leading-tight">فیزیک سنجش از دور، جزءبه‌جزء</h1>
      <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-soft">
        روی هر نماد فرمول بزن تا همان جزء باز شود. ریاضی همان‌جا که فرمول به آن نیاز دارد می‌آید، و حل مسئله همان فرمول را با عدد واقعی تا آخر می‌برد.
      </p>

      <dl className="mt-6 grid grid-cols-3 gap-3">
        <Stat label="درس" value={faInt(ready ? read : 0)} total={faInt(lessons.length)} />
        <Stat label="آزمایش" value={faInt(ready ? labsDone : 0)} total={faInt(labs.length)} />
        <Stat
          label="آزمون"
          value={examScore && ready ? faInt(examScore.correct) : "—"}
          total={examScore && ready ? faInt(examScore.total) : "هنوز"}
        />
      </dl>

      <ol className="mt-10 flex flex-col gap-3">
        {lessons.map((lesson) => {
          const done = ready && data.lessons[lesson.slug];
          return (
            <li key={lesson.slug}>
              <Link
                to="/lessons/$slug"
                params={{ slug: lesson.slug }}
                className="flex items-start gap-4 rounded-2xl border border-line bg-card p-4 transition-colors hover:border-cane"
              >
                <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-ink text-sm text-parchment tabular-nums">
                  {order.format(lesson.order)}
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold">{lesson.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted">{lesson.summary}</span>
                </span>
                {done ? <span className="shrink-0 text-sm text-cane">خوانده شده</span> : null}
              </Link>
            </li>
          );
        })}
      </ol>

      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Door to="/math" icon={<Sigma className="size-5" />} title="ریاضیات پایه" text="از مشتق تا وارون کردن خود فرمول" />
        <Door to="/solve" icon={<PenLine className="size-5" />} title="حل مسئله" text="ده حل کامل: پلانک، جو، NDVI، مدار، رادار" />
        <Door to="/labs" icon={<FlaskConical className="size-5" />} title="آزمایشگاه" text="پنج ابزار برای موج، تابش، سطح، جو و مدار" />
        <Door to="/exams" icon={<ListChecks className="size-5" />} title="آزمون دوره" text="هشت سؤال، بدون دیدن جواب تا ثبت" />
      </div>

      <button
        type="button"
        onClick={() => {
          if (window.confirm("پیشرفت ذخیره‌شده روی همین دستگاه پاک شود؟")) reset();
        }}
        className="mt-8 inline-flex min-h-11 items-center text-sm text-muted"
      >
        پاک کردن پیشرفت
      </button>
    </Shell>
  );
}

function Stat({ label, value, total }: { label: string; value: string; total: string }) {
  return (
    <div className="rounded-2xl border border-line bg-card px-3 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">
        {value}
        <span className="text-sm text-muted"> / {total}</span>
      </dd>
    </div>
  );
}

function Door({ to, icon, title, text }: { to: "/math" | "/labs" | "/exams" | "/solve"; icon: ReactNode; title: string; text: string }) {
  return (
    <Link to={to} className="rounded-2xl border border-line bg-paper p-4 hover:border-cane">
      <span className="text-cane">{icon}</span>
      <span className="mt-3 block font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
    </Link>
  );
}
