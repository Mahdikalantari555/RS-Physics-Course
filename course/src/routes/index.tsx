import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Calculator, FlaskConical, ListChecks, Orbit, PenLine, Sigma } from "lucide-react";
import { Shell } from "@/components/course/shell";
import { exams, formulas, lessons, primers, problems } from "@/content/load";
import { labs } from "@/components/labs/load-labs";
import { faInt } from "@/lib/format";
import { useProgress } from "@/lib/progress";
import { ResilientImage } from "@/components/ResilientImage";
import heroOrbitUrl from "@/assets/images/hero_remote_sensing_orbit_1794852110188.jpg";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [{ title: "فیزیک سنجش از دور" }],
  }),
});

const order = new Intl.NumberFormat("fa-IR", { minimumIntegerDigits: 2 });

function Home() {
  const { data, ready, reset } = useProgress();
  const [confirmReset, setConfirmReset] = useState(false);

  const read = lessons.filter((lesson) => data.lessons[lesson.slug]).length;
  const labsDone = labs.filter((lab) => data.labs[lab.id]).length;
  const allExams = exams();
  const examsDone = allExams.filter((exam) => Boolean(data.quizzes[exam.id])).length;

  return (
    <Shell>
      <section className="grid gap-6 rounded-2xl border border-line bg-card p-5 sm:p-6 lg:grid-cols-12 lg:items-center">
        <div className="lg:col-span-7">
          <p className="text-sm font-medium text-cane">از موج تا مدار</p>
          <h1 className="mt-2 text-3xl font-semibold leading-tight sm:text-4xl">
            فیزیک سنجش از دور، جزءبه‌جزء
          </h1>
          <p className="mt-3 text-base leading-relaxed text-ink-soft sm:text-lg">
            روی هر نماد فرمول بزن تا همان جزء باز شود. ریاضی همان‌جا که فرمول به آن نیاز دارد می‌آید، و حل مسئله همان فرمول را با عدد واقعی تا آخر می‌برد.
          </p>
          <dl className="mt-5 grid grid-cols-3 gap-3">
            <Stat label="درس" value={faInt(ready ? read : 0)} total={faInt(lessons.length)} />
            <Stat label="آزمایش" value={faInt(ready ? labsDone : 0)} total={faInt(labs.length)} />
            <Stat
              label="آزمون"
              value={ready && examsDone > 0 ? faInt(examsDone) : "—"}
              total={faInt(allExams.length)}
            />
          </dl>
        </div>
        <div className="lg:col-span-5">
          <div className="overflow-hidden rounded-xl border border-line bg-paper">
            <ResilientImage
              src={heroOrbitUrl}
              alt="ماهواره دیدبانی زمین در حال اسکن طیف الکترومغناطیسی سطح زمین"
              className="h-56 w-full object-cover lg:h-64"
            />
          </div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-line bg-paper p-5 sm:flex sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-medium text-copper">درس ویژه · مبانی ریاضی تا فیزیک نور</p>
          <h2 className="mt-1 text-xl font-semibold text-ink">
            آموزش اثبات‌های ریاضی از پایه + اثبات مرحله‌به‌مرحله‌ی ۱۱ فرمول اصلی دوره
          </h2>
          <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">
            آناتومی اثبات، ۶ روش اصلی، ۷ عمل مجاز جبری–تحلیلی، کارگاه شکار خطا، و اثبات کامل ماکسول، پلانک، وین، استفان–بولتزمن، کیرشهف، بیر–لامبرت، GSD و کپلر.
          </p>
        </div>
        <Link
          to="/proofs"
          className="mt-4 inline-flex min-h-11 shrink-0 items-center rounded-lg bg-ink px-4 text-sm font-medium text-parchment transition-opacity hover:opacity-90 sm:mt-0 whitespace-nowrap"
        >
          شروع درس ویژه اثبات‌ها
        </Link>
      </section>

      <ol className="mt-8 flex flex-col gap-3">
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

      <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <Door
          to="/formulas"
          icon={<Calculator className="size-5" />}
          title="مرجع فرمول‌ها"
          text={`${faInt(formulas.length)} رابطه تعاملی با کالبدشکافی نمادها و مبدل سریع`}
        />
        <Door
          to="/math"
          icon={<Sigma className="size-5" />}
          title="ریاضیات پایه و نمادها"
          text={`${faInt(primers.length)} درس کوتاه + فرهنگ نمادها و ثابت‌های فیزیکی`}
        />
        <Door
          to="/solve"
          icon={<PenLine className="size-5" />}
          title="حل مسئله"
          text={`${faInt(problems.length)} حل کامل: پلانک، جو، NDVI، مدار، رادار`}
        />
        <Door
          to="/labs"
          icon={<FlaskConical className="size-5" />}
          title="آزمایشگاه"
          text={`${faInt(labs.length)} ابزار تعاملی: موج، تابش، جو، امضای طیفی، مدار و سنجنده`}
        />
        <Door
          to="/exams"
          icon={<ListChecks className="size-5" />}
          title="آزمون دوره"
          text={`${faInt(allExams.length)} آزمون جامع، بدون دیدن جواب تا ثبت نهایی`}
        />
        <Door
          to="/play"
          icon={<Orbit className="size-5" />}
          title="بازی سه‌بعدی مداری"
          text="مأموریت تعاملی مدار ماهواره، پنجره‌ی جوی، GSD و دید حرارتی وین"
        />
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-3">
        {!confirmReset ? (
          <button
            type="button"
            onClick={() => setConfirmReset(true)}
            className="inline-flex min-h-11 items-center text-sm text-muted hover:text-copper"
          >
            پاک کردن پیشرفت
          </button>
        ) : (
          <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-card px-4 py-2 text-sm">
            <span className="text-ink-soft">پیشرفت ذخیره‌شده روی همین دستگاه پاک شود؟</span>
            <button
              type="button"
              onClick={() => {
                reset();
                setConfirmReset(false);
              }}
              className="font-semibold text-copper"
            >
              بله، پاک شود
            </button>
            <button
              type="button"
              onClick={() => setConfirmReset(false)}
              className="text-muted hover:text-ink"
            >
              انصراف
            </button>
          </div>
        )}
      </div>
    </Shell>
  );
}

function Stat({ label, value, total }: { label: string; value: string; total: string }) {
  return (
    <div className="rounded-xl border border-line bg-paper px-3 py-3">
      <dt className="text-sm text-muted">{label}</dt>
      <dd className="mt-1 text-2xl font-semibold tabular-nums">
        {value}
        <span className="text-sm text-muted"> / {total}</span>
      </dd>
    </div>
  );
}

function Door({
  to,
  icon,
  title,
  text,
}: {
  to: "/formulas" | "/math" | "/labs" | "/exams" | "/solve" | "/play";
  icon: ReactNode;
  title: string;
  text: string;
}) {
  return (
    <Link to={to} className="rounded-2xl border border-line bg-paper p-4 hover:border-cane">
      <span className="text-cane">{icon}</span>
      <span className="mt-3 block font-semibold">{title}</span>
      <span className="mt-1 block text-sm leading-relaxed text-muted">{text}</span>
    </Link>
  );
}
