<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '@/i18n'
import { ScrollTrigger, gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
const activeStep = ref(0)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-process-reveal]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.07,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
    })

    gsap.utils.toArray('[data-step]', rootRef.value).forEach((step, index) => {
      ScrollTrigger.create({
        trigger: step,
        start: 'top 62%',
        end: 'bottom 42%',
        onToggle: (self) => {
          if (self.isActive) activeStep.value = index
        },
      })
    })

    gsap.matchMedia().add('(min-width: 1024px)', () => {
      const rail = rootRef.value.querySelector('[data-process-rail]')
      const list = rootRef.value.querySelector('[data-process-list]')
      if (!rail || !list) return

      ScrollTrigger.create({
        trigger: rail,
        start: 'top 160px',
        endTrigger: list,
        end: () => `bottom ${160 + rail.offsetHeight}px`,
        pin: rail,
        pinSpacing: false,
        invalidateOnRefresh: true,
      })
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
    id="processo"
    ref="rootRef"
    class="scroll-mt-24 border-t border-rule px-6 py-24 sm:px-10 sm:py-28"
  >
    <p data-process-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">05</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">{{ c.process.eyebrow }}</span>
    </p>

    <h2 data-process-reveal class="display mt-10 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] text-ink">
      {{ c.process.heading[0] }}<br />{{ c.process.heading[1] }}
    </h2>

    <div class="mt-14 grid gap-12 lg:grid-cols-[1fr_15rem] lg:items-start lg:gap-16">
      <ol data-process-list class="flex flex-col">
        <li
          v-for="(step, index) in c.steps"
          :key="step.id"
          data-step
          class="grid grid-cols-[3rem_1fr] gap-5 border-t border-rule py-8 transition-opacity duration-500 last:border-b"
          :class="activeStep === index ? 'opacity-100' : 'opacity-45'"
        >
          <span class="pt-1 font-mono text-[11px] tracking-[0.18em] text-brick">{{ step.index }}</span>
          <div class="flex flex-col gap-3">
            <h3 class="font-mono text-[13px] font-medium tracking-[0.14em] text-ink uppercase">
              {{ step.title }}
            </h3>
            <p class="body-mono max-w-xl">{{ step.text }}</p>
          </div>
        </li>
      </ol>

      <aside data-process-rail class="hidden border border-rule bg-paper-2 p-6 lg:block">
        <span class="meta">{{ c.process.cycle }}</span>

        <ol class="mt-5 flex flex-col">
          <li v-for="(step, index) in c.steps" :key="step.id">
            <span class="flex items-center gap-3 py-2">
              <span
                class="h-2.5 w-2.5 shrink-0 rounded-full border transition-all duration-400"
                :class="
                  activeStep === index
                    ? 'scale-125 border-brick bg-brick'
                    : 'border-ink-faint bg-transparent'
                "
                aria-hidden="true"
              ></span>
              <span
                class="font-mono text-[10px] tracking-[0.16em] uppercase transition-colors duration-400"
                :class="activeStep === index ? 'text-ink' : 'text-ink-faint'"
              >
                {{ step.title }}
              </span>
            </span>
            <span
              v-if="index < c.steps.length - 1"
              class="ml-[5px] block h-3 w-px bg-rule"
              aria-hidden="true"
            ></span>
          </li>
        </ol>

        <p class="mt-5 flex items-center justify-between border-t border-rule pt-4">
          <span class="meta">{{ c.process.loop }}</span>
          <span class="text-brick" aria-hidden="true">↺</span>
        </p>
      </aside>
    </div>
  </section>
</template>
