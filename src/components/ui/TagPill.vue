<script setup>
defineProps({
  label: { type: String, required: true },
})
</script>

<template>
  <span
    class="rounded-full border border-line bg-surface-raised px-2.5 py-1 font-mono text-[10px] tracking-wide text-ink-muted transition-colors duration-300 group-hover:border-line-bright"
  >
    {{ label }}
  </span>
</template>
