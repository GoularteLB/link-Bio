<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '@/data/profile'
import { stackItems } from '@/data/stack'
import MediaFrame from '@/components/ui/MediaFrame.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const rootRef = ref(null)
const openId = ref('')
let ctx = null

const toggle = (id) => {
  openId.value = openId.value === id ? '' : id
}

const onEnter = (el, done) => {
  gsap.set(el, { height: 0, opacity: 0, overflow: 'hidden' })
  gsap.to(el, {
    height: 'auto',
    opacity: 1,
    duration: 0.45,
    ease: 'power3.out',
    onComplete: () => {
      gsap.set(el, { clearProps: 'height,overflow' })
      done()
    },
  })
}

const onLeave = (el, done) => {
  gsap.to(el, {
    height: 0,
    opacity: 0,
    overflow: 'hidden',
    duration: 0.3,
    ease: 'power2.in',
    onComplete: done,
  })
}

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-about-reveal]', {
      opacity: 0,
      y: 24,
      duration: 0.9,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 74%', once: true },
    })

    gsap.from('[data-stack-row]', {
      opacity: 0,
      x: 24,
      duration: 0.7,
      stagger: 0.06,
      ease: 'expo.out',
      scrollTrigger: { trigger: '[data-stack-list]', start: 'top 82%', once: true },
    })
  }, rootRef.value)
})

onBeforeUnmount(() => {
  ctx?.revert()
  ctx = null
})
</script>

<template>
  <section ref="rootRef" class="border-t border-rule">
    <div class="grid lg:grid-cols-[1fr_0.9fr_1.1fr]">
      <div id="sobre" class="flex scroll-mt-24 flex-col justify-center px-6 py-20 sm:px-10">
        <h2 data-about-reveal class="display text-[clamp(1.6rem,3vw,2.1rem)] text-cream">
          Sobre mim
        </h2>

        <span data-about-reveal class="mt-5 h-px w-9 bg-ember" aria-hidden="true"></span>

        <p data-about-reveal class="body-mono mt-7 max-w-sm">
          {{ profile.aboutText }}
        </p>

        <p
          data-about-reveal
          class="mt-10 text-3xl text-ember"
          style="font-family: var(--font-script)"
        >
          {{ profile.name }}
        </p>

        <a
          data-about-reveal
          href="#contato"
          class="link-underline mt-12 w-fit font-mono text-[11px] tracking-[0.2em] text-cream-dim uppercase transition-colors duration-300 hover:text-cream"
        >
          Saiba mais
          <span class="text-ember">→</span>
        </a>
      </div>

      <MediaFrame
        :src="profile.aboutPortrait"
        :alt="`Retrato de ${profile.name}`"
        origin="42% 26%"
        class="min-h-[22rem] w-full lg:min-h-full"
      />

      <div
        id="stack"
        data-stack-list
        class="flex scroll-mt-24 flex-col justify-center border-t border-rule px-6 py-20 sm:px-10 lg:border-t-0 lg:border-l"
      >
        <h2 class="display flex items-center gap-4 text-[clamp(1.6rem,3vw,2.1rem)] text-cream">
          Stack
          <span class="h-px w-9 bg-ember" aria-hidden="true"></span>
        </h2>

        <ul class="mt-10 flex flex-col">
          <li v-for="(item, index) in stackItems" :key="item.id" data-stack-row>
            <button
              type="button"
              class="flex w-full items-center gap-5 border-b border-rule py-3.5 text-left transition-colors duration-300 hover:text-cream"
              :aria-expanded="openId === item.id"
              :aria-controls="`stack-${item.id}`"
              @click="toggle(item.id)"
            >
              <span class="font-mono text-[11px] text-ember">
                {{ String(index + 1).padStart(2, '0') }}
              </span>
              <span class="font-mono text-[13px] tracking-[0.08em] text-cream uppercase">
                {{ item.name }}
              </span>
              <span
                class="ml-auto font-mono text-sm text-cream-faint transition-transform duration-300"
                :class="openId === item.id ? 'rotate-45' : ''"
                aria-hidden="true"
              >
                +
              </span>
            </button>

            <Transition :css="false" @enter="onEnter" @leave="onLeave">
              <p v-if="openId === item.id" :id="`stack-${item.id}`" class="body-mono py-4 pl-10">
                {{ item.detail }}
              </p>
            </Transition>
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
