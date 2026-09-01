<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { profile } from '@/data/profile'
import HandArrow from '@/components/ui/HandArrow.vue'
import ScribbleUnderline from '@/components/ui/ScribbleUnderline.vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

const rootRef = ref(null)
let ctx = null

onMounted(() => {
  if (prefersReducedMotion() || !rootRef.value) return

  ctx = gsap.context(() => {
    gsap.from('[data-contact-reveal]', {
      opacity: 0,
      y: 26,
      duration: 0.9,
      stagger: 0.09,
      ease: 'expo.out',
      scrollTrigger: { trigger: rootRef.value, start: 'top 76%', once: true },
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
    class="scroll-mt-24 border-t border-rule bg-paper-2 px-6 py-24 sm:px-10 sm:py-28"
  >
    <p data-contact-reveal class="flex items-center gap-3">
      <span class="font-mono text-[11px] tracking-[0.18em] text-brick">04</span>
      <span class="h-px w-6 bg-ink-faint" aria-hidden="true"></span>
      <span class="meta">Vamos criar algo juntos?</span>
    </p>

    <div class="mt-14 grid gap-12 lg:grid-cols-[1.2fr_1fr_0.7fr] lg:gap-12">
      <div>
        <h2 data-contact-reveal class="display text-[clamp(1.9rem,4vw,3rem)] leading-[1.05] text-ink">
          Tem uma ideia?<br />
          <span class="text-teal">Vamos tirar do papel.</span>
        </h2>
        <ScribbleUnderline data-contact-reveal class="mt-3 max-w-md" />
      </div>

      <div class="flex flex-col gap-9">
        <p data-contact-reveal class="body-mono max-w-xs text-[14px]">
          Estou sempre aberto a novos projetos, parcerias e boas conversas.
        </p>

        <a
          data-contact-reveal
          :href="`mailto:${profile.email}`"
          class="link-hand w-fit transition-colors duration-300 hover:text-teal"
        >
          Chamar no e-mail
          <HandArrow />
        </a>
      </div>

      <div data-contact-reveal class="flex flex-col gap-3">
        <span class="meta">Localização</span>
        <span class="body-mono text-[13px]">{{ profile.location }}</span>

        <svg viewBox="0 0 80 80" class="mt-4 h-16 w-16 text-ink-soft" fill="none" stroke="currentColor" stroke-width="1" aria-hidden="true">
          <circle cx="40" cy="40" r="30" />
          <ellipse cx="40" cy="40" rx="13" ry="30" />
          <path d="M10 40h60M16 25h48M16 55h48" />
          <circle cx="52" cy="30" r="3.4" fill="currentColor" stroke="none" class="text-brick" />
        </svg>
      </div>
    </div>
  </section>
</template>
