import { onBeforeUnmount, onMounted } from 'vue'
import { SplitText, gsap, prefersReducedMotion } from '@/motion/gsap'

export function useHeroMotion(rootRef) {
  let ctx = null
  let split = null

  onMounted(async () => {
    if (prefersReducedMotion()) return
    if (document.fonts?.ready) await document.fonts.ready

    const root = rootRef.value
    if (!root) return

    ctx = gsap.context(() => {
      const heading = root.querySelector('[data-hero-title]')
      split = heading ? new SplitText(heading, { type: 'chars', mask: 'chars' }) : null

      const timeline = gsap.timeline({ defaults: { ease: 'power4.out' } })

      timeline
        .from('[data-hero-meta] > *', { opacity: 0, y: 12, stagger: 0.1, duration: 0.7 })
        .from(
          split?.chars ?? '[data-hero-title]',
          { yPercent: 115, stagger: 0.026, duration: 1 },
          '-=0.35',
        )
        .from('[data-hero-role]', { opacity: 0, y: 14, duration: 0.8 }, '-=0.65')
        .from('[data-hero-tagline]', { opacity: 0, y: 16, duration: 0.8 }, '-=0.7')
        .from('[data-hero-actions] > *', { opacity: 0, y: 16, stagger: 0.09 }, '-=0.65')
        .from('[data-hero-marquee]', { opacity: 0, duration: 1 }, '-=0.5')

      gsap.to('[data-hero-inner]', {
        yPercent: -14,
        opacity: 0.15,
        ease: 'none',
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom top',
          scrub: 0.6,
        },
      })
    }, root)
  })

  onBeforeUnmount(() => {
    split?.revert()
    ctx?.revert()
    split = null
    ctx = null
  })
}
