<script setup>
import { computed, onBeforeUnmount, onMounted, ref, useId } from 'vue'
import { content } from '@/i18n'
import { prefersReducedMotion } from '@/motion/gsap'

const props = defineProps({
  text: { type: String, default: () => content.value.profile.name },
  color: { type: String, default: 'text-teal' },
})

const FONT_SIZE = 120
const FONT_STACK = "'Mrs Saint Delafield', 'Caveat', cursive"

const WRITE_DURATION = 2.4
const SCRIBBLE_DELAY = WRITE_DURATION + 0.2

const maskId = `sig-reveal-${useId()}`

const rootRef = ref(null)
const textRef = ref(null)
const box = ref(null)
const drawn = ref(false)
let observer = null

const revealPath = computed(() => {
  if (!box.value) return ''

  const { x, y, width, height } = box.value
  const startX = x - height * 0.4
  const endX = x + width + height * 0.4
  const midY = y + height / 2
  const amplitude = height * 0.24
  const segments = 7
  const step = (endX - startX) / segments

  let d = `M${startX} ${midY}`
  for (let i = 0; i < segments; i += 1) {
    const from = startX + step * i
    const sign = i % 2 === 0 ? -1 : 1
    d += ` C${from + step * 0.35} ${midY + amplitude * sign}, ${from + step * 0.65} ${
      midY - amplitude * sign
    }, ${from + step} ${midY}`
  }
  return d
})

const revealWidth = computed(() => (box.value ? box.value.height * 0.95 : 0))

const SCRIBBLE_TOP = FONT_SIZE * 0.3
const SCRIBBLE_BOTTOM = SCRIBBLE_TOP + FONT_SIZE * 0.16

const scribble = computed(() => {
  if (!box.value) return null

  const { x, width: w } = box.value
  const y = SCRIBBLE_TOP

  return {
    strokeWidth: FONT_SIZE * 0.022,
    top: `M${x - w * 0.02} ${y + 7} C${x + w * 0.26} ${y - 13}, ${x + w * 0.64} ${y - 15}, ${
      x + w * 1.01
    } ${y - 1}`,
    bottom: `M${x + w * 0.11} ${y + 18} C${x + w * 0.38} ${y + 5}, ${x + w * 0.72} ${y + 2}, ${
      x + w * 0.94
    } ${y + 10}`,
  }
})

const viewBox = computed(() => {
  if (!box.value) return '0 0 100 40'

  const { x, y, width, height } = box.value
  const padX = height * 0.08
  const padTop = height * 0.06
  const bottom = Math.max(y + height, SCRIBBLE_BOTTOM + FONT_SIZE * 0.08)
  return `${x - padX} ${y - padTop} ${width + padX * 2} ${bottom - y + padTop}`
})

const measure = (attemptsLeft = 10) => {
  if (!textRef.value) return

  const { x, y, width, height } = textRef.value.getBBox()
  if (width && height) {
    box.value = { x, y, width, height }
    return
  }

  if (attemptsLeft > 0) requestAnimationFrame(() => measure(attemptsLeft - 1))
}

const replay = () => {
  if (!drawn.value || prefersReducedMotion() || !rootRef.value) return

  rootRef.value.querySelectorAll('[data-sig-animated]').forEach((el) => {
    el.getAnimations?.().forEach((animation) => {
      animation.cancel()
      animation.play()
    })
  })
}

onMounted(async () => {
  try {
    await document.fonts?.load(`${FONT_SIZE}px ${FONT_STACK}`)
    await document.fonts?.ready
  } catch {
  }

  measure()
  if (!rootRef.value) return

  if (prefersReducedMotion()) {
    drawn.value = true
    return
  }

  observer = new IntersectionObserver(
    (entries) => {
      if (!entries.some((entry) => entry.isIntersecting)) return
      drawn.value = true
      observer?.disconnect()
      observer = null
    },
    { threshold: 0.35 },
  )

  observer.observe(rootRef.value)
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<template>
  <svg
    ref="rootRef"
    :viewBox="viewBox"
    fill="none"
    role="img"
    :aria-label="props.text"
    :class="[color, { 'is-drawn': drawn, 'is-measured': !!box }]"
    class="signature-mark w-full max-w-[420px]"
    @mouseenter="replay"
  >
    <defs>
      <mask :id="maskId" maskUnits="userSpaceOnUse" x="-2000" y="-2000" width="4000" height="4000">
        <path
          v-if="revealPath"
          data-sig-animated
          :d="revealPath"
          :stroke-width="revealWidth"
          :style="{ '--sig-duration': `${WRITE_DURATION}s`, '--sig-delay': '0s', '--sig-ease': 'linear' }"
          stroke="#fff"
          fill="none"
          stroke-linecap="round"
          pathLength="1"
        />
      </mask>
    </defs>

    <text
      ref="textRef"
      x="0"
      y="0"
      :font-size="FONT_SIZE"
      fill="currentColor"
      :mask="box ? `url(#${maskId})` : undefined"
    >
      {{ props.text }}
    </text>

    <g
      v-if="scribble"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      :stroke-width="scribble.strokeWidth"
    >
      <path
        data-sig-animated
        :d="scribble.top"
        :style="{ '--sig-delay': `${SCRIBBLE_DELAY}s`, '--sig-duration': '0.55s' }"
        pathLength="1"
      />
      <path
        data-sig-animated
        :d="scribble.bottom"
        :style="{ '--sig-delay': `${SCRIBBLE_DELAY + 0.18}s`, '--sig-duration': '0.5s' }"
        opacity="0.6"
        pathLength="1"
      />
    </g>
  </svg>
</template>

<style scoped>
.signature-mark {
  overflow: visible;
}

.signature-mark text {
  font-family: var(--font-signature);
}

.signature-mark:not(.is-measured) {
  visibility: hidden;
}

.signature-mark [data-sig-animated] {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
}

.signature-mark.is-drawn [data-sig-animated] {
  animation: sig-draw var(--sig-duration, 1s) var(--sig-ease, cubic-bezier(0.4, 0, 0.25, 1))
    var(--sig-delay, 0s) both;
}

@keyframes sig-draw {
  to {
    stroke-dashoffset: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .signature-mark [data-sig-animated],
  .signature-mark.is-drawn [data-sig-animated] {
    animation: none;
    stroke-dashoffset: 0;
  }
}
</style>
