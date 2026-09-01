<script setup>
defineProps({
  color: { type: String, default: 'text-teal' },
})
</script>

<template>
  <svg
    viewBox="0 0 420 26"
    fill="none"
    :class="color"
    class="w-full"
    preserveAspectRatio="none"
    aria-hidden="true"
  >
    <path
      d="M6 15C74 7 168 4 262 6c52 1 104 4 152 9"
      stroke="currentColor"
      stroke-width="2.6"
      stroke-linecap="round"
    />
    <path
      d="M16 21C92 14 196 12 288 14c44 1 86 3 118 6"
      stroke="currentColor"
      stroke-width="1.7"
      stroke-linecap="round"
      opacity="0.65"
    />
  </svg>
</template>
