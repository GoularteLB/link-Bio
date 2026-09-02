<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '@/i18n'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import CircularBadge from '@/components/ui/CircularBadge.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import SignatureMark from '@/components/ui/SignatureMark.vue'
import ValueIcon from '@/components/ui/ValueIcon.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-about-reveal]', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 74%', once: true },
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
    id="sobre"
    ref="rootRef"
    class="scroll-mt-24 border-t border-rule bg-paper-2 px-6 py-24 sm:px-10 sm:py-28"
  >
    <div class="grid gap-14 lg:grid-cols-[0.8fr_1.3fr_0.9fr] lg:gap-14">
      <div data-about-reveal class="relative w-fit">
        <span
          class="absolute -top-3 left-6 z-10 h-6 w-20 rotate-[-4deg] bg-brick/70"
          aria-hidden="true"
        ></span>

        <PhotoFrame
          :src="c.profile.aboutPhoto"
          :alt="c.profile.name"
          position="50% 30%"
          class="aspect-[4/5] w-52 sm:w-60"
        />

        <CircularBadge
          :text="c.about.badge"
          class="absolute -bottom-14 left-2 h-24 w-24 sm:h-28 sm:w-28"
        />
      </div>

      <div class="flex flex-col gap-8 lg:pt-2">
        <p data-about-reveal class="flex items-center gap-3">
          <span class="font-mono text-[11px] tracking-[0.18em] text-brick">02</span>
          <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
          <span class="meta">{{ c.about.eyebrow }}</span>
        </p>

        <h2 data-about-reveal class="hand-display text-teal">
          <span v-for="line in c.profile.aboutHeading" :key="line" class="block">{{ line }}</span>
        </h2>

        <div class="flex flex-col gap-5">
          <p v-for="text in c.profile.aboutText" :key="text" data-about-reveal class="body-mono max-w-sm">
            {{ text }}
          </p>
        </div>

        <SignatureMark data-about-reveal class="-mt-1 max-w-[300px]" />

        <a
          data-about-reveal
          href="#projetos"
          class="link-hand w-fit transition-colors duration-300 hover:text-teal"
        >
          {{ c.about.link }}
          <HandArrow />
        </a>
      </div>

      <ul class="flex flex-col gap-9 lg:pt-14">
        <li v-for="pillar in c.pillars" :key="pillar.id" data-about-reveal class="flex gap-4">
          <span class="mt-0.5 shrink-0 text-teal"><ValueIcon :name="pillar.icon" /></span>
          <span class="flex flex-col gap-2">
            <span class="font-mono text-[11px] tracking-[0.18em] text-ink uppercase">
              {{ pillar.title }}
            </span>
            <span class="body-mono max-w-[26ch] text-[12px]">{{ pillar.text }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
