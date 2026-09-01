<script setup>
import { computed, ref } from 'vue'
import { profile } from '@/data/profile'
import { sections } from '@/data/navigation'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { useHeroMotion } from '@/composables/useHeroMotion'

const props = defineProps({
  activeIndex: { type: Number, default: 0 },
})

const heroRef = ref(null)
useHeroMotion(heroRef, { delay: 0.25 })

const current = computed(() => sections[props.activeIndex]?.index ?? '01')
const total = computed(() => sections[sections.length - 1].index)
</script>

<template>
  <section id="hero" ref="heroRef" class="relative min-h-screen">
    <div class="grid min-h-screen lg:grid-cols-[1fr_1fr]">
      <div class="relative flex flex-col justify-center px-6 pt-28 pb-14 sm:px-10 lg:pr-14">
        <div
          class="absolute top-32 bottom-24 left-6 hidden w-px bg-rule sm:left-10 lg:block"
          aria-hidden="true"
        ></div>

        <p
          class="meta absolute top-1/2 left-6 hidden -translate-y-1/2 -rotate-90 sm:left-10 lg:block"
        >
          SC / BR
        </p>

        <div data-hero-inner class="lg:pl-16">
          <p data-hero-item class="flex items-center gap-4">
            <span class="meta-bright">Olá, sou</span>
            <span class="h-px w-9 bg-ember" aria-hidden="true"></span>
          </p>

          <h1 class="display mt-6 text-[clamp(3.2rem,9vw,6.5rem)] text-cream">
            <span class="mask-line block overflow-hidden">
              <span data-hero-line class="block">Lucas</span>
            </span>
            <span class="mask-line block overflow-hidden">
              <span data-hero-line class="block">Goularte</span>
            </span>
          </h1>

          <p data-hero-item class="mt-7 font-mono text-sm tracking-[0.18em] uppercase">
            <span class="text-cream">Fullstack</span>
            <span class="text-ember"> Developer</span>
          </p>

          <p data-hero-item class="body-mono mt-7 max-w-xs">
            {{ profile.tagline }}
          </p>

          <a
            data-hero-item
            :href="`mailto:${profile.email}`"
            class="link-underline mt-11 font-mono text-[11px] tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:text-ember"
          >
            Vamos conversar
            <span class="text-ember">→</span>
          </a>
        </div>
      </div>

      <div class="relative min-h-[60vh] lg:min-h-screen">
        <MediaFrame
          :src="profile.heroPortrait"
          :alt="`Retrato de ${profile.name}`"
          origin="52% 22%"
          class="h-full w-full"
        />

        <div
          class="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-night to-transparent lg:hidden"
        ></div>

        <p
          data-hero-item
          class="absolute top-1/3 right-6 max-w-[9rem] text-right font-mono text-[10px] leading-relaxed tracking-[0.18em] text-cream-dim uppercase sm:right-10"
        >
          Disponível para novos projetos
          <span class="mt-3 ml-auto block h-1.5 w-1.5 rounded-full bg-ember" aria-hidden="true"></span>
        </p>

        <p
          class="absolute right-6 bottom-10 flex items-center gap-4 font-mono text-[11px] tracking-[0.2em] text-cream-dim sm:right-10"
        >
          <span class="text-cream">{{ current }}</span>
          <span class="h-px w-8 bg-rule" aria-hidden="true"></span>
          <span>{{ total }}</span>
        </p>
      </div>
    </div>
  </section>
</template>
