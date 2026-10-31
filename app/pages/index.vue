<script setup lang="ts">
import { Motion, AnimatePresence, useScroll, useTransform, useSpring } from 'motion-v'

useSeoMeta({
  title: 'United in Diversion',
  description: 'The official motto, updated for accuracy.'
})

const policies = [
  { icon: 'i-lucide-clock', title: 'Temporary Measures', text: 'In place since 1993. Review pending.', to: '/status' },
  { icon: 'i-lucide-messages-square', title: 'Consultations', text: 'We asked everyone. We then did what we were already going to do.', to: '/chamber' },
  { icon: 'i-lucide-files', title: 'Harmonised Paperwork', text: 'Twenty-four languages, one form, and a separate form to request the form.', to: '/forms' },
  { icon: 'i-lucide-plug', title: 'Common Standards', text: 'Every country agrees on one charger. Each country has a different socket.', to: '/eucracy' },
  { icon: 'i-lucide-users', title: 'Committee Meetings', text: 'A meeting to schedule the meeting about the meeting.', to: '/committees' },
  { icon: 'i-lucide-check-circle', title: 'Progress', text: 'Measured in working groups formed per quarter.', to: '/appeals' }
]

const stars = Array.from({ length: 12 }, (_, i) => i * 30)

const { scrollYProgress } = useScroll()
const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })
const ringY = useTransform(scrollYProgress, [0, 1], [0, -240])
const ringScale = useTransform(scrollYProgress, [0, 0.4], [1, 1.6])
const ringOpacity = useTransform(scrollYProgress, [0, 0.4], [0.35, 0])

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.2 } }
}

const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
}

const sections = [
  { id: 'hero', label: 'Preamble' },
  { id: 'priorities', label: 'Our Priorities' },
  { id: 'contact', label: 'Please Hold' }
]

const active = ref(sections[0]!.label)

onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        active.value = sections.find(s => s.id === entry.target.id)?.label ?? active.value
      }
    }
  }, { rootMargin: '-40% 0px -55% 0px' })

  sections.forEach((s) => {
    const el = document.getElementById(s.id)
    if (el) observer.observe(el)
  })

  onBeforeUnmount(() => observer.disconnect())
})
</script>

<template>
  <div class="overflow-x-clip">
    <div class="fixed inset-x-0 top-0 z-50">
      <Motion
        as="div"
        class="h-0.5 origin-right bg-secondary/80 rounded-full"
        :style="{ scaleX: progress }"
      />
      <div class="flex justify-end">
        <AnimatePresence mode="wait">
          <Motion
            :key="active"
            as="span"
            class="bg-secondary/80 rounded px-2 text-xs font-semibold uppercase tracking-widest text-inverted"
            :initial="{ opacity: 0, y: -8 }"
            :animate="{ opacity: 1, y: 0 }"
            :exit="{ opacity: 0, y: 8 }"
            :transition="{ duration: 0.3 }"
          >
            {{ active }}
          </Motion>
        </AnimatePresence>
      </div>
    </div>

    <section
      id="hero"
      class="relative py-24 sm:py-32 lg:py-44"
    >
      <Motion
        as="div"
        class="pointer-events-none absolute left-1/2 top-1/2 size-144 -translate-x-1/2 -translate-y-1/2"
        :style="{ y: ringY, scale: ringScale, opacity: ringOpacity }"
      >
        <Motion
          as="div"
          class="relative size-full"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 60, repeat: Infinity, ease: 'linear' }"
        >
          <div
            v-for="(deg, i) in stars"
            :key="deg"
            class="absolute inset-0 flex justify-center"
            :style="{ transform: `rotate(${deg}deg)` }"
          >
            <Motion
              as="span"
              class="inline-flex"
              :animate="{ y: [0, -(10 + (i % 3) * 8), 0], opacity: [1, 0.4, 1], scale: [1, 1.3, 1] }"
              :transition="{ duration: 3 + (i % 4), repeat: Infinity, ease: 'easeInOut', delay: i * 0.15 }"
            >
              <UIcon
                name="i-lucide-star"
                class="size-8 fill-current text-secondary"
              />
            </Motion>
          </div>
        </Motion>
      </Motion>

      <UContainer class="relative text-center">
        <Motion
          as="div"
          initial="hidden"
          animate="show"
          :variants="container"
        >
          <Motion
            as="p"
            class="mb-6 font-semibold text-secondary"
            :variants="item"
          >
            Official motto, revised for accuracy
          </Motion>

          <Motion
            as="h1"
            class="text-5xl font-bold leading-tight tracking-tight text-highlighted sm:text-7xl"
          >
            United in
            <span class="relative inline-block">
              <Motion
                as="span"
                class="absolute inset-x-0 top-1/2 h-1 origin-left bg-secondary"
                :initial="{ scaleX: 0 }"
                :animate="{ scaleX: 1 }"
                :transition="{ duration: 0.9, delay: 1.2, ease: 'easeOut' }"
              />
              <Motion
                as="span"
                class="inline-block text-default"
                :animate="{ opacity: [1, 0.6], rotate: [0, -2] }"
                :transition="{ duration: 0.6, delay: 1.6 }"
              >
                Diversity
              </Motion>
            </span>
            <Motion
              as="span"
              class="mt-2 block text-primary text-shadow-sm text-shadow-secondary"
              :initial="{ opacity: 0, y: 24, rotate: -4 }"
              :animate="{ opacity: 1, y: 0, rotate: 0 }"
              :transition="{ type: 'spring', stiffness: 120, damping: 14, delay: 1.9 }"
            >
              Diversion
            </Motion>
          </Motion>

          <Motion
            as="p"
            class="mx-auto mt-8 max-w-2xl text-balance text-lg text-muted sm:text-xl"
            :variants="item"
          >
            Unity was ambitious. Diversity was optimistic. Diversion is what actually happens, and it comes with a 14-step process.
          </Motion>

          <Motion
            as="div"
            class="mt-10 flex flex-wrap justify-center gap-4"
            :variants="item"
          >
            <Motion
              as="div"
              :while-hover="{ scale: 1.06, rotate: -1 }"
              :while-tap="{ scale: 0.94 }"
            >
              <UButton
                size="xl"
                to="/apply"
                color="warning"
                variant="outline"
                trailing-icon="i-lucide-arrow-right"
              >
                Begin application
              </UButton>
            </Motion>
            <Motion
              as="div"
              :while-hover="{ scale: 1.06, rotate: 1 }"
              :while-tap="{ scale: 0.94 }"
            >
              <UButton
                size="xl"
                color="neutral"
                variant="subtle"
                to="/appterms"
              >
                Read the small print
              </UButton>
            </Motion>
          </Motion>
        </Motion>
      </UContainer>
    </section>

    <section
      id="priorities"
      class="bg-muted py-20 sm:py-28"
    >
      <UContainer>
        <Motion
          as="div"
          class="mb-14 text-center"
          :initial="{ opacity: 0, y: 32 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.7 }"
        >
          <h2 class="text-3xl font-bold text-highlighted sm:text-4xl">
            Our Priorities
          </h2>
          <p class="mt-4 text-muted">
            Ranked in order of urgency, as determined by a committee that has yet to convene.
          </p>
        </Motion>

        <Motion
          as="div"
          class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          :while-in-view="'show'"
          :in-view-options="{ once: true, amount: 0.2 }"
          :variants="{ hidden: {}, show: { transition: { staggerChildren: 0.1 } } }"
        >
          <Motion
            v-for="(policy, i) in policies"
            :key="policy.title"
            as="div"
            class="group relative rounded-lg border border-default bg-default p-6 transition-colors hover:border-primary focus-within:ring-2 focus-within:ring-primary"
            :variants="{
              hidden: { opacity: 0, y: 40, rotate: i % 2 ? 2 : -2 },
              show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 100, damping: 15 } }
            }"
            :while-hover="{ y: -8, rotate: i % 2 ? 1 : -1, boxShadow: '0 20px 40px -20px rgba(0, 51, 153, 0.35)' }"
            :while-tap="{ scale: 0.97 }"
          >
            <Motion
              as="div"
              class="inline-flex"
              :while-hover="{ rotate: 360, scale: 1.2 }"
              :transition="{ duration: 0.6 }"
            >
              <UIcon
                :name="policy.icon"
                class="size-8 text-primary"
              />
            </Motion>

            <h3 class="mt-4 flex items-center gap-2 text-lg font-semibold text-highlighted">
              <ULink
                :to="policy.to"
                class="after:absolute after:inset-0 focus:outline-none"
              >
                {{ policy.title }}
              </ULink>
              <UIcon
                name="i-lucide-arrow-right"
                class="size-4 -translate-x-1 text-primary opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
              />
            </h3>

            <p class="mt-2 text-sm text-muted">
              {{ policy.text }}
            </p>
          </Motion>
        </Motion>
      </UContainer>
    </section>

    <section
      id="contact"
      class="py-24 sm:py-32"
    >
      <UContainer>
        <Motion
          as="div"
          class="mx-auto max-w-2xl text-center"
          :initial="{ opacity: 0, scale: 0.9, y: 40 }"
          :while-in-view="{ opacity: 1, scale: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ type: 'spring', stiffness: 90, damping: 14 }"
        >
          <h2 class="text-3xl font-bold text-highlighted sm:text-4xl">
            Your call is important to us
          </h2>
          <p class="mt-4 text-muted">
            Please remain on the line. Your estimated wait time is a temporary measure.
          </p>
          <Motion
            as="div"
            class="mt-8 inline-block"
            :animate="{ scale: [1, 1.05, 1] }"
            :transition="{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }"
            :while-hover="{ scale: 1.12, rotate: -2 }"
            :while-tap="{ scale: 0.92 }"
          >
            <UButton
              size="xl"
              to="/forms"
              trailing-icon="i-lucide-arrow-right"
            >
              Submit Form 27B/6
            </UButton>
          </Motion>
          <p class="mt-6 text-sm text-muted">
            Or
            <ULink
              to="/contact"
              class="text-primary"
            >
              contact us
            </ULink>.
            We have no details.
          </p>
        </Motion>
      </UContainer>
    </section>
  </div>
</template>
