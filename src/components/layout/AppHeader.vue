<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { navLinks } from '@/data/navigation'
import { profile } from '@/data/profile'
import { useActiveSection } from '@/composables/useActiveSection'
import { useScrollProgress } from '@/composables/useScrollProgress'
import { gsap } from '@/motion/gsap'

const { activeId } = useActiveSection(navLinks.map((link) => link.id))
const { progress } = useScrollProgress()

const navRef = ref(null)
const indicatorRef = ref(null)
const menuOpen = ref(false)
const scrolled = ref(false)

const progressStyle = computed(() => ({ transform: `scaleX(${progress.value})` }))

const moveIndicator = () => {
  const nav = navRef.value
  const indicator = indicatorRef.value
  if (!nav || !indicator) return

  const active = nav.querySelector(`[data-nav-id="${activeId.value}"]`)
  if (!active) return

  gsap.to(indicator, {
    x: active.offsetLeft,
    width: active.offsetWidth,
    autoAlpha: 1,
    duration: 0.5,
    ease: 'power3.out',
  })
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 24
}

const handleResize = () => moveIndicator()

watch(activeId, () => nextTick(moveIndicator))

onMounted(async () => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  await nextTick()
  moveIndicator()
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
})

const onMenuEnter = (el, done) => {
  gsap.set(el, { height: 0, opacity: 0, overflow: 'hidden' })
  gsap.to(el, {
    height: 'auto',
    opacity: 1,
    duration: 0.4,
    ease: 'power3.out',
    onComplete: () => {
      gsap.set(el, { clearProps: 'height,overflow' })
      done()
    },
  })
  gsap.from(el.querySelectorAll('[data-menu-item]'), {
    opacity: 0,
    y: 10,
    stagger: 0.06,
    duration: 0.4,
    delay: 0.06,
  })
}

const onMenuLeave = (el, done) => {
  gsap.to(el, {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    duration: 0.28,
    ease: 'power2.in',
    onComplete: done,
  })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-300"
    :class="scrolled || menuOpen ? 'border-b border-line bg-canvas/80 backdrop-blur-xl' : ''"
  >
    <div class="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
      <a
        href="#topo"
        class="group font-mono text-sm font-medium tracking-tight text-ink transition-colors hover:text-accent"
      >
        {{ profile.initials }}
        <span class="text-accent transition-opacity group-hover:opacity-60">.</span>
      </a>

      <nav ref="navRef" class="relative hidden items-center gap-7 sm:flex" aria-label="Seções do site">
        <span
          ref="indicatorRef"
          class="absolute -bottom-2 left-0 h-px w-0 bg-gradient-to-r from-accent to-accent-2 opacity-0"
          aria-hidden="true"
        ></span>

        <a
          v-for="link in navLinks"
          :key="link.id"
          :data-nav-id="link.id"
          :href="`#${link.id}`"
          class="text-[13px] tracking-wide transition-colors duration-300"
          :class="activeId === link.id ? 'text-ink' : 'text-ink-muted hover:text-ink'"
          :aria-current="activeId === link.id ? 'true' : undefined"
        >
          {{ link.label }}
        </a>

        <RouterLink
          to="/links"
          class="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-wide text-ink-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
        >
          /links
        </RouterLink>
      </nav>

      <button
        type="button"
        class="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-muted transition-colors hover:border-accent/40 hover:text-accent sm:hidden"
        :aria-expanded="menuOpen"
        aria-controls="menu-mobile"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <svg viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.75">
          <path v-if="!menuOpen" d="M4 8h16M4 16h16" stroke-linecap="round" />
          <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <div
      class="h-px origin-left bg-gradient-to-r from-accent via-accent-2 to-accent"
      :style="progressStyle"
      aria-hidden="true"
    ></div>

    <Transition :css="false" @enter="onMenuEnter" @leave="onMenuLeave">
      <nav
        v-if="menuOpen"
        id="menu-mobile"
        class="border-t border-line bg-canvas/95 px-6 backdrop-blur-xl sm:hidden"
        aria-label="Seções do site"
      >
        <ul class="flex flex-col py-2">
          <li v-for="link in navLinks" :key="link.id" data-menu-item>
            <a
              :href="`#${link.id}`"
              class="flex items-center justify-between border-b border-line/60 py-3.5 text-sm text-ink-muted transition-colors hover:text-ink"
              @click="menuOpen = false"
            >
              {{ link.label }}
              <span class="label-mono">{{ link.id }}</span>
            </a>
          </li>
          <li data-menu-item>
            <RouterLink
              to="/links"
              class="block py-3.5 font-mono text-xs tracking-wide text-accent"
              @click="menuOpen = false"
            >
              /links
            </RouterLink>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
