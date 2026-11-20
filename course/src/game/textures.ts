import * as THREE from "three";
import type { LensMode } from "./physics";

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
  let val = 0;
  let amp = 0.5;
  let freq = 1;
  for (let i = 0; i < octaves; i++) {
    val += amp * valueNoise(x * freq, y * freq);
    freq *= 2.02;
    amp *= 0.5;
  }
  return val;
}

/**
 * Generates procedural equirectangular Earth textures for all 3 sensor lens
 * modes:
 * - `rgb`: natural color (deep ocean, emerald forests, tan plateaus, snow caps)
 * - `nir`: false-color NIR-R-G (healthy vegetation pops vivid crimson/magenta,
 *          stressed dry cropland shifts pale ochre, clear water goes near-black)
 * - `thermal`: thermal IR colormap (cool oceans deep indigo, warm deserts
 *          amber, and a vivid 620K wildfire hotspot in the Zagros target belt)
 */
export function createEarthTextures(
  maxAnisotropy: number,
): Record<LensMode, THREE.CanvasTexture> {
  const width = 1024;
  const height = 512;

  const modes: LensMode[] = ["rgb", "nir", "thermal"];
  const canvases: Record<LensMode, HTMLCanvasElement> = {
    rgb: document.createElement("canvas"),
    nir: document.createElement("canvas"),
    thermal: document.createElement("canvas"),
  };
  const imgData: Record<LensMode, ImageData> = {} as Record<LensMode, ImageData>;

  for (const mode of modes) {
    canvases[mode].width = width;
    canvases[mode].height = height;
    const ctx = canvases[mode].getContext("2d")!;
    imgData[mode] = ctx.createImageData(width, height);
  }

  // Approximate hotspot & agricultural target positions in UV space (near Iran/Middle East belt)
  const fireU = 0.635;
  const fireV = 0.312;
  const farmU = 0.643;
  const farmV = 0.322;

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI; // +pi/2 north, -pi/2 south
    const absLat = Math.abs(lat) / (Math.PI / 2);

    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lon = (u - 0.5) * Math.PI * 2;
      // Seamless cylindrical noise coordinates on unit circle
      const nx = Math.cos(lon) * Math.cos(lat) * 2.1 + 3.7;
      const ny = Math.sin(lon) * Math.cos(lat) * 2.1 + 1.9;
      const nz = Math.sin(lat) * 2.3 + 5.1;

      const elev =
        fbm(nx + nz * 0.4, ny - nz * 0.35, 5) * 0.85 +
        fbm(nx * 2.2, ny * 2.2 + nz, 3) * 0.25 -
        0.53;
      const moisture = fbm(nx * 1.6 + 8.1, ny * 1.6 + nz * 1.2, 4);
      const isPolar = absLat > 0.82 + (elev * 0.14);
      const isLand = elev > 0.0;

      // Distance to wildfire hotspot and agricultural test zone
      const dFire = Math.hypot((u - fireU) * 2, v - fireV);
      const fireHeat = Math.exp(-(dFire * dFire) / (0.011 * 0.011));
      const dFarm = Math.hypot((u - farmU) * 2, v - farmV);
      const isFarmBelt = dFarm < 0.032 && isLand;

      const idx = (y * width + x) * 4;

      // --- 1. RGB Natural Color ---
      let r = 16;
      let g = 48;
      let b = 88;
      if (isPolar) {
        r = 234;
        g = 238;
        b = 242;
      } else if (!isLand) {
        const shelf = Math.max(0, 1 + elev * 7.5);
        r = 12 + shelf * 22;
        g = 44 + shelf * 56;
        b = 88 + shelf * 52;
      } else {
        const veg = Math.max(0, Math.min(1, (moisture - 0.34) * 2.4 - elev * 0.7));
        const mountain = Math.max(0, Math.min(1, (elev - 0.22) * 3.8));
        // Blend arid ochre -> lush forest green -> rocky ridge
        r = 176 * (1 - veg) + 46 * veg;
        g = 148 * (1 - veg) + 108 * veg;
        b = 104 * (1 - veg) + 58 * veg;
        if (mountain > 0) {
          r = r * (1 - mountain) + 132 * mountain;
          g = g * (1 - mountain) + 124 * mountain;
          b = b * (1 - mountain) + 118 * mountain;
        }
        if (isFarmBelt) {
          r = 72;
          g = 132;
          b = 62;
        }
        if (fireHeat > 0.35) {
          // Subtle smoke/ember hint in RGB (much harder to spot than in TIR!)
          r = Math.min(255, r + fireHeat * 45);
          g = Math.max(0, g - fireHeat * 12);
          b = Math.max(0, b - fireHeat * 18);
        }
      }
      imgData.rgb.data[idx] = r;
      imgData.rgb.data[idx + 1] = g;
      imgData.rgb.data[idx + 2] = b;
      imgData.rgb.data[idx + 3] = 255;

      // --- 2. False Color NIR (NIR -> R, Red -> G, Green -> B) ---
      let nr = 10;
      let ng = 16;
      let nb = 32;
      if (isPolar) {
        nr = 225;
        ng = 232;
        nb = 238;
      } else if (!isLand) {
        // Water absorbs NIR strongly -> deep dark blue/black
        nr = 8;
        ng = 18;
        nb = 36;
      } else {
        const veg = Math.max(0, Math.min(1, (moisture - 0.34) * 2.4 - elev * 0.7));
        // Healthy vegetation has high NIR (bright crimson) and low Red
        nr = 128 * (1 - veg) + 216 * veg;
        ng = 132 * (1 - veg) + 42 * veg;
        nb = 122 * (1 - veg) + 74 * veg;
        if (isFarmBelt) {
          // Show distinct contrast between healthy crimson vs stressed pale-amber fields
          const checker = Math.sin(u * 260) * Math.cos(v * 260);
          if (checker > 0) {
            nr = 228;
            ng = 46;
            nb = 78;
          } else {
            nr = 182;
            ng = 162;
            nb = 114;
          }
        }
      }
      imgData.nir.data[idx] = nr;
      imgData.nir.data[idx + 1] = ng;
      imgData.nir.data[idx + 2] = nb;
      imgData.nir.data[idx + 3] = 255;

      // --- 3. Thermal IR Colormap (Inferno-inspired scientific ramp) ---
      let tempNorm = 0.25;
      if (isPolar) {
        tempNorm = 0.08;
      } else if (!isLand) {
        tempNorm = 0.22 + (1 - absLat) * 0.16;
      } else {
        const veg = Math.max(0, Math.min(1, (moisture - 0.34) * 2.4 - elev * 0.7));
        tempNorm = 0.38 + (1 - absLat) * 0.26 - veg * 0.14 - Math.max(0, elev) * 0.15;
      }
      // Wildfire 620K anomaly pops brightly in Thermal mode
      tempNorm = Math.min(1, Math.max(0, tempNorm + fireHeat * 0.95));

      let tr: number;
      let tg: number;
      let tb: number;
      if (tempNorm < 0.35) {
        const t = tempNorm / 0.35;
        tr = 16 + t * 58;
        tg = 18 + t * 24;
        tb = 68 + t * 72;
      } else if (tempNorm < 0.7) {
        const t = (tempNorm - 0.35) / 0.35;
        tr = 74 + t * 144;
        tg = 42 + t * 58;
        tb = 140 - t * 92;
      } else {
        const t = (tempNorm - 0.7) / 0.3;
        tr = 218 + t * 37;
        tg = 100 + t * 150;
        tb = 48 + t * 165;
      }
      imgData.thermal.data[idx] = tr;
      imgData.thermal.data[idx + 1] = tg;
      imgData.thermal.data[idx + 2] = tb;
      imgData.thermal.data[idx + 3] = 255;
    }
  }

  const out = {} as Record<LensMode, THREE.CanvasTexture>;
  for (const mode of modes) {
    const ctx = canvases[mode].getContext("2d")!;
    ctx.putImageData(imgData[mode], 0, 0);
    const tex = new THREE.CanvasTexture(canvases[mode]);
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.wrapS = THREE.RepeatWrapping;
    tex.wrapT = THREE.ClampToEdgeWrapping;
    tex.anisotropy = maxAnisotropy;
    tex.needsUpdate = true;
    out[mode] = tex;
  }
  return out;
}

export function createCloudTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const width = 512;
  const height = 256;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d")!;
  const img = ctx.createImageData(width, height);

  for (let y = 0; y < height; y++) {
    const v = y / height;
    const lat = (0.5 - v) * Math.PI;
    for (let x = 0; x < width; x++) {
      const u = x / width;
      const lon = (u - 0.5) * Math.PI * 2;
      const nx = Math.cos(lon) * Math.cos(lat) * 3.4 + 12.1;
      const ny = Math.sin(lon) * Math.cos(lat) * 3.4 + 4.3;
      const nz = Math.sin(lat) * 3.4;
      const n = fbm(nx + nz * 0.5, ny - nz * 0.4, 4);
      const alpha = Math.max(0, Math.min(1, (n - 0.54) * 3.6));
      const idx = (y * width + x) * 4;
      img.data[idx] = 248;
      img.data[idx + 1] = 250;
      img.data[idx + 2] = 254;
      img.data[idx + 3] = Math.round(alpha * 190);
    }
  }
  ctx.putImageData(img, 0, 0);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.wrapS = THREE.RepeatWrapping;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

export function createSolarPanelTexture(maxAnisotropy: number): THREE.CanvasTexture {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext("2d")!;

  ctx.fillStyle = "#10203a";
  ctx.fillRect(0, 0, 512, 256);

  // Subtle cell gradient & metallic busbars
  const cols = 12;
  const rows = 6;
  const cw = 512 / cols;
  const rh = 256 / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const x = c * cw;
      const y = r * rh;
      ctx.fillStyle = (r + c) % 2 === 0 ? "#162d54" : "#13274a";
      ctx.fillRect(x + 2, y + 2, cw - 4, rh - 4);
      // Fine silver grid lines inside each photovoltaic cell
      ctx.strokeStyle = "rgba(180, 210, 245, 0.22)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.moveTo(x + cw * 0.5, y + 2);
      ctx.lineTo(x + cw * 0.5, y + rh - 2);
      ctx.stroke();
    }
  }

  // Gold collector bus lines
  ctx.strokeStyle = "#c8a258";
  ctx.lineWidth = 2.5;
  ctx.strokeRect(1.5, 1.5, 509, 253);

  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}
