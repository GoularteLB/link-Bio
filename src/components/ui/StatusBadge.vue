<script setup>
defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, default: true },
})
</script>

<template>
  <span
    class="inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-[10px] tracking-[0.15em] whitespace-nowrap uppercase transition-colors"
    :class="
      active
        ? 'border-positive/30 bg-positive/10 text-positive'
        : 'border-line bg-surface text-ink-faint'
    "
  >
    <span class="relative flex h-1.5 w-1.5" aria-hidden="true">
      <span
        v-if="active"
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-positive opacity-60"
      ></span>
      <span
        class="relative inline-flex h-1.5 w-1.5 rounded-full"
        :class="active ? 'bg-positive' : 'bg-ink-faint'"
      ></span>
    </span>
    {{ label }}
  </span>
</template>
