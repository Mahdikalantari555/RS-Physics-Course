import test from 'node:test';
import assert from 'node:assert/strict';
import { calculateCompletionStats, gradeQuiz } from './courseStorage';
import { FINAL_EXAM_QUESTIONS } from '../data/courseCurriculum';

test('calculateCompletionStats handles deduplication and bounds', () => {
  const empty = calculateCompletionStats([], 5);
  assert.equal(empty.completedCount, 0);
  assert.equal(empty.percentage, 0);

  const partial = calculateCompletionStats(['em-spectrum', 'em-spectrum', 'blackbody-radiation'], 5);
  assert.equal(partial.completedCount, 2);
  assert.equal(partial.percentage, 40);

  const full = calculateCompletionStats(['a', 'b', 'c', 'd', 'e'], 5);
  assert.equal(full.completedCount, 5);
  assert.equal(full.percentage, 100);
});

test('gradeQuiz computes exact score and pass threshold', () => {
  const allCorrect: Record<string, string> = {};
  for (const q of FINAL_EXAM_QUESTIONS) {
    allCorrect[q.id] = q.correctOptionId;
  }
  const perfect = gradeQuiz(FINAL_EXAM_QUESTIONS, allCorrect);
  assert.equal(perfect.correctCount, FINAL_EXAM_QUESTIONS.length);
  assert.equal(perfect.scorePercent, 100);
  assert.equal(perfect.passed, true);

  const halfCorrect: Record<string, string> = {};
  FINAL_EXAM_QUESTIONS.forEach((q, idx) => {
    halfCorrect[q.id] = idx < 4 ? q.correctOptionId : 'wrong';
  });
  const half = gradeQuiz(FINAL_EXAM_QUESTIONS, halfCorrect);
  assert.equal(half.correctCount, 4);
  assert.equal(half.scorePercent, 50);
  assert.equal(half.passed, false);
});
