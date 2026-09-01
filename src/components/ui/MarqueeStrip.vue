<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const props = defineProps({
  items: { type: Array, required: true },
  duration: { type: Number, default: 28 },
})

const trackRef = ref(null)
let tween = null

const slow = () => tween?.timeScale(0.25)
const resume = () => tween?.timeScale(1)

onMounted(() => {
  if (prefersReducedMotion() || !trackRef.value) return

  tween = gsap.to(trackRef.value, {
    xPercent: -50,
    duration: props.duration,
    ease: 'none',
    repeat: -1,
  })
})

onBeforeUnmount(() => {
  tween?.kill()
  tween = null
})
</script>

<template>
  <div
    class="marquee relative overflow-hidden py-1"
    @pointerenter="slow"
    @pointerleave="resume"
  >
    <div ref="trackRef" class="flex w-max items-center gap-8">
      <span
        v-for="(item, index) in [...items, ...items]"
        :key="`${item}-${index}`"
        class="flex shrink-0 items-center gap-8 font-mono text-[11px] tracking-[0.2em] text-ink-faint uppercase"
      >
        {{ item }}
        <span class="h-1 w-1 rounded-full bg-accent/40" aria-hidden="true"></span>
      </span>
    </div>
  </div>
</template>

<style scoped>
.marquee {
  mask-image: linear-gradient(to right, transparent, #000 12%, #000 88%, transparent);
}
</style>
