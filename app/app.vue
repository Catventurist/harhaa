<script setup lang="ts">
import { MotionConfig } from 'motion-v'

const reduceMotion = useState('reduceMotion', () => false)
const { navigation, files, links, ready } = useContentNav('content')
await ready

useHead({
  link: [{ rel: 'alternate', type: 'application/rss+xml', title: 'Harhaa', href: '/rss.xml' }],
  htmlAttrs: { lang: 'en' }
})
</script>

<template>
  <UApp>
    <MotionConfig :reduced-motion="reduceMotion ? 'always' : 'user'">
      <NuxtRouteAnnouncer />
      <LazyEHeader />
      <UMain>
        <NuxtPage />
      </UMain>
      <LazyEFooter />
      <ClientOnly>
        <LazyUContentSearch
          :navigation="navigation"
          :files="files"
          :links="links"
          :fuse="{ resultLimit: 20, fuseOptions: { threshold: 0.2 } }"
        />
      </ClientOnly>
    </MotionConfig>
  </UApp>
</template>
