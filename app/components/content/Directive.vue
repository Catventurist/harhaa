<script setup lang="ts">
import { Fragment } from 'vue'
import type { VNode } from 'vue'

defineProps<{
  title: string
  desc: string
  preamble?: string
  footer?: string
}>()

const slots = useSlots()

const Render = (props: { fn: () => unknown }) => props.fn()
Render.props = ['fn']

function flatten(nodes: VNode[]): VNode[] {
  return nodes.flatMap(n =>
    n.type === Fragment && Array.isArray(n.children) ? flatten(n.children as VNode[]) : [n]
  )
}

function kids(node: VNode): VNode[] {
  const c = node.children as unknown
  if (Array.isArray(c)) return flatten(c as VNode[])
  if (c && typeof c === 'object' && 'default' in c) {
    return flatten((c as { default: () => VNode[] }).default())
  }
  return []
}

function content(node: VNode): () => unknown {
  const c = node.children as unknown
  if (c && typeof c === 'object' && 'default' in c) {
    return (c as { default: () => unknown }).default
  }
  if (Array.isArray(c)) return () => c
  return () => []
}

function is(node: VNode, tag: string) {
  if (node.type === tag) return true
  const type = node.type as { tag?: string }
  return typeof type === 'object' && type !== null && type.tag === tag
}

function getArticles() {
  const nodes = flatten((slots.default?.() ?? []) as VNode[])
  const list = nodes.find(n => is(n, 'ul') || is(n, 'ol'))

  if (list) return kids(list).filter(n => is(n, 'li'))
  return nodes.filter(n => is(n, 'p'))
}
</script>

<template>
  <Motion
    as="div"
    class="my-8"
    :initial="{ opacity: 0, y: 24 }"
    :while-in-view="{ opacity: 1, y: 0 }"
    :in-view-options="{ once: true, amount: 0.1 }"
    :transition="{ duration: 0.6 }"
  >
    <UPageCard
      variant="soft"
      spotlight
      spotlight-color="secondary"
      class="shadow-sm shadow-primary"
    >
      <template #header>
        <div class="flex items-start gap-3">
          <UIcon
            name="i-lucide-scroll-text"
            class="mt-1 size-6 shrink-0 text-secondary"
          />
          <div>
            <UBadge
              label="Directive"
              color="secondary"
              variant="subtle"
              size="sm"
            />
            <h3 class="mt-2 text-xl font-bold text-highlighted">
              {{ title }}
            </h3>
            <p class="mt-1 text-sm text-muted">
              {{ desc }}
            </p>
          </div>
        </div>
      </template>

      <p
        v-if="preamble"
        class="mb-6 border-b border-default pb-6 text-sm italic text-primary"
      >
        {{ preamble }}
      </p>

      <Motion
        as="ol"
        class="space-y-4"
        initial="hidden"
        :while-in-view="'show'"
        :in-view-options="{ once: true, amount: 0.2 }"
        :variants="{ hidden: {}, show: { transition: { staggerChildren: 0.12 } } }"
      >
        <Motion
          v-for="(article, i) in getArticles()"
          :key="i"
          as="li"
          class="flex gap-4"
          :variants="{
            hidden: { opacity: 0, x: -16 },
            show: { opacity: 1, x: 0, transition: { type: 'spring', stiffness: 110, damping: 16 } }
          }"
        >
          <UBadge
            :label="`Article ${i + 1}`"
            color="neutral"
            variant="outline"
            class="mt-0.5 h-fit shrink-0"
          />
          <div class="text-default [&>p]:m-0">
            <Render :fn="content(article)" />
          </div>
        </Motion>
      </Motion>

      <template
        v-if="footer"
        #footer
      >
        <div class="flex items-center gap-2 text-xs uppercase tracking-widest text-muted">
          <UIcon
            name="i-lucide-stamp"
            class="size-4"
          />
          {{ footer }}
        </div>
      </template>
    </UPageCard>
  </Motion>
</template>
