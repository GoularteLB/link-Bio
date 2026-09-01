import { onBeforeUnmount, onMounted } from 'vue'
import { ScrollSmoother, prefersReducedMotion } from '@/motion/gsap'

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
