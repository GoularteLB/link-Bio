import { onBeforeUnmount, onMounted } from 'vue'
import { gsap, ScrollTrigger, prefersReducedMotion } from '@/motion/gsap'

export function useScrollReveal(rootRef, options = {}) {
  const { selector = '[data-reveal]', y = 26, stagger = 0.08, start = 'top 88%' } = options
  let ctx = null

  onMounted(() => {
    const root = rootRef.value
    if (!root) return

    const targets = gsap.utils.toArray(selector, root)
    if (targets.length === 0) return

    if (prefersReducedMotion()) return

    ctx = gsap.context(() => {
      gsap.set(targets, { opacity: 0, y })

      ScrollTrigger.batch(targets, {
        start,
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger,
            overwrite: true,
          }),
      })
    }, root)
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })
}
