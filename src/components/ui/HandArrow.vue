<script setup>
defineProps({
  color: { type: String, default: 'text-brick' },
})
</script>

<template>
  <svg
    viewBox="0 0 60 26"
    fill="none"
    :class="color"
    class="h-4 w-10 shrink-0"
    aria-hidden="true"
  >
    <path
      d="M2 17c12-6 26-9 44-9"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
    />
    <path
      d="M36 2c5 3 9 5 12 6-4 3-7 6-9 10"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
    />
  </svg>
</template>
