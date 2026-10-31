<script setup lang="ts">
import { Motion } from 'motion-v'
import { cookieSettings } from '~/data/div'

useSeoMeta({
  title: cookieSettings.title,
  description: cookieSettings.description
})

const toast = useToast()

const choices = reactive<Record<string, boolean>>(
  Object.fromEntries(cookieSettings.categories.map(c => [c.id, c.locked]))
)

function save() {
  toast.add({
    title: 'Preferences noted',
    description: 'They have also been ignored.',
    icon: 'i-lucide-cookie'
  })
}

function acceptAll() {
  for (const category of cookieSettings.categories) choices[category.id] = true
  toast.add({ title: 'All cookies accepted', icon: 'i-lucide-cookie' })
}

function rejectAll() {
  for (const category of cookieSettings.categories) choices[category.id] = category.locked
  toast.add({
    title: 'Rejected',
    description: 'Strictly necessary cookies remain. They are strictly necessary.',
    icon: 'i-lucide-cookie'
  })
}
</script>

<template>
  <section class="pb-16 sm:pb-24">
    <UContainer class="max-w-2xl">
      <ELegalNav />
      <EPageIntro
        :title="cookieSettings.title"
        :description="cookieSettings.description"
      />

      <div class="space-y-4">
        <Motion
          v-for="(category, i) in cookieSettings.categories"
          :key="category.id"
          as="div"
          class="border border-default bg-default p-5"
          :initial="{ opacity: 0, y: 20 }"
          :animate="{ opacity: 1, y: 0 }"
          :transition="{ delay: 0.15 + i * 0.08 }"
        >
          <USwitch
            v-model="choices[category.id]"
            :label="category.label"
            :description="category.description"
            :disabled="category.locked"
          />
        </Motion>
      </div>

      <div class="mt-8 flex flex-wrap gap-3">
        <UButton
          label="Save preferences"
          icon="i-lucide-check"
          @click="save"
        />
        <UButton
          label="Accept all"
          color="neutral"
          variant="subtle"
          @click="acceptAll"
        />
        <UButton
          label="Reject all"
          color="neutral"
          variant="subtle"
          @click="rejectAll"
        />
      </div>
    </UContainer>
  </section>
</template>
