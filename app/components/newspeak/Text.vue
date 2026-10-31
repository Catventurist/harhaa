<script setup lang="ts">
withDefaults(defineProps<{
  newspeak: string
  irl: string
  as?: string
}>(), {
  as: 'span'
})

const { mode, irl: isIrl } = useNewspeak()
</script>

<template>
  <component :is="as">
    <AnimatePresence
      mode="wait"
      :initial="false"
    >
      <Motion
        :key="mode"
        as="span"
        class="inline-block"
        :class="isIrl ? 'font-semibold text-secondary' : ''"
        :initial="{ opacity: 0, y: 6, filter: 'blur(4px)' }"
        :animate="{ opacity: 1, y: 0, filter: 'blur(0px)' }"
        :exit="{ opacity: 0, y: -6, filter: 'blur(4px)' }"
        :transition="{ duration: 0.18 }"
      >
        {{ isIrl ? irl : newspeak }}
      </Motion>
    </AnimatePresence>
  </component>
</template>
