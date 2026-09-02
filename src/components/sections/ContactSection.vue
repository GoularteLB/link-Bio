<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { content } from '@/i18n'
import CircleMark from '@/components/ui/CircleMark.vue'
import CircularBadge from '@/components/ui/CircularBadge.vue'
import ValueIcon from '@/components/ui/ValueIcon.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const c = content
const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-contact-line]', {
      yPercent: 110,
      duration: 1.05,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 72%', once: true },
    })

    gsap.from('[data-contact-reveal]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.08,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 68%', once: true },
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
    id="contato"
    ref="rootRef"
    class="scroll-mt-24 border-t border-rule px-6 py-24 sm:px-10 sm:py-28"
  >
    <p data-contact-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">07</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">{{ c.contact.eyebrow }}</span>
    </p>

    <div class="mt-14 grid gap-14 lg:grid-cols-[0.9fr_0.8fr_1.4fr_auto] lg:gap-12">
      <h2 class="display text-[clamp(2.2rem,4.4vw,3.4rem)] leading-[0.98] text-ink">
        <span
          v-for="(line, index) in c.contact.heading.slice(0, -1)"
          :key="line"
          class="block overflow-hidden"
        >
          <span data-contact-line class="block">{{ line }}</span>
        </span>
        <span class="block overflow-hidden">
          <span data-contact-line class="block">
            <CircleMark color="text-brick" class="inline-block">
              <span class="whitespace-nowrap">{{ c.contact.heading[c.contact.heading.length - 1] }}</span>
            </CircleMark>
          </span>
        </span>
      </h2>

      <div class="flex flex-col gap-6">
        <p v-for="line in c.contact.invite" :key="line" data-contact-reveal class="body-mono max-w-[22ch]">
          {{ line }}
        </p>
        <p data-contact-reveal class="body-mono text-ink">{{ c.contact.callout }}</p>
      </div>

      <ul class="flex flex-col">
        <li v-for="line in c.contactLines" :key="line.id" data-contact-reveal>
          <a
            :href="line.href"
            :target="line.id === 'email' ? undefined : '_blank'"
            :rel="line.id === 'email' ? undefined : 'noopener noreferrer'"
            class="group flex items-center gap-5 border-b border-rule py-5 transition-colors duration-300 hover:text-teal"
          >
            <span class="shrink-0 text-ink-soft transition-colors duration-300 group-hover:text-teal">
              <ValueIcon :name="line.icon" />
            </span>
            <span class="body-mono truncate text-[12px] text-ink transition-colors duration-300 group-hover:text-teal">
              {{ line.label }}
            </span>
            <span
              class="ml-auto shrink-0 text-ink-faint transition-all duration-300 group-hover:translate-x-1.5 group-hover:text-brick"
              aria-hidden="true"
            >
              →
            </span>
          </a>
        </li>
      </ul>

      <div data-contact-reveal class="flex items-start justify-center lg:pt-6">
        <CircularBadge :text="c.contact.badge" class="h-28 w-28 sm:h-32 sm:w-32" />
      </div>
    </div>

    <p class="sr-only">{{ c.profile.location }}</p>
  </section>
</template>
