<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <main class="flex min-h-screen flex-col items-center justify-center gap-6 px-6 text-center">
    <p class="font-mono text-7xl font-semibold tracking-tight text-line-bright">404</p>
    <h1 class="text-xl font-medium tracking-tight text-ink">Página não encontrada</h1>
    <p class="max-w-sm text-sm text-ink-muted">
      O endereço acessado não existe. Talvez você queira voltar ao início.
    </p>
    <RouterLink
      v-magnetic="0.25"
      to="/"
      class="rounded-full border border-line px-6 py-3 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
    >
      Voltar ao início
    </RouterLink>
  </main>
</template>
