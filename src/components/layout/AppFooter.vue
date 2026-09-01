<script setup>
import { RouterLink } from 'vue-router'
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="border-t border-line py-10">
    <div
      class="mx-auto flex max-w-5xl flex-col gap-4 px-6 text-[11px] text-ink-faint sm:flex-row sm:items-center sm:justify-between"
    >
      <p class="font-mono tracking-wide">
        © {{ year }} {{ profile.name }} · construído com Vue, Tailwind e GSAP
      </p>
      <div class="flex items-center gap-5 font-mono tracking-wide">
        <RouterLink to="/links" class="transition-colors duration-300 hover:text-accent">
          /links
        </RouterLink>
        <a
          href="https://github.com/GoularteLB/link-Bio"
          target="_blank"
          rel="noopener noreferrer"
          class="transition-colors duration-300 hover:text-accent"
        >
          código-fonte
        </a>
      </div>
    </div>
  </footer>
</template>
