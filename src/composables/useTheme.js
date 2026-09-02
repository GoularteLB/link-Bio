import { ref, watch } from 'vue'

const STORAGE_KEY = 'lg:theme'
const THEMES = ['light', 'dark']

function readStoredTheme() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && THEMES.includes(stored)) return stored
  } catch {
    return 'light'
  }

  return 'light'
}

export const theme = ref(typeof window === 'undefined' ? 'light' : readStoredTheme())

export const isDark = () => theme.value === 'dark'

export function setTheme(next) {
  if (!THEMES.includes(next)) return
  theme.value = next
}

export function toggleTheme() {
  setTheme(theme.value === 'dark' ? 'light' : 'dark')
}

export function initTheme() {
  const apply = (value) => {
    document.documentElement.dataset.theme = value

    const meta = document.querySelector('meta[name="theme-color"]')
    if (meta) meta.setAttribute('content', value === 'dark' ? '#14110e' : '#efe9e0')

    try {
      window.localStorage.setItem(STORAGE_KEY, value)
    } catch {
      return
    }
  }

  apply(theme.value)
  watch(theme, apply)
}
