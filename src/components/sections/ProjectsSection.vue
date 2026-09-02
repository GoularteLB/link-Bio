<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '@/i18n'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import CircleMark from '@/components/ui/CircleMark.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
const trackRef = ref(null)
let ctx = null

const scrollBy = (direction) => {
  const track = trackRef.value
  if (!track) return
  const card = track.querySelector('[data-card]')
  const step = card ? card.offsetWidth + 20 : 320
  track.scrollBy({ left: step * direction, behavior: 'smooth' })
}

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-projects-reveal]', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 78%', once: true },
    })

    gsap.from('[data-card]', {
      opacity: 0,
      y: 34,
      duration: 0.9,
      stagger: 0.08,
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
    id="projetos"
    ref="rootRef"
    class="scroll-mt-24 border-t border-rule px-6 py-24 sm:px-10 sm:py-28"
  >
    <div class="flex items-start justify-between gap-6">
      <p data-projects-reveal class="flex items-center gap-3">
        <span class="font-mono text-[11px] tracking-[0.18em] text-brick">03</span>
        <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
        <span class="meta">{{ c.projects.eyebrow }}</span>
      </p>

      <div data-projects-reveal class="flex gap-2 lg:hidden">
        <button
          v-for="dir in [-1, 1]"
          :key="dir"
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          :aria-label="dir === -1 ? c.projects.prev : c.projects.next"
          @click="scrollBy(dir)"
        >
          {{ dir === -1 ? '←' : '→' }}
        </button>
      </div>
    </div>

    <h2 data-projects-reveal class="display mt-10 text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] text-ink">
      {{ c.projects.heading[0] }}<br />
      <CircleMark color="text-brick" class="mt-1 inline-block">
        <span>{{ c.projects.heading[1] }}</span>
      </CircleMark>
    </h2>

    <div
      ref="trackRef"
      class="mt-14 flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4 lg:grid lg:grid-cols-5 lg:gap-5 lg:overflow-visible lg:pb-0"
      style="scrollbar-width: thin"
    >
      <article
        v-for="project in c.projectList"
        :key="project.id"
        data-card
        class="group flex w-[15rem] shrink-0 snap-start flex-col gap-4 sm:w-[16.5rem] lg:w-auto"
      >
        <component
          :is="project.comingSoon ? 'div' : RouterLink"
          v-bind="
            project.comingSoon
              ? {}
              : {
                  to: { name: 'projeto', params: { id: project.id } },
                }
          "
          class="block overflow-hidden"
        >
          <PhotoFrame
            :src="project.image"
            :alt="project.comingSoon ? '' : project.product"
            class="aspect-[4/3] w-full border border-rule transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.03]"
          />
        </component>

        <div class="flex flex-wrap items-center gap-x-3 gap-y-2">
          <span
            class="border border-rule px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-ink-soft uppercase"
          >
            {{ project.kind }}
          </span>
          <span v-if="!project.comingSoon" class="meta">{{ project.product }}</span>
        </div>

        <h3 class="font-mono text-[13px] font-medium tracking-[0.1em] text-ink uppercase">
          {{ project.title }}
        </h3>

        <p class="body-mono text-[12px]">{{ project.summary }}</p>

        <RouterLink
          v-if="!project.comingSoon"
          :to="{ name: 'projeto', params: { id: project.id } }"
          class="link-hand mt-auto pt-2 text-[10px] transition-colors duration-300 group-hover:text-teal"
        >
          {{ c.projects.viewProject }}
          <span class="text-brick transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
        </RouterLink>

        <span v-else class="hand mt-auto pt-2 text-xl text-teal">{{ c.projects.soon }}</span>
      </article>
    </div>

    <a
      data-projects-reveal
      :href="c.profile.allProjectsHref"
      target="_blank"
      rel="noopener noreferrer"
      class="link-hand mt-14 transition-colors duration-300 hover:text-teal"
    >
      {{ c.projects.allRepos }}
      <HandArrow />
    </a>
  </section>
</template>
