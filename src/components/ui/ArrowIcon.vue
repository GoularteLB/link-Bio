<script setup>
defineProps({
  direction: {
    type: String,
    default: 'up-right',
    validator: (value) => ['right', 'up-right', 'down'].includes(value),
  },
})
</script>

<template>
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    stroke-width="1.75"
    stroke-linecap="round"
    stroke-linejoin="round"
    aria-hidden="true"
  >
    <template v-if="direction === 'up-right'">
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </template>
    <template v-else-if="direction === 'down'">
      <path d="M12 5v14" />
      <path d="m5 12 7 7 7-7" />
    </template>
    <template v-else>
      <path d="M5 12h14" />
      <path d="m12 5 7 7-7 7" />
    </template>
  </svg>
</template>
