import { methodIds } from '~/data/div'
import type { MethodId } from '~/data/div'

export interface Ballot {
  count: number
  ranking: string[]
}

export interface MethodResult {
  id: MethodId
  scores: Record<string, number>
  winner: string | null
  note: string
}

export function parseBallots(text: string) {
  const display = new Map<string, string>()
  const ballots: Ballot[] = []

  for (const line of text.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed) continue

    const match = trimmed.match(/^(\d+)\s*[:×]\s*(.+)$/)
    const count = match ? Number(match[1]) : 1
    const body = match ? match[2]! : trimmed

    const seen = new Set<string>()
    const ranking: string[] = []
    for (const raw of body.split('>')) {
      const name = raw.trim()
      const key = name.toLowerCase()
      if (!name || seen.has(key)) continue
      seen.add(key)
      if (!display.has(key)) display.set(key, name)
      ranking.push(display.get(key)!)
    }

    if (ranking.length && count > 0) ballots.push({ count, ranking })
  }

  return { ballots, options: [...display.values()] }
}

function blank(options: string[]) {
  return Object.fromEntries(options.map(o => [o, 0])) as Record<string, number>
}

function top(scores: Record<string, number>) {
  const entries = Object.entries(scores)
  if (!entries.length) return { winner: null, tie: false }
  const max = Math.max(...entries.map(([, v]) => v))
  const leaders = entries.filter(([, v]) => v === max)
  return { winner: leaders.length === 1 ? leaders[0]![0] : null, tie: leaders.length > 1 }
}

function plurality(ballots: Ballot[], options: string[]): MethodResult {
  const scores = blank(options)
  for (const b of ballots) scores[b.ranking[0]!]! += b.count
  const { winner, tie } = top(scores)
  return { id: 'plurality', scores, winner, note: tie ? 'Tie for first place' : 'First choices only' }
}

function approval(ballots: Ballot[], options: string[]): MethodResult {
  const scores = blank(options)
  for (const b of ballots) for (const o of b.ranking) scores[o]! += b.count
  const { winner, tie } = top(scores)
  return { id: 'approval', scores, winner, note: tie ? 'Tie for first place' : 'Every listed option is approved' }
}

function borda(ballots: Ballot[], options: string[]): MethodResult {
  const scores = blank(options)
  const n = options.length
  for (const b of ballots) {
    b.ranking.forEach((o, i) => {
      scores[o]! += (n - 1 - i) * b.count
    })
  }
  const { winner, tie } = top(scores)
  return { id: 'borda', scores, winner, note: tie ? 'Tie for first place' : 'Unranked options earn 0 points' }
}

function runoff(ballots: Ballot[], options: string[]): MethodResult {
  const active = new Set(options)
  let tally = blank(options)
  let rounds = 0

  while (active.size) {
    rounds++
    tally = blank(options)
    for (const b of ballots) {
      const choice = b.ranking.find(o => active.has(o))
      if (choice) tally[choice]! += b.count
    }
    const total = Object.values(tally).reduce((a, v) => a + v, 0)
    if (!total) break

    const [leader, leaderVotes] = Object.entries(tally).sort((a, b) => b[1] - a[1])[0]!
    if (leaderVotes > total / 2 || active.size === 1) {
      return { id: 'runoff', scores: tally, winner: leader, note: `${rounds} round${rounds > 1 ? 's' : ''}` }
    }

    const weakest = [...active].sort((a, b) => tally[a]! - tally[b]!)[0]!
    active.delete(weakest)
  }

  return { id: 'runoff', scores: tally, winner: null, note: 'No ballots left' }
}

function condorcet(ballots: Ballot[], options: string[]): MethodResult {
  const scores = blank(options)
  const beats = new Map<string, number>()

  function preference(b: Ballot, x: string, y: string) {
    const ix = b.ranking.indexOf(x)
    const iy = b.ranking.indexOf(y)
    const rx = ix === -1 ? Infinity : ix
    const ry = iy === -1 ? Infinity : iy
    return rx === ry ? 0 : rx < ry ? 1 : -1
  }

  for (const a of options) {
    for (const c of options) {
      if (a === c) continue
      let net = 0
      for (const b of ballots) net += preference(b, a, c) * b.count
      if (net > 0) {
        scores[a]! += 1
        beats.set(a, (beats.get(a) ?? 0) + 1)
      } else if (net === 0) {
        scores[a]! += 0.5
      }
    }
  }

  const winner = options.find(o => (beats.get(o) ?? 0) === options.length - 1) ?? null
  return {
    id: 'condorcet',
    scores,
    winner,
    note: winner ? 'Beats every other option head to head' : 'No Condorcet winner: a cycle or a tie'
  }
}

export function tally(ballots: Ballot[], options: string[]) {
  const run: Record<MethodId, () => MethodResult> = {
    plurality: () => plurality(ballots, options),
    runoff: () => runoff(ballots, options),
    borda: () => borda(ballots, options),
    approval: () => approval(ballots, options),
    condorcet: () => condorcet(ballots, options)
  }
  return methodIds.map(id => run[id]())
}

export function allocateSeats(scores: Record<string, number>, seats: number) {
  const total = Object.values(scores).reduce((a, v) => a + v, 0)
  const result: Record<string, number> = Object.fromEntries(Object.keys(scores).map(o => [o, 0]))
  if (total <= 0 || seats <= 0) return result

  const quotas = Object.entries(scores).map(([name, v]) => {
    const quota = v / total * seats
    return { name, base: Math.floor(quota), rest: quota - Math.floor(quota) }
  })

  let assigned = 0
  for (const q of quotas) {
    result[q.name] = q.base
    assigned += q.base
  }

  quotas.sort((a, b) => b.rest - a.rest)
  for (let i = 0; assigned < seats; i++, assigned++) {
    result[quotas[i % quotas.length]!.name]! += 1
  }

  return result
}

export function hemicycle(count: number) {
  if (count <= 0) return []
  const rows = Math.min(5, Math.max(1, Math.ceil(count / 14)))
  const radii = Array.from({ length: rows }, (_, i) => rows === 1 ? 1 : 0.45 + (i / (rows - 1)) * 0.55)
  const sum = radii.reduce((a, v) => a + v, 0)

  const perRow = radii.map(r => Math.max(1, Math.round(count * r / sum)))
  const diff = count - perRow.reduce((a, v) => a + v, 0)
  perRow[rows - 1]! += diff

  const points: { x: number, y: number, angle: number }[] = []
  radii.forEach((r, i) => {
    const k = perRow[i]!
    for (let j = 0; j < k; j++) {
      const angle = k === 1 ? Math.PI / 2 : Math.PI - j * Math.PI / (k - 1)
      points.push({ x: 50 + 46 * r * Math.cos(angle), y: 94 - 92 * r * Math.sin(angle), angle })
    }
  })

  return points.sort((a, b) => b.angle - a.angle || a.y - b.y)
}
