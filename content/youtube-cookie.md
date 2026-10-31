---
title: Cookie Consent for YouTube Embeds in the EU
description: Why youtube-nocookie.com is not enough, and how to build a compliant click-to-load facade in Nuxt.
navigation:
  icon: i-lucide-check-line
---

## Shortly

`youtube-nocookie.com` is **not enough**. The iframe still writes to `localStorage` (a `yt-remote-device-id` UUID) and sends the visitor's IP to Google on page load. Both require prior consent under Art. 5(3) ePrivacy Directive and Art. 6(1)(a) GDPR.

## What's actually required

| Rule | Detail |
| --- | --- |
| Prior consent | No request to Google (IP, storage writes, cookies) before the visitor actively consents |
| Equal prominence | Accept and Reject buttons must have equal visual weight (no dark patterns) |
| Granular | The embed counts as a non-essential / marketing category, separate from essential cookies |
| Withdrawal | Users must be able to revoke consent as easily as they gave it |
| No implied consent | Continued browsing, scrolling, or closing the banner is not consent (CJEU Planet49, C-673/17) |

## The compliant pattern: click-to-load facade

The iframe must not exist in the DOM (or must have no `src`) until the visitor clicks. This is the two-click or facade pattern.

```vue [components/YouTubeEmbed.vue]
<script setup lang="ts">
const props = defineProps<{ videoId: string, title?: string }>()
const loaded = ref(false)
</script>

<template>
  <div
    v-if="!loaded"
    class="relative aspect-video w-full cursor-pointer overflow-hidden"
    role="button"
    tabindex="0"
    :aria-label="`Load video: ${title ?? 'YouTube'}`"
    @click="loaded = true"
    @keydown.enter.space.prevent="loaded = true"
  >
    <img
      :src="`https://i.ytimg.com/vi/${props.videoId}/hqdefault.jpg`"
      :alt="props.title"
      class="size-full object-cover"
    >
    <UIcon name="i-lucide-play" class="absolute inset-0 m-auto size-12 text-white" />
  </div>

  <iframe
    v-else
    class="aspect-video w-full border-0"
    :src="`https://www.youtube-nocookie.com/embed/${props.videoId}?autoplay=1`"
    :title="props.title ?? 'YouTube video'"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  />
</template>
```

::warning
Even the thumbnail from `i.ytimg.com` sends the visitor's IP to Google. For strict compliance, proxy the thumbnail through your own server or use a locally hosted image.
::

## Options for the consent layer

| Approach | Module / Tool |
| --- | --- |
| Nuxt module | `nuxt-cookie-first`, `@nuxt/scripts` (with consent gating), or `c15t` (open-source CMP) |
| Third-party CMP | Cookiebot, CookieYes, TrustArc, Usercentrics. Most have SPA integrations that auto-block iframes |
| DIY | A `composables/useConsent.ts` that stores consent in a first-party cookie (exempt from consent itself), plus a `<CookieBanner />` component |

## Key implementation rules

- **Gate the iframe, not just the script.** `loading="lazy"` does not help. It only delays loading until the element scrolls into view, at which point the IP is still sent without consent.
- **SSR safety.** Render the facade (static image) during SSR. Only swap to the iframe on the client after consent and a click.
- **Returning visitors.** If consent is already stored, you may auto-load the iframe on mount (client-side check), but never put the `src` in the SSR HTML.
- **`youtube-nocookie.com` as a second layer.** Still use it after consent is given. It reduces, but doesn't eliminate, tracking during playback.

## Upcoming: Digital Omnibus (Art. 88a)

The EU is replacing the ePrivacy Directive's cookie rules with Art. 88a GDPR (Digital Omnibus, proposed Nov 2025). Key changes:

- Consent rules move directly into the GDPR, enforced by DPAs in all member states.
- A 6-month re-prompt ban applies after a visitor refuses (per purpose).
- Browser-level consent signals (Art. 88b) become legally binding, potentially replacing site-level banners.

::note
In practice, the click-to-load pattern remains the correct approach, and your consent logic needs to respect the 6-month re-prompt window.
::

## Alternative: self-host the video

Hosting the file yourself, with a plain `<video src="/media/clip.mp4">`, sends nothing to Google, so no consent is needed for the embed itself.
