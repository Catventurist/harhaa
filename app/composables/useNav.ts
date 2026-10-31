import type { ContentNavigationItem, PageCollections } from '@nuxt/content'
import type { NavigationMenuItem } from '@nuxt/ui'
import { headerLinks } from '~/data/div'

function flatten(items: NavigationMenuItem[]): NavigationMenuItem[] {
  return items.flatMap(item => item.children?.length ? flatten(item.children) : [item])
}

export function useContentNav(
  collection = 'content',
  options: { links?: NavigationMenuItem[], extraNavigation?: ContentNavigationItem[] } = {}
) {
  const navigationQuery = useAsyncData(
    `navigation-${collection}`,
    () => queryCollectionNavigation(collection as keyof PageCollections)
  )

  const { data: files } = useLazyAsyncData(
    `search-${collection}`,
    () => queryCollectionSearchSections(collection as keyof PageCollections, { ignoredTags: ['style'] }),
    { server: false }
  )

  const { open } = useContentSearch()

  const navigation = computed<ContentNavigationItem[]>(() => [
    ...(navigationQuery.data.value ?? []),
    ...(options.extraNavigation ?? [])
  ])

  const links = computed(() => flatten(options.links ?? headerLinks))

  return { navigation, links, files, open, ready: navigationQuery }
}
