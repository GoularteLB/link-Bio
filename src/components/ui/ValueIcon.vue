<script setup>
defineProps({
  name: { type: String, required: true },
})
</script>

<template>
  <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.4" aria-hidden="true">
    <template v-if="name === 'spark'">
      <path d="M12 2v20M2 12h20M5 5l14 14M19 5L5 19" stroke-linecap="round" />
    </template>
    <template v-else-if="name === 'eye'">
      <path d="M1.8 12S5.5 5.5 12 5.5 22.2 12 22.2 12 18.5 18.5 12 18.5 1.8 12 1.8 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </template>
    <template v-else>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4M16 13.8c2.8.2 5 2.2 5 5.2" stroke-linecap="round" />
    </template>
  </svg>
</template>
