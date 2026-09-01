<script setup>
import { projects } from '@/data/projects'
import AppSection from '@/components/ui/AppSection.vue'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'
</script>

<template>
  <AppSection
    id="projetos"
    index="01"
    title="Projetos"
    description="Seleção de trabalhos entre APIs, interfaces web e estudos de arquitetura."
  >
    <div class="grid gap-4 lg:grid-cols-2">
      <ProjectCard v-for="project in projects" :key="project.id" :project="project" />
    </div>

    <a
      v-magnetic="0.2"
      data-reveal
      href="https://github.com/GoularteLB?tab=repositories"
      target="_blank"
      rel="noopener noreferrer"
      class="group mt-10 inline-flex items-center gap-2 rounded-full border border-line px-5 py-2.5 text-sm text-ink-muted transition-colors duration-300 hover:border-accent/50 hover:text-accent"
    >
      Todos os repositórios no GitHub
      <ArrowIcon class="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
    </a>
  </AppSection>
</template>
