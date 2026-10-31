<script setup lang="ts">
import { techStack } from '~/data/div'

const spin = { duration: 90, repeat: Infinity, ease: 'linear' as const }

const items = techStack.map((tech, i) => {
  const angle = (i / techStack.length) * Math.PI * 2 - Math.PI / 2
  const radius = 37
  return {
    ...tech,
    icon: `social:${tech.name}`,
    delay: i * 0.05,
    style: {
      left: `${50 + radius * Math.cos(angle)}%`,
      top: `${50 + radius * Math.sin(angle)}%`
    }
  }
})

const messages = [
  'Subsidiarity check: pending',
  'Impact assessment: 47/48',
  'Please fill in form A-38',
  'Consulting 27 committees',
  'Your opinion is important to us',
  'Trust in the Future'
]

const index = ref(0)
const forms = ref(0)
const stamped = ref(false)
let timer: ReturnType<typeof setInterval>
let stampTimer: ReturnType<typeof setTimeout>

function file() {
  forms.value++
  stamped.value = true
  clearTimeout(stampTimer)
  stampTimer = setTimeout(() => stamped.value = false, 1200)
}

onMounted(() => {
  timer = setInterval(() => index.value = (index.value + 1) % messages.length, 2600)
})

onBeforeUnmount(() => {
  clearInterval(timer)
  clearTimeout(stampTimer)
})
</script>

<template>
  <div class="relative mx-auto aspect-square w-full max-w-xl overflow-hidden rounded-xl bg-radial from-primary/20 ring-1 ring-default">
    <div class="pointer-events-none absolute inset-0 grid place-items-center">
      <Motion
        as="button"
        type="button"
        class="pointer-events-auto relative flex aspect-square w-[46%] flex-col items-center overflow-hidden rounded-full border border-secondary/40 px-[10%] py-[12%] text-center text-secondary focus-visible:outline-2 focus-visible:outline-secondary"
        aria-label="File a form"
        :initial="{ opacity: 0, scale: 0.6 }"
        :animate="{ opacity: 1, scale: 1 }"
        :while-hover="{ scale: 1.05 }"
        :while-tap="{ scale: 0.94 }"
        :transition="{ type: 'spring', stiffness: 160, damping: 14 }"
        @click="file"
      >
        <p class="shrink-0 text-[9px] uppercase tracking-widest opacity-70 sm:text-xs">
          Official
        </p>

        <div class="relative my-1 min-h-0 w-full flex-1 overflow-hidden">
          <AnimatePresence mode="wait">
            <Motion
              :key="index"
              class="absolute inset-0 grid place-items-center"
              :initial="{ opacity: 0, y: 6 }"
              :animate="{ opacity: 1, y: 0 }"
              :exit="{ opacity: 0, y: -6 }"
              :transition="{ duration: 0.25 }"
            >
              <span class="line-clamp-3 text-[11px] font-semibold leading-tight sm:text-sm">
                {{ messages[index] }}
              </span>
            </Motion>
          </AnimatePresence>
        </div>

        <p class="shrink-0 text-[9px] tabular-nums opacity-70 sm:text-xs">
          Forms filed: {{ forms }}
        </p>

        <AnimatePresence>
          <Motion
            v-if="stamped"
            class="absolute inset-0 grid place-items-center bg-[#039]/70"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            :exit="{ opacity: 0 }"
          >
            <Motion
              class="rounded border-4 border-secondary px-2 py-1 text-sm font-black uppercase tracking-widest text-secondary sm:text-lg"
              :initial="{ scale: 3, rotate: -25, opacity: 0 }"
              :animate="{ scale: 1, rotate: -12, opacity: 1 }"
              :transition="{ type: 'spring', stiffness: 500, damping: 22 }"
            >
              Approved
            </Motion>
          </Motion>
        </AnimatePresence>
      </Motion>
    </div>

    <Motion
      class="absolute inset-0"
      :animate="{ rotate: 360 }"
      :transition="spin"
    >
      <div
        v-for="item in items"
        :key="item.name"
        class="absolute size-[15%] -translate-x-1/2 -translate-y-1/2"
        :style="item.style"
      >
        <Motion
          class="size-full"
          :animate="{ rotate: -360 }"
          :transition="spin"
        >
          <UTooltip :text="`${item.label} · ${item.role}`">
            <Motion
              as="a"
              :href="item.url"
              target="_blank"
              rel="noopener noreferrer"
              class="grid size-full place-items-center rounded-full bg-primary/10 text-secondary transition-colors hover:bg-primary/20 focus-visible:outline-2 focus-visible:outline-secondary"
              :aria-label="`${item.label}, ${item.role}`"
              :initial="{ opacity: 0, scale: 0 }"
              :animate="{ opacity: 1, scale: 1 }"
              :while-hover="{ scale: 1.25 }"
              :while-tap="{ scale: 0.9 }"
              :transition="{ type: 'spring', stiffness: 300, damping: 18, delay: item.delay }"
            >
              <UIcon
                :name="item.icon"
                class="size-1/2"
              />
            </Motion>
          </UTooltip>
        </Motion>
      </div>
    </Motion>
  </div>
</template>
