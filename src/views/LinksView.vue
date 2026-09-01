<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LinkBioCard from '@/components/sections/LinkBioCard.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-link-item]', {
      opacity: 0,
      y: 22,
      scale: 0.98,
      duration: 0.8,
      stagger: 0.07,
      ease: 'power3.out',
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <div
    ref="rootRef"
    class="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-14"
  >
    <LinkBioCard />

    <RouterLink
      data-link-item
      to="/"
      class="group inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] text-ink-faint uppercase transition-colors duration-300 hover:text-accent"
    >
      <ArrowIcon
        direction="right"
        class="h-3.5 w-3.5 rotate-180 transition-transform duration-300 group-hover:-translate-x-0.5"
      />
      portfólio completo
    </RouterLink>
  </div>
</template>
