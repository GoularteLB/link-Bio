<script setup>
import { ref } from 'vue'
import { content } from '@/i18n'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import ScribbleUnderline from '@/components/ui/ScribbleUnderline.vue'
import CircularBadge from '@/components/ui/CircularBadge.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { useHeroMotion } from '@/composables/useHeroMotion'

const c = content
const heroRef = ref(null)
useHeroMotion(heroRef, { delay: 0.2 })

const year = new Date().getFullYear()
</script>

<template>
  <section id="home" ref="heroRef" class="relative min-h-screen scroll-mt-24 px-6 pt-28 pb-24 sm:px-10">
    <p
      class="meta absolute top-1/2 left-2 hidden -translate-y-1/2 tracking-[0.3em] lg:block"
      style="writing-mode: vertical-rl; transform: translateY(-50%) rotate(180deg)"
    >
      {{ c.hero.aside }}
    </p>

    <p
      class="meta absolute bottom-12 left-2 hidden lg:block"
      style="writing-mode: vertical-rl; transform: rotate(180deg)"
    >
      © {{ year }}
    </p>

    <div data-hero-inner class="grid items-center gap-10 lg:grid-cols-[1fr_1fr] lg:gap-8">
      <div class="lg:pl-10">
        <p data-hero-item class="flex items-center gap-3">
          <span class="font-mono text-[11px] tracking-[0.18em] text-brick">01</span>
          <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
          <span class="meta">{{ c.hero.eyebrow }}</span>
        </p>

        <h1 class="display mt-6 text-[clamp(3rem,8.4vw,6.5rem)] text-ink">
          <span class="block overflow-hidden"><span data-hero-line class="block">Lucas</span></span>
          <span class="block overflow-hidden"><span data-hero-line class="block">Goularte</span></span>
        </h1>

        <ScribbleUnderline data-hero-item class="mt-2 max-w-sm" />

        <p data-hero-item class="body-mono mt-8 max-w-xs">{{ c.profile.tagline }}</p>

        <a
          data-hero-item
          :href="`mailto:${c.profile.email}`"
          class="link-hand mt-10 transition-colors duration-300 hover:text-teal"
        >
          {{ c.hero.cta }}
          <HandArrow />
        </a>
      </div>

      <div class="relative">
        <PhotoFrame
          :src="c.profile.heroPhoto"
          :alt="c.profile.name"
          position="50% 22%"
          class="aspect-[4/5] w-full lg:aspect-auto lg:h-[62vh]"
        />

        <CircularBadge
          data-hero-item
          :text="c.hero.badge"
          class="absolute bottom-2 -left-6 h-24 w-24 sm:-left-14 sm:h-32 sm:w-32"
        />

        <p
          data-hero-item
          class="hand absolute -bottom-14 right-0 text-2xl leading-[1.15] text-ink sm:text-3xl"
        >
          <span v-for="line in c.hero.handwritten" :key="line" class="block">{{ line }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
