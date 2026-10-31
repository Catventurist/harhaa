<script setup lang="ts">
const { data: terms } = await useAsyncData('terms', () =>
  queryCollection('terms').all()
)

type Term = NonNullable<typeof terms.value>[number]
type SortKey = 'orwellScore' | 'intensity' | 'frequency' | 'title'

const search = ref('')
const mechanisms = ref<Term['mechanism'][]>([])
const tones = ref<Term['tone'][]>([])
const sort = ref<SortKey>('orwellScore')

const sortItems: { label: string, value: SortKey }[] = [
  { label: 'Orwell score', value: 'orwellScore' },
  { label: 'Intensity', value: 'intensity' },
  { label: 'Frequency', value: 'frequency' },
  { label: 'A to Z', value: 'title' }
]

const mechanismItems = computed(() =>
  [...new Set((terms.value ?? []).map(t => t.mechanism))].sort()
)
const toneItems = computed(() =>
  [...new Set((terms.value ?? []).map(t => t.tone))].sort()
)

const filtered = computed(() => {
  const q = search.value.trim().toLowerCase()
  const key = sort.value

  return (terms.value ?? [])
    .filter((t) => {
      if (mechanisms.value.length && !mechanisms.value.includes(t.mechanism)) return false
      if (tones.value.length && !tones.value.includes(t.tone)) return false
      if (!q) return true
      return [t.title, t.description, ...t.collocations].some(v => v?.toLowerCase().includes(q))
    })
    .sort((a, b) => {
      if (key === 'title') return a.title.localeCompare(b.title)
      return (b[key] ?? 0) - (a[key] ?? 0)
    })
})

function reset() {
  search.value = ''
  mechanisms.value = []
  tones.value = []
}

useSeoMeta({
  title: 'Terms',
  description: 'A field guide to official language, and what it leaves out.'
})
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="max-w-5xl">
      <EPageIntro
        title="Terms"
        description="A field guide to official language, and what it leaves out."
      />

      <Motion
        as="div"
        class="mb-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.1 }"
      >
        <UInput
          v-model="search"
          name="terms"
          icon="i-lucide-search"
          placeholder="Search terms"
        />
        <USelectMenu
          v-model="mechanisms"
          :items="mechanismItems"
          multiple
          placeholder="Mechanism"
        />
        <USelectMenu
          v-model="tones"
          :items="toneItems"
          multiple
          placeholder="Tone"
        />
        <USelect
          v-model="sort"
          :items="sortItems"
          value-key="value"
        />
      </Motion>

      <AnimatePresence mode="wait">
        <Motion
          :key="filtered.length"
          as="p"
          class="mb-4 text-sm text-muted"
          :initial="{ opacity: 0, y: -6 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: 6 }"
          :transition="{ duration: 0.2 }"
        >
          {{ filtered.length }} of {{ terms?.length ?? 0 }} terms
        </Motion>
      </AnimatePresence>

      <div
        v-if="filtered.length"
        class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
      >
        <ETermCard
          v-for="(term, i) in filtered"
          :key="term.path"
          :term="term"
          :index="i"
        />
      </div>

      <Motion
        v-else
        as="div"
        :initial="{ opacity: 0, scale: 0.95 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 120, damping: 14 }"
      >
        <UEmpty
          icon="i-lucide-file-search"
          title="No terms found"
          description="Your search has been referred to a committee."
          :actions="[{ label: 'Reset filters', color: 'neutral', variant: 'subtle', onClick: reset }]"
        />
      </Motion>
    </UContainer>
  </section>
</template>
