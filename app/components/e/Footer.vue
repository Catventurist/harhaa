<script setup lang="ts">
import { Motion } from 'motion-v'
import { footerBrand, footerColumns, footerSocials, footerNotice, footerLanguages, footerLanguageDefault } from '~/data/div'

const grid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } }
}

const column = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } }
}

const toast = useToast()
const language = ref(footerLanguageDefault)

const footerLegal = `© ${new Date().getFullYear()} Harhaa. Temporary measure since 1984.`

watch(language, (value) => {
  if (value === footerLanguageDefault) return

  const selected = footerLanguages.find(l => l.value === value)
  toast.add({
    title: `${selected?.native} selected`,
    description: 'Translation pending (est. 2041). Your preference has been noted.',
    icon: 'i-lucide-languages'
  })

  setTimeout(() => {
    language.value = footerLanguageDefault
  }, 1200)
})
</script>

<template>
  <UFooter :ui="{ root: 'border-t-2 border-secondary/80 bg-muted' }">
    <template #top>
      <UContainer>
        <Motion
          as="div"
          class="grid gap-10 sm:grid-cols-2 lg:grid-cols-3"
          initial="hidden"
          :while-in-view="'show'"
          :in-view-options="{ once: true, amount: 0.2 }"
          :variants="grid"
        >
          <Motion
            as="div"
            :variants="column"
            class="space-y-3"
          >
            <div class="flex items-center gap-2 text-lg font-bold text-highlighted">
              <Motion
                as="span"
                class="inline-flex"
                :animate="{ rotate: 360 }"
                :transition="{ duration: 20, repeat: Infinity, ease: 'linear' }"
              >
                <UIcon
                  name="i-lucide-star"
                  class="size-5 fill-current text-secondary"
                />
              </Motion>
              {{ footerBrand.title }}
            </div>
            <p class="text-sm text-muted">
              {{ footerBrand.tagline }}
            </p>
            <ETopButton />
          </Motion>

          <Motion
            v-for="col in footerColumns"
            :key="col.title"
            as="div"
            :variants="column"
          >
            <h3 class="mb-4 text-sm font-semibold uppercase tracking-widest text-highlighted">
              {{ col.title }}
            </h3>
            <ul class="space-y-2">
              <li
                v-for="link in col.links"
                :key="link.label"
              >
                <Motion
                  as="span"
                  class="inline-block"
                  :while-hover="{ x: 6 }"
                >
                  <ULink
                    :to="link.to"
                    class="text-sm text-muted transition-colors hover:text-primary"
                  >
                    {{ link.label }}
                  </ULink>
                </Motion>
              </li>
            </ul>
          </Motion>
        </Motion>
      </UContainer>
    </template>

    <template #left>
      <p class="text-sm text-muted">
        {{ footerLegal }}
      </p>
    </template>

    <template #default>
      <Motion
        as="p"
        class="hidden text-xs italic text-muted lg:block"
        :animate="{ opacity: [0.4, 1, 0.4] }"
        :transition="{ duration: 4, repeat: Infinity, ease: 'easeInOut' }"
      >
        {{ footerNotice }}
      </Motion>
    </template>

    <template #right>
      <LazyUSelectMenu
        v-model="language"
        :items="footerLanguages"
        value-key="value"
        label-key="label"
        icon="i-lucide-languages"
        color="neutral"
        variant="subtle"
        size="sm"
        class="w-40"
        :search-input="{ placeholder: 'Search 24 languages' }"
      />
      <Motion
        v-for="social in footerSocials"
        :key="social.label"
        as="span"
        class="inline-flex"
        :while-hover="{ y: -3, rotate: 8, scale: 1.15 }"
        :while-tap="{ scale: 0.9 }"
      >
        <UButton
          :icon="social.icon"
          :aria-label="social.label"
          :to="social.to"
          color="neutral"
          variant="ghost"
          target="_blank"
        />
      </Motion>
    </template>
  </UFooter>
</template>
