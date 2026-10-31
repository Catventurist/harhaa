<script setup lang="ts">
const props = defineProps<{
  src: string
  poster?: string
}>()

const video = useTemplateRef<HTMLVideoElement>('video')

const lines = [
  'EU: "we will fine you 6% of global revenue"',
  'YouTube: AI removes anything it is unsure about',
  '165,000,000 items removed',
  '50,000,000 users complain',
  'EU: "DSA saves 50 million users from wrongful censorship!"',
  'Youtube: Installing cookies by default, REMOVED.'
]

const STEP = 700
const phase = ref<'idle' | 'boot' | 'ready' | 'play'>('idle')
const visible = ref(0)
const progress = computed(() => Math.round((visible.value / lines.length) * 100))
const root = useTemplateRef<HTMLElement>('root')
let timers: ReturnType<typeof setTimeout>[] = []
let observer: IntersectionObserver | undefined

function clear() {
  timers.forEach(clearTimeout)
  timers = []
}

function start() {
  clear()
  visible.value = 0
  phase.value = 'boot'
  lines.forEach((_, i) => timers.push(setTimeout(() => visible.value = i + 1, STEP * (i + 1))))
  timers.push(setTimeout(() => phase.value = 'ready', STEP * lines.length + 1000))
}

function skip() {
  clear()
  phase.value = 'ready'
}

const inView = ref(false)
let started = false

function onKey(e: KeyboardEvent) {
  if (!inView.value) return
  if (e.key !== 'Enter' && e.key !== ' ') return
  if ((e.target as HTMLElement | null)?.closest('input, textarea, select, [contenteditable]')) return

  if (phase.value === 'boot') {
    e.preventDefault()
    skip()
  } else if (phase.value === 'ready') {
    e.preventDefault()
    phase.value = 'play'
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKey)

  observer = new IntersectionObserver(([entry]) => {
    inView.value = !!entry?.isIntersecting
    if (inView.value && !started) {
      started = true
      start()
    }
  }, { threshold: 0.6 })

  if (root.value) observer.observe(root.value)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKey)
  clear()
  observer?.disconnect()
})
</script>

<template>
  <div
    ref="root"
    class="scroll-mt-20"
  >
    <UCard
      :ui="{ body: 'p-0 sm:p-0' }"
      class="mx-auto w-full max-w-[min(100%,calc((100svh-4rem)*16/9))] overflow-hidden"
    >
      <div class="relative aspect-video bg-black">
        <AnimatePresence mode="wait">
          <Motion
            v-if="phase === 'boot' || phase === 'ready'"
            key="crt"
            :initial="{ scaleY: 0.005, scaleX: 0, opacity: 0.6 }"
            :animate="{ scaleY: [0.005, 0.005, 1], scaleX: [0, 1, 1], opacity: 1 }"
            :exit="{ scaleY: 0.005, scaleX: [1, 1, 0], opacity: 0 }"
            :transition="{ duration: 0.6, times: [0, 0.5, 1] }"
            class="crt absolute inset-0 flex flex-col justify-between p-4 font-mono sm:p-6"
          >
            <div class="flex items-center justify-between">
              <UBadge
                label="DIV-OS v0.0.1"
                variant="outline"
              />
              <UButton
                v-if="phase === 'boot'"
                size="sm"
                variant="link"
                @click="skip"
              >
                Skip <UKbd
                  value="enter"
                  size="lg"
                />
              </UButton>
            </div>

            <ul
              class="space-y-2 text-xs sm:text-base"
              aria-live="polite"
            >
              <li
                v-for="(line, i) in lines.slice(0, visible)"
                :key="i"
                class="animate-type overflow-hidden whitespace-nowrap"
              >
                > {{ line }}
              </li>
              <li
                v-if="phase === 'boot'"
                class="animate-blink"
              >
                █
              </li>
              <li
                v-else
                class="flex flex-wrap items-center gap-3 pt-3"
              >
                <UButton
                  icon="i-lucide-play"
                  label="Play video"
                  size="lg"
                  class="bg-black/40 text-current"
                  @click="phase = 'play'"
                />
                <span class="hidden items-center gap-1 text-xs opacity-80 sm:flex">
                  or press
                  <UKbd
                    size="lg"
                    value="enter"
                  /> / <UKbd
                    size="lg"
                    value="space"
                  />
                </span>
              </li>
            </ul>

            <div class="h-10">
              <UProgress
                v-if="phase === 'boot'"
                :model-value="progress"
                size="sm"
              />
              <Motion
                v-else
                :initial="{ opacity: 0, y: 8 }"
                :animate="{ opacity: 1, y: 0 }"
                class="flex justify-center"
              >
                <UButton
                  icon="i-lucide-play"
                  label="Play video"
                  @click="phase = 'play'"
                />
              </Motion>
            </div>
          </Motion>

          <Motion
            v-else-if="phase === 'play'"
            key="play"
            :initial="{ opacity: 0 }"
            :animate="{ opacity: 1 }"
            class="absolute inset-0"
          >
            <video
              ref="video"
              class="size-full object-contain"
              :src="props.src"
              :poster="props.poster"
              controls
              playsinline
              preload="metadata"
              @vue:mounted="video?.play().catch(() => {})"
            />
            <div class="absolute right-2 top-2 z-10 flex gap-1 opacity-60 transition-opacity hover:opacity-100 focus-within:opacity-100">
              <UTooltip text="Cookie & privacy info">
                <UButton
                  icon="i-lucide-info"
                  size="xs"
                  variant="soft"
                  color="neutral"
                  to="/youtube-cookie"
                  aria-label="Cookie and privacy info"
                />
              </UTooltip>

              <UTooltip text="Replay intro">
                <UButton
                  icon="i-lucide-rotate-ccw"
                  size="xs"
                  variant="soft"
                  color="neutral"
                  aria-label="Replay intro"
                  @click="start"
                />
              </UTooltip>
            </div>
          </Motion>
        </AnimatePresence>
      </div>
    </UCard>
  </div>
</template>
