<script setup>
import { computed, ref } from 'vue'
import { profile } from '@/data/profile'
import { stackGroups } from '@/data/stack'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
import MarqueeStrip from '@/components/ui/MarqueeStrip.vue'
import { useHeroMotion } from '@/composables/useHeroMotion'

const heroRef = ref(null)
useHeroMotion(heroRef)

const marqueeItems = computed(() => stackGroups.flatMap((group) => group.items.map((item) => item.name)))
</script>

<template>
  <section
    id="topo"
    ref="heroRef"
    class="relative flex min-h-[90vh] flex-col justify-center py-24"
  >
    <div data-hero-inner class="flex flex-col">
      <div data-hero-meta class="flex flex-wrap items-center gap-x-4 gap-y-3">
        <span class="label-mono whitespace-nowrap">{{ profile.location }}</span>
        <span class="hidden h-px w-12 bg-line-bright sm:block" aria-hidden="true"></span>
        <StatusBadge :label="profile.availabilityLabel" :active="profile.available" />
      </div>

      <h1
        data-hero-title
        class="mt-9 text-[clamp(2.5rem,9vw,5.5rem)] leading-[0.95] font-semibold tracking-tight text-balance text-ink"
      >
        {{ profile.name }}
      </h1>

      <p
        data-hero-role
        class="text-gradient mt-5 font-mono text-sm tracking-[0.28em] uppercase sm:text-base"
      >
        {{ profile.role }}
      </p>

      <p
        data-hero-tagline
        class="mt-8 max-w-xl text-lg leading-relaxed text-pretty text-ink-muted"
      >
        {{ profile.tagline }}
      </p>

      <div data-hero-actions class="mt-11 flex flex-wrap items-center gap-3">
        <a
          v-magnetic="0.28"
          href="#projetos"
          class="group inline-flex items-center gap-2.5 rounded-full bg-ink px-6 py-3 text-sm font-medium text-canvas"
        >
          Ver projetos
          <ArrowIcon
            direction="down"
            class="h-4 w-4 transition-transform duration-300 group-hover:translate-y-0.5"
          />
        </a>
        <a
          v-magnetic="0.28"
          href="#contato"
          class="inline-flex items-center gap-2.5 rounded-full border border-line px-6 py-3 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
        >
          Falar comigo
        </a>
      </div>
    </div>

    <div data-hero-marquee class="mt-16 border-y border-line/70 py-4">
      <MarqueeStrip :items="marqueeItems" />
    </div>
  </section>
</template>
