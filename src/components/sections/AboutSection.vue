<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile, values } from '@/data/profile'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import CircleMark from '@/components/ui/CircleMark.vue'
import CircularBadge from '@/components/ui/CircularBadge.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import ValueIcon from '@/components/ui/ValueIcon.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

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
    <p data-about-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">02</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">Sobre mim</span>
    </p>

    <div class="mt-14 grid gap-14 lg:grid-cols-[1fr_1fr_0.85fr] lg:gap-12">
      <div class="flex flex-col gap-12">
        <h2 data-about-reveal class="display text-[clamp(1.8rem,3.4vw,2.6rem)] leading-[1.1] text-ink">
          Mais que código,<br />
          <CircleMark class="mt-2 inline-block text-teal">
            <span class="text-teal">conexão.</span>
          </CircleMark>
        </h2>

        <div data-about-reveal class="relative w-fit">
          <span
            class="absolute -top-3 left-8 z-10 h-6 w-16 rotate-[-4deg] bg-brick/70"
            aria-hidden="true"
          ></span>
          <PhotoFrame
            :src="profile.aboutPhoto"
            :alt="`Retrato de ${profile.name}`"
            class="aspect-[4/3] w-56 sm:w-64"
          />
          <CircularBadge
            text="PRODUTO · FOCO · CÓDIGO · "
            class="absolute -right-12 -bottom-8 h-24 w-24 sm:-right-16 sm:h-28 sm:w-28"
          />
        </div>
      </div>

      <div class="flex flex-col gap-10">
        <p data-about-reveal class="body-mono max-w-xs text-[14px]">
          {{ profile.aboutText }}
        </p>

        <p data-about-reveal class="signature -mt-2 text-5xl text-teal sm:text-6xl">
          {{ profile.name }}
        </p>

        <a
          data-about-reveal
          href="#projetos"
          class="link-hand w-fit transition-colors duration-300 hover:text-teal"
        >
          Conheça minha história
          <HandArrow />
        </a>
      </div>

      <ul class="flex flex-col gap-9">
        <li v-for="value in values" :key="value.id" data-about-reveal class="flex gap-4">
          <span class="mt-0.5 shrink-0 text-teal"><ValueIcon :name="value.icon" /></span>
          <span class="flex flex-col gap-2">
            <span class="font-mono text-[11px] tracking-[0.18em] text-ink uppercase">
              {{ value.title }}
            </span>
            <span class="body-mono text-[12px]">{{ value.text }}</span>
          </span>
        </li>
      </ul>
    </div>
  </section>
</template>
