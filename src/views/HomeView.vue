<script setup>
import { ref } from 'vue'
import AppHeader from '@/components/layout/AppHeader.vue'
import AppFooter from '@/components/layout/AppFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import StackSection from '@/components/sections/StackSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
import { useScrollReveal } from '@/composables/useScrollReveal'

const mainRef = ref(null)
useScrollReveal(mainRef)
</script>

<template>
  <div class="min-h-screen">
    <AppHeader />

    <main ref="mainRef" class="mx-auto max-w-5xl px-6">
      <HeroSection />
      <ProjectsSection />
      <StackSection />
      <AboutSection />
      <ContactSection />
    </main>

    <AppFooter />
  </div>
</template>
