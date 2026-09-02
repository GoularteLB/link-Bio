<script setup>
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { content, openProjects } from '@/i18n'
import PhotoFrame from '@/components/ui/PhotoFrame.vue'
import ScribbleUnderline from '@/components/ui/ScribbleUnderline.vue'
import HandArrow from '@/components/ui/HandArrow.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
const visualRef = ref(null)
const active = ref(0)
let ctx = null

const project = computed(() => openProjects.value[active.value] ?? openProjects.value[0])
const hasResults = computed(() => project.value.story.results.length > 0)

const select = (index) => {
  if (index === active.value) return
  active.value = index

  if (prefersReducedMotion() || !visualRef.value) return
  gsap.fromTo(
    visualRef.value,
    { opacity: 0, y: 18, rotate: -4 },
    { opacity: 1, y: 0, rotate: -7, duration: 0.8, ease: 'expo.out' },
  )
}

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-case-reveal]', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 76%', once: true },
    })

    gsap.from(visualRef.value, {
      opacity: 0,
      y: 40,
      rotate: -14,
      duration: 1.2,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 72%', once: true },
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
    id="case"
    ref="rootRef"
    class="scroll-mt-24 overflow-hidden border-t border-rule bg-paper-2 px-6 py-24 sm:px-10 sm:py-28"
  >
    <p data-case-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">04</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">{{ c.case.eyebrow }}</span>
    </p>

    <div class="mt-12 grid items-center gap-12 lg:grid-cols-[0.95fr_1.2fr_0.95fr_auto] lg:gap-10">
      <div class="flex flex-col gap-6">
        <div data-case-reveal class="flex items-start gap-4">
          <h2 class="display text-[clamp(1.7rem,2.8vw,2.3rem)] leading-[1.05] text-ink">
            {{ project.title }}
          </h2>
          <HandArrow class="mt-3 hidden shrink-0 lg:block" />
        </div>

        <p data-case-reveal class="meta">{{ project.product }}</p>

        <p data-case-reveal class="body-mono max-w-xs">{{ project.summary }}</p>

        <div v-if="project.story.problem" data-case-reveal class="flex flex-col gap-3">
          <span class="meta">{{ c.case.problem }}</span>
          <p class="body-mono max-w-xs text-[12px]">{{ project.story.problem }}</p>
        </div>
      </div>

      <div class="relative flex flex-col items-center">
        <div ref="visualRef" class="case-visual w-full max-w-[34rem]">
          <PhotoFrame
            bare
            :src="project.image"
            :alt="project.product"
            class="aspect-[4/3] w-full"
          />
        </div>
        <ScribbleUnderline class="-mt-2 w-3/5 opacity-70" />
      </div>

      <div class="flex flex-col gap-8">
        <div v-if="project.story.solution" data-case-reveal class="flex flex-col gap-3">
          <span class="meta">{{ c.case.solution }}</span>
          <p class="body-mono max-w-xs text-[12px]">{{ project.story.solution }}</p>
        </div>

        <div v-if="hasResults" data-case-reveal class="flex flex-col gap-3">
          <span class="meta">{{ c.case.results }}</span>
          <ul class="flex flex-col gap-2">
            <li
              v-for="item in project.story.results"
              :key="item"
              class="body-mono flex gap-3 text-[12px]"
            >
              <span class="text-brick" aria-hidden="true">·</span>
              <span>{{ item }}</span>
            </li>
          </ul>
        </div>

        <p v-if="!project.story.solution && !hasResults" data-case-reveal class="body-mono max-w-xs text-[12px]">
          {{ c.case.empty }}
        </p>

        <RouterLink
          data-case-reveal
          :to="{ name: 'projeto', params: { id: project.id } }"
          class="link-hand w-fit transition-colors duration-300 hover:text-teal"
        >
          {{ c.case.full }}
          <HandArrow />
        </RouterLink>
      </div>

      <div class="flex gap-3 lg:flex-col" role="tablist" :aria-label="c.case.pick">
        <button
          v-for="(item, index) in openProjects"
          :key="item.id"
          type="button"
          role="tab"
          :aria-selected="index === active"
          :aria-label="item.title"
          class="case-dot"
          :class="{ 'is-on': index === active }"
          @click="select(index)"
        ></button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.case-visual {
  transform: rotate(-7deg);
  filter: drop-shadow(0 26px 40px rgba(23, 21, 20, 0.22));
  transition: transform 0.9s cubic-bezier(0.16, 1, 0.3, 1);
}

.case-visual:hover {
  transform: rotate(-4deg) translateY(-6px);
}

.case-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1px solid var(--color-ink-faint);
  background: transparent;
  transition:
    background 0.35s ease,
    border-color 0.35s ease,
    transform 0.35s cubic-bezier(0.16, 1, 0.3, 1);
}

.case-dot:hover {
  border-color: var(--color-ink);
}

.case-dot.is-on {
  background: var(--color-brick);
  border-color: var(--color-brick);
  transform: scale(1.3);
}

@media (prefers-reduced-motion: reduce) {
  .case-visual,
  .case-visual:hover {
    transform: rotate(-4deg);
    transition: none;
  }
}
</style>
