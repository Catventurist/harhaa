<script setup lang="ts">
import { questions, type Question } from '~/data/div'

const maxLives = 3

const deck = ref<Question[]>([])
const index = ref(0)
const score = ref(0)
const streak = ref(0)
const bestStreak = ref(0)
const lives = ref(maxLives)
const answer = ref<boolean | null>(null)

function shuffle<T>(items: T[]) {
  return [...items].sort(() => Math.random() - 0.5)
}

function start() {
  deck.value = shuffle(questions)
  index.value = 0
  score.value = 0
  streak.value = 0
  bestStreak.value = 0
  lives.value = maxLives
  answer.value = null
}

start()

const current = computed<Question>(() => deck.value[index.value] ?? questions[0]!)
const answered = computed(() => answer.value !== null)
const correct = computed(() => answer.value === current.value.violation)
const finished = computed(() => lives.value <= 0 || index.value >= deck.value.length)
const progress = computed(() => Math.round((index.value / deck.value.length) * 100))

const rank = computed(() => {
  const ratio = score.value / (deck.value.length * 10)
  if (ratio > 0.8) return 'Compliance Champion'
  if (ratio > 0.5) return 'Risk Spotter'
  return 'Rookie'
})

function choose(isViolation: boolean) {
  if (answered.value) return
  answer.value = isViolation

  if (isViolation === current.value.violation) {
    streak.value++
    bestStreak.value = Math.max(bestStreak.value, streak.value)
    score.value += 10 + streak.value * 2
  } else {
    streak.value = 0
    lives.value--
  }
}

function next() {
  index.value++
  answer.value = null
}
</script>

<template>
  <UCard class="w-full max-w-xl mx-auto">
    <template #header>
      <div class="flex items-center justify-between gap-3">
        <h2 class="font-semibold">
          Compliance or Violation?
        </h2>

        <div class="flex items-center gap-2">
          <Motion
            :key="score"
            as="div"
            :initial="{ scale: 1.4 }"
            :animate="{ scale: 1 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 12 }"
          >
            <UBadge
              :label="`Score ${score}`"
              color="primary"
              variant="subtle"
            />
          </Motion>
          <Motion
            :key="streak"
            as="div"
            :initial="{ scale: 1.4, rotate: -8 }"
            :animate="{ scale: 1, rotate: 0 }"
            :transition="{ type: 'spring', stiffness: 400, damping: 12 }"
          >
            <UBadge
              :label="`Streak ${streak}`"
              color="warning"
              variant="subtle"
              icon="i-lucide-flame"
            />
          </Motion>
          <Motion
            :key="lives"
            as="div"
            :initial="{ x: 0 }"
            :animate="{ x: [0, -4, 4, -4, 4, 0] }"
            :transition="{ duration: 0.4 }"
          >
            <UBadge
              :label="`Lives ${lives}`"
              color="error"
              variant="subtle"
              icon="i-lucide-heart"
            />
          </Motion>
        </div>
      </div>
    </template>

    <AnimatePresence mode="wait">
      <Motion
        v-if="!finished"
        :key="index"
        as="div"
        class="space-y-4"
        :initial="{ opacity: 0, x: 40 }"
        :animate="{ opacity: 1, x: 0 }"
        :exit="{ opacity: 0, x: -40 }"
        :transition="{ duration: 0.25 }"
      >
        <UProgress
          :model-value="progress"
          size="sm"
        />

        <UBadge
          :label="current.regulation"
          color="neutral"
          variant="outline"
        />

        <p class="text-lg">
          {{ current.text }}
        </p>

        <div
          v-if="!answered"
          class="grid grid-cols-2 gap-3"
        >
          <Motion
            as="div"
            :while-hover="{ scale: 1.03 }"
            :while-press="{ scale: 0.95 }"
          >
            <UButton
              label="Violation"
              color="error"
              icon="i-lucide-shield-alert"
              size="lg"
              block
              @click="choose(true)"
            />
          </Motion>
          <Motion
            as="div"
            :while-hover="{ scale: 1.03 }"
            :while-press="{ scale: 0.95 }"
          >
            <UButton
              label="Compliant"
              color="success"
              icon="i-lucide-shield-check"
              size="lg"
              block
              @click="choose(false)"
            />
          </Motion>
        </div>

        <Motion
          v-else
          as="div"
          class="space-y-3"
          :initial="{ opacity: 0, y: 12 }"
          :animate="correct ? { opacity: 1, y: 0 } : { opacity: 1, y: 0, x: [0, -8, 8, -8, 8, 0] }"
          :transition="{ duration: 0.35 }"
        >
          <UAlert
            :color="correct ? 'success' : 'error'"
            variant="subtle"
            :icon="correct ? 'i-lucide-check-circle' : 'i-lucide-x-circle'"
            :title="correct ? 'Correct' : 'Wrong'"
            :description="current.explanation"
          />
          <UButton
            :label="index + 1 >= deck.length || lives <= 0 ? 'See results' : 'Next question'"
            trailing-icon="i-lucide-arrow-right"
            block
            @click="next"
          />
        </Motion>
      </Motion>

      <Motion
        v-else
        key="results"
        as="div"
        class="space-y-4 text-center"
        :initial="{ opacity: 0, scale: 0.8 }"
        :animate="{ opacity: 1, scale: 1 }"
        :transition="{ type: 'spring', stiffness: 260, damping: 18 }"
      >
        <Motion
          as="div"
          class="flex justify-center"
          :animate="{ rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] }"
          :transition="{ duration: 0.8, delay: 0.2 }"
        >
          <UIcon
            :name="lives > 0 ? 'i-lucide-trophy' : 'i-lucide-skull'"
            class="size-12"
          />
        </Motion>
        <p class="text-xl font-semibold">
          {{ lives > 0 ? 'You made it' : 'Game over' }}
        </p>
        <p>
          Score {{ score }} · Best streak {{ bestStreak }}
        </p>
        <UBadge
          :label="rank"
          size="lg"
          color="primary"
        />
        <UButton
          label="Play again"
          icon="i-lucide-rotate-ccw"
          block
          @click="start"
        />
      </Motion>
    </AnimatePresence>
  </UCard>
</template>
