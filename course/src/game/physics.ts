/**
 * Pure physics, radiative transfer, orbital mechanics, and mission evaluation
 * engine for the 3D Remote Sensing Orbital Mission game.
 *
 * Kept strictly free of DOM / Three.js imports so every equation and mission
 * criterion can be unit-tested directly under Node.
 */

export const R_EARTH_KM = 6371;
export const MU_EARTH_KM3_S2 = 398600.4418;
export const C_LIGHT_M_S = 2.99792458e8;
export const H_PLANCK_J_S = 6.62607015e-34;
export const EV_JOULE = 1.602176634e-19;
export const WIEN_B_UM_K = 2897.771955;

export type LensMode = "rgb" | "nir" | "thermal";
export type MissionId = "atmosphere-window" | "orbit-architect" | "thermal-ndvi" | "sandbox";

export type GameParams = {
  altitudeKm: number; // 300 - 1600 km
  ifovMrad: number; // 0.008 - 0.06 mrad
  halfFovDeg: number; // 3 - 26 deg (half scan angle)
  wavelengthUm: number; // 0.40 - 13.5 um
  waterVapor: number; // 0.3 - 2.4x
  aerosol: number; // 0.3 - 2.4x
  sunZenithDeg: number; // 10 - 65 deg
  lensMode: LensMode;
};

export type OrbitMetrics = {
  semiMajorKm: number;
  orbitalVelocityKmS: number;
  groundVelocityKmS: number;
  periodMin: number;
  orbitsPerDay: number;
  gsdMeters: number;
  swathKm: number;
};

export type AtmosphereMetrics = {
  wavelengthUm: number;
  bandLabel: string;
  bandCode: string;
  photonEnergyEv: number;
  rayleighFactor: number; // relative to 0.45 um = 1.0
  mieFactor: number; // relative to 0.55 um = 1.0
  opticalDepth: number;
  transmittance: number; // 0..1 (Beer-Lambert exp(-tau / cos(theta)))
  pathHaze: number; // 0..1 relative haze/path radiance degradation
  beamHex: string;
  isWindow: boolean;
};

export type SurfaceMetrics = {
  healthyNdvi: number;
  stressedNdvi: number;
  hotspotTempK: number;
  hotspotWienPeakUm: number;
  hotspotBrightnessTempK: number;
  thermalContrastScore: number; // 0..1 how strongly 620K fire stands out at wavelengthUm
};

export type TelemetrySnapshot = {
  orbit: OrbitMetrics;
  atmo: AtmosphereMetrics;
  surface: SurfaceMetrics;
};

export type ObjectiveCheck = {
  id: string;
  label: string;
  targetText: string;
  currentText: string;
  passed: boolean;
};

export type MissionMathCheck = {
  prompt: string;
  hint: string;
  choices: string[];
  answerIndex: number;
  explain: string;
};

export type MissionDef = {
  id: MissionId;
  order: number;
  shortTitle: string;
  title: string;
  brief: string;
  targetLocationLabel: string;
  targetLatDeg: number;
  targetLonDeg: number;
  lockedAtmosphere: boolean;
  initialParams: GameParams;
  formulaIds: string[];
  evaluate: (params: GameParams, telemetry: TelemetrySnapshot) => ObjectiveCheck[];
  mathCheck?: MissionMathCheck;
};

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export function computeOrbitMetrics(
  altitudeKm: number,
  ifovMrad: number,
  halfFovDeg: number,
): OrbitMetrics {
  const h = clamp(altitudeKm, 200, 36000);
  const a = R_EARTH_KM + h;
  const orbitalVelocityKmS = Math.sqrt(MU_EARTH_KM3_S2 / a);
  const groundVelocityKmS = orbitalVelocityKmS * (R_EARTH_KM / a);
  const periodSec = 2 * Math.PI * Math.sqrt((a * a * a) / MU_EARTH_KM3_S2);
  const periodMin = periodSec / 60;
  const orbitsPerDay = 1440 / periodMin;

  // GSD = H * IFOV (m): h [km] * 1000 [m/km] * ifov [mrad] * 1e-3 [rad/mrad] = h * ifov
  const gsdMeters = h * ifovMrad;

  // Flat-Earth + spherical mild correction for nadir swath width: 2 * H * tan(alpha)
  const alphaRad = (clamp(halfFovDeg, 1, 55) * Math.PI) / 180;
  const swathKm = 2 * h * Math.tan(alphaRad);

  return {
    semiMajorKm: a,
    orbitalVelocityKmS,
    groundVelocityKmS,
    periodMin,
    orbitsPerDay,
    gsdMeters,
    swathKm,
  };
}

const ABSORPTION_BANDS: { center: number; width: number; depth: number; kind: "h2o" | "co2" | "o3" }[] = [
  { center: 0.32, width: 0.035, depth: 2.2, kind: "o3" },
  { center: 0.76, width: 0.015, depth: 0.35, kind: "co2" },
  { center: 0.94, width: 0.03, depth: 0.55, kind: "h2o" },
  { center: 1.14, width: 0.032, depth: 0.65, kind: "h2o" },
  { center: 1.38, width: 0.052, depth: 3.2, kind: "h2o" },
  { center: 1.88, width: 0.058, depth: 3.4, kind: "h2o" },
  { center: 2.02, width: 0.03, depth: 0.55, kind: "co2" },
  { center: 2.7, width: 0.16, depth: 4.5, kind: "h2o" },
  { center: 4.3, width: 0.12, depth: 4.8, kind: "co2" },
  { center: 6.25, width: 0.55, depth: 5.0, kind: "h2o" },
  { center: 9.6, width: 0.22, depth: 0.55, kind: "o3" },
  { center: 14.5, width: 0.9, depth: 4.2, kind: "co2" },
];

export function classifySpectralBand(wavelengthUm: number): {
  code: string;
  label: string;
  beamHex: string;
} {
  if (wavelengthUm < 0.45) return { code: "Violet/Blue", label: "آبی کوتاه‌موج", beamHex: "#4f8cff" };
  if (wavelengthUm < 0.5) return { code: "Blue", label: "آبی مرئی", beamHex: "#38bdf8" };
  if (wavelengthUm < 0.59) return { code: "Green", label: "سبز مرئی", beamHex: "#34d399" };
  if (wavelengthUm < 0.7) return { code: "Red", label: "قرمز مرئی", beamHex: "#f87171" };
  if (wavelengthUm < 1.1) return { code: "NIR", label: "فروسرخ نزدیک (NIR)", beamHex: "#fb7185" };
  if (wavelengthUm < 1.8) return { code: "SWIR1", label: "فروسرخ موج‌کوتاه ۱", beamHex: "#fb923c" };
  if (wavelengthUm < 2.5) return { code: "SWIR2", label: "فروسرخ موج‌کوتاه ۲", beamHex: "#f59e0b" };
  if (wavelengthUm < 5.5) return { code: "MWIR", label: "فروسرخ میانی (MWIR)", beamHex: "#f97316" };
  return { code: "TIR", label: "فروسرخ حرارتی (TIR)", beamHex: "#ef4444" };
}

export function computeAtmosphereMetrics(
  wavelengthUm: number,
  waterVapor: number,
  aerosol: number,
  sunZenithDeg: number,
): AtmosphereMetrics {
  const lam = clamp(wavelengthUm, 0.35, 14.0);
  const wv = clamp(waterVapor, 0.1, 3.0);
  const aer = clamp(aerosol, 0.1, 3.0);
  const cosTheta = Math.max(0.25, Math.cos((clamp(sunZenithDeg, 0, 75) * Math.PI) / 180));

  const rayleighFactor = Math.pow(0.45 / lam, 4);
  const mieFactor = Math.pow(0.55 / lam, 1.3);

  // Optical depth components: gas absorption + Rayleigh + Mie aerosol
  let gasTau = 0.03;
  for (const band of ABSORPTION_BANDS) {
    const z = (lam - band.center) / band.width;
    const scale = band.kind === "h2o" ? wv : 1.0;
    gasTau += band.depth * scale * Math.exp(-0.5 * z * z);
  }

  const rayleighTau = 0.22 * rayleighFactor;
  const mieTau = 0.14 * aer * Math.min(mieFactor, 2.0);
  const opticalDepth = gasTau + rayleighTau + mieTau;

  // Beer-Lambert slant-path transmittance: T = exp(-tau / cos(theta))
  const transmittance = Math.exp(-opticalDepth / cosTheta);

  // Path radiance haze is dominated by shortwave Rayleigh + Mie scattering
  const scatterDepth = rayleighTau + 0.85 * mieTau;
  const pathHaze = clamp(1 - Math.exp(-scatterDepth / cosTheta), 0, 1);

  // Photon energy E = h * c / lambda [eV]
  const energyJ = (H_PLANCK_J_S * C_LIGHT_M_S) / (lam * 1e-6);
  const photonEnergyEv = energyJ / EV_JOULE;

  const band = classifySpectralBand(lam);
  return {
    wavelengthUm: lam,
    bandLabel: band.label,
    bandCode: band.code,
    photonEnergyEv,
    rayleighFactor,
    mieFactor,
    opticalDepth,
    transmittance,
    pathHaze,
    beamHex: band.beamHex,
    isWindow: transmittance >= 0.65,
  };
}

/**
 * Planck spectral radiance normalized ratio between a hot target (T_hot) and
 * ambient background (T_bg) at wavelength lambda [um], clamped to 0..1 contrast.
 */
export function computeThermalContrast(
  wavelengthUm: number,
  hotTempK = 620,
  bgTempK = 295,
): number {
  const lamM = clamp(wavelengthUm, 0.35, 14.0) * 1e-6;
  const c2 = 1.438776877e-2; // hc / k_B [m·K]
  const planckShape = (T: number) => {
    const x = c2 / (lamM * T);
    if (x > 80) return 0;
    return 1 / (Math.pow(lamM, 5) * (Math.exp(x) - 1));
  };
  const bHot = planckShape(hotTempK);
  const bBg = planckShape(bgTempK);
  if (bHot <= 0) return 0;
  // Require meaningful thermal radiance (> 3.0 um) and strong contrast over background
  if (wavelengthUm < 3.0) return 0.05;
  const ratio = bHot / Math.max(bBg, 1e-12);
  // Peak discrimination around MWIR 3.5-5.0 um and solid detection in TIR 8-12 um
  const logRatio = Math.log10(Math.max(ratio, 1));
  return clamp(logRatio / 3.2, 0.1, 1);
}

export function computeSurfaceMetrics(wavelengthUm: number): SurfaceMetrics {
  const healthyNir = 0.54;
  const healthyRed = 0.07;
  const stressedNir = 0.28;
  const stressedRed = 0.16;

  const healthyNdvi = (healthyNir - healthyRed) / (healthyNir + healthyRed);
  const stressedNdvi = (stressedNir - stressedRed) / (stressedNir + stressedRed);

  const hotspotTempK = 620;
  const emissivity = 0.92;
  const hotspotWienPeakUm = WIEN_B_UM_K / hotspotTempK; // ~4.67 um
  const hotspotBrightnessTempK = Math.pow(emissivity, 0.25) * hotspotTempK;
  const thermalContrastScore = computeThermalContrast(wavelengthUm, hotspotTempK, 295);

  return {
    healthyNdvi,
    stressedNdvi,
    hotspotTempK,
    hotspotWienPeakUm,
    hotspotBrightnessTempK,
    thermalContrastScore,
  };
}

export function computeTelemetry(params: GameParams): TelemetrySnapshot {
  return {
    orbit: computeOrbitMetrics(params.altitudeKm, params.ifovMrad, params.halfFovDeg),
    atmo: computeAtmosphereMetrics(
      params.wavelengthUm,
      params.waterVapor,
      params.aerosol,
      params.sunZenithDeg,
    ),
    surface: computeSurfaceMetrics(params.wavelengthUm),
  };
}

export const MISSIONS: MissionDef[] = [
  {
    id: "atmosphere-window",
    order: 1,
    shortTitle: "۱. پنجره‌ی جوی",
    title: "شکار پنجره‌ی جوی در هوای مرطوب و غبارآلود",
    brief:
      "هوای منطقه مرطوب و غبارآلود است. نور آبی به‌شدت دچار پراکندگی رایلی (λ⁻⁴) می‌شود و بخار آب باندهای ۱.۳۸ و ۱.۸۸ میکرومتر را می‌بندد. طول‌موج سنجنده را طوری تنظیم کن که عبور جوی بالا و غبار مسیر کم باشد.",
    targetLocationLabel: "دشت ساحلی و تالاب‌های شمال",
    targetLatDeg: 36.5,
    targetLonDeg: 52.0,
    lockedAtmosphere: true,
    initialParams: {
      altitudeKm: 680,
      ifovMrad: 0.022,
      halfFovDeg: 11,
      wavelengthUm: 0.45,
      waterVapor: 1.7,
      aerosol: 1.5,
      sunZenithDeg: 35,
      lensMode: "rgb",
    },
    formulaIds: ["beer-lambert", "rayleigh", "photon-energy"],
    evaluate: (params, t) => [
      {
        id: "transmittance",
        label: "عبور جوی (بیر–لامبرت)",
        targetText: "≥ ۷۰٪",
        currentText: `${Math.round(t.atmo.transmittance * 100)}٪`,
        passed: t.atmo.transmittance >= 0.7,
      },
      {
        id: "haze",
        label: "غبار و نور مسیر (رایلی + می)",
        targetText: "≤ ۲۰٪",
        currentText: `${Math.round(t.atmo.pathHaze * 100)}٪`,
        passed: t.atmo.pathHaze <= 0.2,
      },
      {
        id: "swir-band",
        label: "باند بازتابی (مرئی تا SWIR)",
        targetText: "۰.۷ تا ۲.۳ μm",
        currentText: `${params.wavelengthUm.toFixed(2)} μm`,
        passed: params.wavelengthUm >= 0.7 && params.wavelengthUm <= 2.3,
      },
    ],
    mathCheck: {
      prompt:
        "اگر طول‌موج سنجنده را از آبی (0.45 μm) به فروسرخ موج‌کوتاه (1.60 μm) ببریم، شدت پراکندگی رایلی (متناسب با λ⁻⁴) تقریباً چقدر کاهش می‌یابد؟",
      hint: "نسبت (1.60 / 0.45) را به توان ۴ برسان: تقریباً 3.55⁴.",
      choices: [
        "حدود ۳.۵ برابر کمتر می‌شود",
        "حدود ۱۲ برابر کمتر می‌شود",
        "بیش از ۱۵۰ برابر کمتر می‌شود (تقریباً حذف می‌شود)",
        "تغییر نمی‌کند و فقط جذب بخار آب عوض می‌شود",
      ],
      answerIndex: 2,
      explain:
        "چون پراکندگی رایلی با توان چهارم معکوس طول‌موج (λ⁻⁴) تغییر می‌کند، افزایش طول‌موج به ۳.۵۵ برابر، پراکندگی رایلی را به حدود ۳.۵۵⁴ ≈ ۱۶۰ برابر کمتر می‌رساند.",
    },
  },
  {
    id: "orbit-architect",
    order: 2,
    shortTitle: "۲. معمار مدار و GSD",
    title: "موازنه‌ی ارتفاع مدار، اندازه‌ی پیکسل و پهنای جاروب",
    brief:
      "باید از مزارع یک استان با پیکسل ریز (GSD ≤ ۱۲ متر) و هم‌زمان پهنای جاروب وسیع (≥ ۱۵۰ کیلومتر) تصویربرداری کنی، بدون اینکه ماهواره در ارتفاع خیلی پایین (زیر ۵۰۰ کیلومتر) درگیر پسای شدید جو شود.",
    targetLocationLabel: "دشت کشاورزی مرکزی",
    targetLatDeg: 32.0,
    targetLonDeg: 51.5,
    lockedAtmosphere: true,
    initialParams: {
      altitudeKm: 1150,
      ifovMrad: 0.032,
      halfFovDeg: 7,
      wavelengthUm: 0.84,
      waterVapor: 0.9,
      aerosol: 0.8,
      sunZenithDeg: 28,
      lensMode: "nir",
    },
    formulaIds: ["gsd", "kepler", "orbit-velocity"],
    evaluate: (params, t) => [
      {
        id: "safe-alt",
        label: "ارتفاع ایمن بالای پسای جو",
        targetText: "۵۰۰ تا ۸۵۰ km",
        currentText: `${Math.round(params.altitudeKm)} km`,
        passed: params.altitudeKm >= 500 && params.altitudeKm <= 850,
      },
      {
        id: "gsd",
        label: "اندازه پیکسل زمینی (GSD = H·IFOV)",
        targetText: "≤ ۱۲.۰ m",
        currentText: `${t.orbit.gsdMeters.toFixed(1)} m`,
        passed: t.orbit.gsdMeters <= 12.0,
      },
      {
        id: "swath",
        label: "پهنای جاروب (2H·tan α)",
        targetText: "≥ ۱۵۰ km",
        currentText: `${Math.round(t.orbit.swathKm)} km`,
        passed: t.orbit.swathKm >= 150,
      },
    ],
    mathCheck: {
      prompt:
        "ماهواره‌ای در ارتفاع H = 600 km با میدان دید لحظه‌ای IFOV = 0.015 mrad (معادل 1.5×10⁻⁵ rad) چه اندازه پیکسلی (GSD) روی زمین دارد؟",
      hint: "در رابطه‌ی GSD = H × IFOV، اگر H بر حسب کیلومتر و IFOV بر حسب میلی‌رادیان باشد، حاصل مستقیم بر حسب متر به دست می‌آید.",
      choices: ["۰.۹ متر", "۹ متر", "۹۰ متر", "۴۰ متر"],
      answerIndex: 1,
      explain:
        "GSD = (600 × 10³ m) × (1.5 × 10⁻⁵ rad) = 9 m. ضرب ۱۰۰۰ در 10⁻³ ساده می‌شود، پس 600 × 0.015 = 9 متر.",
    },
  },
  {
    id: "thermal-ndvi",
    order: 3,
    shortTitle: "۳. دید حرارتی و وین",
    title: "ردیابی کانون آتش‌سوزی جنگل با قانون وین",
    brief:
      "کانون آتش‌سوزی با دمای حدود ۶۲۰ کلوین در دل جنگل پنهان شده است. نمای حرارتی (TIR) را فعال کن، طول‌موج را نزدیک قله‌ی تابش وین و درون پنجره‌ی باز جو (نه روی دیوار جذب CO₂ در ۴.۳ μm!) تنظیم کن تا سیگنال آتش شفاف ثبت شود.",
    targetLocationLabel: "جنگل‌های کوهستانی زاگرس",
    targetLatDeg: 33.8,
    targetLonDeg: 48.8,
    lockedAtmosphere: true,
    initialParams: {
      altitudeKm: 720,
      ifovMrad: 0.028,
      halfFovDeg: 10,
      wavelengthUm: 0.65,
      waterVapor: 1.0,
      aerosol: 1.1,
      sunZenithDeg: 55,
      lensMode: "rgb",
    },
    formulaIds: ["wien", "brightness", "ndvi"],
    evaluate: (params, t) => [
      {
        id: "lens",
        label: "حالت لنز سنجنده",
        targetText: "دید حرارتی (TIR)",
        currentText:
          params.lensMode === "thermal"
            ? "دید حرارتی (TIR)"
            : params.lensMode === "nir"
              ? "رنگ کاذب NIR"
              : "مرئی RGB",
        passed: params.lensMode === "thermal",
      },
      {
        id: "thermal-contrast",
        label: "تضاد حرارتی کانون ۶۲۰ K",
        targetText: "≥ ۷۵٪ (باند MWIR)",
        currentText: `${Math.round(t.surface.thermalContrastScore * 100)}٪`,
        passed: t.surface.thermalContrastScore >= 0.75,
      },
      {
        id: "window-clear",
        label: "عبور از پنجره‌ی جوی (دور از CO₂)",
        targetText: "≥ ۷۰٪",
        currentText: `${Math.round(t.atmo.transmittance * 100)}٪`,
        passed: t.atmo.transmittance >= 0.7,
      },
    ],
    mathCheck: {
      prompt:
        "با قانون جابه‌جایی وین (λ_max = 2898 / T بر حسب μm)، قله‌ی تابش آتش‌سوزی ۶۲۰ کلوین کجا قرار دارد و چرا ۴.۳ μm برای دیدن آن انتخاب بدی است؟",
      hint: "2898 ÷ 620 ≈ 4.67 μm؛ اما گاز CO₂ یک باند جذب بسیار عمیق نزدیک 4.3 μm دارد.",
      choices: [
        "قله حدود ۴.۷ μm است؛ در ۴.۳ μm گاز CO₂ جو را می‌بندد پس باید روی پنجره‌ی باز حدود ۳.۷–۴.۰ یا ۴.۸–۵.۰ μm رفت",
        "قله حدود ۰.۵ μm (مرئی) است و ابرها مانع دیدن آن می‌شوند",
        "قله حدود ۱۰ μm است و CO₂ در ۴.۳ μm هیچ جذبی ندارد",
        "قله با دما تغییری نمی‌کند و همیشه در ۱.۶ μm می‌ماند",
      ],
      answerIndex: 0,
      explain:
        "λ_max = 2898 / 620 ≈ 4.67 μm (بخش MWIR). چون CO₂ حوالی 4.3 μm عبور جوی را به صفر نزدیک می‌کند، سنجنده‌های کشف آتش مثل MODIS و VIIRS از پنجره‌ی 3.7–4.0 μm استفاده می‌کنند.",
    },
  },
  {
    id: "sandbox",
    order: 4,
    shortTitle: "آزمایش آزاد",
    title: "آزمایشگاه آزاد مداری سه‌بعدی",
    brief:
      "همه‌ی پارامترهای مدار، سنجنده، طول‌موج و وضعیت جو آزادند. ارتفاع، زاویه جاروب، بخار آب، غبار و حالت لنز (RGB / NIR / TIR) را عوض کن و اثر زنده را روی کره‌ی زمین و ماهواره ببین.",
    targetLocationLabel: "دیدبانی آزاد زمین",
    targetLatDeg: 35.7,
    targetLonDeg: 51.4,
    lockedAtmosphere: false,
    initialParams: {
      altitudeKm: 705,
      ifovMrad: 0.02,
      halfFovDeg: 12,
      wavelengthUm: 0.84,
      waterVapor: 1.0,
      aerosol: 1.0,
      sunZenithDeg: 30,
      lensMode: "nir",
    },
    formulaIds: ["gsd", "kepler", "beer-lambert", "wien", "ndvi"],
    evaluate: () => [],
  },
];

export function getMission(id: MissionId): MissionDef {
  return MISSIONS.find((m) => m.id === id) ?? MISSIONS[0];
}
