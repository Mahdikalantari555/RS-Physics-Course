/**
 * Pure physics engine for Remote Sensing fundamentals.
 * All units are explicitly documented in SI / standard RS conventions.
 */

export const PHYSICAL_CONSTANTS = {
  /** Speed of light in vacuum (m/s) */
  C: 2.99792458e8,
  /** Planck's constant (J·s) */
  H: 6.62607015e-34,
  /** Boltzmann constant (J/K) */
  KB: 1.380649e-23,
  /** Stefan-Boltzmann constant (W·m^-2·K^-4) */
  SIGMA: 5.670374419e-8,
  /** Wien's displacement constant (μm·K) */
  WIEN_B: 2897.771955,
  /** Electron-volt in Joules */
  EV_IN_JOULES: 1.602176634e-19,
} as const;

export interface SpectrumBandInfo {
  id: string;
  nameFa: string;
  subRangeFa: string;
  colorHex: string;
  canPenetrateClouds: boolean;
  mechanismFa: string;
}

/**
 * Computes frequency (Hz), photon energy (J and eV), and spectral classification
 * given wavelength in micrometers (μm).
 */
export function computeWaveProperties(wavelengthMicrons: number): {
  wavelengthMeters: number;
  frequencyHz: number;
  frequencyTHz: number;
  energyJoules: number;
  energyEv: number;
  band: SpectrumBandInfo;
} {
  const safeLambdaUm = Math.max(1e-6, wavelengthMicrons);
  const wavelengthMeters = safeLambdaUm * 1e-6;
  const frequencyHz = PHYSICAL_CONSTANTS.C / wavelengthMeters;
  const frequencyTHz = frequencyHz / 1e12;
  const energyJoules = PHYSICAL_CONSTANTS.H * frequencyHz;
  const energyEv = energyJoules / PHYSICAL_CONSTANTS.EV_IN_JOULES;
  const band = classifyWavelength(safeLambdaUm);

  return {
    wavelengthMeters,
    frequencyHz,
    frequencyTHz,
    energyJoules,
    energyEv,
    band,
  };
}

export function classifyWavelength(wavelengthMicrons: number): SpectrumBandInfo {
  if (wavelengthMicrons < 0.01) {
    return {
      id: 'xray-gamma',
      nameFa: 'پرتو ایکس و گاما',
      subRangeFa: '< 0.01 μm',
      colorHex: '#6366f1',
      canPenetrateClouds: false,
      mechanismFa: 'جذب کامل در لایه‌های بالایی جو (در سنجش از دور زمینی کاربرد ندارد)',
    };
  }
  if (wavelengthMicrons < 0.4) {
    return {
      id: 'uv',
      nameFa: 'فرابنفش (UV)',
      subRangeFa: '0.01 – 0.40 μm',
      colorHex: '#7c3aed',
      canPenetrateClouds: false,
      mechanismFa: 'جذب شدید توسط لایه ازن (O₃) و پراکندگی بسیار بالای رایلی',
    };
  }
  if (wavelengthMicrons < 0.7) {
    let subRangeFa = 'مرئی (VIS)';
    let colorHex = '#0284c7';
    if (wavelengthMicrons < 0.5) {
      subRangeFa = 'آبی (0.40 – 0.50 μm)';
      colorHex = '#2563eb';
    } else if (wavelengthMicrons < 0.6) {
      subRangeFa = 'سبز (0.50 – 0.60 μm)';
      colorHex = '#16a34a';
    } else {
      subRangeFa = 'قرمز (0.60 – 0.70 μm)';
      colorHex = '#dc2626';
    }
    return {
      id: 'visible',
      nameFa: 'نور مرئی (VIS)',
      subRangeFa,
      colorHex,
      canPenetrateClouds: false,
      mechanismFa: 'بازتاب خورشیدی؛ کلروفیل در آبی و قرمز جذب و در سبز بازتاب دارد',
    };
  }
  if (wavelengthMicrons < 1.4) {
    return {
      id: 'nir',
      nameFa: 'فروسرخ نزدیک (NIR)',
      subRangeFa: '0.70 – 1.40 μm',
      colorHex: '#be123c',
      canPenetrateClouds: false,
      mechanismFa: 'بازتاب بسیار بالا از ساختار سلولی مزوفیل برگ و جذب کامل در آب زلال',
    };
  }
  if (wavelengthMicrons < 3.0) {
    return {
      id: 'swir',
      nameFa: 'فروسرخ موج‌کوتاه (SWIR)',
      subRangeFa: '1.40 – 3.00 μm',
      colorHex: '#ea580c',
      canPenetrateClouds: false,
      mechanismFa: 'حساس به رطوبت برگ و خاک و تفکیک برف از ابر و کانی‌های رسی',
    };
  }
  if (wavelengthMicrons < 15.0) {
    return {
      id: 'tir',
      nameFa: 'فروسرخ حرارتی (TIR)',
      subRangeFa: '3.00 – 15.0 μm',
      colorHex: '#d97706',
      canPenetrateClouds: false,
      mechanismFa: 'گسیل مستقیم حرارتی از سطح زمین (قانون پلانک؛ پنجره ۸ تا ۱۴ میکرومتر)',
    };
  }
  return {
    id: 'microwave',
    nameFa: 'ریزموج / رادار (Microwave)',
    subRangeFa: '> 1 mm (باندهای X, C, L, P)',
    colorHex: '#0d9488',
    canPenetrateClouds: true,
    mechanismFa: 'عبور از ابر و باران و مستقل از نور خورشید؛ حساس به زبری سطح و رطوبت (ثابت دی‌الکتریک)',
  };
}

/**
 * Planck's Law: Spectral Radiance B(λ, T) in W · m^-2 · sr^-1 · μm^-1
 */
export function planckSpectralRadiance(
  wavelengthMicrons: number,
  temperatureKelvin: number,
  emissivity = 1.0
): number {
  const lambdaM = Math.max(1e-8, wavelengthMicrons) * 1e-6;
  const T = Math.max(1, temperatureKelvin);
  const { H, C, KB } = PHYSICAL_CONSTANTS;

  const exponent = (H * C) / (lambdaM * KB * T);
  // Prevent Infinity overflow in exp()
  if (exponent > 700) {
    return 0;
  }
  const c1 = 2 * H * C * C;
  // Convert per meter wavelength to per micrometer (multiply by 1e-6)
  const radiancePerMeter = c1 / (Math.pow(lambdaM, 5) * (Math.exp(exponent) - 1));
  return emissivity * radiancePerMeter * 1e-6;
}

/**
 * Wien's Displacement Law: peak emission wavelength in micrometers (μm)
 */
export function wienPeakWavelength(temperatureKelvin: number): number {
  return PHYSICAL_CONSTANTS.WIEN_B / Math.max(1, temperatureKelvin);
}

/**
 * Stefan-Boltzmann Law: Total radiant exitance M = ε * σ * T^4 in W/m²
 */
export function stefanBoltzmannExitance(temperatureKelvin: number, emissivity = 1.0): number {
  const T = Math.max(0, temperatureKelvin);
  return emissivity * PHYSICAL_CONSTANTS.SIGMA * Math.pow(T, 4);
}

/**
 * Relative Rayleigh scattering efficiency normalized to Blue (0.45 μm = 1.0).
 * Proportional to λ^-4.
 */
export function rayleighRelativeScattering(wavelengthMicrons: number): number {
  const ref = 0.45;
  const safeLambda = Math.max(0.2, wavelengthMicrons);
  return Math.pow(ref / safeLambda, 4);
}

/**
 * Relative Mie scattering efficiency normalized to 0.45 μm (proportional to ~λ^-1.3).
 */
export function mieRelativeScattering(wavelengthMicrons: number, aerosolLoad = 1.0): number {
  const ref = 0.45;
  const safeLambda = Math.max(0.2, wavelengthMicrons);
  return aerosolLoad * Math.pow(ref / safeLambda, 1.3);
}

/**
 * Physically grounded piecewise atmospheric transmittance model (0..1) from 0.3 to 15.0 μm
 * capturing major O3, O2, H2O, and CO2 absorption bands and RS atmospheric windows.
 */
export function atmosphericTransmittance(wavelengthMicrons: number, waterVaporFactor = 1.0): number {
  const w = wavelengthMicrons;
  if (w < 0.3) return 0.02;

  let base = 0.93;
  // UV Ozone absorption (< 0.34 μm)
  if (w < 0.38) {
    base *= Math.max(0.02, Math.min(1, (w - 0.29) / 0.09));
  }
  // Rayleigh attenuation slope in blue
  if (w < 0.65) {
    base -= 0.14 * Math.pow(0.42 / Math.max(0.32, w), 3);
  }

  // Absorption dips (Gaussian notches)
  const notches: Array<{ center: number; width: number; depth: number; h2o?: boolean }> = [
    { center: 0.76, width: 0.015, depth: 0.25 }, // O2 A-band
    { center: 0.94, width: 0.04, depth: 0.34, h2o: true }, // H2O
    { center: 1.13, width: 0.05, depth: 0.45, h2o: true }, // H2O
    { center: 1.4, width: 0.08, depth: 0.95, h2o: true }, // Strong H2O
    { center: 1.88, width: 0.11, depth: 0.96, h2o: true }, // Strong H2O
    { center: 2.7, width: 0.25, depth: 0.98, h2o: true }, // H2O + CO2
    { center: 4.3, width: 0.18, depth: 0.96 }, // CO2
    { center: 6.3, width: 0.95, depth: 0.98, h2o: true }, // Huge H2O thermal block
    { center: 9.6, width: 0.22, depth: 0.42 }, // O3 window notch
    { center: 14.5, width: 0.9, depth: 0.95 }, // CO2 longwave cutoff
  ];

  let transmission = base;
  for (const notch of notches) {
    const d = (w - notch.center) / notch.width;
    const factor = notch.h2o ? Math.min(1.3, 0.7 + 0.3 * waterVaporFactor) : 1;
    const attenuation = Math.min(0.99, notch.depth * factor) * Math.exp(-0.5 * d * d);
    transmission *= 1 - attenuation;
  }

  return Math.max(0.01, Math.min(0.96, transmission));
}

export type LandCoverId = 'healthy-veg' | 'stressed-veg' | 'dry-soil' | 'clear-water' | 'snow-ice';

export interface SpectralSample {
  wavelengthUm: number;
  reflectance: number; // 0 to 1
}

/**
 * Physically faithful spectral reflectance model (0.40 to 2.45 μm) for 5 key Earth surfaces.
 */
export function getSurfaceReflectance(surface: LandCoverId, wavelengthUm: number): number {
  const w = Math.max(0.4, Math.min(2.45, wavelengthUm));

  const gauss = (center: number, width: number) => {
    const z = (w - center) / width;
    return Math.exp(-0.5 * z * z);
  };
  const sigmoid = (center: number, steepness: number) => 1 / (1 + Math.exp(-steepness * (w - center)));

  switch (surface) {
    case 'healthy-veg': {
      // Chlorophyll blue (0.45) & red (0.67) absorption, green peak (0.55), sharp red-edge (0.71)
      const vis = 0.04 + 0.11 * gauss(0.55, 0.045) - 0.02 * gauss(0.45, 0.04) - 0.02 * gauss(0.67, 0.03);
      const nirPlateau = 0.48 * sigmoid(0.705, 45) * (1 - 0.18 * sigmoid(1.32, 8));
      const swirDrop = -0.14 * sigmoid(1.38, 12);
      const water145 = -0.22 * gauss(1.45, 0.08);
      const water195 = -0.24 * gauss(1.94, 0.1);
      const val = vis + nirPlateau + swirDrop + water145 + water195;
      return Math.max(0.02, Math.min(0.62, val));
    }
    case 'stressed-veg': {
      // Weakened chlorophyll -> higher red reflectance, gentler & lower NIR plateau, drier SWIR
      const vis = 0.08 + 0.08 * gauss(0.56, 0.06) + 0.09 * gauss(0.65, 0.06);
      const nirPlateau = 0.25 * sigmoid(0.715, 28);
      const swirMod = -0.05 * gauss(1.45, 0.08) - 0.07 * gauss(1.95, 0.1);
      return Math.max(0.04, Math.min(0.5, vis + nirPlateau + swirMod));
    }
    case 'dry-soil': {
      // Smooth monotonic rise from visible into NIR/SWIR with minor clay/iron dips
      const base = 0.12 + 0.26 * (1 - Math.exp(-1.15 * (w - 0.35)));
      const water145 = -0.04 * gauss(1.43, 0.06);
      const water194 = -0.05 * gauss(1.93, 0.07);
      const clay220 = -0.04 * gauss(2.2, 0.05);
      return Math.max(0.08, Math.min(0.48, base + water145 + water194 + clay220));
    }
    case 'clear-water': {
      // Peak in blue-green (~0.48-0.54 μm), exponential absorption in Red/NIR/SWIR
      const vis = 0.055 * gauss(0.5, 0.1) * (1 - sigmoid(0.72, 22));
      return Math.max(0.002, Math.min(0.12, vis + 0.004 * Math.exp(-3 * (w - 0.4))));
    }
    case 'snow-ice': {
      // Extremely high visible reflectance (~0.88), drops sharply above 1.4 μm in SWIR
      const visNir = 0.89 - 0.12 * sigmoid(0.95, 7);
      const swirDrop = -0.7 * sigmoid(1.42, 14) - 0.08 * gauss(1.03, 0.08);
      return Math.max(0.03, Math.min(0.92, visNir + swirDrop));
    }
  }
}

export interface BandReflectances {
  blue: number;  // 0.48 μm
  green: number; // 0.56 μm
  red: number;   // 0.66 μm
  nir: number;   // 0.84 μm
  swir1: number; // 1.61 μm
  swir2: number; // 2.20 μm
}

export function extractMultispectralBands(surface: LandCoverId): BandReflectances {
  return {
    blue: getSurfaceReflectance(surface, 0.48),
    green: getSurfaceReflectance(surface, 0.56),
    red: getSurfaceReflectance(surface, 0.66),
    nir: getSurfaceReflectance(surface, 0.84),
    swir1: getSurfaceReflectance(surface, 1.61),
    swir2: getSurfaceReflectance(surface, 2.2),
  };
}

/**
 * Normalized Difference Vegetation Index: (NIR - Red) / (NIR + Red)
 */
export function computeNDVI(nir: number, red: number): number {
  const denom = nir + red;
  if (denom <= 1e-6) return 0;
  return (nir - red) / denom;
}

/**
 * Normalized Difference Water Index (McFeeters): (Green - NIR) / (Green + NIR)
 */
export function computeNDWI(green: number, nir: number): number {
  const denom = green + nir;
  if (denom <= 1e-6) return 0;
  return (green - nir) / denom;
}

/**
 * Normalized Difference Snow Index: (Green - SWIR1) / (Green + SWIR1)
 */
export function computeNDSI(green: number, swir1: number): number {
  const denom = green + swir1;
  if (denom <= 1e-6) return 0;
  return (green - swir1) / denom;
}

/**
 * Sensor Geometry: Ground Sampling Distance (m) and Swath Width (km)
 * from orbital altitude H (km), IFOV (milliradians), and across-track FOV (degrees).
 */
export function computeSensorGeometry(
  altitudeKm: number,
  ifovMrad: number,
  fovDegrees: number
): {
  gsdMeters: number;
  swathKm: number;
  pixelsAcrossTrack: number;
} {
  const altitudeMeters = altitudeKm * 1000;
  const ifovRad = ifovMrad * 1e-3;
  const gsdMeters = 2 * altitudeMeters * Math.tan(ifovRad / 2);
  const fovRad = (fovDegrees * Math.PI) / 180;
  const swathKm = 2 * altitudeKm * Math.tan(fovRad / 2);
  const pixelsAcrossTrack = Math.round((swathKm * 1000) / Math.max(0.01, gsdMeters));

  return {
    gsdMeters,
    swathKm,
    pixelsAcrossTrack,
  };
}

/**
 * Quantizes a normalized reflectance value (0..1) into n-bit Digital Number (DN) and back.
 */
export function quantizeRadiometric(valueNormalized: number, bitDepth: number): {
  levels: number;
  dn: number;
  reconstructed: number;
} {
  const clampedBits = Math.max(1, Math.min(16, Math.round(bitDepth)));
  const levels = Math.pow(2, clampedBits);
  const clampedVal = Math.max(0, Math.min(1, valueNormalized));
  const dn = Math.min(levels - 1, Math.floor(clampedVal * levels));
  const reconstructed = dn / (levels - 1);
  return { levels, dn, reconstructed };
}
