<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { content, locale, toggleLocale } from '@/i18n'
import { theme, toggleTheme } from '@/composables/useTheme'
import { scrollToSection } from '@/composables/useSmoothScroll'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const route = useRoute()
const router = useRouter()

const c = content
const menuOpen = ref(false)
const scrolled = ref(false)

const SHORTCUTS = ['home', 'sobre', 'projetos', 'contato']
const shortcuts = computed(() => c.value.navLinks.filter((link) => SHORTCUTS.includes(link.id)))

const nextLocaleLabel = computed(() => (locale.value === 'pt' ? 'EN' : 'PT'))
const themeLabel = computed(() => (theme.value === 'dark' ? c.value.ui.lightMode : c.value.ui.darkMode))

const handleScroll = () => {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  document.documentElement.style.removeProperty('overflow')
})

watch(menuOpen, (open) => {
  document.documentElement.style.overflow = open ? 'hidden' : ''
})

const goTo = async (id) => {
  menuOpen.value = false

  if (route.name !== 'home') {
    await router.push({ name: 'home', hash: `#${id}` })
    return
  }

  scrollToSection(id)
}

const onEnter = (el, done) => {
  if (prefersReducedMotion()) {
    done()
    return
  }

  const items = el.querySelectorAll('[data-menu-item]')

  gsap
    .timeline({ onComplete: done })
    .fromTo(el, { height: 0, opacity: 0 }, { height: 'auto', opacity: 1, duration: 0.46, ease: 'power3.out' })
    .from(items, { yPercent: 60, opacity: 0, duration: 0.55, stagger: 0.05, ease: 'expo.out' }, '-=0.2')
    .set(el, { clearProps: 'height' })
}

const onLeave = (el, done) => {
  if (prefersReducedMotion()) {
    done()
    return
  }

  gsap.to(el, { height: 0, opacity: 0, overflow: 'hidden', duration: 0.3, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-500"
    :class="scrolled || menuOpen ? 'bg-paper/92 backdrop-blur-md' : ''"
  >
    <div class="flex items-center justify-between gap-4 px-6 py-5 sm:px-10">
      <a href="#home" class="display text-2xl text-ink" @click.prevent="goTo('home')">
        LG<span class="text-brick">.</span>
      </a>

      <nav class="hidden items-center gap-8 lg:flex" :aria-label="c.ui.sections">
        <a
          v-for="link in shortcuts"
          :key="link.id"
          :href="`#${link.id}`"
          class="font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase transition-colors duration-300 hover:text-ink"
          @click.prevent="goTo(link.id)"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-4 sm:gap-6">
        <button
          type="button"
          class="flex h-7 w-7 items-center justify-center text-ink transition-colors duration-300 hover:text-brick"
          :aria-label="themeLabel"
          @click="toggleTheme()"
        >
          <svg
            v-if="theme === 'dark'"
            viewBox="0 0 24 24"
            class="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="4.2" />
            <path
              d="M12 2.6v2.2M12 19.2v2.2M2.6 12h2.2M19.2 12h2.2M5.4 5.4l1.6 1.6M17 17l1.6 1.6M18.6 5.4 17 7M7 17l-1.6 1.6"
              stroke-linecap="round"
            />
          </svg>
          <svg
            v-else
            viewBox="0 0 24 24"
            class="h-[18px] w-[18px]"
            fill="none"
            stroke="currentColor"
            stroke-width="1.5"
            aria-hidden="true"
          >
            <path
              d="M20.4 14.4A8.6 8.6 0 0 1 9.6 3.6a8.6 8.6 0 1 0 10.8 10.8Z"
              stroke-linejoin="round"
            />
          </svg>
        </button>

        <button
          type="button"
          class="font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase transition-colors duration-300 hover:text-ink"
          :aria-label="c.ui.language"
          @click="toggleLocale()"
        >
          {{ nextLocaleLabel }}
        </button>

        <button
          type="button"
          class="flex items-center gap-3 text-ink"
          :aria-expanded="menuOpen"
          aria-controls="site-menu"
          :aria-label="menuOpen ? c.ui.closeMenu : c.ui.openMenu"
          @click="menuOpen = !menuOpen"
        >
          <span class="hidden w-[3.4rem] text-right font-mono text-[11px] tracking-[0.16em] uppercase sm:block">
            {{ menuOpen ? c.ui.close : c.ui.menu }}
          </span>
          <span v-if="!menuOpen" class="grid grid-cols-3 gap-[3px]" aria-hidden="true">
            <span v-for="dot in 9" :key="dot" class="h-[3px] w-[3px] rounded-full bg-ink"></span>
          </span>
          <svg v-else viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6">
            <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </button>
      </div>
    </div>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <nav v-if="menuOpen" id="site-menu" class="border-t border-rule px-6 sm:px-10" :aria-label="c.ui.menu">
        <ul class="flex flex-col py-2">
          <li v-for="link in c.navLinks" :key="link.id" class="overflow-hidden">
            <a
              data-menu-item
              :href="`#${link.id}`"
              class="flex items-baseline justify-between border-b border-rule py-4 transition-colors duration-300 hover:text-teal"
              @click.prevent="goTo(link.id)"
            >
              <span class="display text-2xl">{{ link.label }}</span>
              <span class="meta">{{ link.index }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
