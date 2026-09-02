<script setup>
import { assetUrl } from '@/composables/useAssetUrl'

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  position: { type: String, default: 'center' },
  bare: { type: Boolean, default: false },
})
</script>

<template>
  <div class="relative overflow-hidden" :class="bare ? '' : 'bg-paper-2'">
    <img
      v-if="src"
      :src="assetUrl(src)"
      :alt="alt"
      :style="{ objectPosition: position }"
      loading="lazy"
      decoding="async"
      class="h-full w-full"
      :class="bare ? 'object-contain' : 'object-cover'"
    />

    <div v-else class="photo-fallback absolute inset-0"></div>
  </div>
</template>
