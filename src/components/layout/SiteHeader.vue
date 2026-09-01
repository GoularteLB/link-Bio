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
    duration: 0.42,
    ease: 'power3.out',
    onComplete: () => {
      gsap.set(el, { clearProps: 'height,overflow' })
      done()
    },
  })
}

const onLeave = (el, done) => {
  gsap.to(el, { height: 0, opacity: 0, overflow: 'hidden', duration: 0.28, ease: 'power2.in', onComplete: done })
}
</script>

<template>
  <header
    class="fixed inset-x-0 top-0 z-40 transition-colors duration-500"
    :class="scrolled || menuOpen ? 'bg-paper/92 backdrop-blur-md' : ''"
  >
    <div class="flex items-center justify-between px-6 py-5 sm:px-10">
      <a href="#home" class="display text-2xl text-ink">LG<span class="text-brick">.</span></a>

      <nav class="hidden items-center gap-8 lg:flex" aria-label="Seções do site">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="font-mono text-[11px] tracking-[0.16em] text-ink-soft uppercase transition-colors duration-300 hover:text-ink"
        >
          {{ link.label }}
        </a>
      </nav>

      <button
        type="button"
        class="flex items-center gap-3 text-ink"
        :aria-expanded="menuOpen"
        aria-controls="site-menu"
        :aria-label="menuOpen ? 'Fechar menu' : 'Abrir menu'"
        @click="menuOpen = !menuOpen"
      >
        <span class="font-mono text-[11px] tracking-[0.16em] uppercase">Menu</span>
        <span v-if="!menuOpen" class="grid grid-cols-3 gap-[3px]" aria-hidden="true">
          <span v-for="dot in 9" :key="dot" class="h-[3px] w-[3px] rounded-full bg-ink"></span>
        </span>
        <svg v-else viewBox="0 0 24 24" class="h-4 w-4" fill="none" stroke="currentColor" stroke-width="1.6">
          <path d="M6 6l12 12M18 6L6 18" stroke-linecap="round" />
        </svg>
      </button>
    </div>

    <Transition :css="false" @enter="onEnter" @leave="onLeave">
      <nav v-if="menuOpen" id="site-menu" class="border-t border-rule px-6 sm:px-10" aria-label="Menu">
        <ul class="flex flex-col py-2">
          <li v-for="link in navLinks" :key="link.id">
            <a
              :href="`#${link.id}`"
              class="flex items-baseline justify-between border-b border-rule py-4"
              @click="menuOpen = false"
            >
              <span class="display text-2xl text-ink">{{ link.label }}</span>
              <span class="meta">{{ link.index }}</span>
            </a>
          </li>
        </ul>
      </nav>
    </Transition>
  </header>
</template>
