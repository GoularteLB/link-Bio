<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { allProjectsHref, projects } from '@/data/projects'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import CircleMark from '@/components/ui/CircleMark.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

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
      scrollTrigger: { trigger: rootRef.value, start: 'top 76%', once: true },
    })

    gsap.from('[data-card]', {
      opacity: 0,
      y: 34,
      duration: 0.9,
      stagger: 0.1,
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
        <span class="meta">Projetos</span>
      </p>

      <div data-projects-reveal class="flex gap-2">
        <button
          v-for="dir in [-1, 1]"
          :key="dir"
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          :aria-label="dir === -1 ? 'Projetos anteriores' : 'Próximos projetos'"
          @click="scrollBy(dir)"
        >
          {{ dir === -1 ? '←' : '→' }}
        </button>
      </div>
    </div>

    <div class="mt-12 grid gap-10 lg:grid-cols-[0.75fr_2.25fr] lg:gap-12">
      <div class="flex flex-col">
        <h2 data-projects-reveal class="display text-[clamp(1.9rem,3.6vw,2.8rem)] leading-[1.05] text-ink">
          Coisas que<br />
          <CircleMark color="text-brick" class="mt-1 inline-block"><span>já construí.</span></CircleMark>
        </h2>

        <a
          data-projects-reveal
          :href="allProjectsHref"
          target="_blank"
          rel="noopener noreferrer"
          class="link-hand mt-auto pt-14 transition-colors duration-300 hover:text-teal"
        >
          Ver todos os projetos
          <HandArrow />
        </a>
      </div>

      <div
        ref="trackRef"
        class="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-4"
        style="scrollbar-width: thin"
      >
        <article
          v-for="project in projects"
          :key="project.id"
          data-card
          class="flex w-[16rem] shrink-0 snap-start flex-col gap-4 sm:w-[17.5rem]"
        >
          <component
            :is="project.href ? 'a' : 'div'"
            v-bind="project.href ? { href: project.href, target: '_blank', rel: 'noopener noreferrer' } : {}"
            class="block"
          >
            <PhotoFrame
              :src="project.image"
              :alt="`Interface do projeto ${project.title}`"
              class="aspect-[4/3] w-full border border-rule"
            />
          </component>

          <span
            class="w-fit border border-rule px-2.5 py-1 font-mono text-[9px] tracking-[0.16em] text-ink-soft uppercase"
          >
            {{ project.kind }}
          </span>

          <h3 class="font-mono text-[13px] font-medium tracking-[0.1em] text-ink uppercase">
            {{ project.title }}
          </h3>

          <p class="body-mono text-[12px]">{{ project.summary }}</p>

          <ul class="mt-auto flex flex-wrap gap-x-4 gap-y-1 pt-2">
            <li
              v-for="item in project.tech"
              :key="item"
              class="font-mono text-[10px] tracking-[0.12em] text-ink-faint uppercase"
            >
              {{ item }}
            </li>
          </ul>
        </article>
      </div>
    </div>
  </section>
</template>
