import { gsap, prefersReducedMotion } from '@/motion/gsap'

const STATE = new WeakMap()

const isEnabled = () => !prefersReducedMotion() && window.matchMedia('(pointer: fine)').matches

export const vTilt = {
  mounted(el, binding) {
    if (!isEnabled()) return

    const max = Number(binding.value ?? 5)
    gsap.set(el, { transformPerspective: 900, transformStyle: 'preserve-3d' })

    const rotateX = gsap.quickTo(el, 'rotationX', { duration: 0.7, ease: 'power3.out' })
    const rotateY = gsap.quickTo(el, 'rotationY', { duration: 0.7, ease: 'power3.out' })

    const onMove = (event) => {
      const bounds = el.getBoundingClientRect()
      const px = (event.clientX - bounds.left) / bounds.width - 0.5
      const py = (event.clientY - bounds.top) / bounds.height - 0.5
      rotateX(-py * max * 2)
      rotateY(px * max * 2)
    }

    const onLeave = () => {
      rotateX(0)
      rotateY(0)
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
