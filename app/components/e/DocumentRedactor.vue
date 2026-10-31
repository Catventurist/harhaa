<script setup lang="ts">
const props = withDefaults(defineProps<{
  modelValue?: string
  level?: number
  mode?: 'sentence' | 'word'
  hoverReveal?: boolean
}>(), {
  modelValue: '',
  level: 50,
  mode: 'sentence',
  hoverReveal: false
})

const emit = defineEmits<{
  'update:modelValue': [value: string]
  'update:level': [value: number]
  'update:mode': [value: 'sentence' | 'word']
  'update:hoverReveal': [value: boolean]
}>()

const toast = useToast()

const text = computed({
  get: () => props.modelValue,
  set: value => emit('update:modelValue', value)
})

const level = computed({
  get: () => props.level,
  set: value => emit('update:level', value)
})

const mode = computed({
  get: () => props.mode,
  set: value => emit('update:mode', value)
})

const hoverReveal = computed({
  get: () => props.hoverReveal,
  set: value => emit('update:hoverReveal', value)
})

function score(str: string) {
  let h = 2166136261
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i)
    h = Math.imul(h, 16777619)
  }
  return (h >>> 0) % 100
}

const parts = computed(() => {
  const regex = mode.value === 'sentence' ? /[^.!?]+[.!?]*\s*/g : /\S+\s*/g
  const chunks = text.value.match(regex) ?? []
  return chunks.map(chunk => ({
    text: chunk,
    redacted: score(chunk.trim().toLowerCase()) < level.value
  }))
})

const output = computed(() =>
  parts.value.map(p => (p.redacted ? p.text.replace(/\S/g, '█') : p.text)).join('')
)

const redactedCount = computed(() => parts.value.filter(p => p.redacted).length)

const levelLabel = computed(() => {
  if (level.value < 25) return 'Public'
  if (level.value < 50) return 'Restricted'
  if (level.value < 75) return 'Confidential'
  return 'Eyes only'
})

async function copy() {
  await navigator.clipboard.writeText(output.value)
  toast.add({ title: 'Copied', description: 'The redacted text has been copied. Some of it has not.' })
}
</script>

<template>
  <div class="grid gap-8 lg:grid-cols-2">
    <div class="space-y-6">
      <UTextarea
        v-model="text"
        name="pasted"
        :rows="12"
        class="w-full"
        autoresize
      />

      <div>
        <div class="mb-2 flex items-center justify-between text-sm">
          <span class="font-medium text-highlighted">Classification level</span>
          <UBadge
            :label="levelLabel"
            color="secondary"
            variant="subtle"
          />
        </div>
        <USlider
          v-model="level"
          :min="0"
          :max="100"
        />
      </div>

      <div class="flex flex-wrap items-center gap-4">
        <UFieldGroup>
          <UButton
            label="Sentences"
            color="neutral"
            :variant="mode === 'sentence' ? 'soft' : 'outline'"
            @click="mode = 'sentence'"
          />
          <UButton
            label="Words"
            color="neutral"
            :variant="mode === 'word' ? 'soft' : 'outline'"
            @click="mode = 'word'"
          />
        </UFieldGroup>
        <USwitch
          v-model="hoverReveal"
          label="Declassify on hover"
        />
      </div>
    </div>

    <UCard>
      <template #header>
        <div class="flex items-center justify-between">
          <span class="text-sm text-muted">
            {{ redactedCount }} of {{ parts.length }} redacted
          </span>
          <UButton
            icon="i-lucide-copy"
            label="Copy"
            size="sm"
            color="neutral"
            variant="subtle"
            @click="copy"
          />
        </div>
      </template>

      <p class="leading-relaxed">
        <template
          v-for="(part, i) in parts"
          :key="i"
        >
          <span
            v-if="part.redacted"
            class="rounded-sm bg-inverted/60 text-transparent select-none transition-colors"
            :class="hoverReveal && 'hover:bg-transparent hover:text-default'"
          >{{ part.text }}</span>
          <span v-else>{{ part.text }}</span>
        </template>
      </p>
    </UCard>
  </div>
</template>
