<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const props = defineProps({
  type: { type: String, default: 'rest' },
})

const GLYPHS = {
  rest: {
    nodes: [
      { label: 'REQUEST', x: 24, y: 40 },
      { label: 'API', x: 200, y: 40 },
      { label: 'SERVICE', x: 200, y: 140 },
      { label: 'DATABASE', x: 200, y: 240 },
    ],
    paths: ['M 112 53 H 200', 'M 224 66 V 140', 'M 224 166 V 240'],
  },
  events: {
    nodes: [
      { label: 'API', x: 24, y: 40 },
      { label: 'KAFKA', x: 176, y: 40 },
      { label: 'CPF CHECK', x: 176, y: 140 },
      { label: 'MONGODB', x: 24, y: 240 },
      { label: 'CEP', x: 320, y: 140 },
    ],
    paths: ['M 76 53 H 176', 'M 208 66 V 140', 'M 176 153 H 128 V 240', 'M 258 153 H 320'],
  },
  layers: {
    nodes: [
      { label: 'FRONT-END', x: 24, y: 40 },
      { label: 'REST API', x: 24, y: 140 },
      { label: 'DOMAIN', x: 24, y: 240 },
      { label: 'TYPESCRIPT', x: 240, y: 40 },
      { label: 'JAVA', x: 240, y: 190 },
    ],
    paths: ['M 60 66 V 140', 'M 60 166 V 240', 'M 132 53 H 240', 'M 116 153 H 240 V 190'],
  },
  ports: {
    nodes: [
      { label: 'ADAPTER IN', x: 24, y: 40 },
      { label: 'DOMAIN', x: 190, y: 140 },
      { label: 'ADAPTER OUT', x: 24, y: 240 },
      { label: 'PORT', x: 330, y: 40 },
      { label: 'PORT', x: 330, y: 240 },
    ],
    paths: [
      'M 128 53 H 190 V 140',
      'M 136 253 H 190 V 166',
      'M 262 148 H 330 V 66',
      'M 262 158 H 330 V 240',
    ],
  },
}

const glyph = computed(() => GLYPHS[props.type] ?? GLYPHS.rest)
const nodeWidth = (label) => label.length * 8.2 + 24

const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    const paths = gsap.utils.toArray('path', rootRef.value)
    const nodes = gsap.utils.toArray('[data-node]', rootRef.value)

    paths.forEach((path) => {
      const length = path.getTotalLength()
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length })
    })

    gsap
      .timeline({
        scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
      })
      .from(nodes, { opacity: 0, y: 14, duration: 0.7, stagger: 0.08 })
      .to(paths, { strokeDashoffset: 0, duration: 0.9, stagger: 0.12, ease: 'power2.inOut' }, 0.25)
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <svg
    ref="rootRef"
    viewBox="0 0 440 300"
    class="h-full w-full"
    fill="none"
    role="img"
    aria-label="Diagrama da arquitetura do projeto"
  >
    <path
      v-for="(d, index) in glyph.paths"
      :key="`p-${index}`"
      :d="d"
      stroke="currentColor"
      stroke-width="1"
      class="text-ember/45"
    />

    <g v-for="node in glyph.nodes" :key="node.label" data-node>
      <rect
        :x="node.x"
        :y="node.y"
        :width="nodeWidth(node.label)"
        height="26"
        rx="13"
        stroke="currentColor"
        stroke-width="1"
        class="text-cream/20"
      />
      <text
        :x="node.x + nodeWidth(node.label) / 2"
        :y="node.y + 17"
        text-anchor="middle"
        class="fill-cream-faint font-mono text-[9px] tracking-[0.14em]"
      >
        {{ node.label }}
      </text>
    </g>
  </svg>
</template>
