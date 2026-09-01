<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { allProjectsHref, featuredProjects } from '@/data/projects'
import ProjectCard from '@/components/sections/ProjectCard.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-projects-intro] > *', {
      opacity: 0,
      y: 22,
      duration: 0.9,
      stagger: 0.1,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 76%', once: true },
    })

    gsap.from('[data-project-card]', {
      opacity: 0,
      y: 40,
      duration: 1,
      stagger: 0.12,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 70%', once: true },
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section
    id="work"
    ref="rootRef"
    class="border-t border-rule bg-night-soft px-6 py-24 sm:px-10 sm:py-28"
  >
    <div class="grid gap-12 lg:grid-cols-[0.8fr_2.2fr] lg:gap-16">
      <div data-projects-intro class="flex flex-col">
        <p class="flex items-center gap-4">
          <span class="meta-bright">02</span>
          <span class="h-px w-9 bg-ember" aria-hidden="true"></span>
        </p>

        <h2 class="display mt-8 text-[clamp(2.2rem,4.6vw,3.4rem)] text-cream">
          Projetos<br />selecionados
        </h2>

        <a
          :href="allProjectsHref"
          target="_blank"
          rel="noopener noreferrer"
          class="link-underline mt-auto w-fit pt-14 font-mono text-[11px] leading-relaxed tracking-[0.2em] text-cream-dim uppercase transition-colors duration-300 hover:text-cream"
        >
          Ver todos<br />os projetos
          <span class="text-ember">→</span>
        </a>
      </div>

      <div class="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <ProjectCard
          v-for="project in featuredProjects"
          :key="project.id"
          :project="project"
        />
      </div>
    </div>
  </section>
</template>
