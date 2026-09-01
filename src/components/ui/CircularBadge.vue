<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

defineProps({
  text: { type: String, required: true },
})

const ringRef = ref(null)
let tween = null

onMounted(() => {
  if (prefersReducedMotion() || !ringRef.value) return
  tween = gsap.to(ringRef.value, { rotate: 360, duration: 22, ease: 'none', repeat: -1 })
})

onBeforeUnmount(() => {
  tween?.kill()
  tween = null
})
</script>

<template>
  <div class="relative flex items-center justify-center">
    <svg ref="ringRef" viewBox="0 0 200 200" class="h-full w-full" aria-hidden="true">
      <defs>
        <path id="badge-ring" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1 -148 0" />
      </defs>
      <text class="fill-ink font-mono text-[12px] uppercase">
        <textPath href="#badge-ring" startOffset="0%" textLength="465" lengthAdjust="spacing">{{ text }}</textPath>
      </text>
    </svg>

    <span class="absolute h-2.5 w-2.5 rounded-full bg-brick" aria-hidden="true"></span>
  </div>
</template>
