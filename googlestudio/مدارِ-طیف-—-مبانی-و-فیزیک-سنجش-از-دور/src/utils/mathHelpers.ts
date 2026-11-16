import type { MathSymbolEntry } from '../data/mathFoundations';

export type SymbolCategoryFilter = 'all' | MathSymbolEntry['category'];

/**
 * Filters the mathematical symbols reference table by category and free-text query.
 */
export function filterMathSymbols(
  symbols: MathSymbolEntry[],
  category: SymbolCategoryFilter,
  query: string
): MathSymbolEntry[] {
  const q = query.trim().toLowerCase();
  return symbols.filter((item) => {
    if (category !== 'all' && item.category !== category) {
      return false;
    }
    if (!q) return true;
    return (
      item.symbol.toLowerCase().includes(q) ||
      item.nameFa.toLowerCase().includes(q) ||
      item.pronunciation.toLowerCase().includes(q) ||
      item.mathRoleFa.toLowerCase().includes(q) ||
      item.rsExampleFa.toLowerCase().includes(q)
    );
  });
}

/**
 * Computes Beer-Lambert transmittance τ = exp(-k / cos(θ)) for interactive math demo.
 */
export function computeObliqueTransmittance(opticalDepthK: number, zenithDeg: number): {
  airMassFactor: number;
  transmittance: number;
} {
  const clampedDeg = Math.max(0, Math.min(82, zenithDeg));
  const rad = (clampedDeg * Math.PI) / 180;
  const airMassFactor = 1 / Math.cos(rad);
  const k = Math.max(0, opticalDepthK);
  const transmittance = Math.exp(-k * airMassFactor);
  return { airMassFactor, transmittance };
}

/**
 * Converts linear SAR radar backscatter σ⁰ to decibels (dB) and vice versa.
 */
export function linearToDecibels(linearVal: number): number {
  const safe = Math.max(1e-6, linearVal);
  return 10 * Math.log10(safe);
}

export function decibelsToLinear(dbVal: number): number {
  return Math.pow(10, dbVal / 10);
}

/**
 * Converts degrees to radians and milliradians.
 */
export function degreesToRadians(deg: number): { radians: number; milliradians: number } {
  const radians = (deg * Math.PI) / 180;
  return { radians, milliradians: radians * 1000 };
}
