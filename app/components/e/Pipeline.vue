<script setup lang="ts">
import { buildResult, officialLanguages, pipelineResult, pipelineSteps } from '~/data/div'

const props = withDefaults(defineProps<{
  speed?: number
}>(), {
  speed: 1600
})

const toast = useToast()

const current = ref(-1)
const running = ref(false)
const paused = ref(false)
const result = ref(pipelineResult)
let timer: ReturnType<typeof setTimeout> | undefined

const finished = computed(() => current.value >= pipelineSteps.length)
const progress = computed(() => Math.min(100, Math.round(((current.value + 1) / pipelineSteps.length) * 100)))

function schedule(delay: number) {
  clearTimeout(timer)
  timer = setTimeout(advance, delay)
}

function advance() {
  current.value++
  if (current.value >= pipelineSteps.length) {
    running.value = false
    paused.value = false
    return
  }
  if (!paused.value) schedule(props.speed)
}

function begin() {
  clearTimeout(timer)
  result.value = buildResult()
  current.value = -1
  running.value = true
  paused.value = false
}

function run() {
  if (running.value) return
  begin()
  schedule(300)
}

function pause() {
  paused.value = true
  clearTimeout(timer)
}

function resume() {
  paused.value = false
  schedule(300)
}

function next() {
  if (finished.value) return
  if (!running.value) {
    begin()
    paused.value = true
  } else {
    pause()
  }
  advance()
}

function reset() {
  clearTimeout(timer)
  current.value = -1
  running.value = false
  paused.value = false
  result.value = pipelineResult
}

function stateOf(i: number) {
  if (i < current.value) return 'done'
  if (i === current.value) return 'active'
  return 'idle'
}

async function copy() {
  await navigator.clipboard.writeText(result.value)
  toast.add({
    title: 'Copied',
    description: 'Now use it in a meeting.',
    color: 'secondary'
  })
}

onBeforeUnmount(() => {
  clearTimeout(timer)
  running.value = false
})
</script>

<template>
  <UCard
    variant="subtle"
    class="w-full max-w-xl mx-auto"
  >
    <template #header>
      <div class="flex flex-wrap items-center justify-between gap-3">
        <h2 class="text-lg font-semibold">
          How a Regulation Is Born
        </h2>

        <div class="flex flex-wrap gap-2">
          <UButton
            v-if="!running"
            :label="finished ? 'Run again' : 'Run the pipeline'"
            :icon="finished ? 'i-lucide-rotate-ccw' : 'i-lucide-play'"
            @click="run"
          />
          <UButton
            v-else-if="!paused"
            label="Pause"
            icon="i-lucide-pause"
            color="neutral"
            variant="subtle"
            @click="pause"
          />
          <UButton
            v-else
            label="Resume"
            icon="i-lucide-play"
            @click="resume"
          />
          <UButton
            v-if="!finished"
            label="Next step"
            icon="i-lucide-skip-forward"
            color="neutral"
            variant="subtle"
            @click="next"
          />
          <UButton
            v-if="current >= 0"
            label="Reset"
            color="neutral"
            variant="ghost"
            @click="reset"
          />
        </div>
      </div>
    </template>

    <div class="space-y-6">
      <UProgress
        :model-value="progress"
        size="sm"
        color="secondary"
      />

      <ol class="relative space-y-2">
        <li
          v-for="(step, i) in pipelineSteps"
          :key="step.title"
        >
          <Motion
            as="div"
            class="flex gap-4 rounded-lg border p-4"
            :animate="{
              scale: stateOf(i) === 'active' ? 1.02 : 1,
              opacity: stateOf(i) === 'idle' ? 0.5 : 1
            }"
            :transition="{ type: 'spring', stiffness: 260, damping: 20 }"
            :class="stateOf(i) === 'active' ? 'border-primary bg-primary/10' : stateOf(i) === 'done' ? 'border-secondary/60 bg-secondary' : 'border-default'"
          >
            <Motion
              as="div"
              class="flex size-10 shrink-0 items-center justify-center rounded-lg"
              :class="stateOf(i) === 'idle' ? 'bg-elevated text-muted' : stateOf(i) === 'active' ? 'bg-primary text-inverted' : 'bg-secondary text-inverted'"
              :animate="stateOf(i) === 'active' && !paused ? { rotate: [0, -8, 8, 0] } : { rotate: 0 }"
              :transition="{ duration: 0.6, repeat: stateOf(i) === 'active' && !paused ? Infinity : 0 }"
            >
              <UIcon
                :name="stateOf(i) === 'done' ? 'i-lucide-check' : step.icon"
                class="size-5"
              />
            </Motion>

            <div class="min-w-0 flex-1 space-y-1">
              <p class="font-semibold">
                {{ step.title }}
              </p>

              <NewspeakText
                as="p"
                class="text-sm text-muted"
                :newspeak="step.note"
                :irl="step.noteIrl"
              />

              <AnimatePresence>
                <Motion
                  v-if="stateOf(i) !== 'idle'"
                  as="div"
                  class="overflow-hidden text-sm text-secondary"
                  :initial="{ opacity: 0, height: 0 }"
                  :animate="{ opacity: 1, height: 'auto' }"
                  :exit="{ opacity: 0, height: 0 }"
                >
                  <NewspeakText
                    as="p"
                    :newspeak="step.output"
                    :irl="step.outputIrl"
                  />
                </Motion>
              </AnimatePresence>

              <div
                v-if="step.title === 'eTranslation' && stateOf(i) !== 'idle'"
                class="flex flex-wrap gap-1 pt-1"
              >
                <Motion
                  v-for="(lang, l) in officialLanguages"
                  :key="lang"
                  as="span"
                  :initial="{ opacity: 0, scale: 0 }"
                  :animate="{ opacity: 1, scale: 1 }"
                  :transition="{ delay: l * 0.03 }"
                >
                  <UBadge
                    :label="lang"
                    size="sm"
                    color="secondary"
                    variant="subtle"
                  />
                </Motion>
              </div>
            </div>
          </Motion>

          <div
            v-if="i < pipelineSteps.length - 1"
            class="flex justify-center py-1"
          >
            <Motion
              as="div"
              :animate="{ y: stateOf(i) === 'active' && !paused ? [0, 4, 0] : 0 }"
              :transition="{ duration: 0.8, repeat: stateOf(i) === 'active' && !paused ? Infinity : 0 }"
            >
              <UIcon
                name="i-lucide-arrow-down"
                class="size-5"
                :class="i < current ? 'text-secondary' : 'text-muted'"
              />
            </Motion>
          </div>
        </li>
      </ol>

      <AnimatePresence>
        <Motion
          v-if="finished"
          as="div"
          :initial="{ opacity: 0, scale: 0.8, filter: 'blur(8px)' }"
          :animate="{ opacity: 1, scale: 1, filter: 'blur(0px)' }"
          :exit="{ opacity: 0 }"
          :transition="{ type: 'spring', stiffness: 200, damping: 16 }"
        >
          <div class="rounded-lg border border-secondary/80 bg-secondary/10 p-5 text-center space-y-3">
            <p class="text-xs tracking-[0.3em] text-secondary">
              OFFICIAL OUTPUT
            </p>
            <p class="text-xl font-bold">
              "{{ result }}"
            </p>
            <NewspeakText
              as="p"
              class="text-sm text-muted"
              newspeak="The text has been duly harmonised across all linguistic versions."
              irl="Nobody agrees what this means."
            />
            <UButton
              label="Copy output"
              icon="i-lucide-copy"
              color="secondary"
              variant="subtle"
              @click="copy"
            />
          </div>
        </Motion>
      </AnimatePresence>
    </div>
  </UCard>
</template>
