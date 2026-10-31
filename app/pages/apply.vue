<script setup lang="ts">
import { Motion } from 'motion-v'
import { applySteps } from '~/data/div'

const step = ref(0)
const last = applySteps.length - 1
const progress = computed(() => Math.min(99, Math.round((step.value / last) * 99)))

const title = 'Begin application'
const description = computed(() => `Step ${step.value + 1} of ${applySteps.length}.`)
const seoDescription = `${applySteps.length} steps to begin your application.`

useSeoMeta({
  title,
  description: seoDescription,
  ogTitle: title,
  ogDescription: seoDescription
})

function next() {
  step.value = step.value >= last ? 0 : step.value + 1
}

function previous() {
  step.value = Math.max(0, step.value - 1)
}
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <UContainer class="max-w-3xl">
      <EProcedureNav />
      <EPageIntro
        :title="title"
        :description="description"
      />

      <UProgress
        :model-value="progress"
        class="mb-8"
      />

      <UStepper
        v-model="step"
        :items="applySteps"
        size="sm"
        :ui="{
          wrapper: 'hidden',
          root: 'w-full',
          header: 'gap-0'
        }"
      />

      <Motion
        :key="step"
        as="div"
        class="mt-8 border border-default bg-muted p-6"
        :initial="{ opacity: 0, y: 16 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.3 }"
      >
        <h2 class="text-xl font-semibold text-highlighted">
          {{ applySteps[step]!.title }}
        </h2>
        <p class="mt-2 text-muted">
          {{ applySteps[step]!.description }}
        </p>
        <UTextarea
          :id="applySteps[step]!.title"
          class="w-full"
        />
      </Motion>

      <div class="mt-6 flex justify-between">
        <UButton
          label="Previous"
          icon="i-lucide-arrow-left"
          color="neutral"
          variant="subtle"
          :disabled="step === 0"
          @click="previous"
        />
        <UButton
          :label="step === last ? 'Go to step 1' : 'Next'"
          trailing-icon="i-lucide-arrow-right"
          @click="next"
        />
      </div>
    </UContainer>
  </section>
</template>
