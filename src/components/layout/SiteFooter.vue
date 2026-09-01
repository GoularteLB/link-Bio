<script setup>
import { profile } from '@/data/profile'
import SocialIcon from '@/components/ui/SocialIcon.vue'

const footerLinks = [
  { id: 'github', label: 'GitHub', icon: 'github', href: 'https://github.com/GoularteLB' },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    icon: 'linkedin',
    href: 'https://www.linkedin.com/in/lucas-goularte-desenv/',
  },
  { id: 'email', label: 'E-mail', icon: 'email', href: `mailto:${profile.email}` },
]

const year = new Date().getFullYear()
</script>

<template>
  <footer id="contato" class="scroll-mt-24 border-t border-rule px-6 py-20 sm:px-10">
    <div class="grid gap-14 lg:grid-cols-[0.8fr_1.2fr_0.8fr_0.8fr] lg:gap-10">
      <div class="flex flex-col justify-between gap-10">
        <div class="flex flex-col gap-2" aria-hidden="true">
          <span class="h-px w-6 bg-rule"></span>
          <span class="h-px w-6 bg-rule"></span>
          <span class="h-px w-6 bg-rule"></span>
        </div>

        <p class="font-mono text-[11px] leading-[2] tracking-[0.2em] text-cream-dim uppercase">
          Vamos<br />criar algo<br />incrível?
        </p>
      </div>

      <div class="flex flex-col justify-end gap-8">
        <p class="max-w-xs font-mono text-lg leading-relaxed text-cream">
          Envie uma mensagem e vamos conversar.
        </p>

        <a
          :href="`mailto:${profile.email}`"
          class="link-underline w-fit font-mono text-[11px] tracking-[0.2em] text-cream uppercase transition-colors duration-300 hover:text-ember"
        >
          Falar comigo
          <span class="text-ember">→</span>
        </a>
      </div>

      <ul class="flex flex-col justify-end gap-4">
        <li v-for="link in footerLinks" :key="link.id">
          <a
            :href="link.href"
            :target="link.icon === 'email' ? undefined : '_blank'"
            :rel="link.icon === 'email' ? undefined : 'noopener noreferrer'"
            class="group flex items-center gap-4 text-cream-dim transition-colors duration-300 hover:text-cream"
          >
            <SocialIcon :name="link.icon" />
            <span class="link-underline font-mono text-[11px] tracking-[0.18em] uppercase">
              {{ link.label }}
            </span>
          </a>
        </li>
      </ul>

      <div class="flex flex-col items-start gap-5 lg:items-end lg:text-right">
        <p class="display text-5xl text-cream">LG<span class="text-ember">.</span></p>
        <p class="font-mono text-[10px] leading-[2] tracking-[0.16em] text-cream-faint uppercase">
          © {{ year }} {{ profile.name }}<br />Feito com café em Santa Catarina
        </p>
      </div>
    </div>
  </footer>
</template>
