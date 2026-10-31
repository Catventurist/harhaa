<script setup lang="ts">
import { aboutLinks } from '~/data/div'

useSeoMeta({
  title: 'About',
  description: 'Satirical site with new tools.'
})
</script>

<template>
  <div>
    <UPageHero
      :links="aboutLinks"
      :ui="{ container: 'overflow-hidden' }"
    >
      <template #headline>
        <Motion
          :initial="{ opacity: 0, y: -12 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.5 }"
        >
          <UBadge
            label="About"
            variant="subtle"
            icon="i-lucide-sticky-note"
          />
        </Motion>
      </template>

      <template #title>
        <Motion
          :initial="{ opacity: 0, y: 32, filter: 'blur(8px)' }"
          :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
          :transition="{ duration: 0.7, delay: 0.1 }"
          class="text-secondary/80"
        >
          Randomness creates humor
        </Motion>
      </template>

      <template #description>
        <Motion
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ duration: 0.7, delay: 0.3 }"
        >
          Information gathered and presented in various ways.
        </Motion>
      </template>
    </UPageHero>

    <UPageSection
      title="Tech stack"
      description="The tools behind this site. Click to visit."
      icon="i-lucide-layers"
    >
      <EIconShowcase />
    </UPageSection>
  </div>
</template>
