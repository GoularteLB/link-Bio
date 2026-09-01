import { gsap, prefersReducedMotion } from '@/motion/gsap'

const STATE = new WeakMap()

const isEnabled = () => !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches

export const vMagnetic = {
  mounted(el, binding) {
    if (!isEnabled()) return

    const strength = Number(binding.value ?? 0.32)
    const moveX = gsap.quickTo(el, 'x', { duration: 0.6, ease: 'power3.out' })
    const moveY = gsap.quickTo(el, 'y', { duration: 0.6, ease: 'power3.out' })

    const onMove = (event) => {
      const bounds = el.getBoundingClientRect()
      moveX((event.clientX - (bounds.left + bounds.width / 2)) * strength)
      moveY((event.clientY - (bounds.top + bounds.height / 2)) * strength)
    }

    const onLeave = () => {
      moveX(0)
      moveY(0)
    }

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerleave', onLeave)
    STATE.set(el, { onMove, onLeave })
  },

  unmounted(el) {
    const handlers = STATE.get(el)
    if (!handlers) return

    el.removeEventListener('pointermove', handlers.onMove)
    el.removeEventListener('pointerleave', handlers.onLeave)
    gsap.killTweensOf(el)
    STATE.delete(el)
  },
}
