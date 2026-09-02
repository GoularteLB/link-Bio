import { computed, ref, watch } from 'vue'
import pt from '@/content/pt'
import en from '@/content/en'
import {
  certifications,
  contactLineBase,
  identity,
  pillarBase,
  projectBase,
  sectionIds,
  socialBase,
  stackCloud,
  stepBase,
} from '@/content/base'

const DICTS = { pt, en }
const STORAGE_KEY = 'lg:locale'
const FALLBACK = 'pt'

function readStoredLocale() {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored && DICTS[stored]) return stored
  } catch {
    return FALLBACK
  }

  const browser = window.navigator?.language ?? ''
  return browser.toLowerCase().startsWith('pt') ? 'pt' : 'en'
}

export const locale = ref(typeof window === 'undefined' ? FALLBACK : readStoredLocale())

export const locales = Object.values(DICTS).map((dict) => ({ code: dict.code, label: dict.label }))

export const content = computed(() => {
  const dict = DICTS[locale.value] ?? DICTS[FALLBACK]

  return {
    ...dict,
    profile: { ...identity, ...dict.profile },
    navLinks: sectionIds.map((id, position) => ({
      id,
      index: String(position + 1).padStart(2, '0'),
      label: dict.nav[id],
    })),
    pillars: pillarBase.map((pillar) => ({ ...pillar, ...dict.pillars[pillar.id] })),
    steps: stepBase.map((step) => ({ ...step, ...dict.stepText[step.id] })),
    projectList: projectBase.map((project) => ({ ...project, ...dict.projectText[project.id] })),
    cloud: stackCloud.map((word) => ({
      ...word,
      label: word.label ?? dict.stack.words[word.id],
    })),
    socials: socialBase,
    contactLines: contactLineBase,
    certifications,
  }
})

export const openProjects = computed(() =>
  content.value.projectList.filter((project) => !project.comingSoon),
)

export const featuredProject = computed(
  () => openProjects.value.find((project) => project.featured) ?? openProjects.value[0],
)

export const findProject = (id) => openProjects.value.find((project) => project.id === id) ?? null

export const nextProject = (id) => {
  const list = openProjects.value
  const current = list.findIndex((project) => project.id === id)
  if (current === -1) return null
  return list[(current + 1) % list.length]
}

export const projectExists = (id) => projectBase.some((p) => p.id === id && !p.comingSoon)

export function setLocale(next) {
  if (!DICTS[next]) return
  locale.value = next
}

export function toggleLocale() {
  setLocale(locale.value === 'pt' ? 'en' : 'pt')
}

export function initLocale() {
  const apply = (code) => {
    const dict = DICTS[code] ?? DICTS[FALLBACK]
    document.documentElement.lang = dict.htmlLang

    try {
      window.localStorage.setItem(STORAGE_KEY, code)
    } catch {
      return
    }
  }

  apply(locale.value)
  watch(locale, apply)
}
