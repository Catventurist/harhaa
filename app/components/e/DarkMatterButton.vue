<script setup lang="ts">
const { darkMatter, calibrated, value, display, color } = useDarkMatter()
const open = ref(false)
const toast = useToast()

function exportReport() {
  const blob = new Blob(
    [JSON.stringify({ darkMatter: value.value, calibrated: calibrated.value }, null, 2)],
    { type: 'application/json' }
  )
  const a = document.createElement('a')
  a.href = URL.createObjectURL(blob)
  a.download = 'dark-matter-report.json'
  a.click()
  URL.revokeObjectURL(a.href)

  toast.add({ title: 'Report downloaded', description: display.value, icon: 'i-lucide-check' })
  open.value = false
}

async function copyLink() {
  await navigator.clipboard.writeText(window.location.href)
  toast.add({ title: 'Link copied', icon: 'i-lucide-link' })
}
</script>

<template>
  <UPopover
    v-model:open="open"
    :ui="{ content: 'w-72' }"
  >
    <UButton
      :label="`Dark matter ${display}`"
      variant="ghost"
      size="xs"
      :color="color"
      :aria-label="`Dark matter content: ${display}`"
      :icon="value > 50 ? 'i-lucide-circle-slash' : 'i-lucide-circle-dot'"
      :trailing-icon="open ? 'i-lucide-chevron-up' : 'i-lucide-chevron-down'"
    />

    <template #content>
      <div class="p-4 space-y-4">
        <div class="flex items-center justify-between">
          <span class="text-sm font-medium">Dark matter content</span>
          <span class="text-sm tabular-nums text-muted">{{ display }}</span>
        </div>

        <USlider
          v-model="darkMatter"
          :min="0"
          :max="100"
          :color="color"
          :disabled="calibrated"
          tooltip
        />

        <div class="flex justify-between text-xs text-muted">
          <span>0% · All matter</span>
          <span>100% · All nothing</span>
        </div>

        <UCheckbox
          v-model="calibrated"
          label="Calibrate"
          description="Compare against the reference corpus. Locks the value at 71.3%."
          size="sm"
        />

        <div class="space-y-2">
          <UButton
            label="Download (JSON)"
            icon="i-lucide-download"
            size="sm"
            variant="outline"
            block
            @click="exportReport"
          />
          <UButton
            label="Copy link"
            icon="i-lucide-link"
            size="sm"
            variant="ghost"
            block
            @click="copyLink"
          />
        </div>
      </div>
    </template>
  </UPopover>
</template>
