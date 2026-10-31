export function useDarkMatter() {
  const route = useRoute()
  const router = useRouter()

  function setQuery(patch: Record<string, string | undefined>) {
    router.replace({ query: { ...route.query, ...patch } })
  }

  const darkMatter = computed({
    get: () => {
      const n = Number(route.query.dm)
      return Number.isFinite(n) && route.query.dm != null ? Math.min(100, Math.max(0, n)) : 67
    },
    set: (v: number) => setQuery({ dm: String(v) })
  })

  const calibrated = computed({
    get: () => route.query.cal === '1',
    set: (v: boolean) => setQuery({ cal: v ? '1' : undefined })
  })

  const value = computed(() => (calibrated.value ? 71.3 : darkMatter.value))
  const display = computed(() => `${value.value}%`)
  const color = computed(() =>
    value.value > 75 ? 'error' : value.value > 50 ? 'warning' : 'success'
  )

  return { darkMatter, calibrated, value, display, color }
}
