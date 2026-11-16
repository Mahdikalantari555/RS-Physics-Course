import test from 'node:test';
import assert from 'node:assert/strict';
import {
  PHYSICAL_CONSTANTS,
  computeWaveProperties,
  planckSpectralRadiance,
  wienPeakWavelength,
  stefanBoltzmannExitance,
  rayleighRelativeScattering,
  atmosphericTransmittance,
  getSurfaceReflectance,
  extractMultispectralBands,
  computeNDVI,
  computeNDWI,
  computeNDSI,
  computeSensorGeometry,
  quantizeRadiometric,
} from './remoteSensing';

test('wave properties satisfy c = λν and E = hν', () => {
  const green = computeWaveProperties(0.55); // 550 nm
  assert.ok(Math.abs(green.wavelengthMeters - 5.5e-7) < 1e-12);
  const expectedFreq = PHYSICAL_CONSTANTS.C / 5.5e-7;
  assert.ok(Math.abs(green.frequencyHz - expectedFreq) < 1);
  assert.equal(green.band.id, 'visible');
  assert.ok(green.energyEv > 2.2 && green.energyEv < 2.3);
});

test('Wien displacement law gives expected Sun and Earth peaks', () => {
  const sunPeak = wienPeakWavelength(5778);
  assert.ok(sunPeak > 0.49 && sunPeak < 0.51, `Sun peak was ${sunPeak}`);

  const earthPeak = wienPeakWavelength(288);
  assert.ok(earthPeak > 9.9 && earthPeak < 10.2, `Earth peak was ${earthPeak}`);
});

test('Planck radiance peaks near Wien displacement wavelength', () => {
  const T = 5778;
  const peak = wienPeakWavelength(T);
  const atPeak = planckSpectralRadiance(peak, T);
  const left = planckSpectralRadiance(peak * 0.6, T);
  const right = planckSpectralRadiance(peak * 1.6, T);
  assert.ok(atPeak > left);
  assert.ok(atPeak > right);
  assert.ok(atPeak > 2e7); // ~2.6e7 W·m^-2·sr^-1·μm^-1 for Sun
});

test('Stefan-Boltzmann law scales with T^4 and emissivity', () => {
  const m1 = stefanBoltzmannExitance(300, 1.0);
  const m2 = stefanBoltzmannExitance(600, 1.0);
  assert.ok(Math.abs(m2 / m1 - 16) < 1e-9);
  const mHalf = stefanBoltzmannExitance(300, 0.5);
  assert.ok(Math.abs(mHalf - m1 * 0.5) < 1e-9);
});

test('Rayleigh scattering drops strongly with λ^-4', () => {
  const blue = rayleighRelativeScattering(0.45);
  const red = rayleighRelativeScattering(0.67);
  const nir = rayleighRelativeScattering(0.85);
  assert.equal(blue, 1);
  assert.ok(blue / red > 4.5); // (0.67/0.45)^4 ≈ 4.91
  assert.ok(nir < 0.1);
});

test('Atmospheric transmittance shows open windows and blocked H2O/CO2 bands', () => {
  const visWindow = atmosphericTransmittance(0.55);
  const tirWindow = atmosphericTransmittance(10.5);
  const h2oBlock = atmosphericTransmittance(1.4);
  const thermalBlock = atmosphericTransmittance(6.3);
  assert.ok(visWindow > 0.75);
  assert.ok(tirWindow > 0.75);
  assert.ok(h2oBlock < 0.15);
  assert.ok(thermalBlock < 0.15);
});

test('Spectral signatures yield physically valid NDVI, NDWI, and NDSI', () => {
  const veg = extractMultispectralBands('healthy-veg');
  const soil = extractMultispectralBands('dry-soil');
  const water = extractMultispectralBands('clear-water');
  const snow = extractMultispectralBands('snow-ice');

  const ndviVeg = computeNDVI(veg.nir, veg.red);
  const ndviSoil = computeNDVI(soil.nir, soil.red);
  const ndviWater = computeNDVI(water.nir, water.red);

  assert.ok(ndviVeg > 0.65, `Healthy veg NDVI was ${ndviVeg}`);
  assert.ok(ndviSoil > 0 && ndviSoil < 0.3, `Soil NDVI was ${ndviSoil}`);
  assert.ok(ndviWater < -0.2, `Water NDVI was ${ndviWater}`);

  const ndwiWater = computeNDWI(water.green, water.nir);
  const ndwiVeg = computeNDWI(veg.green, veg.nir);
  assert.ok(ndwiWater > 0.4);
  assert.ok(ndwiVeg < -0.3);

  const ndsiSnow = computeNDSI(snow.green, snow.swir1);
  assert.ok(ndsiSnow > 0.6, `Snow NDSI was ${ndsiSnow}`);
  assert.ok(getSurfaceReflectance('healthy-veg', 0.8) > getSurfaceReflectance('healthy-veg', 0.66));
});

test('Sensor geometry and radiometric quantization behave accurately', () => {
  const geom = computeSensorGeometry(700, 0.043, 15);
  assert.ok(geom.gsdMeters > 29 && geom.gsdMeters < 31, `GSD was ${geom.gsdMeters}`);
  assert.ok(geom.swathKm > 180 && geom.swathKm < 190, `Swath was ${geom.swathKm}`);

  const q8 = quantizeRadiometric(0.5, 8);
  assert.equal(q8.levels, 256);
  assert.equal(q8.dn, 128);

  const q2 = quantizeRadiometric(0.4, 2);
  assert.equal(q2.levels, 4);
  assert.equal(q2.dn, 1);
});
