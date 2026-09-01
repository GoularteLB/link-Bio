<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { navLinks } from '@/data/navigation'
import { gsap } from '@/motion/gsap'

const menuOpen = ref(false)
const scrolled = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 40
}

onMounted(() => {
  handleScroll()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onBeforeUnmount(() => window.removeEventListener('scroll', handleScroll))

const onEnter = (el, done) => {
  gsap.set(el, { height: 0, opacity: 0, overflow: 'hidden' })
  gsap.to(el, {
    height: 'auto',
    opacity: 1,
    duration: 0.45,
    ease: 'power3.out',
    onComplete: () => {
      gsap.set(el, { clearProps: 'height,overflow' })
      done()
    },
  })
  gsap.from(el.querySelectorAll('[data-menu-item]'), {
    opacity: 0,
    y: 12,
    stagger: 0.07,
    duration: 0.45,
    delay: 0.08,
  })
}

const onLeave = (el, done) => {
  gsap.to(el, { height: 0, opacity: 0, overflow: 'hidden', duration: 0.3, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-50 transition-colors duration-500"
    :class="scrolled || menuOpen ? 'bg-night/85 backdrop-blur-md' : ''"
  >
    <div class="flex items-center justify-between px-6 py-5 sm:px-10">
      <a href="#hero" class="display text-2xl text-cream">
        LG<span class="text-ember">.</span>
      </a>

      <nav class="hidden items-center gap-9 lg:flex" aria-label="Seções do site">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="font-mono text-[11px] tracking-[0.2em] text-cream-dim uppercase transition-colors duration-300 hover:text-cream"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        type="button"
        class="flex items-center gap-3 text-cream"
        :aria-expanded="menuOpen"
        aria-controls="site-menu"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="hidden font-mono text-[11px] tracking-[0.2em] uppercase sm:inline">Menu</span>
        <span
          class="flex h-9 w-9 items-center justify-center rounded-full border border-rule transition-colors duration-300 hover:border-ember"
        >
          <svg viewBox="0 0 24 24" class="h-3.5 w-3.5" fill="none" stroke="currentColor" stroke-width="1.6">
            <path v-if="!menuOpen" d="M4 9h16M4 15h16" stroke-linecap="round" />
            <path v-else d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
          </svg>
        </span>
      </button>
    </div>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <nav v-if="menuOpen" id="site-menu" class="border-t border-rule px-6 sm:px-10" aria-label="Menu">
        <ul class="flex flex-col py-2">
          <li v-for="link in navLinks" :key="link.id" data-menu-item>
            <a
              :href="`#${link.id}`"
              class="flex items-baseline justify-between border-b border-rule py-4"
              @click="menuOpen = false"
            >
              <span class="display text-2xl text-cream">{{ link.label }}</span>
              <span class="meta">{{ link.index }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
