import { queryCollection } from '@nuxt/content/server'

const escape = (value: string) => value
  .replaceAll('&', '&amp;')
  .replaceAll('<', '&lt;')
  .replaceAll('>', '&gt;')
  .replaceAll('"', '&quot;')
  .replaceAll('\'', '&apos;')

export default defineEventHandler(async (event) => {
  const origin = getRequestURL(event).origin
  const pages = await queryCollection(event, 'content').all()

  const items = pages
    .filter(page => page.path && page.title)
    .map(page => `
    <item>
      <title>${escape(page.title)}</title>
      <link>${origin}${page.path}</link>
      <guid isPermaLink="true">${origin}${page.path}</guid>
      <description>${escape(page.description ?? '')}</description>
    </item>`)
    .join('')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
  <channel>
    <title>United in Diversion</title>
    <link>${origin}</link>
    <description>The official motto, revised for accuracy.</description>
    <language>en</language>${items}
  </channel>
</rss>`

  setHeader(event, 'content-type', 'application/rss+xml; charset=utf-8')
  return xml
})
