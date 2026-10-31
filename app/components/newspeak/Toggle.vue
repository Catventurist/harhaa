<script setup lang="ts">
const { mode } = useNewspeak()
</script>

<template>
  <UFieldGroup>
    <UButton
      label="NEWSPEAK"
      icon="i-lucide-file-text"
      :color="mode === 'newspeak' ? 'primary' : 'neutral'"
      :variant="mode === 'newspeak' ? 'solid' : 'subtle'"
      @click="mode = 'newspeak'"
    />
    <UButton
      label="IRL"
      icon="i-lucide-eye"
      :color="mode === 'irl' ? 'secondary' : 'neutral'"
      :variant="mode === 'irl' ? 'solid' : 'subtle'"
      @click="mode = 'irl'"
    />
  </UFieldGroup>
</template>
