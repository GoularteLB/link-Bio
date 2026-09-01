<script setup>
defineProps({
  color: { type: String, default: 'text-teal' },
})
</script>

<template>
  <span class="relative inline-block">
    <slot />
    <svg
      viewBox="0 0 240 80"
      fill="none"
      :class="color"
      class="pointer-events-none absolute -inset-x-4 -inset-y-2 h-[calc(100%+1rem)] w-[calc(100%+2rem)]"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M120 6C58 6 10 22 10 41c0 19 48 33 110 33s110-14 110-33C230 24 190 9 138 6"
        stroke="currentColor"
        stroke-width="2.4"
        stroke-linecap="round"
      />
    </svg>
  </span>
</template>
