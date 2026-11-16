import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Blocks } from "@/components/course/blocks";
import { Shell } from "@/components/course/shell";
import { getPrimer, lessons } from "@/content/load";

export const Route = createFileRoute("/math/$slug")({
  loader: ({ params }) => {
    const primer = getPrimer(params.slug);
    if (!primer) throw notFound();
    return { title: primer.title };
  },
  head: ({ loaderData }) => ({
    meta: [{ title: loaderData ? `${loaderData.title} · ریاضی` : "ریاضی" }],
  }),
  component: PrimerPage,
});

function PrimerPage() {
  const { slug } = Route.useParams();
  const primer = getPrimer(slug);
  if (!primer) return null;
  const usedIn = lessons.filter((lesson) => lesson.prerequisites.includes(primer.slug));

  return (
    <Shell>
      <Link to="/math" className="inline-flex min-h-11 items-center text-sm text-cane">
        همه‌ی یادداشت‌های ریاضی
      </Link>
      <h1 className="mt-2 text-3xl font-semibold">{primer.title}</h1>
      <p className="mt-3 text-lg leading-relaxed text-ink-soft">{primer.summary}</p>
      <div className="mt-8">
        <Blocks blocks={primer.blocks} />
      </div>
      {usedIn.length > 0 ? (
        <div className="mt-8">
          <h2 className="text-sm font-medium text-muted">در این درس‌ها لازم می‌شود</h2>
          <ul className="mt-2 flex flex-col">
            {usedIn.map((lesson) => (
              <li key={lesson.slug}>
                <Link to="/lessons/$slug" params={{ slug: lesson.slug }} className="inline-flex min-h-11 items-center text-cane">
                  {lesson.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </Shell>
  );
}
