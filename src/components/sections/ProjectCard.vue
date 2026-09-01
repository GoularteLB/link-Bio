<script setup>
import MediaFrame from '@/components/ui/MediaFrame.vue'

defineProps({
  project: { type: Object, required: true },
})
</script>

<template>
  <a
    :href="project.href"
    target="_blank"
    rel="noopener noreferrer"
    data-project-card
    class="group flex flex-col border border-rule bg-night-soft transition-colors duration-500 hover:border-ember/45"
  >
    <MediaFrame
      :src="project.image"
      :alt="`Visual do projeto ${project.title.replace('\n', ' ')}`"
      :glyph="project.glyph"
      class="aspect-[4/5] w-full"
    />

    <div class="flex flex-1 flex-col gap-4 p-6">
      <span class="font-mono text-[11px] tracking-[0.2em] text-ember">{{ project.index }}</span>

      <h3 class="font-mono text-base leading-snug whitespace-pre-line text-cream">
        {{ project.title }}
      </h3>

      <p class="body-mono text-[12px]">{{ project.summary }}</p>

      <div class="mt-auto flex items-center justify-between gap-4 pt-4">
        <ul class="flex flex-wrap gap-x-4 gap-y-1">
          <li
            v-for="tag in project.tags"
            :key="tag"
            class="font-mono text-[10px] tracking-[0.16em] text-cream-faint uppercase"
          >
            {{ tag }}
          </li>
        </ul>

        <span
          class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-rule text-cream transition-all duration-500 group-hover:border-ember group-hover:bg-ember group-hover:text-night"
          aria-hidden="true"
        >
          →
        </span>
      </div>
    </div>
  </a>
</template>
