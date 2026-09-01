<script setup>
defineProps({
  label: { type: String, required: true },
  active: { type: Boolean, default: true },
})
</script>

<template>
  <span
    class="inline-flex items-center gap-2 border px-3 py-1 font-mono text-[10px] tracking-[0.2em] whitespace-nowrap uppercase"
    :class="active ? 'border-brick/40 text-brick' : 'border-rule text-ink-faint'"
  >
    <span class="relative flex h-1.5 w-1.5" aria-hidden="true">
      <span
        v-if="active"
        class="absolute inline-flex h-full w-full animate-ping rounded-full bg-brick opacity-60"
      ></span>
      <span
        class="relative inline-flex h-1.5 w-1.5 rounded-full"
        :class="active ? 'bg-brick' : 'bg-ink-faint'"
      ></span>
    </span>
    {{ label }}
  </span>
</template>
