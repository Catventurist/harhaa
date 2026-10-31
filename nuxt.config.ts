export default defineNuxtConfig({
  modules: [
    '@nuxt/ui',
    '@nuxt/content',
    '@nuxt/eslint',
    '@nuxt/fonts',
    'motion-v/nuxt'
  ],
  devtools: { enabled: false },
  app: {
    layoutTransition: { name: 'layout', mode: 'out-in', appear: true },
    pageTransition: { name: 'page', mode: 'out-in' }
  },
  css: ['~/assets/css/main.css'],
  router: {
    options: {
      scrollBehaviorType: 'smooth'
    }
  },
  colorMode: {
    preference: 'dark',
    fallback: 'light',
    storage: 'sessionStorage'
  },
  content: {
    experimental: {
      nativeSqlite: true
    },
    build: {
      markdown: {
        highlight: {
          theme: {
            default: 'github-light',
            dark: 'github-dark'
          },
          langs: ['ts', 'vue', 'md', 'mdc', 'bash', 'json', 'yaml']
        }
      }
    }
  },
  ui: {
    theme: {
      colors: ['primary', 'secondary', 'success', 'info', 'warning', 'error', 'neutral']
    },
    experimental: {
      componentDetection: true
    }
  },
  compatibilityDate: '2026-10-30',
  nitro: {
    prerender: {
      routes: ['/rss.xml']
    },
    vercel: {
      functions: {
        runtime: 'bun1.4.x'
      }
    }
  },
  vite: {
    optimizeDeps: {
      include: [
        '@shikijs/core',
        '@shikijs/engine-javascript',
        '@shikijs/engine-oniguruma',
        '@shikijs/langs/json',
        '@shikijs/langs/markdown',
        '@shikijs/langs/mdc',
        '@shikijs/langs/shellscript',
        '@shikijs/langs/typescript',
        '@shikijs/langs/vue',
        '@shikijs/langs/yaml',
        '@shikijs/themes/github-dark',
        '@shikijs/themes/github-light',
        '@shikijs/transformers',
        'shiki/wasm',
        '@shikijs/themes/material-theme-lighter'
      ]
    }
  },
  telemetry: false,
  eslint: {
    config: {
      stylistic: {
        commaDangle: 'never',
        braceStyle: '1tbs'
      }
    }
  },
  fonts: {
    provider: 'bunny',
    defaults: {
      preload: true,
      styles: ['normal'],
      subsets: ['latin', 'latin-ext']
    },
    families: [
      { name: 'Finlandica', weights: [400, 600, 700] },
      { name: 'Chivo Mono', weights: [400], subsets: ['latin'], preload: false }
    ]
  },
  icon: {
    customCollections: [
      { prefix: 'social', dir: './app/assets/icons' }
    ]
  }
})
