<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-8 px-6 text-center">
    <p class="display text-[clamp(5rem,22vw,16rem)] text-rule">404</p>
    <h1 class="display text-xl text-cream">Página não encontrada</h1>
    <p class="max-w-sm text-sm text-cream-dim">
      O endereço acessado não existe. Talvez você queira voltar ao início.
    </p>
    <RouterLink
      v-magnetic="0.25"
      data-cursor="link"
      to="/"
      class="border border-rule px-6 py-3 font-mono text-[11px] tracking-[0.22em] text-cream-dim uppercase transition-colors duration-300 hover:border-ember/50 hover:text-ember"
    >
      Voltar ao início
    </RouterLink>
  </main>
</template>
