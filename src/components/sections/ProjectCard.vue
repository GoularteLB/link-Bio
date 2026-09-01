<script setup>
import TagPill from '@/components/ui/TagPill.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <article
    v-tilt="3"
    v-spotlight
    data-reveal
    class="surface-card group flex flex-col gap-5 p-6 transition-colors duration-500 hover:border-line-bright sm:p-8"
    :class="project.featured ? 'lg:col-span-2' : ''"
  >
    <div class="relative flex items-start justify-between gap-4">
      <div class="flex flex-col gap-1.5">
        <span class="label-mono">{{ project.year }}</span>
        <h3 class="text-lg font-semibold tracking-tight text-ink sm:text-xl">
          {{ project.title }}
        </h3>
      </div>

      <span
        v-if="project.featured"
        class="shrink-0 rounded-full border border-accent/30 bg-accent/10 px-3 py-1 font-mono text-[9px] tracking-[0.18em] text-accent uppercase"
      >
        destaque
      </span>
    </div>

    <p class="relative max-w-2xl text-sm leading-relaxed text-ink-muted">
      {{ project.summary }}
    </p>

    <ul class="relative flex flex-wrap gap-2">
      <li v-for="tag in project.tags" :key="tag">
        <TagPill :label="tag" />
      </li>
    </ul>

    <div class="relative mt-auto flex flex-wrap items-center gap-5 pt-2">
      <a
        v-if="project.repo"
        :href="project.repo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-ink transition-colors duration-300 hover:text-accent"
      >
        Código
        <ArrowIcon class="h-3.5 w-3.5" />
      </a>
      <a
        v-if="project.demo"
        :href="project.demo"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-1.5 text-xs font-medium text-ink-muted transition-colors duration-300 hover:text-accent"
      >
        {{ project.demoLabel || 'Ver online' }}
        <ArrowIcon class="h-3.5 w-3.5" />
      </a>
    </div>
  </article>
</template>
