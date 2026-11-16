import test from 'node:test';
import assert from 'node:assert/strict';
import { MATHEMATICAL_SYMBOLS_TABLE } from '../data/mathFoundations';
import {
  computeObliqueTransmittance,
  decibelsToLinear,
  degreesToRadians,
  filterMathSymbols,
  linearToDecibels,
} from './mathHelpers';

test('filterMathSymbols filters by category and search query accurately', () => {
  const all = filterMathSymbols(MATHEMATICAL_SYMBOLS_TABLE, 'all', '');
  assert.equal(all.length, MATHEMATICAL_SYMBOLS_TABLE.length);

  const greek = filterMathSymbols(MATHEMATICAL_SYMBOLS_TABLE, 'greek-var', '');
  assert.ok(greek.length >= 6);
  assert.ok(greek.every((s) => s.category === 'greek-var'));

  const rayleighMatch = filterMathSymbols(MATHEMATICAL_SYMBOLS_TABLE, 'all', 'رایلی');
  assert.ok(rayleighMatch.some((s) => s.id === 'sym-neg-pow'));
});

test('computeObliqueTransmittance calculates air mass sec(theta) and Beer-Lambert decay', () => {
  const nadir = computeObliqueTransmittance(0.2, 0);
  assert.ok(Math.abs(nadir.airMassFactor - 1) < 1e-9);
  assert.ok(Math.abs(nadir.transmittance - Math.exp(-0.2)) < 1e-9);

  const slant60 = computeObliqueTransmittance(0.2, 60);
  assert.ok(Math.abs(slant60.airMassFactor - 2) < 1e-6);
  assert.ok(Math.abs(slant60.transmittance - Math.exp(-0.4)) < 1e-6);
});

test('decibel and radian conversions round-trip accurately', () => {
  assert.ok(Math.abs(linearToDecibels(0.01) - -20) < 1e-9);
  assert.ok(Math.abs(decibelsToLinear(-20) - 0.01) < 1e-9);

  const rad180 = degreesToRadians(180);
  assert.ok(Math.abs(rad180.radians - Math.PI) < 1e-9);
});
