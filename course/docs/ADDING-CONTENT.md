# افزودن مطلب

هسته را دست نزن. فایل جدید کافی است؛ جمع‌آوری با `import.meta.glob` انجام می‌شود و رجیستری دستی ندارد.

## درس

فایل در `src/content/lessons/`. خروجی باید `kind: "lesson"` باشد.

- `slug` آدرس است: `/lessons/slug`
- `order` جای درس را در مسیر تعیین می‌کند
- `prerequisites` شناسه‌ی یادداشت‌های ریاضی است
- بلوک‌ها: `h2`، `p`، `ul`، `note`، `formula`، `math`، `lab`، `quiz`
- ریاضی درون‌خطی در متن: `$E = hf$`

## فرمول

فایل در `src/content/formulas/`. `tokens` را با `tex()` و `sym()` از `src/content/tokens.ts` بساز. هر `id` در `parts` توضیح فارسی دارد. تکرار یک نماد یعنی همان توضیح.

## ریاضی

`src/content/math/` با `kind: "primer"`. ابزارک اختیاری: `widget` با شناسه‌ی `exp` یا `stefan-slope`.

## سؤال و آزمون

- `src/content/quizzes/` با `kind: "quiz"` — بازخورد همان لحظه
- `src/content/exams/` با `kind: "exam"` — جواب بعد از ثبت
- `answer` شماره‌ی گزینه از صفر است
- شناسه‌ها یکتا باشند

## آزمایش

فایل `src/components/labs/*-lab.tsx` با دو خروجی نام‌دار:

- `labMeta`: `{ id, title, summary, order }`
- `Lab`: کامپوننت

در درس: `{ type: "lab", id: "..." }`.

## قرارداد

شناسه‌ها انگلیسی و خط‌تیره‌ای. هیچ نام شخص یا مؤسسه‌ای در متن نیاید. واحد و قرارداد علامت را در توضیح همان جزء بنویس.
