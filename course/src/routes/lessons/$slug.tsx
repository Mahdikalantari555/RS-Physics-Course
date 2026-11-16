import { createFileRoute, Link, notFound, useNavigate } from "@tanstack/react-router";
import { Blocks } from "@/components/course/blocks";
import { Shell } from "@/components/course/shell";
import { getLesson, getPrimer, lessons, neighbors } from "@/content/load";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/lessons/$slug")({
  loader: ({ params }) => {
    const lesson = getLesson(params.slug);
    if (!lesson) throw notFound();
    return { title: lesson.title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · فیزیک سنجش از دور` : "درس" }],
  }),
  component: LessonPage,
});

function LessonPage() {
  const { slug } = Route.useParams();
  const lesson = getLesson(slug);
  const navigate = useNavigate();
  const progress = useProgress();
  if (!lesson) return null;
  const { prev, next } = neighbors(lesson.slug);
  const read = progress.ready && Boolean(progress.data.lessons[lesson.slug]);

  return (
    <Shell>
      <div className="grid items-start gap-8 lg:grid-cols-[15rem_minmax(0,1fr)]">
        <nav className="sticky top-24 hidden flex-col gap-1 lg:flex">
          {lessons.map((item) => (
            <Link
              key={item.slug}
              to="/lessons/$slug"
              params={{ slug: item.slug }}
              className="rounded-xl px-3 py-2 text-sm text-ink-soft hover:bg-paper data-[status=active]:bg-ink data-[status=active]:text-parchment"
            >
              {item.title}
            </Link>
          ))}
        </nav>
        <article className="min-w-0">
          <label className="mb-5 block text-sm lg:hidden">
            رفتن به درس
            <select
              className="mt-1 h-11 w-full rounded-xl border border-line bg-card px-3"
              value={lesson.slug}
              onChange={(event) =>
                void navigate({ to: "/lessons/$slug", params: { slug: event.target.value } })
              }
            >
              {lessons.map((item) => (
                <option key={item.slug} value={item.slug}>
                  {item.title}
                </option>
              ))}
            </select>
          </label>
          <p className="text-sm text-cane">درس {new Intl.NumberFormat("fa-IR").format(lesson.order)}</p>
          <h1 className="mt-2 text-3xl font-semibold">{lesson.title}</h1>
          <p className="mt-3 text-lg leading-relaxed text-ink-soft">{lesson.summary}</p>
          {lesson.prerequisites.length > 0 ? (
            <p className="mt-4 text-sm leading-relaxed text-muted">
              پیش از فرمول‌ها، اگر لازم شد:{" "}
              {lesson.prerequisites.map((slugId, index) => {
                const primer = getPrimer(slugId);
                if (!primer) return null;
                return (
                  <span key={slugId}>
                    {index > 0 ? "، " : null}
                    <Link to="/math/$slug" params={{ slug: slugId }} className="text-cane">
                      {primer.title}
                    </Link>
                  </span>
                );
              })}
            </p>
          ) : null}
          <button
            type="button"
            aria-pressed={read}
            onClick={() => progress.toggleLesson(lesson.slug)}
            className={
              "mt-5 inline-flex min-h-11 items-center rounded-full px-4 text-sm " +
              (read ? "bg-cane text-parchment" : "border border-line bg-card")
            }
          >
            {read ? "خوانده شده" : "این درس را خواندم"}
          </button>
          <div className="mt-8">
            <Blocks blocks={lesson.blocks} />
          </div>
          <div className="mt-10 flex flex-wrap justify-between gap-3 border-t border-line pt-4">
            {prev ? (
              <Link to="/lessons/$slug" params={{ slug: prev.slug }} className="inline-flex min-h-11 items-center text-cane">
                درس قبل: {prev.title}
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link to="/lessons/$slug" params={{ slug: next.slug }} className="inline-flex min-h-11 items-center text-cane">
                درس بعد: {next.title}
              </Link>
            ) : null}
          </div>
        </article>
      </div>
    </Shell>
  );
}
