<script setup>
import { RouterLink } from 'vue-router'
import { content } from '@/i18n'

const c = content
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
    <p class="display text-[clamp(5rem,22vw,16rem)] text-rule">404</p>
    <h1 class="display text-xl text-ink">{{ c.notFound.title }}</h1>
    <p class="max-w-sm text-sm text-ink-soft">
      {{ c.notFound.text }}
    </p>
    <RouterLink
      v-magnetic="0.25"
      data-cursor="link"
      to="/"
      class="border border-rule px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-ink-soft uppercase transition-colors duration-300 hover:border-brick/50 hover:text-brick"
    >
      {{ c.notFound.action }}
    </RouterLink>
  </main>
</template>
