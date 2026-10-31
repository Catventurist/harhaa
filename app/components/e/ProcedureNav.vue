<script setup lang="ts">
import { procedureLinks } from '~/data/div'
</script>

<template>
  <div class="mb-12 flex justify-center">
    <UNavigationMenu :items="procedureLinks" />
  </div>
</template>
