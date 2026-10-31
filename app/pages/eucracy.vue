<script setup lang="ts">
import { Motion } from 'motion-v'
import { eucracyIntro, competences, supremacy, eucracySummary } from '~/data/div'

useSeoMeta({
  title: eucracyIntro.title,
  description: eucracyIntro.description
})

const list = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } }
}

const row = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: 'easeOut' } }
}
</script>

<template>
  <div>
    <section class="py-20 sm:py-28">
      <EPageIntro
        :title="eucracyIntro.title"
        :description="eucracyIntro.description"
      />
    </section>

    <section class="pb-20 sm:pb-28">
      <UContainer class="space-y-10">
        <Motion
          v-for="tier in competences"
          :key="tier.id"
          as="article"
          class="border border-default border-l-2 bg-default p-6 sm:p-8"
          :style="{ borderLeftColor: tier.accent }"
          :initial="{ opacity: 0, y: 40 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true, amount: 0.15 }"
          :transition="{ duration: 0.6, ease: 'easeOut' }"
        >
          <div class="flex flex-wrap items-start justify-between gap-4">
            <div class="flex items-start gap-4">
              <Motion
                as="span"
                class="inline-flex"
                :while-hover="{ rotate: 360, scale: 1.15 }"
                :transition="{ duration: 0.6 }"
              >
                <UIcon
                  :name="tier.icon"
                  class="size-9"
                  :style="{ color: tier.accent }"
                />
              </Motion>
              <div>
                <h2 class="text-2xl font-bold text-highlighted">
                  {{ tier.title }}
                </h2>
                <UBadge
                  class="mt-2"
                  color="neutral"
                  variant="subtle"
                  :label="tier.article"
                />
              </div>
            </div>

            <div class="w-40">
              <div class="mb-1 flex justify-between text-xs text-muted">
                <span>EU control</span>
                <span>{{ tier.control }}%</span>
              </div>
              <div class="h-2 bg-elevated">
                <Motion
                  as="div"
                  class="h-full"
                  :style="{ backgroundColor: tier.accent }"
                  :initial="{ width: '0%' }"
                  :while-in-view="{ width: `${tier.control}%` }"
                  :in-view-options="{ once: true }"
                  :transition="{ type: 'spring', stiffness: 60, damping: 16, delay: 0.3 }"
                />
              </div>
            </div>
          </div>

          <p class="mt-6 text-default">
            {{ tier.intro }}
          </p>

          <Motion
            as="ul"
            class="mt-5 space-y-2"
            initial="hidden"
            :while-in-view="'show'"
            :in-view-options="{ once: true, amount: 0.2 }"
            :variants="list"
          >
            <Motion
              v-for="item in tier.items"
              :key="item"
              as="li"
              class="flex items-start gap-3 text-sm text-default"
              :variants="row"
            >
              <UIcon
                name="i-lucide-chevron-right"
                class="mt-0.5 size-4 shrink-0"
                :style="{ color: tier.accent }"
              />
              <span>{{ item }}</span>
            </Motion>
          </Motion>

          <div
            v-if="tier.reality"
            class="mt-6 border-l-2 border-secondary bg-muted p-4"
          >
            <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
              Reality check
            </p>
            <p class="text-sm text-default">
              {{ tier.reality }}
            </p>
          </div>
        </Motion>
      </UContainer>
    </section>

    <section class="bg-muted py-20 sm:py-28">
      <UContainer class="max-w-4xl">
        <Motion
          as="div"
          class="mb-12 text-center"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.6 }"
        >
          <h2 class="text-3xl font-bold text-highlighted sm:text-4xl">
            {{ supremacy.title }}
          </h2>
          <p class="mt-3 text-muted">
            {{ supremacy.subtitle }}
          </p>
        </Motion>

        <div class="grid gap-6 md:grid-cols-2">
          <Motion
            v-for="(position, i) in supremacy.positions"
            :key="position.side"
            as="div"
            class="border border-default bg-default p-6"
            :initial="{ opacity: 0, x: i ? 40 : -40 }"
            :while-in-view="{ opacity: 1, x: 0 }"
            :in-view-options="{ once: true }"
            :transition="{ type: 'spring', stiffness: 90, damping: 16 }"
            :while-hover="{ y: -4 }"
          >
            <div class="flex items-center gap-3">
              <UIcon
                :name="position.icon"
                class="size-7"
                :style="{ color: position.accent }"
              />
              <h3 class="text-lg font-semibold text-highlighted">
                {{ position.side }}
              </h3>
            </div>
            <p class="mt-4 text-2xl text-highlighted">
              {{ position.text }}
            </p>
            <p class="mt-3 text-sm text-muted">
              {{ position.detail }}
            </p>
          </Motion>
        </div>

        <Motion
          as="p"
          class="mt-8 border border-default bg-default p-5 text-sm text-default"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5 }"
        >
          {{ supremacy.slovakia }}
        </Motion>

        <Motion
          as="div"
          class="mt-6 border-l border-primary bg-default p-5"
          :initial="{ opacity: 0, y: 24 }"
          :while-in-view="{ opacity: 1, y: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ duration: 0.5, delay: 0.1 }"
        >
          <p class="mb-1 text-xs font-semibold uppercase tracking-widest text-primary">
            In practice
          </p>
          <p class="text-default">
            {{ supremacy.practice }}
          </p>
        </Motion>
      </UContainer>
    </section>

    <section class="py-24 sm:py-32">
      <UContainer class="max-w-3xl text-center">
        <Motion
          as="div"
          :initial="{ opacity: 0, scale: 0.94 }"
          :while-in-view="{ opacity: 1, scale: 1 }"
          :in-view-options="{ once: true }"
          :transition="{ type: 'spring', stiffness: 90, damping: 14 }"
        >
          <UIcon
            name="i-lucide-star"
            class="mx-auto mb-6 size-8 fill-current text-secondary"
          />
          <h2 class="text-3xl font-bold text-highlighted sm:text-4xl">
            {{ eucracySummary.title }}
          </h2>
          <p class="mt-6 text-xl leading-relaxed text-default text-balance">
            {{ eucracySummary.text }}
          </p>
        </Motion>
      </UContainer>
    </section>
  </div>
</template>
