<script setup>
import { content } from '@/i18n'
import { scrollToSection } from '@/composables/useSmoothScroll'

const c = content
const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-rule bg-paper px-6 py-8 sm:px-10">
    <div class="flex flex-wrap items-center justify-between gap-6">
      <a
        href="#home"
        class="display text-xl text-ink"
        @click.prevent="scrollToSection('home')"
      >
        LG<span class="text-brick">.</span>
      </a>

      <p class="font-mono text-[10px] leading-[1.9] tracking-[0.14em] text-ink-soft uppercase">
        <span v-for="line in c.profile.footerLine" :key="line" class="block">{{ line }}</span>
      </p>

      <p class="font-mono text-[10px] tracking-[0.16em] text-ink-faint uppercase">
        © {{ year }} · {{ c.profile.rights }}
      </p>

      <a
        href="#home"
        class="link-hand transition-colors duration-300 hover:text-teal"
        @click.prevent="scrollToSection('home')"
      >
        {{ c.contact.backToTop }}
        <span class="text-brick" aria-hidden="true">↑</span>
      </a>
    </div>
  </footer>
</template>
