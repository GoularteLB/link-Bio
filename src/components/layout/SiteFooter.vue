<script setup>
import { profile } from '@/data/profile'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="bg-ink px-6 py-6 sm:px-10">
    <div class="flex flex-wrap items-center justify-between gap-4">
      <a href="#home" class="display text-xl text-paper">LG<span class="text-brick">.</span></a>

      <p class="font-mono text-[10px] tracking-[0.18em] text-paper/70 uppercase">
        © {{ year }} {{ profile.name }}
      </p>

      <p class="font-mono text-[10px] tracking-[0.18em] text-paper/70 uppercase">
        Feito com &lt;3 e café
      </p>
    </div>
  </footer>
</template>
