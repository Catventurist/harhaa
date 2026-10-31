<script setup lang="ts">
import { Motion } from 'motion-v'
import { methods, methodIds, sampleBallots, palette, toWord } from '~/data/div'
import type { MethodId } from '~/data/div'

const title = 'Voting Chamber'
const description = `One set of ballots, ${toWord(methodIds.length)} ways to count them. See where the methods disagree.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const route = useRoute()
const router = useRouter()
const toast = useToast()

const text = ref(typeof route.query.b === 'string' ? route.query.b : sampleBallots)
const seats = ref(Math.min(200, Math.max(1, Number(route.query.s) || 27)))
const method = ref<MethodId>(
  methodIds.includes(route.query.m as MethodId) ? route.query.m as MethodId : 'plurality'
)

let timer: ReturnType<typeof setTimeout> | undefined

watch([text, seats, method], () => {
  clearTimeout(timer)
  timer = setTimeout(() => {
    router.replace({ query: { b: text.value, s: String(seats.value), m: method.value } })
  }, 400)
})

onBeforeUnmount(() => clearTimeout(timer))

const parsed = computed(() => parseBallots(text.value))
const results = computed(() => tally(parsed.value.ballots, parsed.value.options))
const current = computed(() => results.value.find(r => r.id === method.value)!)

const colors = computed(() => Object.fromEntries(
  parsed.value.options.map((o, i) => [o, palette[i % palette.length]!])
))

const allocation = computed(() => allocateSeats(current.value.scores, seats.value))

const seatList = computed(() => {
  const points = hemicycle(seats.value)
  const owners: string[] = []
  for (const [name, n] of Object.entries(allocation.value)) {
    for (let i = 0; i < n; i++) owners.push(name)
  }
  return points.map((p, i) => ({ ...p, owner: owners[i] ?? null }))
})

const totalBallots = computed(() => parsed.value.ballots.reduce((a, b) => a + b.count, 0))
const distinctWinners = computed(() => new Set(results.value.map(r => r.winner).filter(Boolean)))

const tabs = methodIds.map(id => ({ label: methods[id].label, value: id, icon: methods[id].icon }))

function width(scores: Record<string, number>, name: string) {
  const max = Math.max(...Object.values(scores), 1)
  return `${(scores[name]! / max) * 100}%`
}

async function copyLink() {
  const href = router.resolve({
    query: { b: text.value, s: String(seats.value), m: method.value }
  }).href
  await navigator.clipboard.writeText(new URL(href, window.location.origin).href)
  toast.add({ title: 'Link copied', description: 'Anyone with it will see the same chamber.', icon: 'i-lucide-link' })
}

function exportCsv() {
  const rows = ['method,option,score,seats,winner']
  for (const result of results.value) {
    for (const name of parsed.value.options) {
      const seatCount = result.id === method.value ? (allocation.value[name] ?? 0) : ''
      rows.push([
        methods[result.id].label,
        `"${name.replaceAll('"', '""')}"`,
        result.scores[name],
        seatCount,
        result.winner === name
      ].join(','))
    }
  }
  downloadFile('chamber-results.csv', rows.join('\n'), 'text/csv')
}

function exportJson() {
  const data = {
    seats: seats.value,
    selectedMethod: method.value,
    ballots: parsed.value.ballots,
    options: parsed.value.options,
    allocation: allocation.value,
    results: results.value
  }
  downloadFile('chamber-results.json', JSON.stringify(data, null, 2), 'application/json')
}
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="space-y-14">
      <EPageIntro
        :title="title"
        :description="description"
      />

      <div class="grid gap-10 lg:grid-cols-5">
        <div class="space-y-5 lg:col-span-2">
          <UFormField
            label="Ballots"
            description="One per line. Rank with >, prefix a count with 12:"
          >
            <UTextarea
              v-model="text"
              :rows="10"
              class="w-full font-mono"
            />
          </UFormField>

          <UFormField label="Seats in the chamber">
            <UInputNumber
              v-model="seats"
              :min="1"
              :max="200"
              class="w-full"
            />
          </UFormField>

          <p class="text-sm text-muted">
            {{ totalBallots }} ballots, {{ parsed.options.length }} options.
          </p>

          <div class="flex flex-wrap gap-2">
            <UButton
              icon="i-lucide-link"
              label="Copy link"
              color="neutral"
              variant="subtle"
              @click="copyLink"
            />
            <UButton
              icon="i-lucide-file-spreadsheet"
              label="CSV"
              color="neutral"
              variant="subtle"
              @click="exportCsv"
            />
            <UButton
              icon="i-lucide-braces"
              label="JSON"
              color="neutral"
              variant="subtle"
              @click="exportJson"
            />
          </div>
        </div>

        <div class="space-y-5 lg:col-span-3">
          <UTabs
            v-model="method"
            :items="tabs"
            :content="false"
            size="sm"
            class="relative z-10"
          />

          <p class="text-sm text-muted">
            {{ methods[method].description }}
          </p>

          <div class="relative isolate mx-auto mt-10 aspect-2/1 w-full max-w-2xl pt-4">
            <Motion
              v-for="(seat, i) in seatList"
              :key="`${method}-${i}-${seat.owner}`"
              as="span"
              class="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full sm:size-5"
              :style="{
                left: `${seat.x}%`,
                top: `${seat.y}%`,
                backgroundColor: seat.owner ? colors[seat.owner] : 'var(--ui-border)'
              }"
              :initial="{ scale: 0, opacity: 0 }"
              :animate="{ scale: 1, opacity: 1 }"
              :transition="{ type: 'spring', stiffness: 220, damping: 16, delay: i * 0.012 }"
              :while-hover="{ scale: 1.5 }"
              :title="seat.owner ?? 'Unassigned'"
            />

            <div class="absolute inset-x-0 bottom-0 text-center">
              <p class="text-lg font-semibold text-highlighted">
                {{ current.winner ?? 'No single winner' }}
              </p>
              <p class="text-xs text-muted">
                {{ current.note }}
              </p>
            </div>
          </div>

          <div class="flex flex-wrap justify-center gap-x-5 gap-y-2">
            <div
              v-for="name in parsed.options"
              :key="name"
              class="flex items-center gap-2 text-sm"
            >
              <span
                class="size-3 rounded-full"
                :style="{ backgroundColor: colors[name] }"
              />
              <span class="text-default">{{ name }}</span>
              <span class="text-muted">{{ allocation[name] ?? 0 }}</span>
            </div>
          </div>
        </div>
      </div>

      <div class="space-y-6">
        <div class="flex flex-wrap items-center justify-between gap-3">
          <h2 class="text-2xl font-bold text-highlighted">
            Compared
          </h2>
          <UBadge
            :color="distinctWinners.size > 1 ? 'warning' : 'success'"
            variant="subtle"
            :label="distinctWinners.size > 1
              ? `${distinctWinners.size} different winners across methods`
              : 'All methods agree'"
          />
        </div>

        <div class="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          <Motion
            v-for="(result, i) in results"
            :key="result.id"
            as="div"
            class="border border-default bg-default p-5"
            :initial="{ opacity: 0, y: 24 }"
            :while-in-view="{ opacity: 1, y: 0 }"
            :in-view-options="{ once: true }"
            :transition="{ duration: 0.45, delay: i * 0.08 }"
            :while-hover="{ y: -4 }"
          >
            <div class="mb-4 flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <UIcon
                  :name="methods[result.id].icon"
                  class="size-5 text-primary"
                />
                <h3 class="font-semibold text-highlighted">
                  {{ methods[result.id].label }}
                </h3>
              </div>
              <UBadge
                color="secondary"
                variant="solid"
                :label="result.winner ?? 'No winner'"
              />
            </div>

            <div class="space-y-3">
              <div
                v-for="name in parsed.options"
                :key="name"
              >
                <div class="mb-1 flex justify-between text-xs text-muted">
                  <span>{{ name }}</span>
                  <span>{{ result.scores[name] }}</span>
                </div>
                <div class="h-2 bg-elevated">
                  <Motion
                    as="div"
                    class="h-full"
                    :style="{ backgroundColor: colors[name] }"
                    :initial="{ width: '0%' }"
                    :animate="{ width: width(result.scores, name) }"
                    :transition="{ type: 'spring', stiffness: 80, damping: 18 }"
                  />
                </div>
              </div>
            </div>

            <p class="mt-4 text-xs text-muted">
              {{ result.note }}
            </p>
          </Motion>
        </div>
      </div>
    </UContainer>
  </section>
</template>
