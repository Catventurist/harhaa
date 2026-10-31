<script setup lang="ts">
import { chatGlossary, perspectives } from '~/data/div'
import type { Perspective } from '~/data/div'

type TextPart = { type: 'text', text: string }
type ReasoningPart = { type: 'reasoning', text: string, state: 'streaming' | 'done' }
type ToolPart = {
  type: 'tool-glossary'
  state: 'approval' | 'running' | 'done' | 'denied'
  terms: string[]
}
type FollowPart = { type: 'follow-up', terms: string[] }
type Part = TextPart | ReasoningPart | ToolPart | FollowPart

interface Msg {
  id: string
  role: 'user' | 'assistant'
  parts: Part[]
}

const toast = useToast()

const greeting = (): Msg => ({
  id: 'hello',
  role: 'assistant',
  parts: [{ type: 'text', text: 'Paste a sentence and I will explain any terms I know.' }]
})

const input = ref('')
const status = ref<'ready' | 'submitted' | 'streaming'>('ready')
const messages = useState<Msg[]>('explainer-messages', () => [greeting()])
const askFirst = ref(true)
const perspective = useQueryRef<Perspective>('perspective', perspectives.map(p => p.value), 'citizen')

const asked = ref<string[]>([])
const lastRelated = ref<string[]>([])

const suggestions = computed(() => {
  const open = chatGlossary.map(g => g.term).filter(t => !asked.value.includes(t))
  const preferred = lastRelated.value.filter(t => open.includes(t))
  return (preferred.length ? preferred : open).slice(0, 3)
})

let token = 0
let decide: ((ok: boolean) => void) | null = null

const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
const escape = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')

function is<T extends Part['type']>(part: unknown, type: T): part is Extract<Part, { type: T }> {
  return (part as Part).type === type
}

function toolText(state: ToolPart['state']) {
  if (state === 'approval') return 'Search the glossary?'
  if (state === 'running') return 'Searching the glossary'
  if (state === 'denied') return 'Search denied'
  return 'Searched the glossary'
}

function findTerms(text: string) {
  return chatGlossary.filter(g => new RegExp(`\\b${escape(g.term)}s?\\b`, 'i').test(text))
}

function messageText(message: Msg) {
  return message.parts
    .filter((p): p is TextPart => p.type === 'text')
    .map(p => p.text)
    .join('\n')
}

const assistant = {
  variant: 'soft' as const,
  color: 'primary' as const,
  avatar: { icon: 'i-lucide-bot' },
  ui: {
    body: 'w-full',
    content: 'w-full'
  },
  actions: [
    {
      label: 'Copy to clipboard',
      icon: 'i-lucide-copy',
      onClick: async (_event: MouseEvent, message: unknown) => {
        await navigator.clipboard.writeText(messageText(message as Msg))
        toast.add({ title: 'Copied', icon: 'i-lucide-check' })
      }
    }
  ]
}

async function type(
  target: { text: string },
  content: string,
  delay: number,
  by: 'char' | 'word',
  alive: () => boolean
) {
  const chunks = by === 'char' ? [...content] : content.split(/(?<=\s)/)
  for (const chunk of chunks) {
    if (!alive()) return
    target.text += chunk
    await sleep(delay)
  }
}

function approve(ok: boolean) {
  decide?.(ok)
  decide = null
}

function finishOpenParts() {
  for (const m of messages.value) {
    for (const p of m.parts) {
      if (p.type === 'reasoning') p.state = 'done'
      if (p.type === 'tool-glossary' && p.state !== 'denied') p.state = 'done'
    }
  }
}

function stop() {
  token++
  approve(false)
  finishOpenParts()
  status.value = 'ready'
}

function clear() {
  token++
  approve(false)
  messages.value = [greeting()]
  input.value = ''
  status.value = 'ready'
  asked.value = []
  lastRelated.value = []
}

async function copyChat() {
  const lines = messages.value.map(m => `${m.role === 'user' ? 'You' : 'Bot'}: ${messageText(m)}`)
  await navigator.clipboard.writeText(lines.join('\n\n'))
  toast.add({ title: 'Chat copied', icon: 'i-lucide-check' })
}

function ask(text: string) {
  if (status.value !== 'ready') return
  input.value = text
  onSubmit()
}

async function onSubmit() {
  const text = input.value.trim()
  if (!text || status.value !== 'ready') return

  input.value = ''
  const mine = ++token
  const alive = () => mine === token

  messages.value.push({ id: crypto.randomUUID(), role: 'user', parts: [{ type: 'text', text }] })
  status.value = 'submitted'

  const view = perspective.value
  const label = perspectives.find(p => p.value === view)!.label.toLowerCase()
  const hits = findTerms(text)

  asked.value = [...new Set([...asked.value, ...hits.map(h => h.term)])]
  lastRelated.value = [...new Set(hits.flatMap(h => h.related))]

  await sleep(400)
  if (!alive()) return

  messages.value.push({
    id: crypto.randomUUID(),
    role: 'assistant',
    parts: [
      { type: 'reasoning', text: '', state: 'streaming' },
      { type: 'tool-glossary', state: askFirst.value ? 'approval' : 'running', terms: [] },
      { type: 'text', text: '' }
    ]
  })
  const [reasoning, tool, answer] = messages.value.at(-1)!.parts as [ReasoningPart, ToolPart, TextPart]

  status.value = 'streaming'
  await type(reasoning, `I will check the text against the glossary, then explain each match for a ${label}.`, 12, 'char', alive)
  if (!alive()) return
  reasoning.state = 'done'

  if (tool.state === 'approval') {
    const ok = await new Promise<boolean>((resolve) => {
      decide = resolve
    })
    if (!alive()) return
    tool.state = ok ? 'running' : 'denied'

    if (!ok) {
      await type(answer, 'Okay, I did not search the glossary.', 25, 'word', alive)
      if (alive()) status.value = 'ready'
      return
    }
  }

  await sleep(700)
  if (!alive()) return
  tool.terms = hits.map(h => h.term)
  tool.state = 'done'

  const reply = hits.length
    ? hits.map(h => `${h.term}: ${h.plain[view]}`).join('\n\n')
    : 'I did not find any terms I know in that.'
  await type(answer, reply, 25, 'word', alive)
  if (!alive()) return

  status.value = 'ready'
}

onBeforeUnmount(() => {
  token++
  approve(false)
})
</script>

<template>
  <div class="mx-auto flex min-h-[70vh] max-w-3xl flex-col gap-4">
    <div class="flex flex-wrap items-center justify-between gap-2">
      <USelectMenu
        v-model="perspective"
        name="perspective"
        :items="perspectives"
        value-key="value"
        :search-input="false"
        icon="i-lucide-eye"
        class="w-44"
      />

      <USwitch
        v-model="askFirst"
        name="ask-first"
        label="Ask before searching"
        size="sm"
      />

      <div class="flex items-center gap-1">
        <UButton
          label="Copy chat"
          icon="i-lucide-copy"
          color="neutral"
          variant="ghost"
          size="sm"
          :disabled="messages.length <= 1"
          @click="copyChat"
        />
        <UButton
          label="Clear"
          icon="i-lucide-trash-2"
          color="neutral"
          variant="ghost"
          size="sm"
          :disabled="messages.length <= 1"
          @click="clear"
        />
      </div>
    </div>

    <UChatMessages
      :messages="messages"
      :status="status"
      :assistant="assistant"
      :should-scroll-to-bottom="false"
      :should-auto-scroll="false"
      :auto-scroll="false"
    >
      <template #content="{ message }">
        <template
          v-for="(part, index) in message.parts"
          :key="index"
        >
          <UChatReasoning
            v-if="is(part, 'reasoning')"
            :text="part.text"
            :streaming="part.state === 'streaming'"
            icon="i-lucide-brain"
          />

          <div
            v-else-if="is(part, 'tool-glossary')"
            class="w-full space-y-2"
          >
            <UChatTool
              :text="toolText(part.state)"
              :suffix="part.state === 'done' ? `${part.terms.length} found` : undefined"
              :streaming="part.state === 'running'"
              icon="i-lucide-book-open"
              variant="card"
              chevron="leading"
              class="w-full"
            >
              <template
                v-if="part.state === 'done'"
                #default
              >
                <div
                  v-if="part.terms.length"
                  class="flex flex-wrap gap-1.5"
                >
                  <UBadge
                    v-for="term in part.terms"
                    :key="term"
                    :label="term"
                    color="primary"
                    variant="subtle"
                  />
                </div>
                <p
                  v-else
                  class="text-sm text-muted"
                >
                  No matches.
                </p>
              </template>
            </UChatTool>

            <div
              v-if="part.state === 'approval'"
              class="flex gap-2"
            >
              <UButton
                label="Approve"
                icon="i-lucide-check"
                size="xs"
                @click="approve(true)"
              />
              <UButton
                label="Deny"
                color="neutral"
                variant="soft"
                size="xs"
                @click="approve(false)"
              />
            </div>
          </div>

          <p
            v-else-if="is(part, 'text')"
            class="whitespace-pre-wrap"
          >
            {{ part.text }}
          </p>
        </template>
      </template>
    </UChatMessages>

    <UChatPrompt
      v-model="input"
      name="prompt"
      :status="status"
      :maxrows="6"
      placeholder="Ask about a term..."
      class="sticky bottom-4 z-10 bg-default"
      @submit="onSubmit"
    >
      <template
        v-if="suggestions.length"
        #header
      >
        <div class="flex flex-wrap gap-2">
          <UButton
            v-for="s in suggestions"
            :key="s"
            :label="s"
            icon="i-lucide-hash"
            size="xs"
            color="neutral"
            variant="outline"
            :disabled="status !== 'ready'"
            class="gap-0"
            @click="ask(s)"
          />
        </div>
      </template>
      <template #footer>
        <UTooltip text="Attachments are coming soon">
          <span class="inline-flex">
            <UButton
              icon="i-lucide-paperclip"
              color="neutral"
              variant="ghost"
              size="sm"
              disabled
              aria-label="Attachments are coming soon"
            />
          </span>
        </UTooltip>
        <UChatPromptSubmit
          :status="status"
          size="sm"
          @stop="stop"
        />
      </template>
    </UChatPrompt>
  </div>
</template>
