<script setup>
import { certifications, credentials, stackGroups } from '@/data/stack'
import { assetUrl } from '@/composables/useAssetUrl'
import AppSection from '@/components/ui/AppSection.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
</script>

<template>
  <AppSection
    id="stack"
    index="02"
    title="Stack"
    description="Ferramentas que uso no dia a dia, agrupadas por camada."
  >
    <div v-spotlight class="surface-card divide-y divide-line">
      <div
        v-for="group in stackGroups"
        :key="group.id"
        data-reveal
        class="relative grid gap-4 p-6 transition-colors duration-500 hover:bg-surface-raised/40 sm:grid-cols-[11rem_1fr] sm:items-center sm:gap-6 sm:p-7"
      >
        <div class="flex items-baseline gap-3">
          <h3 class="label-mono">{{ group.label }}</h3>
          <span class="font-mono text-[10px] text-ink-faint/50">
            {{ String(group.items.length).padStart(2, '0') }}
          </span>
        </div>

        <ul class="flex flex-wrap gap-2">
          <li v-for="item in group.items" :key="item.name">
            <a
              :href="item.href"
              target="_blank"
              rel="noopener noreferrer"
              class="group/item flex items-center gap-2.5 rounded-full border border-line bg-surface-raised py-1.5 pr-4 pl-1.5 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/40 hover:text-ink"
            >
              <span
                class="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-canvas/70"
              >
                <img
                  v-if="item.icon"
                  :src="assetUrl(item.icon)"
                  alt=""
                  loading="lazy"
                  decoding="async"
                  class="h-4 w-4 object-contain opacity-70 transition-opacity duration-300 group-hover/item:opacity-100"
                />
                <span v-else class="font-mono text-[8px] tracking-wider text-ink-faint">
                  {{ item.abbr ?? item.name.slice(0, 3).toUpperCase() }}
                </span>
              </span>
              {{ item.name }}
            </a>
          </li>
        </ul>
      </div>
    </div>

    <div v-spotlight data-reveal class="surface-card mt-4 p-6 sm:p-7">
      <h3 class="label-mono relative mb-6">Certificações</h3>

      <div class="relative grid gap-3 sm:grid-cols-2">
        <a
          v-for="cert in certifications"
          :key="cert.id"
          :href="cert.href"
          target="_blank"
          rel="noopener noreferrer"
          class="group/cert flex items-center gap-4 rounded-xl border border-line bg-surface-raised p-4 transition-colors duration-300 hover:border-accent/40"
        >
          <img
            :src="assetUrl(cert.icon)"
            :alt="`Selo ${cert.title}`"
            loading="lazy"
            decoding="async"
            class="h-10 w-10 shrink-0 object-contain transition-transform duration-500 group-hover/cert:scale-110"
          />
          <span class="flex flex-col">
            <span class="text-sm font-medium text-ink">{{ cert.title }}</span>
            <span class="font-mono text-[10px] tracking-wide text-ink-faint">{{ cert.issuer }}</span>
          </span>
          <ArrowIcon
            class="ml-auto h-4 w-4 text-ink-faint transition-all duration-300 group-hover/cert:translate-x-0.5 group-hover/cert:text-accent"
          />
        </a>
      </div>

      <ul class="relative mt-3 flex flex-col divide-y divide-line/70 border-t border-line/70">
        <li
          v-for="credential in credentials"
          :key="credential.id"
          class="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 py-3.5"
        >
          <span class="text-sm text-ink-muted">{{ credential.title }}</span>
          <span class="font-mono text-[10px] tracking-wide text-ink-faint">
            {{ credential.issuer }} · {{ credential.year }}
          </span>
        </li>
      </ul>
    </div>
  </AppSection>
</template>
