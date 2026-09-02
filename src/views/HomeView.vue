<script setup>
import SiteFooter from '@/components/layout/SiteFooter.vue'
import HeroSection from '@/components/sections/HeroSection.vue'
import AboutSection from '@/components/sections/AboutSection.vue'
import ProjectsSection from '@/components/sections/ProjectsSection.vue'
import FeaturedCaseSection from '@/components/sections/FeaturedCaseSection.vue'
import ProcessSection from '@/components/sections/ProcessSection.vue'
import TechCloudSection from '@/components/sections/TechCloudSection.vue'
import ContactSection from '@/components/sections/ContactSection.vue'
</script>

<template>
  <div class="paper-grain">
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <FeaturedCaseSection />
      <ProcessSection />
      <TechCloudSection />
      <ContactSection />
    </main>

    <SiteFooter />
  </div>
</template>
