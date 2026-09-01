<script setup>
import { RouterView } from 'vue-router'
import BackdropLayer from '@/components/layout/BackdropLayer.vue'
</script>

<template>
  <BackdropLayer />

  <RouterView v-slot="{ Component }">
    <Transition name="page" mode="out-in">
      <component :is="Component" />
    </Transition>
  </RouterView>
</template>

<style scoped>
.page-enter-active,
.page-leave-active {
  transition:
    opacity 0.35s var(--ease-out-soft),
    transform 0.35s var(--ease-out-soft);
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(8px);
}
</style>
