<script setup>
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { content, findProject, nextProject } from '@/i18n'
import SiteFooter from '@/components/layout/SiteFooter.vue'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import ScribbleUnderline from '@/components/ui/ScribbleUnderline.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const route = useRoute()
const c = content
const rootRef = ref(null)
let ctx = null

const project = computed(() => findProject(String(route.params.id)))
const next = computed(() => nextProject(String(route.params.id)))

const facts = computed(() => {
  if (!project.value) return []

  return [
    { label: c.value.project.product, value: project.value.product },
    { label: c.value.project.kind, value: project.value.kind },
    { label: c.value.project.role, value: project.value.role },
    { label: c.value.project.stack, value: project.value.tech.join(' · ') },
    { label: c.value.project.year, value: project.value.year },
  ].filter((fact) => Boolean(fact.value))
})

const chapters = computed(() => {
  if (!project.value) return []

  return [
    { id: 'problema', title: c.value.case.problem, text: project.value.story.problem },
    { id: 'solucao', title: c.value.case.solution, text: project.value.story.solution },
    { id: 'processo', title: c.value.case.process, text: project.value.story.process },
    { id: 'interface', title: c.value.case.interface, text: project.value.story.interface },
  ].filter((chapter) => chapter.text.trim().length > 0)
})

const results = computed(() => project.value?.story.results ?? [])

const setupMotion = () => {
  ctx?.revert()
  ctx = null

  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-case-line]', { yPercent: 110, duration: 1.1, ease: 'expo.out', delay: 0.12 })
    gsap.from('[data-case-reveal]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.07,
      ease: 'expo.out',
      delay: 0.32,
    })

    gsap.utils.toArray('[data-case-block]', rootRef.value).forEach((block) => {
      gsap.from(block, {
        opacity: 0,
        y: 30,
        duration: 0.9,
        ease: 'expo.out',
        scrollTrigger: { trigger: block, start: 'top 82%', once: true },
      })
    })
  }, rootRef.value)
}

onMounted(setupMotion)
watch(() => route.params.id, () => requestAnimationFrame(setupMotion))

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <div ref="rootRef" class="paper-grain">
    <main v-if="project">
      <section class="px-6 pt-36 pb-14 sm:px-10 sm:pt-44">
        <RouterLink
          data-case-reveal
          :to="{ name: 'home', hash: '#projetos' }"
          data-cursor="link"
          :data-cursor-label="c.ui.back"
          class="link-hand transition-colors duration-300 hover:text-teal"
        >
          ← {{ c.project.allProjects }}
        </RouterLink>

        <p data-case-reveal class="mt-12 flex items-center gap-3">
          <span class="font-mono text-[11px] tracking-[0.18em] text-brick">{{ project.index }}</span>
          <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
          <span class="meta">{{ project.kind }} · {{ project.product }}</span>
        </p>

        <h1 class="display mt-8 text-[clamp(2.2rem,6vw,4.6rem)] leading-[1.06] text-ink">
          <span class="block overflow-hidden"><span data-case-line class="block">{{ project.title }}</span></span>
        </h1>

        <ScribbleUnderline data-case-reveal class="mt-3 max-w-md" />

        <p data-case-reveal class="body-mono mt-8 max-w-xl text-[14px]">{{ project.summary }}</p>
      </section>

      <section class="px-6 sm:px-10">
        <PhotoFrame
          bare
          data-case-reveal
          :src="project.image"
          :alt="project.product"
          class="aspect-[16/10] w-full"
        />
      </section>

      <section class="px-6 sm:px-10">
        <dl class="mt-14 grid gap-8 border-t border-rule pt-8 sm:grid-cols-2 lg:grid-cols-5">
          <div v-for="fact in facts" :key="fact.label" data-case-reveal class="flex flex-col gap-2">
            <dt class="meta">{{ fact.label }}</dt>
            <dd class="body-mono text-[12px] text-ink">{{ fact.value }}</dd>
          </div>
        </dl>
      </section>

      <section v-if="chapters.length" class="mt-20 px-6 sm:px-10">
        <article
          v-for="chapter in chapters"
          :key="chapter.id"
          data-case-block
          class="grid gap-6 border-t border-rule py-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12"
        >
          <h2 class="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.05] text-ink">
            {{ chapter.title }}
          </h2>
          <p class="body-mono max-w-2xl text-[14px]">{{ chapter.text }}</p>
        </article>
      </section>

      <section v-if="results.length" class="px-6 sm:px-10">
        <div data-case-block class="grid gap-6 border-t border-rule py-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-12">
          <h2 class="display text-[clamp(1.5rem,2.6vw,2.1rem)] leading-[1.05] text-ink">{{ c.case.results }}</h2>
          <ul class="flex flex-col gap-3">
            <li v-for="item in results" :key="item" class="body-mono flex gap-3 text-[14px]">
              <span class="text-brick" aria-hidden="true">·</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>
      </section>

      <section v-if="project.gallery.length" class="mt-10 flex flex-col gap-6 px-6 sm:px-10">
        <PhotoFrame
          v-for="(image, position) in project.gallery"
          :key="image"
          bare
          data-case-block
          :src="image"
          :alt="`${project.product} ${position + 1}`"
          class="aspect-[16/10] w-full"
        />
      </section>

      <section v-if="project.href" class="mt-16 px-6 sm:px-10">
        <a
          data-case-block
          :href="project.href"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="external"
          class="link-hand transition-colors duration-300 hover:text-teal"
        >
          {{ c.project.repo }}
          <HandArrow />
        </a>
      </section>

      <section v-if="next" class="mt-24 border-t border-rule bg-paper-2">
        <RouterLink
          :to="{ name: 'projeto', params: { id: next.id } }"
          data-cursor="link"
          :data-cursor-label="c.ui.viewCase"
          class="group block px-6 py-20 sm:px-10 sm:py-24"
        >
          <span class="meta">{{ c.project.nextProject }}</span>
          <span
            class="display mt-5 block text-[clamp(1.9rem,4.4vw,3.4rem)] leading-[1.02] text-ink transition-colors duration-500 group-hover:text-teal"
          >
            {{ next.title }}
            <span class="inline-block text-brick transition-transform duration-500 group-hover:translate-x-3">→</span>
          </span>
          <span class="meta mt-3 block">{{ next.product }}</span>
        </RouterLink>
      </section>
    </main>

    <SiteFooter />
  </div>
</template>
