import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {
  computeAtmosphereMetrics,
  computeOrbitMetrics,
  computeSurfaceMetrics,
  computeTelemetry,
  getMission,
} from "./physics.ts";

describe("computeOrbitMetrics", () => {
  it("computes realistic LEO velocity, Kepler period, GSD, and swath at 700 km", () => {
    const m = computeOrbitMetrics(700, 0.02, 10);
    // Circular LEO at 700 km: v ≈ 7.50 km/s, T ≈ 98.8 min
    assert.ok(m.orbitalVelocityKmS > 7.45 && m.orbitalVelocityKmS < 7.56, `got v=${m.orbitalVelocityKmS}`);
    assert.ok(m.periodMin > 98 && m.periodMin < 99.5, `got T=${m.periodMin}`);
    // GSD = 700 km * 0.02 mrad = 14.0 m
    assert.ok(Math.abs(m.gsdMeters - 14.0) < 1e-6);
    // Swath = 2 * 700 * tan(10°) ≈ 246.86 km
    assert.ok(m.swathKm > 245 && m.swathKm < 249, `got swath=${m.swathKm}`);
  });

  it("increases period and decreases velocity at higher altitudes (Kepler 3rd law)", () => {
    const low = computeOrbitMetrics(400, 0.02, 10);
    const high = computeOrbitMetrics(1200, 0.02, 10);
    assert.ok(high.periodMin > low.periodMin);
    assert.ok(high.orbitalVelocityKmS < low.orbitalVelocityKmS);
    assert.ok(high.gsdMeters > low.gsdMeters);
  });
});

describe("computeAtmosphereMetrics", () => {
  it("exhibits strong lambda^-4 Rayleigh drop from 0.45 um to 1.60 um", () => {
    const blue = computeAtmosphereMetrics(0.45, 1.0, 1.0, 30);
    const swir = computeAtmosphereMetrics(1.6, 1.0, 1.0, 30);
    assert.ok(Math.abs(blue.rayleighFactor - 1.0) < 1e-6);
    assert.ok(swir.rayleighFactor < 0.01);
    assert.ok(swir.transmittance > blue.transmittance);
    assert.ok(swir.pathHaze < blue.pathHaze);
  });

  it("blocks transmittance inside H2O (1.38 um) and CO2 (4.30 um) absorption walls", () => {
    const h2oWall = computeAtmosphereMetrics(1.38, 1.5, 1.0, 30);
    const co2Wall = computeAtmosphereMetrics(4.3, 1.0, 1.0, 30);
    const tirWin = computeAtmosphereMetrics(10.8, 1.0, 1.0, 30);
    assert.ok(h2oWall.transmittance < 0.1, `expected H2O blocked, got ${h2oWall.transmittance}`);
    assert.ok(co2Wall.transmittance < 0.05, `expected CO2 blocked, got ${co2Wall.transmittance}`);
    assert.ok(tirWin.transmittance > 0.75, `expected TIR window open, got ${tirWin.transmittance}`);
  });

  it("computes photon energy E = hc/lambda accurately (~2.48 eV at 0.50 um)", () => {
    const green = computeAtmosphereMetrics(0.5, 1.0, 1.0, 30);
    assert.ok(Math.abs(green.photonEnergyEv - 2.4797) < 0.01);
  });
});

describe("mission evaluation solvability", () => {
  it("Mission 1 starts failing in blue haze and passes in clean SWIR1 window (1.60 um)", () => {
    const m1 = getMission("atmosphere-window");
    const initChecks = m1.evaluate(m1.initialParams, computeTelemetry(m1.initialParams));
    assert.equal(initChecks.every((c) => c.passed), false);

    const solvedParams = { ...m1.initialParams, wavelengthUm: 1.6 };
    const solvedChecks = m1.evaluate(solvedParams, computeTelemetry(solvedParams));
    assert.equal(
      solvedChecks.every((c) => c.passed),
      true,
      `Expected Mission 1 to pass at 1.60 um: ${JSON.stringify(solvedChecks)}`,
    );
  });

  it("Mission 2 starts failing at 1150 km and passes with balanced 620 km / 0.016 mrad / 14 deg", () => {
    const m2 = getMission("orbit-architect");
    const initChecks = m2.evaluate(m2.initialParams, computeTelemetry(m2.initialParams));
    assert.equal(initChecks.every((c) => c.passed), false);

    const solvedParams = { ...m2.initialParams, altitudeKm: 620, ifovMrad: 0.016, halfFovDeg: 14 };
    const solvedChecks = m2.evaluate(solvedParams, computeTelemetry(solvedParams));
    assert.equal(
      solvedChecks.every((c) => c.passed),
      true,
      `Expected Mission 2 to pass: ${JSON.stringify(solvedChecks)}`,
    );
  });

  it("Mission 3 starts failing in RGB and passes in TIR lens at MWIR 3.85 um window", () => {
    const m3 = getMission("thermal-ndvi");
    const initChecks = m3.evaluate(m3.initialParams, computeTelemetry(m3.initialParams));
    assert.equal(initChecks.every((c) => c.passed), false);

    const surface = computeSurfaceMetrics(3.85);
    assert.ok(surface.hotspotWienPeakUm > 4.6 && surface.hotspotWienPeakUm < 4.75);

    const solvedParams = { ...m3.initialParams, lensMode: "thermal" as const, wavelengthUm: 3.85 };
    const solvedChecks = m3.evaluate(solvedParams, computeTelemetry(solvedParams));
    assert.equal(
      solvedChecks.every((c) => c.passed),
      true,
      `Expected Mission 3 to pass at 3.85 um: ${JSON.stringify(solvedChecks)}`,
    );
  });
});
