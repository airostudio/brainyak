import type { TestOffer } from './testOffers'
import type { Answer } from '@/store/testStore'

export interface TestResult {
  percent: number
  level: string
  color: string
  summary: string
  strengths: string[]
}

const LEVELS: Array<{ min: number; level: string; color: string }> = [
  { min: 90, level: 'Exceptional', color: 'from-yellow-400 to-amber-500' },
  { min: 80, level: 'Excellent', color: 'from-purple-400 to-pink-500' },
  { min: 70, level: 'Strong', color: 'from-blue-400 to-indigo-500' },
  { min: 60, level: 'Above Average', color: 'from-green-400 to-emerald-500' },
  { min: 50, level: 'Average', color: 'from-cyan-400 to-blue-500' },
  { min: 0, level: 'Developing', color: 'from-orange-400 to-amber-500' },
]

const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n))

/**
 * Produce a stable, personalised result for a bonus test.
 *
 * The bonus tests don't have their own question banks, so we derive a
 * plausible, DETERMINISTIC score from the user's IQ-test performance plus a
 * fixed per-test offset. Deterministic = the same result every time the user
 * reopens it (no from-scratch randomness on each render).
 */
export function getTestResult(
  offer: TestOffer,
  score: number,
  answers: Answer[]
): TestResult {
  const totalQuestions = 15
  const baseAccuracy = (score / totalQuestions) * 100

  // A fixed offset per test id (-12..+12) adds variety without randomness.
  const offset = ((offer.id * 37) % 25) - 12
  const percent = Math.round(clamp(baseAccuracy + offset, 42, 99))

  const tier = LEVELS.find((l) => percent >= l.min) || LEVELS[LEVELS.length - 1]

  const summary =
    `Based on your cognitive profile, your ${offer.name} score is ${percent}%, ` +
    `placing you in the ${tier.level.toLowerCase()} range. ${offer.description}.`

  const strengths = [
    percent >= 75
      ? `Standout performance in ${offer.category} reasoning`
      : `Solid foundation in ${offer.category} reasoning`,
    answers.filter((a) => a.isCorrect && a.timeSpent < 20).length >= 3
      ? 'Fast, confident decision-making under time pressure'
      : 'Consistent, methodical problem-solving',
    percent >= 65
      ? 'Above-average adaptability across question types'
      : 'Steady, reliable pattern recognition',
  ]

  return { percent, level: tier.level, color: tier.color, summary, strengths }
}
