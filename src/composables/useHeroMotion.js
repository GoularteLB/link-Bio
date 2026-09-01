import { onBeforeUnmount, onMounted } from 'vue'
import { SplitText, gsap, prefersReducedMotion } from '@/motion/gsap'

export function useHeroMotion(rootRef, options = {}) {
  const { delay = 0 } = options
  let ctx = null
  let splits = []

  onMounted(async () => {
    if (prefersReducedMotion()) return
    if (document.fonts?.ready) await document.fonts.ready

    const root = rootRef.value
    if (!root) return

    ctx = gsap.context(() => {
      const lines = gsap.utils.toArray('[data-hero-line]', root)
      splits = lines.map((line) => new SplitText(line, { type: 'chars', mask: 'chars' }))
      const chars = splits.flatMap((split) => split.chars)

      gsap
        .timeline({ delay, defaults: { ease: 'expo.out' } })
        .from(chars, { yPercent: 115, duration: 1.1, stagger: 0.025 })
        .from('[data-hero-item]', { opacity: 0, y: 18, duration: 0.85, stagger: 0.12 }, '-=0.75')

      gsap.to('[data-hero-inner]', {
        yPercent: -12,
        opacity: 0.2,
        ease: 'none',
        scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: 0.6 },
      })
    }, root)
  })

  onBeforeUnmount(() => {
    splits.forEach((split) => split.revert())
    splits = []
    ctx?.revert()
    ctx = null
  })
}
