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

    <template v-else-if="name === 'target'">
      <circle cx="12" cy="12" r="8.4" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
    </template>

    <template v-else-if="name === 'flag'">
      <path d="M5.6 21V3.4" stroke-linecap="round" />
      <path d="M5.6 4.2c3.6-1.8 7.2 1.8 10.8 0v8.4c-3.6 1.8-7.2-1.8-10.8 0Z" stroke-linejoin="round" />
    </template>

    <template v-else-if="name === 'heart'">
      <path
        d="M12 20.2S3.4 15.1 3.4 9.4A4.6 4.6 0 0 1 12 7a4.6 4.6 0 0 1 8.6 2.4c0 5.7-8.6 10.8-8.6 10.8Z"
        stroke-linejoin="round"
      />
    </template>

    <template v-else-if="name === 'mail'">
      <rect x="2.6" y="5.2" width="18.8" height="13.6" rx="1.6" />
      <path d="m3.4 6.6 8.6 6.2 8.6-6.2" stroke-linejoin="round" />
    </template>

    <template v-else-if="name === 'linkedin'">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M7.4 10.4V17M7.4 7.3v.1M11.4 17v-3.6a2.2 2.2 0 0 1 4.4 0V17" stroke-linecap="round" />
    </template>

    <template v-else-if="name === 'github'">
      <path
        d="M9.2 20.4c-4 1.2-4-2.2-5.6-2.6m11.2 5.2v-3.2c0-.9-.1-1.3-.6-1.8 2.4-.3 4.8-1.2 4.8-5.3a4.1 4.1 0 0 0-1.1-2.8 3.8 3.8 0 0 0-.1-2.8s-.9-.3-3 1.1a10.3 10.3 0 0 0-5.2 0C7.5 6.8 6.6 7.1 6.6 7.1a3.8 3.8 0 0 0-.1 2.8 4.1 4.1 0 0 0-1.1 2.9c0 4 2.4 4.9 4.8 5.2-.5.5-.6 1-.6 1.8V23"
        stroke-linecap="round"
        stroke-linejoin="round"
        transform="translate(0 -2)"
      />
    </template>

    <template v-else>
      <circle cx="9" cy="8" r="3.2" />
      <circle cx="17" cy="9.5" r="2.4" />
      <path d="M3 19c0-3.3 2.7-5.4 6-5.4s6 2.1 6 5.4M16 13.8c2.8.2 5 2.2 5 5.2" stroke-linecap="round" />
    </template>
  </svg>
</template>
