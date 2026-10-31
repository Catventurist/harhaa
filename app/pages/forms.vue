<script setup lang="ts">
import { Motion, AnimatePresence } from 'motion-v'
import { formsPage } from '~/data/div'

useSeoMeta({
  title: formsPage.title,
  description: formsPage.description
})

const state = reactive({ name: '', subject: '', message: '' })
const sent = ref(false)
const deletion = ref('')

function validate() {
  const errors: { name: string, message: string }[] = []
  if (!state.name.trim()) errors.push({ name: 'name', message: 'A name is required. It will not be kept.' })
  if (!state.message.trim()) errors.push({ name: 'message', message: 'A request is required.' })
  return errors
}

function submit() {
  deletion.value = `DEL-${Math.floor(Math.random() * 90000 + 10000)}/${new Date().getFullYear()}`
  state.name = ''
  state.subject = ''
  state.message = ''
  sent.value = true
}

function restore() {
  sent.value = false
}
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="max-w-2xl">
      <EPageIntro
        :title="formsPage.title"
        :description="formsPage.description"
      />

      <AnimatePresence mode="wait">
        <Motion
          v-if="!sent"
          key="form"
          as="div"
          :initial="{ opacity: 0, y: 16 }"
          :animate="{ opacity: 1, y: 0 }"
          :exit="{ opacity: 0, y: 40, scale: 0.9, rotate: 3, filter: 'blur(6px)' }"
          :transition="{ duration: 0.5 }"
        >
          <UForm
            :state="state"
            :validate="validate"
            class="space-y-6 border border-default bg-default p-6"
            @submit="submit"
          >
            <UFormField
              name="name"
              :label="formsPage.fields.name"
              required
            >
              <UInput
                v-model="state.name"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="subject"
              :label="formsPage.fields.subject"
            >
              <UInput
                v-model="state.subject"
                class="w-full"
              />
            </UFormField>

            <UFormField
              name="message"
              :label="formsPage.fields.message"
              required
            >
              <UTextarea
                v-model="state.message"
                :rows="6"
                class="w-full"
              />
            </UFormField>

            <UButton
              type="submit"
              label="Submit form"
              icon="i-lucide-send"
              size="lg"
            />
          </UForm>
        </Motion>

        <Motion
          v-else
          key="receipt"
          as="div"
          class="border border-default bg-muted p-8 text-center"
          :initial="{ opacity: 0, scale: 0.9 }"
          :animate="{ opacity: 1, scale: 1 }"
          :transition="{ type: 'spring', stiffness: 120, damping: 14 }"
        >
          <Motion
            as="span"
            class="inline-flex"
            :initial="{ rotate: -20, scale: 0 }"
            :animate="{ rotate: 0, scale: 1 }"
            :transition="{ type: 'spring', stiffness: 200, damping: 12, delay: 0.2 }"
          >
            <UIcon
              name="i-lucide-trash-2"
              class="size-12 text-primary"
            />
          </Motion>
          <h2 class="mt-4 text-2xl font-bold text-highlighted">
            {{ formsPage.receipt.title }}
          </h2>
          <p class="mt-3 text-muted">
            {{ formsPage.receipt.text }}
          </p>
          <p class="mt-4 font-mono text-xs text-muted">
            {{ formsPage.receipt.reference }}: {{ deletion }}
          </p>
          <UButton
            class="mt-6"
            :label="formsPage.restore"
            color="neutral"
            variant="subtle"
            icon="i-lucide-file-plus"
            @click="restore"
          />
        </Motion>
      </AnimatePresence>
    </UContainer>
  </section>
</template>
