<script setup lang="ts">
import { glossaryEntries, inversionLabels } from '~/data/div'

const flipped = ref<string[]>([])

const total = glossaryEntries.length
const decoded = computed(() => flipped.value.length)
const complete = computed(() => decoded.value === total)
const progress = computed(() => Math.round((decoded.value / total) * 100))

function isFlipped(word: string) {
  return flipped.value.includes(word)
}

function toggle(word: string) {
  flipped.value = isFlipped(word)
    ? flipped.value.filter(w => w !== word)
    : [...flipped.value, word]
}

function flipAll() {
  flipped.value = glossaryEntries.map(e => e.word)
}

function hideAll() {
  flipped.value = []
}
</script>

<template>
  <div class="w-full max-w-5xl mx-auto space-y-6">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 class="text-2xl font-bold">
          Glossary Decoder
        </h2>
        <p class="text-sm text-muted">
          Click a word to see what it actually does.
        </p>
      </div>

      <div class="flex items-center gap-2">
        <UBadge
          :label="`Decoded ${decoded}/${total}`"
          color="secondary"
          variant="subtle"
          size="lg"
        />
        <UButton
          label="Flip all"
          icon="i-lucide-eye"
          color="neutral"
          variant="subtle"
          @click="flipAll"
        />
        <UButton
          label="Hide all"
          icon="i-lucide-eye-off"
          color="neutral"
          variant="ghost"
          @click="hideAll"
        />
      </div>
    </div>

    <UProgress
      :model-value="progress"
      color="secondary"
      size="sm"
    />

    <div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Motion
        v-for="(entry, i) in glossaryEntries"
        :key="entry.word"
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: (i % 3) * 0.08 }"
      >
        <button
          type="button"
          class="block h-80 w-full text-left perspective-distant"
          :aria-pressed="isFlipped(entry.word)"
          @click="toggle(entry.word)"
        >
          <Motion
            as="div"
            class="relative size-full"
            :style="{ transformStyle: 'preserve-3d' }"
            :animate="{ rotateY: isFlipped(entry.word) ? 180 : 0 }"
            :while-hover="isFlipped(entry.word) ? {} : { scale: 1.03 }"
            :transition="{ type: 'spring', stiffness: 160, damping: 18 }"
          >
            <div class="absolute inset-0 flex flex-col justify-between rounded-xl border border-default bg-primary/10 p-6 backface-hidden">
              <div class="flex size-12 items-center justify-center rounded-lg bg-primary text-inverted">
                <UIcon
                  :name="entry.icon"
                  class="size-6"
                />
              </div>

              <div class="space-y-3">
                <p class="text-xs tracking-[0.25em] text-muted">
                  SOUNDS LIKE
                </p>
                <p class="text-2xl font-bold leading-tight">
                  {{ entry.word }}
                </p>
                <p class="text-sm text-muted">
                  {{ entry.sounds }}
                </p>
              </div>

              <p class="flex items-center gap-1 text-xs text-secondary">
                <UIcon
                  name="i-lucide-rotate-3d"
                  class="size-4"
                />
                Decode
              </p>
            </div>

            <div
              class="absolute inset-0 flex flex-col justify-between rounded-xl border border-secondary/80 bg-secondary/10 p-6 backface-hidden"
              :style="{ transform: 'rotateY(180deg)' }"
            >
              <div class="flex items-center justify-between gap-2">
                <p class="text-xs tracking-[0.25em] text-secondary">
                  ACTUALLY
                </p>
              </div>

              <div class="space-y-2">
                <p class="font-semibold">
                  {{ entry.word }}
                </p>
                <p class="text-sm">
                  {{ entry.actually }}
                </p>
              </div>

              <div class="space-y-1">
                <div class="flex items-center justify-between text-xs">
                  <span class="text-muted">Inversion</span>
                  <span class="font-semibold text-secondary">{{ inversionLabels[entry.inversion] }}</span>
                </div>
                <UProgress
                  :model-value="entry.inversion * 20"
                  color="secondary"
                  size="xs"
                />
              </div>
            </div>
          </Motion>
        </button>
      </Motion>
    </div>

    <AnimatePresence>
      <Motion
        v-if="complete"
        as="div"
        :initial="{ opacity: 0, scale: 0.85, filter: 'blur(8px)' }"
        :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
        :exit="{ opacity: 0 }"
        :transition="{ type: 'spring', stiffness: 200, damping: 16 }"
      >
        <div class="rounded-xl border-2 border-double border-secondary bg-secondary/10 p-6 text-center space-y-2">
          <p class="text-xs tracking-[0.3em] text-secondary">
            THE PATTERN
          </p>
          <p class="text-xl font-bold">
            The word describes the effect as if it were the intent.
          </p>
        </div>
      </Motion>
    </AnimatePresence>
  </div>
</template>
