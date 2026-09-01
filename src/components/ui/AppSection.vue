<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

defineProps({
  id: { type: String, required: true },
  index: { type: String, default: '' },
  title: { type: String, required: true },
  description: { type: String, default: '' },
})

const sectionRef = ref(null)
const lineRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !sectionRef.value || !lineRef.value) return

  ctx = gsap.context(() => {
    gsap.from(lineRef.value, {
      scaleX: 0,
      duration: 1.4,
      ease: 'expo.out',
      scrollTrigger: { trigger: sectionRef.value, start: 'top 82%', once: true },
    })
  }, sectionRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section :id="id" ref="sectionRef" class="scroll-mt-24 py-20 sm:py-28">
    <div ref="lineRef" class="hairline mb-10 bg-gradient-to-r from-line-bright via-line to-transparent"></div>

    <header data-reveal class="mb-12 flex flex-col gap-4 sm:mb-14">
      <div class="flex items-baseline gap-4">
        <span v-if="index" class="label-mono text-accent/70">{{ index }}</span>
        <h2 class="text-2xl font-semibold tracking-tight text-ink sm:text-4xl">
          {{ title }}
        </h2>
      </div>
      <p v-if="description" class="max-w-xl text-sm leading-relaxed text-ink-muted sm:text-base">
        {{ description }}
      </p>
    </header>

    <slot />
  </section>
</template>
