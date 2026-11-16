const SUP: Record<string, string> = {
  "-": "⁻",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹",
};

export function faNum(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  return new Intl.NumberFormat("fa-IR", {
    maximumFractionDigits: digits,
    minimumFractionDigits: 0,
  }).format(n);
}

export function faInt(n: number): string {
  return new Intl.NumberFormat("fa-IR", { maximumFractionDigits: 0 }).format(Math.round(n));
}

export function faSup(n: number): string {
  return String(Math.trunc(n))
    .split("")
    .map((ch) => SUP[ch] ?? ch)
    .join("");
}

export function faSci(n: number, digits = 2): string {
  if (!Number.isFinite(n)) return "—";
  if (n === 0) return "۰";
  const exp = Math.floor(Math.log10(Math.abs(n)));
  const mant = n / 10 ** exp;
  if (Math.abs(exp) < 3) return faNum(n, digits);
  return `${faNum(mant, digits)}×۱۰${faSup(exp)}`;
}

export function formatHz(f: number): string {
  const units: [number, string][] = [
    [1e12, "THz"],
    [1e9, "GHz"],
    [1e6, "MHz"],
    [1e3, "kHz"],
    [1, "Hz"],
  ];
  for (const [scale, unit] of units) {
    if (f >= scale) {
      const v = f / scale;
      return `${faNum(v, v >= 100 ? 1 : 2)} ${unit}`;
    }
  }
  return `${faNum(f, 2)} Hz`;
}

export function formatLength(m: number): string {
  const abs = Math.abs(m);
  if (abs >= 1000) return `${faNum(m / 1000, 2)} km`;
  if (abs >= 1) return `${faNum(m, 2)} m`;
  if (abs >= 1e-2) return `${faNum(m * 100, 2)} cm`;
  if (abs >= 1e-3) return `${faNum(m * 1e3, 2)} mm`;
  if (abs >= 1e-6) return `${faNum(m * 1e6, 2)} μm`;
  return `${faNum(m * 1e9, 1)} nm`;
}

export function formatEv(energyEv: number): string {
  if (energyEv >= 0.01) return `${faNum(energyEv, 2)} eV`;
  if (energyEv >= 1e-3) return `${faNum(energyEv * 1e3, 2)} meV`;
  return `${faSci(energyEv, 2)} eV`;
}

export function formatDuration(seconds: number): string {
  if (seconds < 90) return `${faNum(seconds, 0)} ثانیه`;
  const minutes = seconds / 60;
  if (minutes < 180) return `${faNum(minutes, 1)} دقیقه`;
  const hours = seconds / 3600;
  if (hours < 48) return `${faNum(hours, 2)} ساعت`;
  return `${faNum(hours / 24, 2)} روز`;
}

export function spectrumBand(lambdaM: number): string {
  const um = lambdaM * 1e6;
  if (um < 0.4) return "فرابنفش";
  if (um < 0.7) return "مرئی";
  if (um < 1.4) return "فروسرخ نزدیک";
  if (um < 3) return "فروسرخ موج‌کوتاه";
  if (um < 8) return "فروسرخ میانی";
  if (um < 100) return "فروسرخ حرارتی";
  if (um < 1e5) return "مایکروویو";
  return "رادیو";
}
