<script setup>
import { profile, socials } from '@/data/profile'
import { certifications } from '@/data/stack'
import { assetUrl } from '@/composables/useAssetUrl'
import StatusBadge from '@/components/ui/StatusBadge.vue'
</script>

<template>
  <div class="flex w-full max-w-sm flex-col gap-3">
    <header data-link-item class="border border-rule bg-night-soft p-8 text-center">
      <p class="display mb-6 text-2xl text-cream">LG<span class="text-ember">.</span></p>

      <h1 class="display text-2xl text-cream">{{ profile.name }}</h1>
      <p class="mt-3 font-mono text-[10px] tracking-[0.24em] text-ember uppercase">
        Full/Stack Developer
      </p>

      <div class="mt-6 flex flex-wrap items-center justify-center gap-2">
        <span class="border border-rule px-3 py-1 font-mono text-[10px] tracking-wide text-cream-faint">
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
      data-cursor="link"
      :href="social.href"
      target="_blank"
      rel="noopener noreferrer"
      class="group flex items-center gap-4 border border-rule bg-night-soft p-4 transition-colors duration-300 hover:border-ember/50"
    >
      <img
        :src="assetUrl(social.icon)"
        alt=""
        loading="lazy"
        decoding="async"
        class="h-5 w-5 shrink-0 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
        :class="social.invert ? 'invert' : ''"
      />
      <span class="flex min-w-0 flex-col text-left">
        <span class="text-sm text-cream">{{ social.label }}</span>
        <span class="truncate font-mono text-[10px] text-cream-faint">{{ social.handle }}</span>
      </span>
      <span
        class="ml-auto font-mono text-xs text-cream-faint transition-all duration-300 group-hover:translate-x-1 group-hover:text-ember"
      >
        ↗
      </span>
    </a>

    <section data-link-item class="border border-rule bg-night-soft p-4">
      <h2 class="meta mb-4 text-center">Camunda Academy</h2>
      <div class="grid grid-cols-2 gap-3">
        <a
          v-for="cert in certifications"
          :key="cert.id"
          :href="cert.href"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="link"
          class="group/cert flex flex-col items-center gap-2 border border-rule p-3 text-center transition-colors duration-300 hover:border-ember/50"
        >
          <img
            :src="assetUrl(cert.icon)"
            :alt="`Selo ${cert.title}`"
            loading="lazy"
            decoding="async"
            class="h-9 w-9 object-contain transition-transform duration-500 group-hover/cert:scale-110"
          />
          <span class="font-mono text-[9px] tracking-wide text-cream-faint uppercase">
            {{ cert.title }}
          </span>
        </a>
      </div>
    </section>

    <a
      data-link-item
      data-cursor="link"
      href="https://app.daily.dev/lucasgoularte"
      target="_blank"
      rel="noopener noreferrer"
      class="overflow-hidden border border-rule bg-night-soft p-3 transition-colors duration-300 hover:border-ember/50"
    >
      <img
        src="https://api.daily.dev/devcards/v2/luQTCnFOI4iGW2l5FEfXP.png?type=wide&r=23f"
        alt="Dev Card de Lucas Goularte no daily.dev"
        loading="lazy"
        decoding="async"
        class="w-full opacity-90 transition-opacity duration-300 hover:opacity-100"
      />
    </a>
  </div>
</template>
