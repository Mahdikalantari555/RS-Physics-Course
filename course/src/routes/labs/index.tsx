import { createFileRoute, Link } from "@tanstack/react-router";
import { Shell } from "@/components/course/shell";
import { labs } from "@/components/labs/load-labs";
import { useProgress } from "@/lib/progress";

export const Route = createFileRoute("/labs/")({
  component: LabsIndex,
  head: () => ({ meta: [{ title: "آزمایشگاه · فیزیک سنجش از دور" }] }),
});

function LabsIndex() {
  const { data, ready } = useProgress();
  return (
    <Shell>
      <h1 className="text-3xl font-semibold">آزمایشگاه</h1>
      <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
        هر آزمایش از همان تابع‌های فیزیکی درس استفاده می‌کند. شکل موج نمادین است؛ عددها نه.
      </p>
      <ul className="mt-8 flex flex-col gap-3">
        {labs.map((lab) => (
          <li key={lab.id}>
            <Link
              to="/labs/$id"
              params={{ id: lab.id }}
              className="block rounded-2xl border border-line bg-card p-4 hover:border-cane"
            >
              <span className="flex items-baseline justify-between gap-3">
                <span className="font-semibold">{lab.title}</span>
                {ready && data.labs[lab.id] ? <span className="text-sm text-cane">انجام شده</span> : null}
              </span>
              <span className="mt-1 block text-sm leading-relaxed text-muted">{lab.summary}</span>
            </Link>
          </li>
        ))}
      </ul>
    </Shell>
  );
}
