<script setup>
import { profile, volunteering } from '@/data/profile'
import AppSection from '@/components/ui/AppSection.vue'
import ArrowIcon from '@/components/ui/ArrowIcon.vue'

const facts = [
  { term: 'Localização', value: profile.location },
  { term: 'Formação', value: 'ADS no Senac Tubarão' },
  { term: 'Arquitetura', value: 'Clean Architecture, DDD, SOLID, Hexagonal' },
  { term: 'Foco', value: 'Back-end, integrações e automação de processos' },
  { term: 'Idiomas', value: 'Português · Inglês técnico' },
]
</script>

<template>
  <AppSection id="sobre" index="03" title="Sobre">
    <div class="grid gap-12 lg:grid-cols-[1fr_auto]">
      <div class="flex max-w-2xl flex-col gap-6">
        <p
          v-for="(paragraph, index) in profile.bio"
          :key="index"
          data-reveal
          class="text-base leading-relaxed text-pretty text-ink-muted sm:text-lg"
        >
          {{ paragraph }}
        </p>

        <div data-reveal class="mt-4 flex flex-col gap-4">
          <h3 class="label-mono">Voluntariados</h3>

          <ul class="flex flex-col gap-2">
            <li v-for="item in volunteering" :key="item.id">
              <component
                :is="item.href ? 'a' : 'div'"
                v-bind="
                  item.href
                    ? { href: item.href, target: '_blank', rel: 'noopener noreferrer' }
                    : {}
                "
                class="group/vol flex flex-col gap-2 rounded-xl border border-line bg-surface px-5 py-4 transition-colors duration-300"
                :class="item.href ? 'hover:border-accent/40' : ''"
              >
                <span class="flex items-center gap-4">
                  <span
                    class="h-1.5 w-1.5 shrink-0 rounded-full bg-accent/60"
                    aria-hidden="true"
                  ></span>

                  <span class="text-sm font-medium text-ink">{{ item.name }}</span>

                  <span
                    class="ml-auto shrink-0 rounded-full border border-line bg-surface-raised px-2.5 py-1 font-mono text-[9px] tracking-[0.15em] text-ink-faint uppercase"
                  >
                    {{ item.role }}
                  </span>

                  <ArrowIcon
                    v-if="item.href"
                    class="h-4 w-4 shrink-0 text-ink-faint transition-all duration-300 group-hover/vol:translate-x-0.5 group-hover/vol:text-accent"
                  />
                </span>

                <span
                  v-if="item.description"
                  class="pl-[1.625rem] text-sm leading-relaxed text-ink-muted"
                >
                  {{ item.description }}
                </span>
              </component>
            </li>
          </ul>
        </div>
      </div>

      <dl class="flex flex-col gap-px self-start overflow-hidden rounded-2xl border border-line bg-line lg:w-64">
        <div
          v-for="fact in facts"
          :key="fact.term"
          data-reveal
          class="flex flex-col gap-1.5 bg-surface p-5 transition-colors duration-300 hover:bg-surface-raised"
        >
          <dt class="label-mono">{{ fact.term }}</dt>
          <dd class="text-sm text-ink-muted">{{ fact.value }}</dd>
        </div>
      </dl>
    </div>
  </AppSection>
</template>
