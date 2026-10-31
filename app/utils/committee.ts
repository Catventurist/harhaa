import { languages, stamps, committees, rapporteurs } from '~/data/div'
import type { LanguageId, Language } from '~/data/div'

export interface DeliberatedToken {
  source: string
  target: string
}

export interface Deliberation {
  tokens: DeliberatedToken[]
  committee: string
  rapporteur: string
  stamp: string
  reference: string
}

function hash(value: string) {
  let h = 2166136261
  for (let i = 0; i < value.length; i++) {
    h ^= value.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return h >>> 0
}

function rng(seed: number) {
  let a = seed
  return () => {
    a = (a + 0x6D2B79F5) | 0
    let t = Math.imul(a ^ (a >>> 15), 1 | a)
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

function pick<T>(random: () => number, list: readonly T[]): T {
  return list[Math.floor(random() * list.length)]!
}

function shuffle<T>(random: () => number, list: T[]): T[] {
  const copy = [...list]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j]!, copy[i]!]
  }
  return copy
}

function pseudoWord(source: string, seed: number, language: Language) {
  const random = rng(hash(source + seed))
  const count = Math.min(4, Math.max(1, Math.ceil(source.length / 3)))
  let word = ''
  for (let i = 0; i < count; i++) {
    word += pick(random, language.onsets) + pick(random, language.nuclei) + (i === count - 1 ? pick(random, language.codas) : '')
  }
  if (source.length > 6) word += pick(random, language.suffixes)
  return word
}

export function deliberate(input: string, round = 0, languageId: LanguageId = 'germanic'): Deliberation {
  const language = languages[languageId]
  const words = input.toLowerCase().match(/[\p{L}\p{N}']+/gu) ?? []
  const seed = hash(input + round + languageId)
  const random = rng(seed)

  const shuffled = shuffle(random, words)

  const tokens: DeliberatedToken[] = []
  shuffled.forEach((source, i) => {
    if (i > 0 && random() < 0.3) {
      tokens.push({ source: '', target: pick(random, language.particles) })
    }
    tokens.push({ source, target: pseudoWord(source, seed, language) })
  })

  if (tokens[0]) {
    tokens[0].target = tokens[0].target.charAt(0).toUpperCase() + tokens[0].target.slice(1)
  }

  return {
    tokens,
    committee: pick(random, committees),
    rapporteur: pick(random, rapporteurs),
    stamp: pick(random, stamps),
    reference: `COM(${2000 + Math.floor(random() * 50)}) ${String(Math.floor(random() * 9999)).padStart(4, '0')}/${Math.floor(random() * 27) + 1}B`
  }
}
