export type ProofMethodId =
  | "direct"
  | "contrapositive"
  | "contradiction"
  | "induction"
  | "cases-counter"
  | "differential";

export type LegalOpId =
  | "substitution"
  | "balance"
  | "factor-cancel"
  | "change-var"
  | "calculus-opt"
  | "ode-integral"
  | "limit-taylor";

export type ProofCategoryId = "all" | "light-wave" | "thermal" | "atmosphere-geometry" | "sensor-orbit";

export type LogicConnector = {
  id: string;
  symbolLatex: string;
  nameFa: string;
  meaningFa: string;
  negationOrTipFa: string;
  exampleLatex: string;
  exampleFa: string;
};

export type ProofAnatomyPillar = {
  id: string;
  indexFa: string;
  titleFa: string;
  englishLabel: string;
  summaryFa: string;
  exampleFa: string;
};

export type LegalOperation = {
  id: LegalOpId;
  order: number;
  titleFa: string;
  shortLabelFa: string;
  ruleLatex: string;
  whyValidFa: string;
  forbiddenTrapFa: string;
  rsExampleLatex: string;
  rsExampleFa: string;
};

export type MiniProofStep = {
  labelFa: string;
  latex: string;
  reasonFa: string;
};

export type ProofMethod = {
  id: ProofMethodId;
  order: number;
  titleFa: string;
  englishName: string;
  blueprintLatex: string;
  whenToUseFa: string;
  howItWorksFa: string;
  baseExampleTitleFa: string;
  baseExampleSteps: MiniProofStep[];
  rsConnectionFa: string;
};

export type ProofStep = {
  id: string;
  titleFa: string;
  opId: LegalOpId;
  latex: string;
  explanationFa: string;
  watchOutFa?: string;
};

export type FormulaProof = {
  id: string;
  order: number;
  category: Exclude<ProofCategoryId, "all">;
  categoryLabelFa: string;
  titleFa: string;
  subtitleFa: string;
  targetLatex: string;
  startingPremisesFa: string[];
  methodIds: ProofMethodId[];
  relatedFormulaId?: string;
  steps: ProofStep[];
  physicalTakeawayFa: string;
};

export type ProofChallengeOption = {
  id: string;
  labelFa: string;
};

export type ProofChallenge = {
  id: string;
  kindFa: string;
  promptFa: string;
  statementLatex?: string;
  options: ProofChallengeOption[];
  correctOptionId: string;
  explanationFa: string;
  relatedOpOrMethodFa: string;
};

export function clampStepIndex(index: number, totalSteps: number): number {
  if (totalSteps <= 0) return 0;
  if (index < 0) return 0;
  if (index >= totalSteps) return totalSteps - 1;
  return index;
}

export function filterProofs(
  proofs: FormulaProof[],
  category: ProofCategoryId,
  query: string,
): FormulaProof[] {
  const normalized = query.trim().toLowerCase();
  return proofs.filter((proof) => {
    if (category !== "all" && proof.category !== category) {
      return false;
    }
    if (!normalized) return true;
    return (
      proof.titleFa.toLowerCase().includes(normalized) ||
      proof.subtitleFa.toLowerCase().includes(normalized) ||
      proof.categoryLabelFa.toLowerCase().includes(normalized) ||
      proof.id.toLowerCase().includes(normalized)
    );
  });
}

export function evaluateChallenge(
  challenge: ProofChallenge,
  selectedOptionId: string | undefined,
): { answered: boolean; correct: boolean } {
  if (!selectedOptionId) {
    return { answered: false, correct: false };
  }
  return {
    answered: true,
    correct: selectedOptionId === challenge.correctOptionId,
  };
}

export function computeChallengeScore(
  challenges: ProofChallenge[],
  answers: Record<string, string>,
): { answered: number; correct: number; total: number } {
  let answered = 0;
  let correct = 0;
  for (const ch of challenges) {
    const res = evaluateChallenge(ch, answers[ch.id]);
    if (res.answered) answered += 1;
    if (res.correct) correct += 1;
  }
  return { answered, correct, total: challenges.length };
}

export function computeProofMastery(
  completedProofIds: Record<string, boolean>,
  proofs: FormulaProof[],
): { completed: number; total: number; percent: number } {
  const total = proofs.length;
  if (total === 0) return { completed: 0, total: 0, percent: 0 };
  const completed = proofs.filter((p) => Boolean(completedProofIds[p.id])).length;
  return {
    completed,
    total,
    percent: Math.round((completed / total) * 100),
  };
}

export function validateProofGraph(
  proofs: FormulaProof[],
  methods: ProofMethod[],
  operations: LegalOperation[],
  challenges: ProofChallenge[],
): string[] {
  const errors: string[] = [];
  const methodSet = new Set(methods.map((m) => m.id));
  const opSet = new Set(operations.map((o) => o.id));
  const proofIds = new Set<string>();

  for (const proof of proofs) {
    if (proofIds.has(proof.id)) {
      errors.push(`Duplicate proof id: ${proof.id}`);
    }
    proofIds.add(proof.id);

    if (proof.steps.length < 3) {
      errors.push(`Proof "${proof.id}" has fewer than 3 steps.`);
    }
    if (proof.startingPremisesFa.length === 0) {
      errors.push(`Proof "${proof.id}" has no starting premises.`);
    }
    for (const mId of proof.methodIds) {
      if (!methodSet.has(mId)) {
        errors.push(`Proof "${proof.id}" references unknown method "${mId}".`);
      }
    }
    for (const step of proof.steps) {
      if (!opSet.has(step.opId)) {
        errors.push(`Proof "${proof.id}" step "${step.id}" references unknown op "${step.opId}".`);
      }
      if (!step.latex.trim()) {
        errors.push(`Proof "${proof.id}" step "${step.id}" has empty LaTeX.`);
      }
      if (!step.explanationFa.trim()) {
        errors.push(`Proof "${proof.id}" step "${step.id}" has empty explanation.`);
      }
    }
  }

  for (const ch of challenges) {
    const hasCorrect = ch.options.some((opt) => opt.id === ch.correctOptionId);
    if (!hasCorrect) {
      errors.push(`Challenge "${ch.id}" correctOptionId "${ch.correctOptionId}" not found in options.`);
    }
  }

  return errors;
}
