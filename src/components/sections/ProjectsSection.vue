<script setup>
import { computed, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { content } from '@/i18n'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import CircleMark from '@/components/ui/CircleMark.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const PAGE_SIZE = 3

const c = content
const rootRef = ref(null)
const trackRef = ref(null)
const page = ref(0)
const current = ref(0)
let ctx = null
let paging = false

const pageCount = computed(() => Math.ceil(c.value.projectList.length / PAGE_SIZE))
const pageOf = (index) => Math.floor(index / PAGE_SIZE)
const pageLabel = (value) => String(value + 1).padStart(2, '0')

const isDesktop = () => window.matchMedia('(min-width: 64rem)').matches

const cardsOf = (value) => trackRef.value?.querySelectorAll(`[data-card][data-page="${value}"]`) ?? []

const goTo = async (next) => {
  const target = (next + pageCount.value) % pageCount.value
  if (target === page.value || paging) return

  if (prefersReducedMotion() || !trackRef.value) {
    page.value = target
    return
  }

  paging = true
  const direction = next > page.value ? 1 : -1
  const leaving = cardsOf(page.value)

  await gsap.to(leaving, {
    opacity: 0,
    x: -28 * direction,
    duration: 0.35,
    stagger: 0.05,
    ease: 'power2.in',
  })

  page.value = target
  gsap.set(leaving, { clearProps: 'opacity,transform' })
  await nextTick()

  gsap.fromTo(
    cardsOf(target),
    { opacity: 0, x: 28 * direction },
    {
      opacity: 1,
      x: 0,
      duration: 0.8,
      stagger: 0.08,
      ease: 'expo.out',
      clearProps: 'transform',
      onComplete: () => {
        paging = false
      },
    },
  )
}

const cardStep = () => {
  const card = trackRef.value?.querySelector('[data-card]')
  return card ? card.offsetWidth + 20 : 320
}

const scrollBy = (direction) => {
  trackRef.value?.scrollBy({ left: cardStep() * direction, behavior: 'smooth' })
}

const scrollToCard = (index) => {
  trackRef.value?.scrollTo({ left: cardStep() * index, behavior: 'smooth' })
}

const onTrackScroll = () => {
  const track = trackRef.value
  if (!track || isDesktop()) return
  const atEnd = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2
  current.value = atEnd ? c.value.projectList.length - 1 : Math.round(track.scrollLeft / cardStep())
}

const step = (direction) => (isDesktop() ? goTo(page.value + direction) : scrollBy(direction))

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

      <div data-projects-reveal class="flex gap-2">
        <button
          v-for="dir in [-1, 1]"
          :key="dir"
          type="button"
          class="flex h-9 w-9 items-center justify-center rounded-full border border-rule text-ink transition-colors duration-300 hover:border-ink hover:bg-ink hover:text-paper"
          :aria-label="dir === -1 ? c.projects.prev : c.projects.next"
          @click="step(dir)"
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
      class="projects-track -mx-6 mt-14 flex snap-x snap-mandatory scroll-px-6 gap-5 overflow-x-auto overflow-y-hidden overscroll-x-contain px-6 pb-2 sm:-mx-10 sm:scroll-px-10 sm:px-10 lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:px-0 lg:pb-0"
      @scroll.passive="onTrackScroll"
    >
      <article
        v-for="(project, index) in c.projectList"
        :key="project.id"
        data-card
        :data-page="pageOf(index)"
        class="group flex w-[78vw] max-w-[20rem] shrink-0 snap-start flex-col gap-4 lg:w-auto lg:max-w-none"
        :class="{ 'lg:hidden': pageOf(index) !== page }"
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

    <div data-projects-reveal class="mt-8 flex items-center gap-4 lg:hidden">
      <div class="flex gap-2.5">
        <button
          v-for="(project, index) in c.projectList"
          :key="project.id"
          type="button"
          :aria-label="project.title"
          :aria-current="index === current ? 'true' : undefined"
          class="h-2 rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
          :class="index === current ? 'w-6 bg-brick' : 'w-2 bg-ink-faint'"
          @click="scrollToCard(index)"
        ></button>
      </div>
      <span class="font-mono text-[11px] tracking-[0.18em] text-ink-soft">
        {{ pageLabel(current) }} / {{ pageLabel(c.projectList.length - 1) }}
      </span>
    </div>

    <div
      v-if="pageCount > 1"
      data-projects-reveal
      class="mt-10 hidden items-center gap-4 lg:flex"
    >
      <button
        v-for="(_, index) in pageCount"
        :key="index"
        type="button"
        :aria-label="`${c.projects.page} ${index + 1}`"
        :aria-current="index === page ? 'page' : undefined"
        class="h-2.5 w-2.5 rounded-full border transition-all duration-300"
        :class="
          index === page
            ? 'scale-125 border-brick bg-brick'
            : 'border-ink-faint hover:border-ink'
        "
        @click="goTo(index)"
      ></button>
      <span class="font-mono text-[11px] tracking-[0.18em] text-ink-soft">
        {{ pageLabel(page) }} / {{ pageLabel(pageCount - 1) }}
      </span>
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

<style scoped>
.projects-track {
  scrollbar-width: none;
}

.projects-track::-webkit-scrollbar {
  display: none;
}
</style>
