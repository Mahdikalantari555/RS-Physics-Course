import test from "node:test";
import assert from "node:assert/strict";
import {
  clampStepIndex,
  computeChallengeScore,
  computeProofMastery,
  evaluateChallenge,
  filterProofs,
  validateProofGraph,
} from "./proof-logic";
import { LEGAL_OPERATIONS, PROOF_CHALLENGES, PROOF_METHODS } from "../content/proofs/foundations";
import { RS_FORMULA_PROOFS } from "../content/proofs/rs-derivations";

test("proof curriculum graph has complete referential integrity", () => {
  const errors = validateProofGraph(RS_FORMULA_PROOFS, PROOF_METHODS, LEGAL_OPERATIONS, PROOF_CHALLENGES);
  assert.deepEqual(errors, []);
  assert.equal(PROOF_METHODS.length, 6);
  assert.equal(LEGAL_OPERATIONS.length, 7);
  assert.equal(PROOF_CHALLENGES.length, 6);
  assert.ok(RS_FORMULA_PROOFS.length >= 10, "Should include at least 10 core remote sensing & light proofs");

  const walk = (val: unknown): void => {
    if (typeof val === "string") {
      assert.equal(/[\t\b\f\r]/.test(val), false, `Found stray control char in: ${val.slice(0, 60)}`);
    } else if (Array.isArray(val)) {
      val.forEach(walk);
    } else if (val && typeof val === "object") {
      Object.values(val).forEach(walk);
    }
  };
  walk({ RS_FORMULA_PROOFS, PROOF_METHODS, LEGAL_OPERATIONS, PROOF_CHALLENGES });
});

test("filterProofs filters by category and Persian/English search query", () => {
  const thermal = filterProofs(RS_FORMULA_PROOFS, "thermal", "");
  assert.equal(thermal.length, 4);
  assert.ok(thermal.every((p) => p.category === "thermal"));

  const wien = filterProofs(RS_FORMULA_PROOFS, "all", "وین");
  assert.ok(wien.some((p) => p.id === "wien-displacement-proof"));

  const kepler = filterProofs(RS_FORMULA_PROOFS, "sensor-orbit", "کپلر");
  assert.equal(kepler.length, 1);
  assert.equal(kepler[0]?.id, "orbital-velocity-kepler-proof");
});

test("clampStepIndex guards step boundaries", () => {
  assert.equal(clampStepIndex(-2, 5), 0);
  assert.equal(clampStepIndex(0, 5), 0);
  assert.equal(clampStepIndex(4, 5), 4);
  assert.equal(clampStepIndex(9, 5), 4);
  assert.equal(clampStepIndex(2, 0), 0);
});

test("challenge evaluation and scoring work accurately", () => {
  const ch = PROOF_CHALLENGES[0]!;
  assert.deepEqual(evaluateChallenge(ch, undefined), { answered: false, correct: false });
  assert.deepEqual(evaluateChallenge(ch, ch.correctOptionId), { answered: true, correct: true });
  assert.deepEqual(evaluateChallenge(ch, "wrong-id"), { answered: true, correct: false });

  const score = computeChallengeScore(PROOF_CHALLENGES, {
    [PROOF_CHALLENGES[0]!.id]: PROOF_CHALLENGES[0]!.correctOptionId,
    [PROOF_CHALLENGES[1]!.id]: "wrong",
  });
  assert.deepEqual(score, { answered: 2, correct: 1, total: PROOF_CHALLENGES.length });
});

test("computeProofMastery calculates accurate completion percentage", () => {
  const mastery = computeProofMastery(
    {
      "maxwell-light-speed": true,
      "wien-displacement-proof": true,
      "beer-lambert-proof": true,
    },
    RS_FORMULA_PROOFS,
  );
  assert.equal(mastery.completed, 3);
  assert.equal(mastery.total, RS_FORMULA_PROOFS.length);
  assert.equal(mastery.percent, Math.round((3 / RS_FORMULA_PROOFS.length) * 100));
});
