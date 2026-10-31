<script setup lang="ts">
import { pairs } from '~/data/div'
</script>

<template>
  <UCard variant="subtle">
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <h2 class="text-lg font-semibold">
          Official Communications
        </h2>
        <NewspeakToggle />
      </div>
    </template>

    <ul class="space-y-4">
      <Motion
        v-for="(pair, i) in pairs"
        :key="pair.newspeak"
        as="li"
        class="flex gap-3"
        :initial="{ opacity: 0, x: -20 }"
        :while-in-view="{ opacity: 1, x: 0 }"
        :in-view-options="{ once: true }"
        :transition="{ delay: i * 0.08 }"
      >
        <UBadge
          :label="`${i + 1}`"
          color="primary"
          variant="subtle"
          class="h-6 shrink-0"
        />
        <NewspeakText
          :newspeak="pair.newspeak"
          :irl="pair.irl"
          as="p"
          class="text-sm"
        />
      </Motion>
    </ul>
  </UCard>
</template>
