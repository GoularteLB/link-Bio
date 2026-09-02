<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '@/i18n'
import ScribbleUnderline from '@/components/ui/ScribbleUnderline.vue'
import CircleMark from '@/components/ui/CircleMark.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
let ctx = null

const offsetFor = (index) => [0, 8, -6, 4, -9, 6, -3][index % 7]

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-cloud-reveal]', {
      opacity: 0,
      y: 22,
      duration: 0.8,
      stagger: 0.05,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
    })

    gsap.from('[data-cloud-word]', {
      opacity: 0,
      y: 26,
      duration: 0.85,
      stagger: 0.035,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 72%', once: true },
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    id="stack"
    ref="rootRef"
    class="scroll-mt-24 border-t border-rule bg-paper-2 px-6 py-24 sm:px-10 sm:py-28"
  >
    <p data-cloud-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">06</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">{{ c.stack.eyebrow }}</span>
    </p>

    <div class="mt-12 grid gap-12 lg:grid-cols-[0.7fr_2.3fr] lg:gap-14">
      <div class="flex flex-col">
        <h2 data-cloud-reveal class="display text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.05] text-ink">
          {{ c.stack.heading[0] }}<br />{{ c.stack.heading[1] }}
        </h2>
        <ScribbleUnderline data-cloud-reveal class="mt-3 max-w-[14rem]" />

        <a
          data-cloud-reveal
          :href="c.profile.allProjectsHref"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="external"
          class="link-hand mt-auto pt-12 transition-colors duration-300 hover:text-teal"
        >
          {{ c.stack.link }}
          <HandArrow />
        </a>
      </div>

      <ul class="flex flex-wrap items-center gap-x-10 gap-y-12 sm:gap-x-14 sm:gap-y-16">
        <li
          v-for="(word, index) in c.cloud"
          :key="word.id"
          data-cloud-word
          :style="{ transform: `translateY(${offsetFor(index)}px)` }"
        >
          <CircleMark v-if="word.mark === 'circle'" color="text-brick">
            <span class="cloud-word" :class="`cloud-w${word.weight}`">{{ word.label }}</span>
          </CircleMark>

          <span v-else-if="word.mark === 'underline'" class="relative inline-block">
            <span class="cloud-word" :class="`cloud-w${word.weight}`">{{ word.label }}</span>
            <ScribbleUnderline color="text-brick" class="absolute -bottom-3 left-0 w-full" />
          </span>

          <span v-else-if="word.mark === 'arrow'" class="inline-flex items-center gap-3">
            <HandArrow class="rotate-[8deg]" />
            <span class="cloud-word" :class="`cloud-w${word.weight}`">{{ word.label }}</span>
          </span>

          <span v-else class="cloud-word" :class="`cloud-w${word.weight}`">{{ word.label }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>
