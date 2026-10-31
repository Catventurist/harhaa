<script setup lang="ts">
import type { NuxtError } from '#app'
import { Motion } from 'motion-v'

const props = defineProps<{
  error: NuxtError
}>()

const messages: Record<number, { title: string, text: string, button: string }> = {
  404: {
    title: 'This page has been postponed',
    text: 'The page you requested is pending further consultation and will be available in due course (est. 2041).',
    button: 'Submit request to return home (Form 27B/6)'
  },
  403: {
    title: 'Access subject to approval',
    text: 'Your request has been forwarded to the relevant committee.',
    button: 'Appeal this decision'
  },
  500: {
    title: 'A temporary measure has failed',
    text: 'The temporary measure has been in place since 1993. We are looking into it.',
    button: 'Return to the previous state'
  }
}

const info = computed(() => {
  const code = props.error.status ?? props.error.status ?? 500
  return messages[code] ?? {
    title: 'Unforeseen circumstances',
    text: 'This situation was not covered by the applicable regulations.',
    button: 'Return home'
  }
})

const stars = Array.from({ length: 12 }, (_, i) => i * 30)
</script>

<template>
  <UApp>
    <UHeader title="United in Diversion" />

    <Motion
      as="div"
      class="flex-1"
      :initial="{ opacity: 0, y: 24 }"
      :animate="{ opacity: 1, y: 0 }"
      :transition="{ duration: 0.8, ease: 'easeOut' }"
    >
      <UError
        :error="error"
        :clear="{ color: 'neutral', variant: 'soft', label: info.button }"
        :ui="{ statusCode: 'font-bold' }"
      >
        <template #leading>
          <Motion
            as="div"
            class="relative size-24"
            :animate="{ rotate: 360 }"
            :transition="{ duration: 40, repeat: Infinity, ease: 'linear' }"
          >
            <Motion
              v-for="(deg, i) in stars"
              :key="deg"
              as="div"
              class="absolute inset-0 flex justify-center"
              :style="{ rotate: `${deg}deg` }"
            >
              <Motion
                as="span"
                class="inline-flex"
                :animate="{ y: [0, -(4 + (i % 3) * 3), 0], opacity: [1, 0.5, 1] }"
                :transition="{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut' }"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-4 text-secondary fill-current"
                />
              </Motion>
            </Motion>
          </Motion>
        </template>

        <template #statusMessage>
          {{ info.title }}
        </template>

        <template #message>
          {{ info.text }}
        </template>
      </UError>
    </Motion>

    <UFooter />
  </UApp>
</template>
