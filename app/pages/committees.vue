<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { deliberate, type Deliberation } from '~/utils/committee'
import { languages } from '~/data/div'
import type { LanguageId } from '~/data/div'

const title = 'Committees'
const description = 'Submit a matter for deliberation.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const input = ref('')
const result = ref<Deliberation | null>(null)
const round = ref(0)
const loading = ref(false)
const language = ref<LanguageId>('germanic')

const languageItems = Object.entries(languages).map(([value, l]) => ({
  value,
  label: l.label
}))

async function submit() {
  if (!input.value.trim()) return
  loading.value = true
  result.value = null
  await new Promise(resolve => setTimeout(resolve, 1400))
  result.value = deliberate(input.value, round.value, language.value)
  loading.value = false
}

async function redeliberate() {
  round.value++
  await submit()
}
</script>

<template>
  <section class="py-20 sm:py-28">
    <UContainer class="max-w-3xl">
      <EPageIntro
        :title="title"
        :description="description"
      />

      <Motion
        as="div"
        class="space-y-4"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <UTextarea
          id="matter"
          v-model="input"
          :rows="5"
          class="w-full"
          placeholder="State the matter to be considered"
        />
        <div class="flex flex-wrap gap-3">
          <USelect
            v-model="language"
            :items="languageItems"
            value-key="value"
            class="w-44"
            size="lg"
            icon="i-lucide-languages"
          />
          <Motion
            as="div"
            :while-hover="{ scale: 1.05 }"
            :while-tap="{ scale: 0.95 }"
          >
            <UButton
              size="lg"
              icon="i-lucide-gavel"
              :loading="loading"
              :disabled="!input.trim()"
              @click="submit"
            >
              Submit for deliberation
            </UButton>
          </Motion>
          <UButton
            v-if="result"
            size="lg"
            color="neutral"
            variant="subtle"
            icon="i-lucide-refresh-cw"
            :loading="loading"
            @click="redeliberate"
          >
            Deliberate again
          </UButton>
        </div>
      </Motion>

      <AnimatePresence mode="wait">
        <Motion
          v-if="loading"
          key="loading"
          as="div"
          class="mt-10"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
        >
          <p class="mb-3 text-sm text-muted">
            The committee is deliberating
          </p>
          <UProgress animation="carousel" />
        </Motion>

        <Motion
          v-else-if="result"
          :key="result.reference + round"
          as="div"
          class="mt-10 border border-default bg-muted p-6 sm:p-8"
          :initial="{ opacity: 0, y: 32 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: -16 }"
          :transition="{ type: 'spring', stiffness: 110, damping: 16 }"
        >
          <div class="mb-6 flex flex-wrap items-center justify-between gap-3 border-b border-default pb-4">
            <div>
              <p class="font-semibold text-highlighted">
                {{ result.committee }}
              </p>
              <p class="text-sm text-muted">
                Rapporteur: {{ result.rapporteur }}
              </p>
            </div>
            <div class="text-right">
              <UBadge
                color="secondary"
                variant="solid"
                :label="result.stamp"
              />
              <p class="mt-1 font-mono text-xs text-muted">
                {{ result.reference }}
              </p>
            </div>
          </div>

          <Motion
            as="p"
            class="text-2xl leading-relaxed text-highlighted"
            initial="hidden"
            animate="show"
            :variants="{ hidden: {}, show: { transition: { staggerChildren: 0.06 } } }"
          >
            <Motion
              v-for="(token, i) in result.tokens"
              :key="i"
              as="span"
              class="mr-2 inline-block cursor-help"
              :title="token.source ? token.source : undefined"
              :variants="{
                hidden: { opacity: 0, y: 12, filter: 'blur(6px)' },
                show: { opacity: 1, y: 0, filter: 'blur(0px)' }
              }"
              :while-hover="{ y: -3, color: 'var(--ui-primary)' }"
            >
              {{ token.target }}
            </Motion>
          </Motion>

          <p class="mt-6 text-xs text-muted">
            Hover a word for its original term. Original terms are provided for information only and carry no legal force.
          </p>
        </Motion>
      </AnimatePresence>
    </UContainer>
  </section>
</template>
