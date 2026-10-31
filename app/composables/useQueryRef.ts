export function useQueryRef<T extends string>(key: string, allowed: readonly T[], fallback: T) {
  const route = useRoute()
  const router = useRouter()

  return computed<T>({
    get: () => {
      const value = route.query[key]
      return allowed.includes(value as T) ? (value as T) : fallback
    },
    set: (value) => {
      const rest = Object.fromEntries(
        Object.entries(route.query).filter(([k]) => k !== key)
      )
      router.replace({ query: value === fallback ? rest : { ...rest, [key]: value } })
    }
  })
}
