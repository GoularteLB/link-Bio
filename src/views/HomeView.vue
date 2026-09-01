<script setup>
import { sections } from '@/data/navigation'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import AboutStackSection from '@/components/sections/AboutStackSection.vue'
import { useChapterTracker } from '@/composables/useChapterTracker'

const { activeIndex } = useChapterTracker(sections)
</script>

<template>
  <div>
    <main>
      <HeroSection :active-index="activeIndex" />
      <ProjectsSection />
      <AboutStackSection />
    </main>

    <SiteFooter />
  </div>
</template>
