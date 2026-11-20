import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  generateMultispectralScene,
  inspectScenePixel,
  renderCompositeRGBA,
  SCENE_HEIGHT,
  SCENE_WIDTH,
  SURFACE_IDS,
} from "./satellite-scene.ts";

describe("satellite-scene multispectral generator", () => {
  const scene = generateMultispectralScene(SCENE_WIDTH, SCENE_HEIGHT);

  it("generates all 81,000 pixels and covers all 5 Earth land-cover classes", () => {
    assert.equal(scene.classIdx.length, SCENE_WIDTH * SCENE_HEIGHT);
    const counts = new Array(SURFACE_IDS.length).fill(0);
    for (let i = 0; i < scene.classIdx.length; i++) {
      counts[scene.classIdx[i]]++;
    }
    for (let k = 0; k < SURFACE_IDS.length; k++) {
      assert.ok(
        counts[k] > 1500,
        `expected class ${SURFACE_IDS[k]} to have > 1500 pixels, got ${counts[k]}`,
      );
    }
  });

  it("renders visually distinct colors across all 4 composites and strong RGB/NIR/SWIR physics", () => {
    const rgb = renderCompositeRGBA(scene, "true-color");
    const nir = renderCompositeRGBA(scene, "false-nir");
    const swir = renderCompositeRGBA(scene, "false-swir");
    const ndvi = renderCompositeRGBA(scene, "ndvi-map");

    assert.equal(rgb.length, SCENE_WIDTH * SCENE_HEIGHT * 4);
    assert.equal(nir.length, rgb.length);
    assert.equal(swir.length, rgb.length);
    assert.equal(ndvi.length, rgb.length);

    // Find a representative pixel of healthy-veg, snow-ice, and clear-water
    const findFirst = (id: (typeof SURFACE_IDS)[number]) => {
      const target = SURFACE_IDS.indexOf(id);
      for (let i = 0; i < scene.classIdx.length; i++) {
        if (scene.classIdx[i] === target) return i;
      }
      return -1;
    };

    const vegIdx = findFirst("healthy-veg");
    const snowIdx = findFirst("snow-ice");
    const waterIdx = findFirst("clear-water");
    assert.ok(vegIdx >= 0 && snowIdx >= 0 && waterIdx >= 0);

    // True Color: healthy veg is green-dominant; water is blue-dominant; snow is bright
    assert.ok(rgb[vegIdx * 4 + 1] > rgb[vegIdx * 4], "veg should be greener than red in RGB");
    assert.ok(rgb[waterIdx * 4 + 2] > rgb[waterIdx * 4], "water should be bluer than red in RGB");
    assert.ok(rgb[snowIdx * 4] > 170 && rgb[snowIdx * 4 + 2] > 180, "snow should be bright in RGB");

    // False NIR: healthy veg turns red-dominant (NIR mapped to R)
    assert.ok(nir[vegIdx * 4] > nir[vegIdx * 4 + 1] * 1.4, "veg should pop red in NIR-R-G");

    // False SWIR: snow absorbs SWIR1 -> blue/green much higher than red (cyan snow)
    assert.ok(swir[snowIdx * 4 + 2] > swir[snowIdx * 4] * 1.3, "snow should turn cyan/blue in SWIR1-NIR-R");
  });

  it("inspects any pixel and returns consistent NDVI/NDWI/NDSI metrics", () => {
    const sample = inspectScenePixel(scene, 40, 20);
    assert.ok(SURFACE_IDS.includes(sample.surface));
    assert.ok(sample.ndvi >= -1 && sample.ndvi <= 1);
    assert.ok(sample.ndwi >= -1 && sample.ndwi <= 1);
    assert.ok(sample.ndsi >= -1 && sample.ndsi <= 1);
  });
});
