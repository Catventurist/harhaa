<script setup lang="ts">
import { officialLanguages, portalSections } from '~/data/div'

const selected = ref('EN')
const showAll = ref(false)
const visible = computed(() => showAll.value ? officialLanguages : officialLanguages.slice(0, 8))
</script>

<template>
  <div>
    <div class="relative overflow-hidden bg-linear-to-b from-primary/20 to-primary/40 text-info">
      <UContainer class="py-16 text-center">
        <Motion
          as="div"
          class="relative mx-auto mb-6 size-28"
          :animate="{ rotate: 360 }"
          :transition="{ duration: 90, repeat: Infinity, ease: 'linear' }"
        >
          <UIcon
            v-for="angle in 12"
            :key="angle"
            name="i-lucide-star"
            class="absolute left-1/2 top-1/2 size-5 -ml-2.5 -mt-2.5 text-secondary fill-secondary"
            :style="{ transform: `rotate(${(angle - 1) * 30}deg) translateY(-3.1rem)` }"
          />
        </Motion>

        <Motion
          as="h1"
          class="text-4xl font-bold"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
        >
          United in Diversity (Diversion)
        </Motion>

        <Motion
          as="p"
          class="mt-3 text-muted"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :transition="{ delay: 0.2 }"
        >
          <NewspeakText
            newspeak="Everything you need to know about the Union, and where to be diverted next."
            irl="We will tell you what we want you to know."
          />
        </Motion>

        <Motion
          as="div"
          class="mt-6 flex flex-wrap justify-center gap-3"
          :initial="{ opacity: 0, y: 10 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.35 }"
        >
          <NewspeakToggle />
          <UButton
            label="Read the Regulation"
            color="secondary"
            icon="i-lucide-scroll-text"
            to="/regulation"
          />
          <UButton
            label="Play Pajatso"
            color="neutral"
            variant="subtle"
            icon="i-lucide-gamepad-2"
            to="/test?tab=pajatso"
          />
        </Motion>
      </UContainer>

      <div class="h-1 bg-linear-to-r from-secondary via-secondary/40 to-secondary" />
    </div>

    <UContainer class="py-12 space-y-8">
      <NewspeakPanel />

      <div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <Motion
          v-for="(section, i) in portalSections"
          :key="section.title"
          as="div"
          :initial="{ opacity: 0, y: 30 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :while-hover="{ y: -4 }"
          :in-view-options="{ once: true }"
          :transition="{ type: 'spring', stiffness: 200, damping: 22, delay: (i % 3) * 0.08 }"
        >
          <UCard
            variant="subtle"
            class="h-full"
          >
            <template #header>
              <div class="flex items-center gap-3">
                <div class="flex size-10 items-center justify-center rounded-lg bg-primary text-inverted">
                  <UIcon
                    :name="section.icon"
                    class="size-5"
                  />
                </div>
                <h2 class="text-lg font-semibold">
                  {{ section.title }}
                </h2>
              </div>
            </template>

            <ul class="flex flex-col items-start gap-1">
              <li
                v-for="link in section.links"
                :key="link"
              >
                <UButton
                  :label="link"
                  color="neutral"
                  variant="link"
                  trailing-icon="i-lucide-arrow-up-right"
                  to="#"
                />
              </li>
            </ul>
          </UCard>
        </Motion>
      </div>

      <Motion
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :in-view-options="{ once: true }"
      >
        <UCard variant="subtle">
          <template #header>
            <div class="flex items-center gap-3">
              <div class="flex size-10 items-center justify-center rounded-lg bg-secondary text-inverted">
                <UIcon
                  name="i-lucide-languages"
                  class="size-5"
                />
              </div>
              <h2 class="text-lg font-semibold">
                Multilingual
              </h2>
            </div>
          </template>

          <div class="flex flex-wrap gap-2">
            <UButton
              v-for="lang in visible"
              :key="lang"
              :label="lang"
              size="sm"
              :color="selected === lang ? 'primary' : 'neutral'"
              :variant="selected === lang ? 'solid' : 'subtle'"
              @click="selected = lang"
            />
            <UButton
              :label="showAll ? 'Show fewer' : 'All 24'"
              size="sm"
              color="secondary"
              variant="outline"
              :trailing-icon="showAll ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
              @click="showAll = !showAll"
            />
          </div>
        </UCard>
      </Motion>
    </UContainer>
  </div>
</template>
