<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import {
  WORLD,
  ROW,
  TRAY,
  TRAY_CAP,
  RESERVE_LEFT,
  RESERVE_RIGHT,
  walls,
  simulate,
  coinX,
  coinY,
  slotCenter,
  gapCover
} from '~/utils/physics'
import { pajaRules } from '~/data/div'

type Coin = { id: number, chute: number, level: number }

const MAX_PULL = 140

const toast = useToast()
const pull = ref(0)
const hit = ref<number | null>(null)
const run = ref<ReturnType<typeof simulate> | null>(null)
const runId = ref(0)

const over = ref(false)

function seed(chute: number, offset: number): Coin[] {
  return Array.from({ length: pajaRules.reserveCoins }, (_, i) => ({
    id: -(offset + i + 1),
    chute,
    level: i
  }))
}

function initialCoins(): Coin[] {
  const main: Coin[] = Array.from({ length: pajaRules.mainCoins }, (_, i) => ({
    id: -(1000 + i),
    chute: 3 + (i % 4),
    level: Math.floor(i / 4)
  }))
  return [...seed(RESERVE_LEFT, 0), ...seed(RESERVE_RIGHT, 100), ...main]
}

const canPull = computed(() => balance.value >= 1 && !run.value && !over.value)

function reset() {
  balance.value = pajaRules.startCoins
  coins.value = initialCoins()
  run.value = null
  hit.value = null
  lit.value = null
  pull.value = 0
  over.value = false
  layout.value = 'passing'
  pattern.value = 'all'
  resetView()
}

const COIN = pajaRules.coin
const eur = (coins: number) => `€${(coins * COIN).toFixed(2)}`
const slots = pajaRules.slots
const balance = useState('pajatso-balance', () => pajaRules.startCoins)
const coins = useState<Coin[]>('pajatso-coins', initialCoins)

const stacks = computed(() =>
  Array.from({ length: TRAY.count }, (_, i) => coins.value.filter(c => c.chute === i).length)
)

function onDrag(_: unknown, info: { offset: { x: number } }) {
  pull.value = Math.min(1, Math.max(0, info.offset.x / MAX_PULL))
}

const lit = ref<number | null>(null)

const patterns = [
  { label: 'All gaps', value: 'all', open: [true, true, true, true, true, true, true, true, true] },
  { label: 'Alternate', value: 'alternate', open: [true, false, true, false, true, false, true, false, true] },
  { label: 'Inner', value: 'inner', open: [false, false, true, true, true, true, true, false, false] },
  { label: 'Outer', value: 'outer', open: [true, true, true, false, false, false, true, true, true] }
]

const open = computed(() => patterns.find(p => p.value === pattern.value)!.open)
const route = useRoute()
const router = useRouter()

function queryRef<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  return computed<T>({
    get: () => {
      const value = route.query[key]
      return allowed.includes(value as T) ? (value as T) : fallback
    },
    set: (value) => {
      const rest = Object.fromEntries(
        Object.entries(route.query).filter(([k]) => k !== key)
      )
      router.replace({ query: value === fallback ? rest : { ...rest, [key]: value } })
    }
  })
}

const layout = queryRef<Layout>('layout', ['passing', 'solid'], 'passing')
const pattern = queryRef('pattern', patterns.map(p => p.value), 'all')

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href)
  toast.add({ title: 'Link copied', icon: 'i-lucide-link' })
}

const layouts = [
  { label: 'Solid ledge', value: 'solid' },
  { label: 'Gaps between slots', value: 'passing' }
]

const bars = computed(() => ledgeBars(layout.value))

function launch() {
  const force = pull.value
  pull.value = 0
  if (!canPull.value || force < 0.05) return
  const inMain = stacks.value.reduce((a, b) => a + b, 0)
  if (inMain >= TRAY_CAP - 4) {
    toast.add({ title: 'Collector is full', color: 'warning' })
    return
  }
  balance.value--
  hit.value = null
  lit.value = null

  const r = simulate(force, stacks.value, open.value, layout.value)
  run.value = r
  runId.value++
  if (followCam.value) follow(r)

  if (r.slot !== null) {
    setTimeout(() => {
      lit.value = r.slot
    }, r.slotAt * 1000)
  }
}

function releaseCoins(n: number, keepId: number) {
  let released = 0
  while (released < n) {
    const pool = coins.value.filter(c => c.id !== keepId)
    if (!pool.length) break
    const reserve = pool.filter(c => c.chute >= TRAY.count)
    const source = reserve.length ? reserve : pool
    const top = source.reduce((a, c) => (c.level > a.level ? c : a))
    coins.value = coins.value.filter(c => c.id !== top.id)
    released++
  }
  return released
}

function relevel() {
  const counts = Array.from({ length: TRAY.count + 2 }, () => 0)
  coins.value = [...coins.value]
    .sort((a, b) => a.level - b.level)
    .map(c => ({ ...c, level: counts[c.chute]!++ }))
}

function onLanded() {
  const r = run.value
  if (!r) return
  run.value = null

  const slot = r.slot === null ? null : slots[r.slot]!
  if (r.slot !== null) hit.value = r.slot

  coins.value.push({ id: runId.value, chute: r.chute, level: stacks.value[r.chute] ?? 0 })

  if (slot) {
    const got = releaseCoins(slot.coins, runId.value)

    if (slot.refund && got === 0) {
      coins.value = coins.value.filter(c => c.id !== runId.value)
      balance.value++
      toast.add({ title: 'Coin returned', color: 'info' })
    } else {
      balance.value += got
      relevel()
      toast.add({
        title: slot.refund ? 'Coin returned' : `${slot.label}: +${eur(got)}`,
        color: slot.refund ? 'info' : 'success'
      })

      if (!slot.refund && pajaRules.taxWhenEmpty && coins.value.length <= 1) {
        balance.value = 0
        over.value = true
        toast.add({
          title: 'Gambling tax',
          description: 'The machine is empty. It keeps the pot and your original money.',
          color: 'error'
        })
      }
    }
  }

  setTimeout(() => {
    lit.value = null
  }, 1200)
}

const followCam = ref(true)
const view = reactive({ x: 0, y: 0, z: 1 })

const viewBox = computed(() => {
  const w = WORLD.w / view.z
  const h = WORLD.h / view.z
  return `${view.x} ${view.y} ${w} ${h}`
})

function pos(x: number, y: number) {
  const w = WORLD.w / view.z
  const h = WORLD.h / view.z
  return { left: `${((x - view.x) / w) * 100}%`, top: `${((y - view.y) / h) * 100}%` }
}

let raf = 0

function resetView() {
  cancelAnimationFrame(raf)
  view.x = 0
  view.y = 0
  view.z = 1
}

function follow(r: ReturnType<typeof simulate>) {
  cancelAnimationFrame(raf)
  const start = performance.now()
  const n = r.frames.length
  const zoom = 2.2

  const tick = (now: number) => {
    const t = (now - start) / 1000
    const flying = t < r.duration
    const k = Math.min(t / r.duration, 1) * (n - 1)
    const i = Math.floor(k)
    const a = r.frames[i]!
    const b = r.frames[Math.min(i + 1, n - 1)]!
    const f = k - i
    const cx = a.x + (b.x - a.x) * f
    const cy = a.y + (b.y - a.y) * f

    const targetZ = flying ? zoom : 1
    const w = WORLD.w / targetZ
    const h = WORLD.h / targetZ
    const tx = flying ? Math.min(Math.max(cx - w / 2, 0), WORLD.w - w) : 0
    const ty = flying ? Math.min(Math.max(cy - h / 2, 0), WORLD.h - h) : 0

    view.x += (tx - view.x) * 0.18
    view.y += (ty - view.y) * 0.18
    view.z += (targetZ - view.z) * 0.12

    if (!flying && Math.abs(view.z - 1) < 0.01) {
      resetView()
      return
    }
    raf = requestAnimationFrame(tick)
  }

  raf = requestAnimationFrame(tick)
}

onBeforeUnmount(() => cancelAnimationFrame(raf))
</script>

<template>
  <UCard class="max-w-xl mx-auto">
    <template #header>
      <div class="flex items-center justify-between gap-4">
        <div class="flex gap-2">
          <UBadge
            :label="`Balance: ${eur(balance)}`"
            size="lg"
            variant="outline"
            class="tabular-nums"
          />
          <UBadge
            :label="`Collector: ${eur(coins.length)}`"
            size="lg"
            variant="subtle"
            color="neutral"
            class="tabular-nums"
          />
        </div>

        <div class="relative w-48 rounded-full bg-elevated p-1 pb-2">
          <UProgress
            :model-value="pull * 100"
            size="xs"
            class="absolute inset-x-3 bottom-0.5"
          />
          <Motion
            as="div"
            class="w-fit touch-none"
            :drag="canPull ? 'x' : false"
            :drag-constraints="{ left: 0, right: MAX_PULL }"
            :drag-elastic="0"
            drag-snap-to-origin
            :while-drag="{ scale: 1.05 }"
            @drag="onDrag"
            @drag-end="launch"
          >
            <UButton
              label="COIN"
              trailing-icon="i-lucide-arrow-right"
              :disabled="!canPull"
            />
          </Motion>
        </div>
      </div>
    </template>

    <div class="relative overflow-hidden">
      <div class="absolute inset-0 pointer-events-none">
        <Motion
          v-for="(s, i) in slots"
          :key="i"
          as="div"
          class="absolute -translate-x-1/2 rounded-md"
          :class="open[i] ? '' : 'opacity-30'"
          :style="pos(slotCenter(i, layout), ROW.y + 8)"
          :animate="{
            scale: lit === i ? 1.3 : 1,
            boxShadow: lit === i ? '0 0 16px 4px var(--ui-warning)' : '0 0 0 0 transparent'
          }"
        >
          <UBadge
            :label="s.label"
            size="sm"
            :variant="lit === i ? 'outline' : 'subtle'"
            :color="lit === i ? 'warning' : s.refund ? 'info' : 'neutral'"
          />
        </Motion>
      </div>

      <svg
        :viewBox="viewBox"
        class="relative w-full"
      >
        <line
          v-for="(w, i) in [...bars, ...walls]"
          :key="i"
          :x1="w.a.x"
          :y1="w.a.y"
          :x2="w.b.x"
          :y2="w.b.y"
          class="stroke-(--ui-border-accented)"
          stroke-width="4"
          stroke-linecap="round"
        />

        <template
          v-for="(o, j) in open"
          :key="`cover-${j}`"
        >
          <line
            v-if="!o"
            :x1="gapCover(j, layout).a.x"
            :y1="gapCover(j, layout).a.y"
            :x2="gapCover(j, layout).b.x"
            :y2="gapCover(j, layout).b.y"
            class="stroke-error"
            stroke-width="4"
            stroke-linecap="round"
          />
        </template>
        <AnimatePresence>
          <Motion
            v-for="c in coins"
            :key="c.id"
            as="g"
            :exit="{ y: 120, opacity: 0 }"
          >
            <circle
              :cx="coinX(c.chute, c.level)"
              :cy="coinY(c.chute, c.level)"
              :r="WORLD.coinR"
              class="fill-secondary opacity-60"
            />
          </Motion>
        </AnimatePresence>

        <Motion
          v-if="run"
          :key="runId"
          as="g"
          :initial="{ x: run.frames[0]!.x, y: run.frames[0]!.y }"
          :animate="{ x: run.frames.map(f => f.x), y: run.frames.map(f => f.y) }"
          :transition="{ duration: run.duration, ease: 'linear' }"
          @animation-complete="onLanded"
        >
          <circle
            cx="0"
            cy="0"
            :r="WORLD.coinR"
            class="fill-secondary opacity-80"
          />
        </Motion>
      </svg>
    </div>
    <template #footer>
      <div class="flex flex-wrap items-center gap-3">
        <USelectMenu
          v-model="layout"
          :items="layouts"
          value-key="value"
          :search-input="false"
          :disabled="!!run"
          class="w-48"
        />
        <USelectMenu
          v-model="pattern"
          :items="patterns"
          value-key="value"
          :search-input="false"
          :disabled="!!run"
          icon="i-lucide-toggle-right"
          class="w-40"
        />
        <UButton
          label="Reset"
          icon="i-lucide-rotate-ccw"
          color="neutral"
          variant="outline"
          class="ml-auto"
          @click="reset"
        />
        <USwitch
          v-model="followCam"
          label="Follow coin"
          :disabled="!!run"
        />
        <UButton
          label="Copy link"
          icon="i-lucide-link"
          color="neutral"
          variant="ghost"
          @click="copyLink"
        />
        <UAlert
          v-if="over"
          class="w-full"
          color="error"
          variant="subtle"
          icon="i-lucide-landmark"
          title="Gambling tax"
          description="The machine is empty. It took the pot and your original money."
        />
      </div>
    </template>
  </UCard>
</template>
