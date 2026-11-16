import type { Lesson } from "../types";

export const radiation: Lesson = {
  kind: "lesson",
  slug: "radiation",
  title: "ماکسول و تابش جسم سیاه",
  order: 3,
  summary: "موج از کجا می‌آید، و طیف یک جسم فقط با دما چطور عوض می‌شود.",
  prerequisites: ["exponentials", "derivatives"],
  blocks: [
    { type: "h2", text: "چهار معادله" },
    {
      type: "p",
      text: "میدان الکتریکی و مغناطیسی از بار و جریان زاده می‌شوند و یکدیگر را هم تغذیه می‌کنند. موج الکترومغناطیسی جواب این معادله‌ها در فضای تهی است، نه یک فرض اضافه.",
    },
    { type: "formula", id: "maxwell-gauss-e" },
    { type: "formula", id: "maxwell-gauss-b" },
    { type: "formula", id: "maxwell-faraday" },
    { type: "formula", id: "maxwell-ampere" },
    {
      type: "math",
      primer: "vectors",
      text: "واگرایی و تاو، عملگرهای برداری‌اند. اگر ضرب داخلی و خارجی هنوز دستت نیست، همین یادداشت کوتاه بس است.",
    },
    {
      type: "p",
      text: "وقتی بار و جریانی در مسیر نباشد، این چهار معادله یک معادله‌ی موج می‌سازند. سرعت آن موج از دو ثابت خلأ درمی‌آید.",
    },
    { type: "formula", id: "em-speed" },
    { type: "h2", text: "جسم سیاه" },
    {
      type: "p",
      text: "جسم سیاه ایده‌آلی است که هر تابشی به آن بخورد را کامل جذب می‌کند، و طیف گسیلش فقط تابع دماست. خورشید، زمین و حتی یک برگ تقریب‌هایی از همین رفتارند، ضرب در یک گسیلندگی که از یک کوچک‌تر است.",
    },
    {
      type: "math",
      primer: "exponentials",
      text: "در قانون پلانک یک تابع نمایی در مخرج است. اگر شکل $e^{x}$ برایت آشنا نیست، اول این بخش را ببین.",
    },
    { type: "formula", id: "planck" },
    {
      type: "p",
      text: "دو حد این فرمول را خوب است بشناسی. در طول‌موج خیلی بلند، مخرج تقریباً خطی می‌شود و به تقریب رایلی–جینز می‌رسیم. در طول‌موج کوتاه، جمله‌ی نمایی غول می‌شود و تابش فرو می‌ریزد. فیزیک کلاسیک همین‌جا غلط و بی‌نهایت جواب می‌داد.",
    },
    { type: "formula", id: "wien" },
    { type: "formula", id: "stefan" },
    {
      type: "math",
      primer: "derivatives",
      text: "قله‌ی وین از صفر گذاشتن مشتق پلانک می‌آید، و حساسیت استفان–بولتزمن از مشتق $T^{4}$.",
    },
    {
      type: "p",
      text: "وین می‌گوید با داغ‌تر شدن جسم، قله به طول‌موج کوتاه‌تر می‌رود. استفان–بولتزمن می‌گوید کل انرژی گسیل‌شده با توان چهارم دما زیاد می‌شود: دو برابر شدن دما، شانزده برابر شدن خروج انرژی.",
    },
    { type: "lab", id: "blackbody" },
    { type: "h2", text: "همین رابطه‌ها را با عدد حل کن" },
    { type: "problem", id: "wien-peaks" },
    { type: "problem", id: "stefan-sensitivity" },
    { type: "problem", id: "brightness-temp" },
    { type: "quiz", id: "radiation-basics" },
  ],
};
