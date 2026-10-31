export default defineAppConfig({
  ui: {
    colors: {
      primary: 'eu',
      secondary: 'gold',
      neutral: 'slate'
    },
    badge: {
      slots: {
        base: 'font-mono'
      }
    },
    tree: {
      slots: {
        link: 'font-mono'
      }
    },
    button: {
      slots: { base: 'font-semibold' },
      defaultVariants: { color: 'primary', variant: 'soft' }
    }
  }
})
