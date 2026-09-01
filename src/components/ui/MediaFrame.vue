<script setup>
import { computed } from 'vue'
import ArchitectureGlyph from '@/components/ui/ArchitectureGlyph.vue'
import { assetUrl } from '@/composables/useAssetUrl'

const props = defineProps({
  src: { type: String, default: '' },
  alt: { type: String, default: '' },
  glyph: { type: String, default: '' },
  origin: { type: String, default: '50% 18%' },
})

const spotlight = computed(() => ({
  background: `radial-gradient(58% 46% at ${props.origin}, rgba(212,112,58,0.46), rgba(212,112,58,0.14) 46%, transparent 74%)`,
}))
</script>

<template>
  <div class="grain relative overflow-hidden bg-night-raised">
    <img
      v-if="src"
      :src="assetUrl(src)"
      :alt="alt"
      loading="lazy"
      decoding="async"
      class="h-full w-full object-cover"
    />

    <template v-else>
      <div class="absolute inset-0" :style="spotlight"></div>
      <div
        class="absolute inset-0"
        style="background: linear-gradient(to top, rgba(10, 9, 8, 0.88), transparent 42%)"
      ></div>
      <ArchitectureGlyph
        v-if="glyph"
        :type="glyph"
        class="relative h-full w-full p-6 opacity-100"
      />
    </template>
  </div>
</template>
