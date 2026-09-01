<script setup>
import { profile, socials } from '@/data/profile'
import { certifications } from '@/data/stack'
import { assetUrl } from '@/composables/useAssetUrl'
import StatusBadge from '@/components/ui/StatusBadge.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'

const accentClasses = {
  positive: 'border-positive/25 bg-positive/8 hover:border-positive/50',
  accent: 'border-accent/25 bg-accent/8 hover:border-accent/50',
  pink: 'border-pink-500/25 bg-pink-500/8 hover:border-pink-500/50',
  neutral: 'border-line bg-surface hover:border-line-bright',
}
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <header
      data-link-item
      class="relative overflow-hidden rounded-2xl border border-line bg-surface p-8 text-center"
    >
      <span
        class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent to-transparent"
        aria-hidden="true"
      ></span>

      <div
        class="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-canvas"
      >
        <span class="text-xl font-semibold tracking-tight text-ink">{{ profile.initials }}</span>
      </div>

      <h1 class="text-xl font-semibold tracking-tight text-ink">{{ profile.name }}</h1>
      <p class="text-gradient mt-2 font-mono text-[10px] tracking-[0.22em] uppercase">
        {{ profile.role }}
      </p>

      <div class="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span
          class="rounded-full border border-line bg-canvas px-3 py-1 font-mono text-[10px] tracking-wide text-ink-faint"
        >
          {{ profile.location }}
        </span>
        <StatusBadge
          :label="profile.available ? 'disponível' : 'ocupado'"
          :active="profile.available"
        />
      </div>
    </header>

    <a
      v-for="social in socials"
      :key="social.id"
      v-magnetic="0.12"
      data-link-item
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-4 rounded-xl border p-4 transition-colors duration-300 active:scale-[0.98]"
      :class="accentClasses[social.accent] ?? accentClasses.neutral"
    >
      <img
        :src="assetUrl(social.icon)"
        alt=""
        loading="lazy"
        decoding="async"
        class="h-5 w-5 shrink-0 object-contain"
        :class="social.invert ? 'invert' : ''"
      />
      <span class="flex min-w-0 flex-col text-left">
        <span class="text-sm font-medium text-ink">{{ social.label }}</span>
        <span class="truncate font-mono text-[10px] text-ink-faint">{{ social.handle }}</span>
      </span>
      <ArrowIcon
        class="ml-auto h-4 w-4 shrink-0 text-ink-faint transition-transform duration-300 group-hover:translate-x-0.5"
      />
    </a>

    <section data-link-item class="rounded-xl border border-line bg-surface p-4">
      <h2 class="label-mono mb-3 text-center">Camunda Academy</h2>
      <div class="grid grid-cols-2 gap-3">
        <a
          v-for="cert in certifications"
          :key="cert.id"
          :href="cert.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group/cert flex flex-col items-center gap-2 rounded-lg border border-line bg-canvas p-3 text-center transition-colors duration-300 hover:border-accent/40"
        >
          <img
            :src="assetUrl(cert.icon)"
            :alt="`Selo ${cert.title}`"
            loading="lazy"
            decoding="async"
            class="h-9 w-9 object-contain transition-transform duration-500 group-hover/cert:scale-110"
          />
          <span class="font-mono text-[9px] tracking-wide text-ink-faint uppercase">
            {{ cert.title }}
          </span>
        </a>
      </div>
    </section>

    <a
      data-link-item
      href="https://app.daily.dev/lucasgoularte"
      target="_blank"
      rel="noopener noreferrer"
      class="overflow-hidden rounded-xl border border-line bg-surface p-3 transition-colors duration-300 hover:border-line-bright"
    >
      <img
        src="https://api.daily.dev/devcards/v2/luQTCnFOI4iGW2l5FEfXP.png?type=wide&r=23f"
        alt="Dev Card de Lucas Goularte no daily.dev"
        loading="lazy"
        decoding="async"
        class="w-full rounded-lg opacity-90 transition-opacity duration-300 hover:opacity-100"
      />
    </a>
  </div>
</template>
