import {
  computeNDSI,
  computeNDVI,
  computeNDWI,
  extractMultispectralBands,
  type BandReflectances,
  type LandCoverId,
} from "./remoteSensing";

export type CompositeId = "true-color" | "false-nir" | "false-swir" | "ndvi-map";

export const SCENE_WIDTH = 360;
export const SCENE_HEIGHT = 225;

export const SURFACE_IDS: LandCoverId[] = [
  "healthy-veg",
  "stressed-veg",
  "dry-soil",
  "clear-water",
  "snow-ice",
];

export type MultispectralScene = {
  width: number;
  height: number;
  /** Index into SURFACE_IDS for each pixel (length = width * height) */
  classIdx: Uint8Array;
  /** Topographic hillshade illumination factor (length = width * height) */
  shade: Float32Array;
  /** Per-pixel physical reflectances (0..1) */
  blue: Float32Array;
  green: Float32Array;
  red: Float32Array;
  nir: Float32Array;
  swir1: Float32Array;
};

export type PixelInspection = {
  x: number;
  y: number;
  surface: LandCoverId;
  bands: {
    blue: number;
    green: number;
    red: number;
    nir: number;
    swir1: number;
  };
  ndvi: number;
  ndwi: number;
  ndsi: number;
};

function hash2(x: number, y: number): number {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x: number, y: number): number {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = x - xi;
  const yf = y - yi;
  const u = xf * xf * (3 - 2 * xf);
  const v = yf * yf * (3 - 2 * yf);
  const a = hash2(xi, yi);
  const b = hash2(xi + 1, yi);
  const c = hash2(xi, yi + 1);
  const d = hash2(xi + 1, yi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function fbm(x: number, y: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    sum += amp * valueNoise(x * freq, y * freq);
    freq *= 2.04;
    amp *= 0.5;
  }
  return sum;
}

function ridgedFbm(x: number, y: number, octaves = 4): number {
  let sum = 0;
  let amp = 0.55;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    const n = 1 - Math.abs(valueNoise(x * freq, y * freq) * 2 - 1);
    sum += amp * n * n;
    freq *= 2.1;
    amp *= 0.5;
  }
  return sum;
}

function clamp(v: number, min: number, max: number): number {
  return v < min ? min : v > max ? max : v;
}

function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clamp((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

/**
 * Generates a realistic 360x225 (81,000-pixel) synthetic Sentinel-2-like
 * multispectral scene containing all 5 course land-cover classes:
 * - Snow-capped alpine peaks with ridged glacial slopes (top-left)
 * - Deep turquoise-to-navy mountain lake & meandering river (center diagonal)
 * - Dense canopy forest along foothills and riparian corridor (mid/lower-left)
 * - Structured agricultural fields with healthy vs drought-stressed plots (right)
 * - Sunlit arid rocky/sandy valley & alluvial slopes (lower-center & upper-right)
 */
export function generateMultispectralScene(
  width = SCENE_WIDTH,
  height = SCENE_HEIGHT,
): MultispectralScene {
  const count = width * height;
  const elevation = new Float32Array(count);
  const classIdx = new Uint8Array(count);
  const shade = new Float32Array(count);
  const blue = new Float32Array(count);
  const green = new Float32Array(count);
  const red = new Float32Array(count);
  const nir = new Float32Array(count);
  const swir1 = new Float32Array(count);

  const baseBands: Record<LandCoverId, BandReflectances> = {
    "healthy-veg": extractMultispectralBands("healthy-veg"),
    "stressed-veg": extractMultispectralBands("stressed-veg"),
    "dry-soil": extractMultispectralBands("dry-soil"),
    "clear-water": extractMultispectralBands("clear-water"),
    "snow-ice": extractMultispectralBands("snow-ice"),
  };

  // Pre-compute topographic elevation field (DEM) for authentic hillshading
  for (let py = 0; py < height; py++) {
    const v = py / (height - 1);
    for (let px = 0; px < width; px++) {
      const u = px / (width - 1);
      // Mountain massif concentrated in upper-left & top ridge
      const mtnMask =
        smoothstep(0.68, 0.04, u * 0.82 + v * 0.92) +
        0.35 * smoothstep(0.55, 0.0, v + Math.abs(u - 0.35) * 0.65);
      const ridge = ridgedFbm(u * 4.8 + 1.3, v * 4.2 + 2.7, 5);
      const foothills = fbm(u * 6.5 + 7.1, v * 5.2 + 3.4, 4) * 0.28;
      // River valley carve
      const riverCenter =
        0.54 - 0.24 * v + 0.08 * Math.sin(v * Math.PI * 2.2 + 0.5) + 0.03 * Math.cos(v * 9.0);
      const dRiver = Math.abs(u - riverCenter);
      const valleyDip = smoothstep(0.14, 0.0, dRiver) * 0.26;
      const elev = Math.max(0, mtnMask * (0.45 + ridge * 0.95) + foothills - valleyDip);
      elevation[py * width + px] = elev;
    }
  }

  // Light direction from upper-left-front (classic satellite morning sun)
  const sunX = -0.62;
  const sunY = -0.52;
  const sunZ = 0.59;

  for (let py = 0; py < height; py++) {
    const v = py / (height - 1);
    const yPrev = Math.max(0, py - 1);
    const yNext = Math.min(height - 1, py + 1);

    for (let px = 0; px < width; px++) {
      const u = px / (width - 1);
      const idx = py * width + px;
      const xPrev = Math.max(0, px - 1);
      const xNext = Math.min(width - 1, px + 1);

      // Central-difference normal for DEM hillshade
      const dzdx = (elevation[py * width + xNext] - elevation[py * width + xPrev]) * 26.0;
      const dzdy = (elevation[yNext * width + px] - elevation[yPrev * width + px]) * 26.0;
      const invLen = 1 / Math.sqrt(dzdx * dzdx + dzdy * dzdy + 1);
      const nx = -dzdx * invLen;
      const ny = -dzdy * invLen;
      const nz = invLen;
      const ndotl = clamp(nx * sunX + ny * sunY + nz * sunZ, 0, 1);

      const elev = elevation[idx];
      const fineTex = fbm(u * 26 + 4.2, v * 20 + 9.1, 3) - 0.5;
      const microSpeckle = (hash2(px * 1.13, py * 1.37) - 0.5) * 0.06;

      // Water geometry: meandering glacial river + mid-valley alpine lake
      const riverCenter =
        0.54 - 0.24 * v + 0.08 * Math.sin(v * Math.PI * 2.2 + 0.5) + 0.025 * Math.cos(v * 9.0);
      const riverHalfWidth = 0.022 + 0.014 * v + 0.008 * Math.sin(v * 11.0);
      const dRiver = Math.abs(u - riverCenter);

      // Alpine lake basin around (u=0.50, v=0.39)
      const lakeDx = (u - 0.49) / 0.105;
      const lakeDy = (v - 0.38) / 0.095;
      const lakeWarp = (fbm(u * 10 + 1.5, v * 10 + 2.2, 3) - 0.5) * 0.32;
      const lakeDist = Math.hypot(lakeDx, lakeDy) + lakeWarp;

      const isWater = dRiver < riverHalfWidth || lakeDist < 0.88;
      const waterShoreFactor = isWater
        ? Math.max(
            smoothstep(riverHalfWidth, riverHalfWidth * 0.28, dRiver),
            smoothstep(0.88, 0.35, lakeDist),
          )
        : 0;

      // Agricultural parcel grid in the sunlit right valley (u: 0.62..0.95, v: 0.24..0.88)
      const inFarmZone =
        !isWater &&
        u > 0.61 &&
        u < 0.96 &&
        v > 0.24 &&
        v < 0.91 &&
        elev < 0.55;
      let farmPlotType: LandCoverId | null = null;
      let parcelBorder = 0;
      if (inFarmZone) {
        const fu = (u - 0.61) * 14.5;
        const fv = (v - 0.24) * 11.5;
        const cellU = Math.floor(fu);
        const cellV = Math.floor(fv);
        const fracU = fu - cellU;
        const fracV = fv - cellV;
        // Narrow dirt irrigation/road tracks between agricultural plots
        if (fracU < 0.07 || fracU > 0.93 || fracV < 0.08 || fracV > 0.92) {
          parcelBorder = 1;
          farmPlotType = "dry-soil";
        } else {
          const plotHash = hash2(cellU * 3.1 + 7, cellV * 5.7 + 11);
          if (plotHash < 0.46) farmPlotType = "stressed-veg";
          else if (plotHash < 0.82) farmPlotType = "healthy-veg";
          else farmPlotType = "dry-soil";
        }
      }

      // Determine surface class & smooth blend weights for photorealistic transitions
      let surface: LandCoverId;
      let localShade = 0.56 + 0.54 * ndotl;

      if (isWater) {
        surface = "clear-water";
        // Water is flat — subtle sun glint and depth gradient instead of slope shading
        localShade = 0.92 + (1 - waterShoreFactor) * 0.28;
      } else if (elev > 0.64 + fineTex * 0.16) {
        // Snow-capped high mountain peaks, with exposed rocky ridges on steep sun-scoured crests
        const steepness = Math.sqrt(dzdx * dzdx + dzdy * dzdy);
        if (steepness > 1.35 && elev < 0.82) {
          surface = "dry-soil";
        } else {
          surface = "snow-ice";
        }
      } else if (farmPlotType) {
        surface = farmPlotType;
        // Flat terraced fields have subtle plowing row texture
        const furrow = Math.sin((u * 180 + v * 40)) * 0.025;
        localShade = (0.86 + 0.2 * ndotl + furrow) * (parcelBorder ? 0.96 : 1);
      } else {
        // Natural valley & foothill biome distribution
        const nearWater = smoothstep(0.24, 0.03, dRiver) + smoothstep(0.28, 0.04, lakeDist * 0.15);
        const moisture = fbm(u * 5.2 + 13.4, v * 4.8 + 6.2, 4) + nearWater * 0.38 - elev * 0.22;
        if (moisture > 0.56) {
          surface = "healthy-veg";
        } else if (moisture > 0.41 && u > 0.36 && v > 0.42) {
          surface = "stressed-veg";
        } else {
          surface = "dry-soil";
        }
      }

      classIdx[idx] = SURFACE_IDS.indexOf(surface);
      shade[idx] = localShade;

      const b = baseBands[surface];
      const texScale =
        surface === "healthy-veg"
          ? 1 + fineTex * 0.28 + microSpeckle * 1.4
          : surface === "dry-soil"
            ? 1 + fineTex * 0.24 + microSpeckle * 0.9
            : surface === "snow-ice"
              ? 1 + fineTex * 0.08 + microSpeckle * 0.3
              : surface === "stressed-veg"
                ? 1 + fineTex * 0.22 + microSpeckle
                : 1 + fineTex * 0.12;

      // Apply physical shallow-water sediment/turquoise boost near river/lake banks
      const shallowBoostG = isWater ? (1 - waterShoreFactor) * 0.055 : 0;
      const shallowBoostB = isWater ? (1 - waterShoreFactor) * 0.048 : 0;
      const shallowBoostR = isWater ? (1 - waterShoreFactor) * 0.012 : 0;

      // Atmospheric Rayleigh cool fill in mountain shadows on snow
      const shadowSkyFill = surface === "snow-ice" ? (1 - ndotl) * 0.09 : 0;

      blue[idx] = clamp(b.blue * texScale * localShade + shallowBoostB + shadowSkyFill, 0.002, 0.98);
      green[idx] = clamp(b.green * texScale * localShade + shallowBoostG + shadowSkyFill * 0.45, 0.002, 0.98);
      red[idx] = clamp(b.red * texScale * localShade + shallowBoostR, 0.002, 0.98);
      nir[idx] = clamp(b.nir * texScale * localShade, 0.002, 0.98);
      swir1[idx] = clamp(b.swir1 * texScale * localShade, 0.002, 0.98);
    }
  }

  return { width, height, classIdx, shade, blue, green, red, nir, swir1 };
}

/**
 * Sentinel-2 / Landsat style tone-mapping curve that preserves rich color
 * separation across dark forests/water AND bright alpine snow without clipping.
 */
function toneMapChannel(value: number, gain: number, gamma = 0.62): number {
  const scaled = Math.max(0, value * gain);
  // Soft filmic shoulder keeps snow textured while lifting dark vegetation/water
  const shoulder = scaled / (1 + scaled * 0.42);
  return clamp(Math.round(Math.pow(shoulder, gamma) * 255), 0, 255);
}

/**
 * Renders the 81,000-pixel multispectral scene into an RGBA buffer for any of
 * the 4 satellite composites, optionally highlighting pixels of a selected class.
 */
export function renderCompositeRGBA(
  scene: MultispectralScene,
  composite: CompositeId,
  highlightSurface: LandCoverId | null = null,
): Uint8ClampedArray {
  const { width, height, classIdx, blue, green, red, nir, swir1 } = scene;
  const rgba = new Uint8ClampedArray(width * height * 4);
  const hlIdx = highlightSurface ? SURFACE_IDS.indexOf(highlightSurface) : -1;

  for (let py = 0; py < height; py++) {
    for (let px = 0; px < width; px++) {
      const i = py * width + px;
      const o = i * 4;
      const b = blue[i];
      const g = green[i];
      const r = red[i];
      const n = nir[i];
      const s1 = swir1[i];
      const cIdx = classIdx[i];

      let outR = 0;
      let outG = 0;
      let outB = 0;

      if (composite === "true-color") {
        // Balanced photographic satellite RGB: clear azure water, rich emerald
        // forest, golden-olive stressed crops, warm ochre earth, crisp alpine snow
        if (cIdx === 3) {
          // Clear water: gentle aquatic contrast so deep water reads unmistakable sapphire-blue
          outR = clamp(Math.round(toneMapChannel(r, 2.2, 0.72) * 0.58), 8, 95);
          outG = clamp(Math.round(toneMapChannel(g, 2.9, 0.66) * 0.88), 32, 165);
          outB = clamp(Math.round(toneMapChannel(b, 3.8, 0.58) * 1.05), 58, 210);
        } else if (cIdx === 0) {
          // Healthy forest/crop: boost natural chlorophyll green separation from soil
          outR = toneMapChannel(r, 2.2, 0.68);
          outG = toneMapChannel(g, 2.55, 0.6);
          outB = toneMapChannel(b, 1.9, 0.72);
        } else if (cIdx === 1) {
          // Stressed vegetation: warm olive-tan yellow distinct from emerald forest
          outR = toneMapChannel(r, 2.85, 0.62);
          outG = toneMapChannel(g, 2.55, 0.64);
          outB = toneMapChannel(b, 1.7, 0.75);
        } else if (cIdx === 2) {
          // Dry bare soil: sunlit warm terracotta/sandstone
          outR = toneMapChannel(r, 2.65, 0.62);
          outG = toneMapChannel(g, 2.25, 0.66);
          outB = toneMapChannel(b, 1.85, 0.72);
        } else {
          // Snow & glaciers: crisp bright white with cool sky-blue shadows
          outR = toneMapChannel(r, 1.52, 0.55);
          outG = toneMapChannel(g, 1.56, 0.55);
          outB = toneMapChannel(b, 1.66, 0.54);
        }
      } else if (composite === "false-nir") {
        // Standard Color Infrared (NIR -> R, Red -> G, Green -> B)
        outR = toneMapChannel(n, 2.15, 0.64);
        outG = toneMapChannel(r, 2.45, 0.66);
        outB = toneMapChannel(g, 2.35, 0.68);
      } else if (composite === "false-swir") {
        // Shortwave Infrared (SWIR1 -> R, NIR -> G, Red -> B)
        // Snow absorbs SWIR1 strongly -> vibrant cyan/sky-blue!
        outR = toneMapChannel(s1, 2.3, 0.66);
        outG = toneMapChannel(n, 2.15, 0.64);
        outB = toneMapChannel(r, 2.55, 0.62);
      } else {
        // Continuous scientific NDVI colormap
        const ndvi = computeNDVI(n, r);
        if (ndvi < -0.04) {
          // Water -> deep cobalt/steel blue
          const t = clamp((ndvi + 0.5) / 0.46, 0, 1);
          outR = Math.round(18 + t * 24);
          outG = Math.round(62 + t * 48);
          outB = Math.round(126 + t * 42);
        } else if (ndvi < 0.18) {
          // Snow / bare soil -> pale slate to warm terracotta-sand
          if (cIdx === 4) {
            outR = 226;
            outG = 232;
            outB = 238;
          } else {
            const t = clamp((ndvi + 0.04) / 0.22, 0, 1);
            outR = Math.round(176 + t * 22);
            outG = Math.round(108 + t * 40);
            outB = Math.round(66 + t * 18);
          }
        } else if (ndvi < 0.5) {
          // Stressed / sparse vegetation -> golden amber to yellow-green
          const t = clamp((ndvi - 0.18) / 0.32, 0, 1);
          outR = Math.round(214 - t * 68);
          outG = Math.round(166 + t * 22);
          outB = Math.round(52 - t * 12);
        } else {
          // Healthy dense vegetation -> rich emerald to deep forest green
          const t = clamp((ndvi - 0.5) / 0.38, 0, 1);
          outR = Math.round(62 - t * 40);
          outG = Math.round(154 - t * 52);
          outB = Math.round(74 - t * 26);
        }
      }

      // Subtle boundary contour around the currently selected surface class
      if (hlIdx >= 0 && cIdx === hlIdx) {
        const isEdge =
          (px > 0 && classIdx[i - 1] !== hlIdx) ||
          (px < width - 1 && classIdx[i + 1] !== hlIdx) ||
          (py > 0 && classIdx[i - width] !== hlIdx) ||
          (py < height - 1 && classIdx[i + width] !== hlIdx);
        if (isEdge) {
          outR = 251;
          outG = 248;
          outB = 243;
        }
      }

      rgba[o] = outR;
      rgba[o + 1] = outG;
      rgba[o + 2] = outB;
      rgba[o + 3] = 255;
    }
  }

  return rgba;
}

export function inspectScenePixel(
  scene: MultispectralScene,
  x: number,
  y: number,
): PixelInspection {
  const cx = clamp(Math.floor(x), 0, scene.width - 1);
  const cy = clamp(Math.floor(y), 0, scene.height - 1);
  const i = cy * scene.width + cx;
  const surface = SURFACE_IDS[scene.classIdx[i]] ?? "healthy-veg";
  const bands = {
    blue: scene.blue[i],
    green: scene.green[i],
    red: scene.red[i],
    nir: scene.nir[i],
    swir1: scene.swir1[i],
  };
  return {
    x: cx,
    y: cy,
    surface,
    bands,
    ndvi: computeNDVI(bands.nir, bands.red),
    ndwi: computeNDWI(bands.green, bands.nir),
    ndsi: computeNDSI(bands.green, bands.swir1),
  };
}
