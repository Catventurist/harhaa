export interface Vec { x: number, y: number }
export interface Segment { a: Vec, b: Vec }
export type Layout = 'solid' | 'passing'

export const WORLD = { w: 480, h: 640, coinR: 8 }
export const ROW = { y: 100, slots: 9 }
export const TRAY = { top: 400, x0: 80, pitch: 32, count: 10, step: 12 }
export const RESERVE = { cols: 4, top: 380, w: 80 }

const GRAVITY = 900
const BOUNCE = 0.5
const DT = 1 / 120

export const stackStep = WORLD.coinR * 2
export const restY = (level: number) => WORLD.h - WORLD.coinR - level * stackStep
export const trayCenter = (i: number) => TRAY.x0 + (i + 0.5) * TRAY.pitch
export const trayAt = (x: number) =>
  Math.min(TRAY.count - 1, Math.max(0, Math.floor((x - TRAY.x0) / TRAY.pitch)))

export const RESERVE_LEFT = TRAY.count
export const RESERVE_RIGHT = TRAY.count + 1

export function ledge(layout: Layout) {
  const solid = layout === 'solid'
  const gaps = solid ? ROW.slots : ROW.slots * 2 - 1
  const bar = solid ? 20 : 5
  const pitch = (WORLD.w - bar) / gaps
  return {
    gaps,
    bar,
    pitch,
    x0: bar / 2,
    gapOf: (slot: number) => (solid ? slot : slot * 2),
    slotOf: (j: number) => (solid ? j : j % 2 === 0 ? j / 2 : null)
  }
}

export function slotCenter(slot: number, layout: Layout) {
  const l = ledge(layout)
  return l.x0 + (l.gapOf(slot) + 0.5) * l.pitch
}

export function ledgeBars(layout: Layout): Segment[] {
  const l = ledge(layout)
  return Array.from({ length: l.gaps + 1 }, (_, j) => {
    const x = l.x0 + j * l.pitch
    return { a: { x: x - l.bar / 2, y: ROW.y }, b: { x: x + l.bar / 2, y: ROW.y } }
  })
}

export function gapCover(slot: number, layout: Layout): Segment {
  const l = ledge(layout)
  const x = l.x0 + l.gapOf(slot) * l.pitch
  return {
    a: { x: x + l.bar / 2, y: ROW.y },
    b: { x: x + l.pitch - l.bar / 2, y: ROW.y }
  }
}

export function coinX(chute: number, level: number) {
  if (chute < TRAY.count) return trayCenter(chute)
  const base = chute === RESERVE_LEFT ? 0 : WORLD.w - RESERVE.w
  return base + WORLD.coinR + (level % RESERVE.cols) * WORLD.coinR * 2
}

export function coinY(chute: number, level: number) {
  return restY(chute < TRAY.count ? level : Math.floor(level / RESERVE.cols))
}

const dividerTops = Array.from({ length: TRAY.count + 1 }, (_, j) =>
  j === 0 || j === TRAY.count
    ? RESERVE.top
    : TRAY.top + Math.abs(j - TRAY.count / 2) * TRAY.step
)

export const chuteCap = (i: number) =>
  Math.floor((WORLD.h - Math.max(dividerTops[i]!, dividerTops[i + 1]!)) / stackStep)

export const TRAY_CAP = Array.from({ length: TRAY.count }, (_, i) => chuteCap(i))
  .reduce((a, b) => a + b, 0)

const mirror = (s: Segment): Segment => ({
  a: { x: WORLD.w - s.a.x, y: s.a.y },
  b: { x: WORLD.w - s.b.x, y: s.b.y }
})

const midL: Segment = { a: { x: 110, y: 220 }, b: { x: 210, y: 266 } }
const post: Segment = { a: { x: WORLD.w / 2, y: 256 }, b: { x: WORLD.w / 2, y: 300 } }
const sideL: Segment = { a: { x: 0, y: 320 }, b: { x: 100, y: 372 } }

const dividers: Segment[] = dividerTops.map((top, j) => ({
  a: { x: TRAY.x0 + j * TRAY.pitch, y: top },
  b: { x: TRAY.x0 + j * TRAY.pitch, y: WORLD.h }
}))

export const walls: Segment[] = [
  midL,
  mirror(midL),
  post,
  sideL,
  mirror(sideL),
  ...dividers
]

function collide(p: Vec, v: Vec, c: Vec, r: number) {
  const dx = p.x - c.x
  const dy = p.y - c.y
  const dist = Math.hypot(dx, dy) || 0.0001
  if (dist >= r) return
  const nx = dx / dist
  const ny = dy / dist
  p.x = c.x + nx * r
  p.y = c.y + ny * r
  const vn = v.x * nx + v.y * ny
  if (vn < 0) {
    v.x -= (1 + BOUNCE) * vn * nx
    v.y -= (1 + BOUNCE) * vn * ny
  }
}

function closest(p: Vec, { a, b }: Segment): Vec {
  const abx = b.x - a.x
  const aby = b.y - a.y
  const t = Math.max(0, Math.min(1, ((p.x - a.x) * abx + (p.y - a.y) * aby) / (abx * abx + aby * aby)))
  return { x: a.x + abx * t, y: a.y + aby * t }
}

export function simulate(force: number, stacks: number[], open: boolean[], layout: Layout) {
  const l = ledge(layout)
  const covers = open.flatMap((o, i) => (o ? [] : [gapCover(i, layout)]))
  const solid = [...ledgeBars(layout), ...walls, ...covers]

  const jitter = 1 + (Math.random() - 0.5) * 0.04
  const p: Vec = { x: WORLD.w - WORLD.coinR - 8, y: 40 }
  const v: Vec = { x: -(150 + force * 750) * jitter, y: -force * 120 }
  const frames: Vec[] = [{ ...p }]
  const gateY = ROW.y + WORLD.coinR
  let slot: number | null = null
  let slotAt = 0
  let chute: number | null = null

  for (let i = 0; i < 30000 && chute === null; i++) {
    const prevY = p.y

    v.y += GRAVITY * DT
    p.x += v.x * DT
    p.y += v.y * DT

    for (const w of solid) collide(p, v, closest(p, w), WORLD.coinR)

    if (p.x < WORLD.coinR) {
      p.x = WORLD.coinR
      v.x = Math.abs(v.x) * BOUNCE
    }
    if (p.x > WORLD.w - WORLD.coinR) {
      p.x = WORLD.w - WORLD.coinR
      v.x = -Math.abs(v.x) * BOUNCE
    }

    if (prevY <= gateY && p.y > gateY) {
      const j = Math.floor((p.x - l.x0) / l.pitch)
      if (j >= 0 && j < l.gaps) {
        slot = l.slotOf(j)
        slotAt = frames.length * 4 * DT
      }
    }

    if (p.y > TRAY.top) {
      const c = trayAt(p.x)
      const rest = restY(stacks[c] ?? 0)
      if (p.y >= rest) {
        p.x = trayCenter(c)
        p.y = rest
        chute = c
      }
    }

    if (chute !== null || i % 4 === 0) frames.push({ ...p })
  }

  return {
    frames,
    slot,
    slotAt,
    chute: chute ?? trayAt(p.x),
    duration: frames.length * 4 * DT
  }
}
