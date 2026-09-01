<script setup>
import { usePointerGlow } from '@/composables/usePointerGlow'

const { glowRef } = usePointerGlow()
</script>

<template>
  <div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden" aria-hidden="true">
    <div class="absolute inset-0 bg-canvas"></div>

    <div class="grid-lines absolute inset-0 opacity-[0.35]"></div>

    <div
      class="absolute -top-40 -left-32 h-[38rem] w-[38rem] rounded-full bg-accent/12 blur-[140px]"
    ></div>
    <div
      class="absolute top-1/3 -right-40 h-[32rem] w-[32rem] rounded-full bg-accent-2/8 blur-[150px]"
    ></div>

    <div
      ref="glowRef"
      class="absolute top-0 left-0 h-[30rem] w-[30rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent/10 blur-[110px] opacity-0"
    ></div>

    <div class="absolute inset-x-0 bottom-0 h-64 bg-gradient-to-t from-canvas to-transparent"></div>
  </div>
</template>

<style scoped>
.grid-lines {
  background-image:
    linear-gradient(to right, var(--color-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-line) 1px, transparent 1px);
  background-size: 72px 72px;
  mask-image: radial-gradient(ellipse 100% 70% at 50% 0%, #000 30%, transparent 75%);
}
</style>
