<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { statusMessages, statusPlaceholder } from '~/data/div'

const title = 'Status of your request'
const description = 'Check the status of your request.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const reference = ref('')
const checking = ref(false)
const result = ref<{ status: typeof statusMessages[number], position: number, reference: string } | null>(null)

async function check() {
  const value = reference.value.trim()
  if (!value) return

  checking.value = true
  result.value = null
  await new Promise(resolve => setTimeout(resolve, 1500))

  const sum = [...value].reduce((a, c) => a + c.charCodeAt(0), 0)
  result.value = {
    status: statusMessages[sum % statusMessages.length]!,
    position: (sum * 7) % 9000 + 1000,
    reference: value
  }
  checking.value = false
}
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <UContainer class="max-w-2xl">
      <EProcedureNav />
      <EPageIntro
        :title="title"
        :description="description"
      />

      <div class="flex gap-3">
        <UInput
          id="reference"
          v-model="reference"
          :placeholder="statusPlaceholder"
          size="lg"
          class="flex-1"
          @keyup.enter="check"
        />
        <UButton
          label="Check status"
          icon="i-lucide-search"
          size="lg"
          :loading="checking"
          :disabled="!reference.trim()"
          @click="check"
        />
      </div>

      <AnimatePresence mode="wait">
        <Motion
          v-if="checking"
          key="checking"
          as="div"
          class="mt-10"
          :initial="{ opacity: 0 }"
          :animate="{ opacity: 1 }"
          :exit="{ opacity: 0 }"
        >
          <p class="mb-3 text-sm text-muted">
            Locating your request
          </p>
          <UProgress animation="carousel" />
        </Motion>

        <Motion
          v-else-if="result"
          :key="result.reference"
          as="div"
          class="mt-10 border border-default bg-muted p-6"
          :initial="{ opacity: 0, y: 24 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0 }"
        >
          <div class="flex flex-wrap items-center justify-between gap-3">
            <p class="font-mono text-sm text-muted">
              {{ result.reference }}
            </p>
            <UBadge
              :color="result.status.color"
              variant="subtle"
              :label="result.status.label"
            />
          </div>
          <p class="mt-4 text-xl text-highlighted">
            {{ result.status.note }}
          </p>
          <dl class="mt-6 grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt class="text-muted">
                Position in queue
              </dt>
              <dd class="font-semibold text-highlighted">
                {{ result.position.toLocaleString() }}
              </dd>
            </div>
            <div>
              <dt class="text-muted">
                Estimated decision
              </dt>
              <dd class="font-semibold text-highlighted">
                2041
              </dd>
            </div>
          </dl>
        </Motion>
      </AnimatePresence>
    </UContainer>
  </section>
</template>
