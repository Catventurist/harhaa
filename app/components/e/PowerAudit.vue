<script setup lang="ts">
import { auditProbes, auditVerdict, formatMetric, isFinding } from '~/data/div'

const route = useRoute()
const router = useRouter()

const reviewed = computed<number[]>({
  get: () => String(route.query.stamped ?? '')
    .split(',')
    .map(Number)
    .filter(id => auditProbes.some(probe => probe.id === id)),
  set: (ids) => {
    router.replace({ query: { ...route.query, stamped: ids.length ? ids.join(',') : undefined } })
  }
})

const open = ref<number | null>(1)
const filter = ref<string>('all')

const tabs = [
  { label: 'All', value: 'all', icon: 'i-lucide-layout-list' },
  { label: 'Findings', value: 'findings', icon: 'i-lucide-triangle-alert' },
  { label: 'Stamped', value: 'stamped', icon: 'i-lucide-stamp' }
]

const verdictHeading = useTemplateRef<HTMLElement>('verdictHeading')

const isStamped = (id: number) => reviewed.value.includes(id)

const findingsCount = computed(() => auditProbes.filter(isFinding).length)
const progress = computed(() => Math.round((reviewed.value.length / auditProbes.length) * 100))
const allReviewed = computed(() => reviewed.value.length === auditProbes.length)

const visibleProbes = computed(() => auditProbes.filter((probe) => {
  if (filter.value === 'findings') return isFinding(probe)
  if (filter.value === 'stamped') return isStamped(probe.id)
  return true
}))

function toggle(id: number) {
  open.value = open.value === id ? null : id
}

function markReviewed(id: number) {
  if (!isStamped(id)) reviewed.value = [...reviewed.value, id]
}

function reset() {
  reviewed.value = []
  filter.value = 'all'
  open.value = 1
}

watch(allReviewed, async (done) => {
  if (!done) return
  await nextTick()
  verdictHeading.value?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  verdictHeading.value?.focus({ preventScroll: true })
})
</script>

<template>
  <div>
    <Motion
      as="div"
      class="flex flex-wrap items-center gap-2 mb-4"
      :initial="{ opacity: 0, y: -16 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.4 }"
    >
      <UProgress
        :model-value="progress"
        class="flex-1 min-w-40"
      />
      <UBadge
        :label="`${reviewed.length}/${auditProbes.length} reviewed`"
        icon="i-lucide-clipboard-check"
        color="neutral"
        variant="outline"
      />
      <UBadge
        :label="`${findingsCount}/${auditProbes.length} findings`"
        icon="i-lucide-triangle-alert"
        color="warning"
        variant="subtle"
      />
    </Motion>

    <UTabs
      v-model="filter"
      :items="tabs"
      :content="false"
      class="mb-6"
    />

    <UEmpty
      v-if="!visibleProbes.length"
      icon="i-lucide-folder-search"
      title="No files here"
      description="Nothing matches this filter yet."
    />

    <div class="flex flex-col gap-4">
      <AnimatePresence mode="popLayout">
        <Motion
          v-for="(probe, index) in visibleProbes"
          :key="probe.id"
          as="article"
          layout
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0, rotate: isStamped(probe.id) ? [0, -1.5, 1.5, 0] : 0 }"
          :exit="{ opacity: 0, scale: 0.95 }"
          :transition="{
            delay: index * 0.07,
            type: 'spring',
            stiffness: 260,
            damping: 24,
            rotate: { type: 'tween', duration: 0.35 }
          }"
          :while-hover="{ scale: 1.01 }"
        >
          <UCard>
            <template #header>
              <div class="flex items-start justify-between gap-3">
                <div class="flex items-center gap-3">
                  <UIcon
                    :name="probe.icon"
                    class="size-6 shrink-0"
                  />
                  <div>
                    <h2
                      :id="`probe-title-${probe.id}`"
                      class="font-semibold"
                    >
                      {{ probe.id }}. {{ probe.title }}
                    </h2>
                    <p class="text-sm text-muted italic">
                      {{ probe.satire }}
                    </p>
                  </div>
                </div>
                <Motion
                  :key="isStamped(probe.id) ? 'stamped' : isFinding(probe) ? 'finding' : 'pending'"
                  as="span"
                  :initial="{ scale: 1.6, rotate: -8, opacity: 0 }"
                  :animate="{ scale: 1, rotate: 0, opacity: 1 }"
                  :transition="{ type: 'spring', stiffness: 400, damping: 18 }"
                >
                  <UBadge
                    v-if="isStamped(probe.id)"
                    label="Stamped"
                    icon="i-lucide-stamp"
                    color="success"
                    variant="subtle"
                  />
                  <UBadge
                    v-else-if="isFinding(probe)"
                    label="Finding"
                    icon="i-lucide-triangle-alert"
                    :color="probe.color"
                    variant="subtle"
                  />
                  <UBadge
                    v-else
                    label="Inconclusive"
                    icon="i-lucide-circle-help"
                    color="neutral"
                    variant="subtle"
                  />
                </Motion>
              </div>
            </template>

            <div class="flex items-center justify-between gap-3">
              <div class="flex items-center gap-2 text-sm">
                <UIcon
                  name="i-lucide-gauge"
                  class="size-4"
                />
                <span class="text-muted">Outrage index</span>
                <UProgress
                  :model-value="probe.severity"
                  :color="probe.color"
                  class="w-32"
                />
              </div>
              <UButton
                :label="open === probe.id ? 'Close file' : 'Open file'"
                :icon="open === probe.id ? 'i-lucide-folder-open' : 'i-lucide-folder'"
                :aria-expanded="open === probe.id"
                :aria-controls="open === probe.id ? `probe-panel-${probe.id}` : undefined"
                color="neutral"
                variant="ghost"
                size="sm"
                @click="toggle(probe.id)"
              />
            </div>

            <AnimatePresence>
              <Motion
                v-if="open === probe.id"
                :id="`probe-panel-${probe.id}`"
                as="div"
                role="region"
                class="overflow-hidden"
                :aria-labelledby="`probe-title-${probe.id}`"
                :initial="{ height: 0, opacity: 0 }"
                :animate="{ height: 'auto', opacity: 1 }"
                :exit="{ height: 0, opacity: 0 }"
                :transition="{ duration: 0.25 }"
              >
                <div class="pt-4 flex flex-col gap-3">
                  <USeparator />
                  <div class="flex gap-2 text-sm">
                    <UIcon
                      name="i-lucide-search"
                      class="size-4 mt-0.5 shrink-0"
                    />
                    <p>{{ probe.method }}</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-2">
                    <UBadge
                      label="Trigger"
                      icon="i-lucide-flag"
                      color="neutral"
                      variant="outline"
                    />
                    <span class="text-sm">{{ probe.threshold }}</span>
                  </div>
                  <div class="flex items-center gap-2 text-sm">
                    <UIcon
                      name="i-lucide-ruler"
                      class="size-4 shrink-0"
                    />
                    <span>{{ formatMetric(probe.metric) }}</span>
                  </div>
                  <Motion
                    as="div"
                    class="w-fit"
                    :while-tap="{ scale: 0.94 }"
                  >
                    <UButton
                      :label="isStamped(probe.id) ? 'Already stamped' : 'Stamp as inevitable'"
                      icon="i-lucide-stamp"
                      :color="probe.color"
                      :disabled="isStamped(probe.id)"
                      @click="markReviewed(probe.id)"
                    />
                  </Motion>
                </div>
              </Motion>
            </AnimatePresence>
          </UCard>
        </Motion>
      </AnimatePresence>
    </div>

    <AnimatePresence>
      <Motion
        v-if="allReviewed"
        as="section"
        class="mt-8"
        :initial="{ opacity: 0, scale: 0.9, y: 24 }"
        :animate="{ opacity: 1, scale: 1, y: 0 }"
        :exit="{ opacity: 0, scale: 0.95 }"
        :transition="{ type: 'spring', stiffness: 220, damping: 20 }"
      >
        <UCard variant="subtle">
          <div class="flex flex-col gap-4">
            <h2
              ref="verdictHeading"
              tabindex="-1"
              class="outline-none w-fit"
            >
              <UBadge
                label="Final Verdict"
                icon="i-lucide-gavel"
                color="primary"
                variant="solid"
              />
            </h2>
            <blockquote class="text-lg font-medium leading-relaxed">
              “{{ auditVerdict }}”
            </blockquote>
            <UButton
              label="Convene again"
              icon="i-lucide-rotate-ccw"
              color="neutral"
              variant="outline"
              class="w-fit"
              @click="reset"
            />
          </div>
        </UCard>
      </Motion>
    </AnimatePresence>
  </div>
</template>
