<script setup lang="ts">
const text = ref('The committee has reviewed your request. A decision was reached in 2019. It was not communicated. Further details are available upon submission of Form 27B/6. Your call is important to us.')
const level = ref(90)
const mode = ref<'sentence' | 'word'>('sentence')
const hoverReveal = ref(true)

const title = 'Document Redactor'
const description = 'Paste a document. We will decide what you are allowed to read.'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description
})
</script>

<template>
  <section class="py-16 sm:py-24">
    <UContainer class="max-w-5xl">
      <EPageIntro
        :title="title"
        :description="description"
      />

      <Motion
        as="div"
        :initial="{ opacity: 0, y: 24 }"
        :animate="{ opacity: 1, y: 0 }"
        :transition="{ duration: 0.6, delay: 0.15 }"
      >
        <LazyEDocumentRedactor
          v-model="text"
          v-model:level="level"
          v-model:mode="mode"
          v-model:hover-reveal="hoverReveal"
          hydrate-on-visible
        />
      </Motion>
    </UContainer>
  </section>
</template>
