import { onBeforeUnmount, onMounted } from 'vue'
import { ScrollSmoother, ScrollTrigger, gsap, prefersReducedMotion } from '@/motion/gsap'

export function useSmoothScroll() {
  let smoother = null

  onMounted(() => {
    if (prefersReducedMotion()) return
    if (!document.getElementById('smooth-wrapper')) return

    smoother = ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.1,
      effects: true,
      normalizeScroll: false,
    })
  })

  onBeforeUnmount(() => {
    smoother?.kill()
    smoother = null
  })
}

export function scrollToSection(id) {
  const target = document.getElementById(id)
  if (!target) return

  const smoother = ScrollSmoother.get?.()

  if (smoother && !prefersReducedMotion()) {
    smoother.scrollTo(target, true, 'top 80px')
    return
  }

  if (prefersReducedMotion()) {
    target.scrollIntoView()
    return
  }

  gsap.to(window, { duration: 0.9, ease: 'expo.out', scrollTo: { y: target, offsetY: 80 } })
}

export function scrollToTop() {
  const smoother = ScrollSmoother.get?.()

  if (smoother) {
    smoother.scrollTo(0, false)
    return
  }

  window.scrollTo(0, 0)
}

export const refreshScrollTriggers = () => ScrollTrigger.refresh()
