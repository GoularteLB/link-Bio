<script setup>
import { assetUrl } from '@/composables/useAssetUrl'

defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  position: { type: String, default: 'center' },
})
</script>

<template>
  <div class="relative overflow-hidden bg-paper-2">
    <img
      v-if="src"
      :src="assetUrl(src)"
      :alt="alt"
      :style="{ objectPosition: position }"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover"
    />

    <div
      v-else
      class="absolute inset-0"
      style="
        background:
          radial-gradient(52% 40% at 58% 32%, rgba(47, 111, 107, 0.32), transparent 70%),
          linear-gradient(160deg, #e7dfd3, #d9cfc0);
      "
    ></div>
  </div>
</template>
