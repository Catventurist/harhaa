<script setup lang="ts">
import { Motion } from 'motion-v'
import { smallPrint } from '~/data/div'

useSeoMeta({
  title: smallPrint.title,
  description: smallPrint.description
})
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <UContainer class="max-w-3xl">
      <ELegalNav />
      <EPageIntro
        :title="smallPrint.title"
        :description="smallPrint.description"
      />

      <Motion
        as="div"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.2 }"
      >
        <UAccordion
          :items="smallPrint.clauses"
          type="multiple"
        />
      </Motion>
    </UContainer>
  </section>
</template>
