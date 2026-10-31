<script setup lang="ts">
import { Motion, useScroll, useTransform, useSpring } from 'motion-v'
import { headerTitle, headerLinks } from '~/data/div'

const { scrollY } = useScroll()
const { navigation } = useContentNav()

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.3 } }
}

const shrink = useTransform(scrollY, [0, 120], [1, 0.82])
const scale = useSpring(1, { stiffness: 180, damping: 24 })
const hovered = ref(false)

const sync = () => scale.set(hovered.value ? 1 : shrink.get())

onMounted(() => {
  const stop = shrink.on('change', sync)
  onBeforeUnmount(stop)
})

watch(hovered, sync)
</script>

<template>
  <Motion
    as="div"
    class="sticky top-0 z-50 origin-top"
    :initial="{ y: -80, opacity: 0 }"
    :animate="{ y: 0, opacity: 1 }"
    :transition="{ type: 'spring', stiffness: 120, damping: 18 }"
    :style="{ scaleY: scale }"
    @mouseenter="hovered = true"
    @mouseleave="hovered = false"
  >
    <UHeader
      :title="headerTitle"
      :ui="{ root: 'static' }"
    >
      <template #title>
        <Motion
          as="span"
          class="flex items-center gap-2 text-default text-shadow-sm text-shadow-primary"
          :while-hover="{ scale: 1.04 }"
          :while-tap="{ scale: 0.96 }"
        >
          <Motion
            as="span"
            class="inline-flex"
            :animate="{ rotate: 360 }"
            :transition="{ duration: 20, repeat: Infinity, ease: 'linear' }"
          >
            <UIcon
              name="i-lucide-star"
              class="size-6 fill-current text-secondary"
            />
          </Motion>
          {{ headerTitle }}
        </Motion>
      </template>

      <Motion
        as="div"
        class="flex"
        initial="hidden"
        animate="show"
        :variants="list"
      >
        <LazyUNavigationMenu
          :items="headerLinks"
          content-orientation="vertical"
          highlight
        />
      </Motion>

      <template #right>
        <Motion
          as="div"
          class="flex items-center gap-2"
          :initial="{ opacity: 0, x: 16 }"
          :animate="{ opacity: 1, x: 0 }"
          :transition="{ delay: 0.6, duration: 0.5 }"
        >
          <LazyEDarkMatterButton hydrate-on-idle />
          <LazyUContentSearchButton hydrate-on-idle />
          <LazyUColorModeButton hydrate-on-idle />
        </Motion>
      </template>

      <template #body>
        <LazyUNavigationMenu
          :items="headerLinks"
          orientation="vertical"
          class="-mx-2.5"
        />

        <USeparator class="my-4" />

        <LazyUContentNavigation
          :navigation="navigation"
          highlight
        />
      </template>
    </UHeader>
  </Motion>
</template>
