<script setup lang="ts">
import { Motion } from 'motion-v'
import { appealGrounds, appealLevels, toWord } from '~/data/div'

const title = 'Appeals'
const description = `Appeals against decisions are handled in ${toWord(appealLevels.length)} instances.`

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})

const toast = useToast()

const state = reactive({
  reference: '',
  grounds: undefined as string | undefined,
  details: ''
})

const level = ref(0)
const submitted = ref(false)

function validate() {
  const errors: { name: string, message: string }[] = []
  if (!state.reference.trim()) errors.push({ name: 'reference', message: 'A reference number is required.' })
  if (!state.grounds) errors.push({ name: 'grounds', message: 'Select one of the grounds.' })
  return errors
}

function submit() {
  submitted.value = true
  level.value = (level.value + 1) % appealLevels.length
  toast.add({
    title: 'Appeal received',
    description: `Escalated to: ${appealLevels[level.value]}.`,
    icon: 'i-lucide-gavel'
  })
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

      <UForm
        :state="state"
        :validate="validate"
        class="space-y-6"
        @submit="submit"
      >
        <UFormField
          name="reference"
          label="Reference number"
          required
        >
          <UInput
            v-model="state.reference"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="grounds"
          label="Grounds for appeal"
          required
        >
          <USelect
            v-model="state.grounds"
            :items="appealGrounds"
            value-key="value"
            placeholder="Select grounds"
            class="w-full"
          />
        </UFormField>

        <UFormField
          name="details"
          label="Details"
        >
          <UTextarea
            v-model="state.details"
            :rows="5"
            class="w-full"
          />
        </UFormField>

        <UButton
          type="submit"
          label="Submit appeal"
          icon="i-lucide-gavel"
          size="lg"
        />
      </UForm>

      <Motion
        v-if="submitted"
        as="ol"
        class="mt-12 space-y-3"
        :initial="{ opacity: 0 }"
        :animate="{ opacity: 1 }"
      >
        <Motion
          v-for="(item, i) in appealLevels"
          :key="item"
          as="li"
          class="flex items-center gap-3 border border-default p-3 text-sm"
          :class="i === level ? 'bg-primary/10 text-highlighted' : 'text-muted'"
          :animate="{ x: i === level ? 8 : 0 }"
          :transition="{ type: 'spring', stiffness: 160, damping: 16 }"
        >
          <UIcon
            :name="i === level ? 'i-lucide-circle-dot' : 'i-lucide-circle'"
            class="size-4"
          />
          <span>{{ i + 1 }}. {{ item }}</span>
        </Motion>
      </Motion>
    </UContainer>
  </section>
</template>
