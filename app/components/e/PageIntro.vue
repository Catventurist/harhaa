<script setup lang="ts">
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <Motion
    as="header"
    class="mb-10 text-center"
    :initial="{ y: 24 }"
    :animate="{ y: 0 }"
    :transition="{ duration: 0.6 }"
  >
    <h1 class="text-4xl font-bold text-highlighted sm:text-5xl">
      {{ title }}
    </h1>
    <p
      v-if="description"
      class="mt-4 text-muted"
    >
      {{ description }}
    </p>
  </Motion>
</template>
