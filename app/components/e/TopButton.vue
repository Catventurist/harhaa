<script setup lang="ts">
import { Motion, AnimatePresence, useScroll } from 'motion-v'

const { scrollY } = useScroll()
const visible = ref(false)

function toTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' })
}

onMounted(() => {
  const stop = scrollY.on('change', (value) => {
    visible.value = value > 400
  })
  onBeforeUnmount(stop)
})
</script>

<template>
  <AnimatePresence>
    <Motion
      v-if="visible"
      as="div"
      class="fixed bottom-12 right-4 z-40 backdrop-blur-sm"
      :initial="{ opacity: 0, y: 20, scale: 0.8 }"
      :animate="{ opacity: 1, y: 0, scale: 1 }"
      :exit="{ opacity: 0, y: 20, scale: 0.8 }"
      :while-hover="{ scale: 1.1 }"
    >
      <UButton
        icon="i-lucide-arrow-up"
        label="Return to top"
        color="primary"
        @click="toTop"
      />
    </Motion>
  </AnimatePresence>
</template>
