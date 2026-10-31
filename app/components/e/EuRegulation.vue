<script setup lang="ts">
import { articles, recitals, stars } from '~/data/div'

const signed = ref(false)
</script>

<template>
  <div class="relative w-full max-w-2xl mx-auto overflow-hidden rounded-xl border border-default bg-default/80">
    <div class="relative px-8 pt-10 pb-8 text-center text-inverted bg-linear-to-b from-primary/20 to-primary/40">
      <Motion
        as="div"
        class="relative mx-auto mb-6 size-28"
        :animate="{ rotate: 360 }"
        :transition="{ duration: 90, repeat: Infinity, ease: 'linear' }"
      >
        <UIcon
          v-for="angle in stars"
          :key="angle"
          name="i-lucide-star"
          class="absolute left-1/2 top-1/2 size-5 -ml-2.5 -mt-2.5 text-secondary fill-secondary"
          :style="{ transform: `rotate(${angle}deg) translateY(-3.1rem)` }"
        />
      </Motion>

      <Motion
        as="p"
        class="text-xs tracking-[0.35em] text-secondary"
        :initial="{ opacity: 0, y: -10 }"
        :animate="{ opacity: 1, y: 0 }"
      >
        REGULATION (EU) 2026/1234
      </Motion>

      <Motion
        as="h1"
        class="mt-3 text-2xl font-bold text-default leading-snug"
        :initial="{ opacity: 0, y: 10 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ delay: 0.15 }"
      >
        on the Harmonisation of Motto Interpretation across the Union
      </Motion>

      <Motion
        as="p"
        class="mt-2 text-sm text-info"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.3 }"
      >
        of the European Parliament and of the Council
      </Motion>
    </div>

    <div class="h-1 bg-linear-to-r from-secondary via-secondary/40 to-secondary" />

    <div class="px-8 py-8 space-y-8">
      <Motion
        as="div"
        class="space-y-1 text-sm italic text-muted"
        :initial="{ opacity: 0 }"
        :while-in-view="{ opacity: 1 }"
        :in-view-options="{ once: true }"
      >
        <p>Having regard to the Treaty on European Union,</p>
        <p>Having regard to Regulation (EU) 2000/1 on the Motto,</p>
      </Motion>

      <div class="space-y-3">
        <p class="font-semibold">
          Whereas:
        </p>
        <Motion
          v-for="(recital, i) in recitals"
          :key="i"
          as="div"
          class="flex gap-3"
          :initial="{ opacity: 0, x: -24 }"
          :while-in-view="{ opacity: 1, x: 0 }"
          :in-view-options="{ once: true }"
          :transition="{ delay: i * 0.1 }"
        >
          <UBadge
            :label="`${i + 1}`"
            color="secondary"
            variant="subtle"
            class="shrink-0"
          />
          <p class="text-sm">
            {{ recital }}
          </p>
        </Motion>
      </div>

      <USeparator label="Have adopted this Regulation" />

      <Motion
        v-for="article in articles"
        :key="article.number"
        as="div"
        :initial="{ opacity: 0, y: 30 }"
        :while-in-view="{ opacity: 1, y: 0 }"
        :while-hover="{ x: 4 }"
        :in-view-options="{ once: true }"
        :transition="{ type: 'spring', stiffness: 200, damping: 22 }"
      >
        <UCard variant="subtle">
          <div class="flex items-start gap-4">
            <div class="flex size-12 shrink-0 flex-col items-center justify-center rounded-lg bg-primary/40 text-secondary">
              <span class="text-[0.6rem] tracking-widest text-secondary">ART.</span>
              <span class="text-lg font-bold leading-none">{{ article.number }}</span>
            </div>

            <div class="space-y-2">
              <h3 class="text-lg font-semibold">
                {{ article.title }}
              </h3>
              <p
                v-if="article.intro"
                class="text-sm"
              >
                {{ article.intro }}
              </p>
              <p
                v-for="line in article.body"
                :key="line"
                class="text-sm text-muted"
              >
                {{ line }}
              </p>
            </div>
          </div>
        </UCard>
      </Motion>

      <USeparator icon="i-lucide-landmark" />

      <div class="grid grid-cols-2 gap-6 text-center text-sm">
        <div>
          <p class="text-muted">
            For the European Parliament
          </p>
          <p class="mt-6 border-t border-default pt-2 font-medium">
            The President
          </p>
        </div>
        <div>
          <p class="text-muted">
            For the Council
          </p>
          <p class="mt-6 border-t border-default pt-2 font-medium">
            The President
          </p>
        </div>
      </div>

      <p class="text-center text-sm text-muted">
        Done at Brussels, 27 October 2026.
      </p>

      <div class="relative flex min-h-24 items-center justify-center">
        <AnimatePresence mode="wait">
          <Motion
            v-if="!signed"
            key="sign"
            as="div"
            class="w-full"
            :exit="{ opacity: 0, scale: 0.9 }"
            :while-hover="{ scale: 1.02 }"
            :while-press="{ scale: 0.97 }"
          >
            <UButton
              label="Adopt this Regulation"
              icon="i-lucide-pen-line"
              size="lg"
              block
              @click="signed = true"
            />
          </Motion>

          <Motion
            v-else
            key="seal"
            as="div"
            class="flex flex-col items-center gap-2"
            :initial="{ scale: 3, opacity: 0, rotate: -25 }"
            :animate="{ scale: 1, opacity: 1, rotate: -8 }"
            :transition="{ type: 'spring', stiffness: 300, damping: 14 }"
          >
            <div class="flex size-20 items-center justify-center rounded-full border-4 border-double border-secondary text-secondary">
              <UIcon
                name="i-lucide-badge-check"
                class="size-10"
              />
            </div>
            <p class="text-xs font-bold tracking-[0.3em] text-secondary">
              ADOPTED
            </p>
            <UButton
              label="Repeal"
              color="neutral"
              variant="link"
              size="xs"
              @click="signed = false"
            />
          </Motion>
        </AnimatePresence>
      </div>
    </div>
  </div>
</template>
