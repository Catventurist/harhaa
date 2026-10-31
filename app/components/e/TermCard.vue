<script setup lang="ts">
defineProps<{
  term: {
    path: string
    title: string
    description?: string
    mechanism: string
    tone: string
    orwellScore: number
    irony: string
  }
  index?: number
}>()
</script>

<template>
  <Motion
    as="div"
    class="group relative flex flex-col rounded-lg border border-default bg-default p-6 transition-colors hover:border-primary focus-within:ring-2 focus-within:ring-primary"
    :initial="{ opacity: 0, y: 24 }"
    :animate="{ opacity: 1, y: 0 }"
    :transition="{ duration: 0.4, delay: Math.min((index ?? 0) * 0.05, 0.4) }"
    :while-hover="{ y: -6 }"
  >
    <div class="flex flex-wrap gap-2">
      <UBadge
        :label="term.mechanism"
        color="secondary"
        variant="subtle"
      />
      <UBadge
        :label="term.tone"
        color="neutral"
        variant="outline"
      />
    </div>

    <h3 class="mt-4 text-lg font-semibold text-highlighted">
      <ULink
        :to="term.path"
        class="after:absolute after:inset-0 focus:outline-none"
      >
        {{ term.title }}
      </ULink>
    </h3>

    <p class="mt-1 text-sm text-muted">
      {{ term.description }}
    </p>

    <p class="mt-4 text-sm italic text-toned">
      {{ term.irony }}
    </p>

    <div class="mt-auto pt-6">
      <div class="mb-1 flex items-center justify-between text-xs text-muted">
        <span>Orwell score</span>
        <span class="tabular-nums">{{ term.orwellScore }}/10</span>
      </div>
      <div class="flex gap-1">
        <span
          v-for="n in 10"
          :key="n"
          class="h-1.5 flex-1 rounded-full"
          :class="n <= term.orwellScore ? 'bg-secondary' : 'bg-accented'"
        />
      </div>
    </div>
  </Motion>
</template>
