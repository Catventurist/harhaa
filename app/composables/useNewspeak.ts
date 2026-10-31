export type Tongue = 'newspeak' | 'irl'

export function useNewspeak() {
  const mode = useState<Tongue>('newspeak-mode', () => 'newspeak')
  const irl = computed(() => mode.value === 'irl')

  function toggle() {
    mode.value = irl.value ? 'newspeak' : 'irl'
  }

  return { mode, irl, toggle }
}
