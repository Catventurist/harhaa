<script setup lang="ts">
const { data: terms } = await useAsyncData('terms', () =>
  queryCollection('terms').all()
)

type SortKey = 'shared' | 'orwellScore' | 'title'

const selected = ref<string[]>([])
const minShared = ref(0)
const sort = ref<SortKey>('shared')

const sortItems: { label: string, value: SortKey }[] = [
  { label: 'Most shared', value: 'shared' },
  { label: 'Orwell score', value: 'orwellScore' },
  { label: 'A to Z', value: 'title' }
]

const regimes = computed(() =>
  [...new Set((terms.value ?? []).flatMap(t => t.crossRegime.map(r => r.regime)))].sort()
)

const visibleRegimes = computed(() =>
  selected.value.length ? regimes.value.filter(r => selected.value.includes(r)) : regimes.value
)

const maxShared = computed(() =>
  Math.max(1, ...(terms.value ?? []).map(t => t.crossRegime.length))
)

const rows = computed(() => {
  const key = sort.value

  return (terms.value ?? [])
    .map(term => ({ term, shared: term.crossRegime.length }))
    .filter(row => row.shared >= minShared.value)
    .sort((a, b) => {
      if (key === 'title') return a.term.title.localeCompare(b.term.title)
      if (key === 'orwellScore') return b.term.orwellScore - a.term.orwellScore
      return b.shared - a.shared
    })
})

function entry(row: (typeof rows.value)[number], regime: string) {
  return row.term.crossRegime.find(r => r.regime === regime)
}

function reset() {
  selected.value = []
  minShared.value = 0
  sort.value = 'shared'
}

const title = 'Compare regimes'
const description = 'The same words, under different management.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="max-w-6xl">
      <EPageIntro
        :title="title"
        :description="description "
      />

      <Motion
        as="div"
        class="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <USelectMenu
          v-model="selected"
          :items="regimes"
          multiple
          placeholder="Regimes"
          class="lg:col-span-2"
        />
        <USelect
          v-model="sort"
          :items="sortItems"
          value-key="value"
        />
        <div>
          <div class="mb-2 flex justify-between text-xs text-muted">
            <span>Found in at least</span>
            <span>{{ minShared }} regimes</span>
          </div>
          <USlider
            v-model="minShared"
            :min="0"
            :max="maxShared"
          />
        </div>
      </Motion>

      <Motion
        v-if="rows.length"
        as="div"
        class="overflow-x-auto rounded-lg border border-default"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.2 }"
      >
        <table class="w-full min-w-max text-left text-sm">
          <thead class="bg-muted text-xs uppercase tracking-widest text-muted">
            <tr>
              <th class="sticky left-0 z-10 bg-muted px-4 py-3 font-semibold">
                EU term
              </th>
              <th
                v-for="regime in visibleRegimes"
                :key="regime"
                class="px-4 py-3 font-semibold"
              >
                {{ regime }}
              </th>
              <th class="px-4 py-3 text-right font-semibold">
                Shared
              </th>
            </tr>
          </thead>

          <tbody class="divide-y divide-default">
            <Motion
              v-for="(row, i) in rows"
              :key="row.term.path"
              as="tr"
              class="group hover:bg-elevated/60"
              :initial="{ opacity: 0, x: -12 }"
              :animate="{ opacity: 1, x: 0 }"
              :transition="{ duration: 0.3, delay: Math.min(i * 0.04, 0.5) }"
            >
              <th class="sticky left-0 z-10 bg-default px-4 py-3 font-medium group-hover:bg-elevated">
                <ULink
                  :to="row.term.path"
                  class="text-highlighted hover:text-primary"
                >
                  {{ row.term.title }}
                </ULink>
              </th>

              <td
                v-for="regime in visibleRegimes"
                :key="regime"
                class="px-4 py-3"
              >
                <UTooltip
                  v-if="entry(row, regime)?.note"
                  :text="entry(row, regime)!.note"
                >
                  <span class="cursor-help border-b border-dotted border-muted text-default">
                    {{ entry(row, regime)!.term }}
                  </span>
                </UTooltip>
                <span
                  v-else-if="entry(row, regime)"
                  class="text-default"
                >
                  {{ entry(row, regime)!.term }}
                </span>
                <span
                  v-else
                  class="text-dimmed"
                >
                  -
                </span>
              </td>

              <td class="px-4 py-3 text-right">
                <UBadge
                  :label="row.shared === regimes.length ? 'Universal' : String(row.shared)"
                  :color="row.shared === regimes.length ? 'secondary' : 'neutral'"
                  variant="subtle"
                />
              </td>
            </Motion>
          </tbody>
        </table>
      </Motion>

      <Motion
        v-else
        as="div"
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 120, damping: 14 }"
      >
        <UEmpty
          icon="i-lucide-table"
          title="No term is shared that widely"
          description="This is the only comparison we could not find a precedent for."
          :actions="[{ label: 'Reset filters', color: 'neutral', variant: 'subtle', onClick: reset }]"
        />
      </Motion>
    </UContainer>
  </section>
</template>
