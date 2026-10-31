<script setup lang="ts">
import { Motion } from 'motion-v'
import { contactPage } from '~/data/div'

useSeoMeta({
  title: contactPage.title,
  description: contactPage.description
})

const toast = useToast()
const requests = ref(0)

function request() {
  requests.value++
  toast.add({
    title: contactPage.action.toast.title,
    description: contactPage.action.toast.description,
    icon: 'i-lucide-shield-check'
  })
}
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="max-w-3xl">
      <EPageIntro
        :title="contactPage.title"
        :description="contactPage.description"
      />

      <div class="grid gap-4 sm:grid-cols-2">
        <Motion
          v-for="(entry, i) in contactPage.entries"
          :key="entry.label"
          as="div"
          class="border border-default bg-default p-5"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.15 + i * 0.08 }"
          :while-hover="{ y: -3 }"
        >
          <UIcon
            :name="entry.icon"
            class="size-6 text-primary"
          />
          <p class="mt-3 text-xs font-semibold uppercase tracking-widest text-muted">
            {{ entry.label }}
          </p>
          <p class="mt-1 select-none font-mono text-lg text-highlighted">
            <span class="bg-muted px-1 text-warning/60">██████████</span>
          </p>
          <p class="mt-1 text-sm font-semibold text-highlighted">
            {{ entry.value }}
          </p>
          <p class="mt-1 text-sm text-muted">
            {{ entry.note }}
          </p>
        </Motion>
      </div>

      <Motion
        as="div"
        class="mt-10 border-l-4 border-secondary bg-muted p-5"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
        :transition="{ delay: 0.6 }"
      >
        <p class="text-sm text-default">
          {{ contactPage.statement }}
        </p>
      </Motion>

      <div class="mt-8 text-center">
        <UButton
          :label="contactPage.action.label"
          icon="i-lucide-shield-check"
          size="lg"
          @click="request"
        />
        <p
          v-if="requests > 1"
          class="mt-3 text-xs text-muted"
        >
          {{ requests }} requests received. All have been closed.
        </p>
      </div>

      <p class="mt-10 text-center text-xs text-dimmed">
        {{ contactPage.footnote }}
      </p>
    </UContainer>
  </section>
</template>
