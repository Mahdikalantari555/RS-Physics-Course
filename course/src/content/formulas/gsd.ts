import { sym, tex } from "../tokens";
import type { Formula } from "../types";

export const gsd: Formula = {
  kind: "formula",
  id: "gsd",
  title: "اندازه نمونه زمینی (GSD) و کوانتیزاسیون",
  summary: "پیکسل روی زمین از ارتفاع و زاویه دید لحظه‌ای به دست می‌آید؛ عمق بیتی دقت رادیومتری را تعیین می‌کند.",
  tokens: [
    sym("gsd", "\\mathrm{GSD}"),
    tex("=2H\\cdot\\tan\\!\\left(\\frac{"),
    sym("ifov", "\\mathrm{IFOV}"),
    tex("}{2}\\right) \\quad "),
    sym("levels", "L"),
    tex("=2^{"),
    sym("n", "n"),
    tex("}"),
  ],
  parts: [
    {
      id: "gsd",
      latex: "\\mathrm{GSD}",
      name: "اندازه نمونه زمینی",
      explanation:
        "اندازه فیزیکی یک پیکسل روی سطح زمین. هرچه GSD کوچک‌تر باشد تفکیک مکانی دقیق‌تر است، اما زمان بازدید مجدد و نسبت سیگنال به نویز محدود می‌شود.",
    },
    {
      id: "ifov",
      latex: "\\mathrm{IFOV}",
      name: "میدان دید لحظه‌ای",
      explanation:
        "زاویه‌ی بنیاد اپتیکی سنجنده. با کوچک‌تر شدن IFOV پیکسل کوچک‌تر می‌شود، اما نور کم‌تر به دهانه می‌رسد. واحد معمول میلی‌رادیان است.",
    },
    {
      id: "levels",
      latex: "L",
      name: "سطوح خاکستری",
      explanation:
        "عمق بیتی n (مثلاً ۸ بیت) تعداد سطوح تفکیک‌پذیر درخشندگی را تعیین می‌کند: ۸ بیت ۲۵۶ سطح، ۱۲ بیت ۴۰۹۶ سطح. کاهش عمق بیتی پله‌ای شدن (posterization) ایجاد می‌کند.",
    },
  ],
  derivationNotes:
    "GSD = 2H·tan(IFOV/2) یک قاعده‌ی اپتیک سهموی است: پیکسل نمونه‌ی شعاعی روی سطح زمین است. برای زاویه‌های کوچک tan ≈ زاویه، بنابراین GSD ≈ H·IFOV.",
  relatedLabs: ["sensor-resolution"],
};
