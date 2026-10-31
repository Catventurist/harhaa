<script setup lang="ts">
import type { TabsItem } from '@nuxt/ui'

useSeoMeta({
  title: 'Tests',
  description: 'Try from diffrent perspective.'
})

const categories: TabsItem[] = [
  { label: 'Regulation', icon: 'i-lucide-landmark', value: 'regulation', slot: 'regulation' },
  { label: 'Language', icon: 'i-lucide-languages', value: 'language', slot: 'language' },
  { label: 'Games', icon: 'i-lucide-gamepad-2', value: 'games', slot: 'games' }
]

const regulation: TabsItem[] = [
  { label: 'EU regulation', icon: 'i-lucide-scale', value: 'eu', slot: 'eu' },
  { label: 'Pipeline', icon: 'i-lucide-workflow', value: 'pipeline', slot: 'pipeline' },
  { label: 'Audit', icon: 'i-lucide-shovel', value: 'audit', slot: 'audit' },
  { label: 'Video', icon: 'i-lucide-video', value: 'video', slot: 'video' }
]

const language: TabsItem[] = [
  { label: 'Glossary decoder', icon: 'i-lucide-book-open', value: 'glossary', slot: 'glossary' },
  { label: 'Explainer', icon: 'i-lucide-message-circle', value: 'explainer', slot: 'explainer' },
  { label: 'Newspeak', icon: 'i-lucide-message-square-warning', value: 'newspeak', slot: 'newspeak' }
]

const games: TabsItem[] = [
  { label: 'Compliance game', icon: 'i-lucide-shield-check', value: 'compliance', slot: 'compliance' },
  { label: 'Pajatso', icon: 'i-lucide-coins', value: 'pajatso', slot: 'pajatso' }
]

const route = useRoute()
const router = useRouter()

const tree = [
  { value: 'regulation', items: regulation },
  { value: 'language', items: language },
  { value: 'games', items: games }
]

const tab = computed<string>({
  get: () => String(route.query.tab ?? 'eu'),
  set: (value) => {
    router.replace({ query: { ...route.query, tab: value } })
  }
})

const category = computed<string>({
  get: () => tree.find(c => c.items.some(i => i.value === tab.value))?.value ?? 'regulation',
  set: (value) => {
    tab.value = String(tree.find(c => c.value === value)!.items[0]!.value)
  }
})
</script>

<template>
  <div>
    <UContainer>
      <UTabs
        v-model="category"
        :items="categories"
        variant="link"
        class="w-full"
      >
        <template #regulation>
          <UTabs
            v-model="tab"
            :items="regulation"
            size="sm"
            class="w-full pt-2"
          >
            <template #eu>
              <LazyEEuRegulation />
            </template>
            <template #pipeline>
              <LazyEPipeline />
            </template>
            <template #audit>
              <LazyEPowerAudit />
            </template>
            <template #video>
              <LazyEBootVideo
                src="/media/clip.mp4"
                poster="/catdark.webp"
                hydrate-on-visible
              />
            </template>
          </UTabs>
        </template>

        <template #language>
          <UTabs
            v-model="tab"
            :items="language"
            size="sm"
            class="w-full pt-4"
          >
            <template #glossary>
              <LazyEGlossaryDecoder />
            </template>
            <template #explainer>
              <LazyEChatExplainer hydrate-on-visible />
            </template>
            <template #newspeak>
              <LazyNewspeakMain />
            </template>
          </UTabs>
        </template>

        <template #games>
          <UTabs
            v-model="tab"
            :items="games"
            size="sm"
            class="w-full pt-4"
          >
            <template #compliance>
              <LazyEComplianceGame hydrate-on-visible />
            </template>
            <template #pajatso>
              <LazyEPajatso hydrate-on-visible />
            </template>
          </UTabs>
        </template>
      </UTabs>
    </UContainer>
  </div>
</template>
