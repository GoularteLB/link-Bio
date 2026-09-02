<script setup>
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, hasFinePointer, prefersReducedMotion } from '@/motion/gsap'
import { content } from '@/i18n'

const fallbackLabel = (kind) => {
  const ui = content.value.ui
  if (kind === 'link') return ui.view
  if (kind === 'external') return ui.open
  if (kind === 'mail') return ui.write
  return ''
}

const rootRef = ref(null)
const label = ref('')
const active = ref(false)
const visible = ref(false)

let teardown = null

onMounted(() => {
  if (!hasFinePointer() || prefersReducedMotion() || !rootRef.value) return

  const root = rootRef.value
  const moveX = gsap.quickTo(root, 'x', { duration: 0.35, ease: 'power3.out' })
  const moveY = gsap.quickTo(root, 'y', { duration: 0.35, ease: 'power3.out' })

  const onMove = (event) => {
    moveX(event.clientX)
    moveY(event.clientY)
    visible.value = true
  }

  const onOver = (event) => {
    const target = event.target.closest?.('[data-cursor]')
    if (!target) return
    const kind = target.getAttribute('data-cursor')
    label.value = target.getAttribute('data-cursor-label') || fallbackLabel(kind)
    active.value = true
  }

  const onOut = (event) => {
    const target = event.target.closest?.('[data-cursor]')
    if (!target) return
    if (event.relatedTarget && target.contains(event.relatedTarget)) return
    active.value = false
  }

  const onLeave = () => {
    visible.value = false
    active.value = false
  }

  window.addEventListener('pointermove', onMove, { passive: true })
  document.addEventListener('pointerover', onOver)
  document.addEventListener('pointerout', onOut)
  document.addEventListener('pointerleave', onLeave)
  window.addEventListener('blur', onLeave)

  document.documentElement.classList.add('has-site-cursor')

  teardown = () => {
    window.removeEventListener('pointermove', onMove)
    document.removeEventListener('pointerover', onOver)
    document.removeEventListener('pointerout', onOut)
    document.removeEventListener('pointerleave', onLeave)
    window.removeEventListener('blur', onLeave)
    document.documentElement.classList.remove('has-site-cursor')
    gsap.killTweensOf(root)
  }
})

onBeforeUnmount(() => {
  teardown?.()
  teardown = null
})
</script>

<template>
  <div
    ref="rootRef"
    class="site-cursor"
    :class="{ 'is-visible': visible, 'is-active': active }"
    aria-hidden="true"
  >
    <span class="site-cursor__dot"></span>
    <span class="site-cursor__label">{{ label }}</span>
  </div>
</template>

<style scoped>
.site-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 9999;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.25s ease;
  will-change: transform;
}

.site-cursor.is-visible {
  opacity: 1;
}

.site-cursor__dot {
  position: absolute;
  top: -4px;
  left: -4px;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--color-brick);
  transition:
    transform 0.3s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.2s ease;
}

.site-cursor.is-active .site-cursor__dot {
  transform: scale(0.55);
}

.site-cursor__label {
  position: absolute;
  top: 10px;
  left: 10px;
  display: block;
  padding: 3px 8px 4px;
  background: var(--color-brick);
  color: var(--color-paper);
  font-family: var(--font-mono);
  font-size: 9px;
  font-weight: 500;
  line-height: 1;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  white-space: nowrap;
  opacity: 0;
  transform: translateX(-4px) scale(0.9);
  transform-origin: left center;
  transition:
    opacity 0.22s ease,
    transform 0.32s cubic-bezier(0.16, 1, 0.3, 1);
}

.site-cursor.is-active .site-cursor__label {
  opacity: 1;
  transform: translateX(0) scale(1);
}
</style>

<style>
.has-site-cursor,
.has-site-cursor *:not(input):not(textarea):not(select) {
  cursor: none;
}
</style>
