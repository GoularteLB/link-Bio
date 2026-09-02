<script setup>
import { computed } from 'vue'
import { RouterView, useRoute } from 'vue-router'
import SiteHeader from '@/components/layout/SiteHeader.vue'
import SiteCursor from '@/components/ui/SiteCursor.vue'
import {
  refreshScrollTriggers,
  scrollToSection,
  scrollToTop,
  useSmoothScroll,
} from '@/composables/useSmoothScroll'

const route = useRoute()
const showHeader = computed(() => route.name === 'home' || route.name === 'projeto')

useSmoothScroll()

const onBeforeEnter = () => {
  if (!route.hash) scrollToTop()
}

const onAfterEnter = () => {
  requestAnimationFrame(() => {
    refreshScrollTriggers()
    if (route.hash) scrollToSection(route.hash.slice(1))
  })
}
</script>

<template>
  <SiteCursor />

  <SiteHeader v-if="showHeader" />

  <div id="smooth-wrapper">
    <div id="smooth-content">
      <RouterView v-slot="{ Component, route: current }">
        <Transition
          name="page"
          mode="out-in"
          @before-enter="onBeforeEnter"
          @after-enter="onAfterEnter"
        >
          <component :is="Component" :key="current.fullPath" />
        </Transition>
      </RouterView>
    </div>
  </div>
</template>

<style>
.page-enter-active {
  transition:
    opacity 0.5s ease,
    transform 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.page-leave-active {
  transition:
    opacity 0.32s ease,
    transform 0.42s cubic-bezier(0.7, 0, 0.84, 0);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(24px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-16px);
}

@media (prefers-reduced-motion: reduce) {
  .page-enter-active,
  .page-leave-active {
    transition: none;
  }
}
</style>
