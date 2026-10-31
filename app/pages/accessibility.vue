<script setup lang="ts">
import { Motion } from 'motion-v'
import { accessibilityStatement } from '~/data/div'

useSeoMeta({
  title: accessibilityStatement.title,
  description: accessibilityStatement.description
})

const fontScale = useState('fontScale', () => 100)
const reduceMotion = useState('reduceMotion', () => false)

watch(fontScale, (value) => {
  document.documentElement.style.fontSize = `${value}%`
})

onMounted(() => {
  document.documentElement.style.fontSize = `${fontScale.value}%`
})

function reset() {
  fontScale.value = 100
  reduceMotion.value = false
}
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <UContainer class="max-w-3xl">
      <ELegalNav />
      <EPageIntro
        :title="accessibilityStatement.title"
        :description="accessibilityStatement.description"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <Motion
          v-for="(feature, i) in accessibilityStatement.features"
          :key="feature.title"
          as="div"
          class="border border-default bg-default p-5"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.15 + i * 0.08 }"
        >
          <UIcon
            :name="feature.icon"
            class="size-7 text-primary"
          />
          <h2 class="mt-3 text-lg font-semibold text-highlighted">
            {{ feature.title }}
          </h2>
          <p class="mt-1 text-sm text-muted">
            {{ feature.text }}
          </p>
        </Motion>
      </div>

      <div class="mt-10 space-y-6 border border-default bg-muted p-6">
        <UFormField :label="`Text size: ${fontScale}%`">
          <USlider
            v-model="fontScale"
            :min="80"
            :max="150"
            :step="10"
          />
        </UFormField>

        <USwitch
          v-model="reduceMotion"
          label="Reduce motion"
          description="Turns off the animations on this site."
        />

        <UButton
          label="Reset"
          color="neutral"
          variant="subtle"
          icon="i-lucide-rotate-ccw"
          @click="reset"
        />
      </div>

      <div class="mt-10">
        <h2 class="text-xl font-semibold text-highlighted">
          Known limitations
        </h2>
        <ul class="mt-3 list-disc space-y-2 pl-5 text-sm text-muted">
          <li
            v-for="item in accessibilityStatement.known"
            :key="item"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </UContainer>
  </section>
</template>
