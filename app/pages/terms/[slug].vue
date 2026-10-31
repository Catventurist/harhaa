<script setup lang="ts">
const route = useRoute()

const { data: term } = await useAsyncData(`term-${route.params.slug}`, () =>
  queryCollection('terms').path(`/terms/${route.params.slug}`).first()
)

if (!term.value) {
  throw createError({ status: 404, statusText: 'Term not found', fatal: true })
}

const { data: related } = await useAsyncData(`related-${route.params.slug}`, async () => {
  const all = await queryCollection('terms').all()
  return all.filter(t => term.value!.relatedTerms.includes(t.slug))
})

const view = ref<'official' | 'plain' | 'active'>('official')

const viewItems = [
  { label: 'Official', value: 'official' },
  { label: 'Plain', value: 'plain' },
  { label: 'Active', value: 'active' }
]

const activeParts = computed(() => {
  const text = term.value!.activeForm
  const subject = term.value!.hiddenSubject
  const index = text.toLowerCase().indexOf(subject.toLowerCase())
  if (index === -1) return [{ text, highlight: false }]
  return [
    { text: text.slice(0, index), highlight: false },
    { text: text.slice(index, index + subject.length), highlight: true },
    { text: text.slice(index + subject.length), highlight: false }
  ].filter(p => p.text)
})

const flow = computed(() => [
  { label: 'Hidden subject', value: term.value!.hiddenSubject, icon: 'i-lucide-eye-off' },
  { label: 'Tool', value: term.value!.tool, icon: 'i-lucide-wrench' },
  { label: 'Patient', value: term.value!.patient, icon: 'i-lucide-user' },
  { label: 'Consequence', value: term.value!.consequence ?? 'Unstated', icon: 'i-lucide-triangle-alert' }
])

useSeoMeta({
  title: term.value.title,
  description: term.value.description
})
</script>

<template>
  <section
    v-if="term"
    class="py-4"
  >
    <UContainer class="max-w-4xl">
      <UButton
        to="/terms"
        icon="i-lucide-arrow-left"
        label="All terms"
        color="neutral"
        variant="link"
        class="mb-6 -ml-2.5"
      />

      <Motion
        as="div"
        class="mb-10"
        :initial="{ y: 24 }"
        :animate="{ y: 0 }"
        :transition="{ duration: 0.6 }"
      >
        <div class="flex flex-wrap gap-2">
          <UBadge
            :label="term.mechanism"
            color="secondary"
            variant="subtle"
          />
          <UBadge
            :label="term.tone"
            color="neutral"
            variant="outline"
          />
          <UBadge
            :label="term.temporality"
            color="neutral"
            variant="outline"
          />
        </div>
        <h1 class="mt-4 text-4xl font-bold text-highlighted sm:text-5xl">
          {{ term.title }}
        </h1>
        <p class="mt-4 text-lg text-muted">
          {{ term.description }}
        </p>
      </Motion>

      <Motion
        as="div"
        class="rounded-lg border border-default bg-default p-6"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.5, delay: 0.15 }"
      >
        <UTabs
          v-model="view"
          :items="viewItems"
          :content="false"
          size="sm"
        />

        <div class="mt-6 min-h-24">
          <AnimatePresence mode="wait">
            <Motion
              :key="view"
              as="p"
              class="text-xl leading-relaxed text-highlighted"
              :initial="{ opacity: 0, y: 12, filter: 'blur(4px)' }"
              :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
              :exit="{ opacity: 0, y: -12, filter: 'blur(4px)' }"
              :transition="{ duration: 0.25 }"
            >
              <template v-if="view === 'official'">
                {{ term.example.text }}
              </template>
              <template v-else-if="view === 'plain'">
                {{ term.description }}
              </template>
              <template v-else>
                <template
                  v-for="(part, i) in activeParts"
                  :key="i"
                >
                  <span
                    v-if="part.highlight"
                    class="font-semibold text-primary"
                  >{{ part.text }}</span>
                  <span v-else>{{ part.text }}</span>
                </template>
              </template>
            </Motion>
          </AnimatePresence>
        </div>

        <p class="mt-4 text-xs text-muted">
          {{ term.example.source }}
        </p>
      </Motion>

      <Motion
        as="div"
        class="mt-10 grid gap-3 sm:grid-cols-2"
        initial="hidden"
        :while-in-view="'show'"
        :in-view-options="{ once: true, amount: 0.2 }"
        :variants="{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }"
      >
        <Motion
          v-for="step in flow"
          :key="step.label"
          as="div"
          class="rounded-lg border border-default p-4"
          :variants="{
            hidden: { opacity: 0, y: 24 },
            show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
          }"
        >
          <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
            <UIcon
              :name="step.icon"
              class="size-4"
            />
            {{ step.label }}
          </div>
          <p class="mt-2 font-medium text-highlighted">
            {{ step.value }}
          </p>
        </Motion>
      </Motion>

      <Motion
        as="div"
        class="mt-10 space-y-8"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true, amount: 0.1 }"
        :transition="{ duration: 0.6 }"
      >
        <div>
          <h2 class="text-sm font-semibold uppercase tracking-widest text-muted">
            Collocations
          </h2>
          <div class="mt-3 flex flex-wrap gap-2">
            <UBadge
              v-for="word in term.collocations"
              :key="word"
              :label="word"
              color="neutral"
              variant="subtle"
            />
          </div>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-widest text-muted">
            Left unclear
          </h2>
          <p class="mt-3 text-default">
            {{ term.ambiguity }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-widest text-muted">
            What a critic would call it
          </h2>
          <p class="mt-3 text-lg font-semibold text-primary">
            {{ term.counterTerm }}
          </p>
        </div>

        <div>
          <h2 class="text-sm font-semibold uppercase tracking-widest text-muted">
            Origin
          </h2>
          <p class="mt-3 text-default">
            <span class="font-medium text-highlighted">{{ term.origin.term }}</span>
            ({{ term.origin.language }}, {{ term.origin.year }}). {{ term.origin.context }}
          </p>
        </div>

        <div v-if="term.crossRegime.length">
          <h2 class="text-sm font-semibold uppercase tracking-widest text-muted">
            Other regimes
          </h2>
          <ul class="mt-3 divide-y divide-default rounded-lg border border-default">
            <li
              v-for="entry in term.crossRegime"
              :key="entry.regime"
              class="flex flex-wrap items-baseline gap-x-3 p-3"
            >
              <span class="text-sm text-muted">{{ entry.regime }}</span>
              <span class="font-medium text-highlighted">{{ entry.term }}</span>
              <span
                v-if="entry.note"
                class="text-sm text-muted"
              >{{ entry.note }}</span>
            </li>
          </ul>
        </div>

        <div>
          <div class="mb-1 flex items-center justify-between text-xs text-muted">
            <span>Orwell score</span>
            <span>{{ term.orwellScore }}/10</span>
          </div>
          <UProgress
            :model-value="term.orwellScore"
            :max="10"
            color="secondary"
          />
        </div>

        <UAlert
          icon="i-lucide-quote"
          color="secondary"
          variant="subtle"
          :description="term.irony"
        />

        <ContentRenderer
          :value="term"
        />
      </Motion>

      <Motion
        v-if="related?.length"
        as="div"
        class="mt-12"
        :initial="{ opacity: 0, y: 24 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ duration: 0.6 }"
      >
        <h2 class="mb-4 text-xl font-bold text-highlighted">
          Related terms
        </h2>
        <div class="grid gap-6 sm:grid-cols-2">
          <ETermCard
            v-for="(item, i) in related"
            :key="item.path"
            :term="item"
            :index="i"
          />
        </div>
      </Motion>
    </UContainer>
  </section>
</template>
