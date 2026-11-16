export const C = 2.99792458e8;
export const H = 6.62607015e-34;
export const K_B = 1.380649e-23;
export const SIGMA = 5.670374419e-8;
export const WIEN_B = 2.897771955e-3;
export const MU_EARTH = 3.986004418e14;
export const R_EARTH = 6.371e6;
export const SIDEREAL_DAY = 86164;
export const EV = 1.602176634e-19;

export function planckB(lambdaM: number, tempK: number): number {
  if (lambdaM <= 0 || tempK <= 0) return 0;
  const exponent = (H * C) / (lambdaM * K_B * tempK);
  if (exponent > 700) return 0;
  const denom = Math.exp(exponent) - 1;
  if (denom <= 0) return 0;
  return (2 * H * C * C) / lambdaM ** 5 / denom;
}

export function wienPeak(tempK: number): number {
  return WIEN_B / tempK;
}

export function stefan(tempK: number): number {
  return SIGMA * tempK ** 4;
}

export function photonEv(lambdaM: number): number {
  return (H * C) / lambdaM / EV;
}

export function circularOrbit(altitudeM: number): { r: number; v: number; period: number } {
  const r = R_EARTH + altitudeM;
  const v = Math.sqrt(MU_EARTH / r);
  const period = 2 * Math.PI * Math.sqrt(r ** 3 / MU_EARTH);
  return { r, v, period };
}

export function ndvi(nir: number, red: number): number {
  const den = nir + red;
  if (den === 0) return 0;
  return (nir - red) / den;
}

export function transmittance(tau: number): number {
  return Math.exp(-Math.max(0, tau));
}

export function apparentReflectance(rho: number, tau: number, path: number): number {
  const t = transmittance(tau);
  return path * (1 - t) + rho * t;
}

export function logMap(t: number, min: number, max: number): number {
  const a = Math.log(min);
  const b = Math.log(max);
  return Math.exp(a + (b - a) * clamp01(t));
}

export function logUnmap(value: number, min: number, max: number): number {
  return clamp01((Math.log(value) - Math.log(min)) / (Math.log(max) - Math.log(min)));
}

function clamp01(t: number): number {
  return Math.min(1, Math.max(0, t));
}

export function orbitClass(altitudeKm: number): string {
  if (altitudeKm < 2000) return "مدار پایین (LEO)";
  if (altitudeKm < 20000) return "مدار میانی (MEO)";
  if (altitudeKm < 36000) return "نزدیک زمین‌آهنگ";
  return "زمین‌آهنگ و بالاتر";
}

export function ndviLabel(value: number): string {
  if (value < 0) return "نزدیک آب، برف، یا ابر";
  if (value < 0.2) return "خاک لخت یا سطح بدون پوشش";
  if (value < 0.4) return "پوشش تنک";
  if (value < 0.6) return "پوشش متوسط";
  return "پوشش گیاهی انبوه";
}
