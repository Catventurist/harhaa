<script setup lang="ts">
import { legalLinks } from '~/data/div'
</script>

<template>
  <div class="mb-12 flex justify-center">
    <UNavigationMenu :items="legalLinks" />
  </div>
</template>
