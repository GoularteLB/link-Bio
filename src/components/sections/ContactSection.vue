<script setup>
import { profile, socials } from '@/data/profile'
import { assetUrl } from '@/composables/useAssetUrl'
import { useCopyToClipboard } from '@/composables/useCopyToClipboard'
import AppSection from '@/components/ui/AppSection.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'

const { copied, failed, copy } = useCopyToClipboard()

const copyLabel = () => {
  if (copied.value) return 'copiado'
  if (failed.value) return 'falhou'
  return 'copiar'
}
</script>

<template>
  <AppSection
    id="contato"
    index="04"
    title="Contato"
    description="Aberto a projetos freelance, oportunidades e conversas técnicas."
  >
    <div data-reveal class="mb-10 flex flex-col gap-4">
      <a
        :href="`mailto:${profile.email}`"
        class="group flex flex-col gap-3 text-xl font-medium tracking-tight break-all text-ink transition-colors duration-300 hover:text-accent sm:text-4xl"
      >
        {{ profile.email }}
        <span
          class="h-px w-full max-w-lg origin-left scale-x-100 bg-gradient-to-r from-line-bright to-transparent transition-all duration-500 group-hover:from-accent group-hover:to-accent-2"
        ></span>
      </a>

      <button
        type="button"
        class="inline-flex w-fit items-center gap-2 rounded-full border px-4 py-2 font-mono text-[11px] tracking-[0.15em] uppercase transition-colors duration-300"
        :class="
          copied
            ? 'border-positive/40 bg-positive/10 text-positive'
            : 'border-line text-ink-faint hover:border-accent/50 hover:text-accent'
        "
        @click="copy(profile.email)"
      >
        <span
          class="h-1.5 w-1.5 rounded-full transition-colors duration-300"
          :class="copied ? 'bg-positive' : 'bg-ink-faint'"
          aria-hidden="true"
        ></span>
        {{ copyLabel() }}
      </button>
    </div>

    <ul class="grid gap-3 sm:grid-cols-2">
      <li v-for="social in socials" :key="social.id">
        <a
          v-spotlight
          data-reveal
          :href="social.href"
          target="_blank"
          rel="noopener noreferrer"
          class="surface-card group flex items-center gap-4 p-5 transition-colors duration-500 hover:border-line-bright"
        >
          <span
            class="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-line bg-surface-raised transition-colors duration-300 group-hover:border-accent/40"
          >
            <img
              :src="assetUrl(social.icon)"
              alt=""
              loading="lazy"
              decoding="async"
              class="h-4 w-4 object-contain opacity-80 transition-opacity duration-300 group-hover:opacity-100"
              :class="social.invert ? 'invert' : ''"
            />
          </span>

          <span class="relative flex min-w-0 flex-col">
            <span class="text-sm font-medium text-ink">{{ social.label }}</span>
            <span class="truncate font-mono text-[11px] text-ink-faint">{{ social.handle }}</span>
          </span>

          <ArrowIcon
            class="relative ml-auto h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-0.5 group-hover:text-accent"
          />
        </a>
      </li>
    </ul>
  </AppSection>
</template>
