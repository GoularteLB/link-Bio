<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import LinkBioCard from '@/components/sections/LinkBioCard.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-link-item]', {
      opacity: 0,
      y: 24,
      duration: 0.85,
      stagger: 0.07,
      ease: 'expo.out',
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
    class="flex min-h-screen flex-col items-center justify-center gap-6 px-4 py-20"
  >
    <LinkBioCard />

    <RouterLink
      data-link-item
      data-cursor="link"
      to="/"
      class="group font-mono text-[11px] tracking-[0.22em] text-ink-faint uppercase transition-colors duration-300 hover:text-brick"
    >
      <span class="inline-block transition-transform duration-300 group-hover:-translate-x-1">
        ←
      </span>
      portfólio completo
    </RouterLink>
  </div>
</template>
