<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const route = useRoute()
const showHeader = computed(() => route.name === 'home')

useSmoothScroll()
</script>

<template>
  <SiteHeader v-if="showHeader" />

  <div id="smooth-wrapper">
    <div id="smooth-content">
      <RouterView />
    </div>
  </div>
</template>
