import { onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, prefersReducedMotion } from '@/motion/gsap'

export function usePointerGlow() {
  const glowRef = ref(null)
  let onPointerMove = null

  onMounted(() => {
    const element = glowRef.value
    if (!element) return
    if (prefersReducedMotion() || !window.matchMedia('(pointer: fine)').matches) return

    const moveX = gsap.quickTo(element, 'x', { duration: 0.9, ease: 'power3.out' })
    const moveY = gsap.quickTo(element, 'y', { duration: 0.9, ease: 'power3.out' })

    gsap.set(element, { x: window.innerWidth / 2, y: window.innerHeight / 3, autoAlpha: 0 })

    let revealed = false

    onPointerMove = (event) => {
      moveX(event.clientX)
      moveY(event.clientY)

      if (revealed) return
      revealed = true
      gsap.to(element, { autoAlpha: 1, duration: 1.2 })
    }

    window.addEventListener('pointermove', onPointerMove, { passive: true })
  })

  onBeforeUnmount(() => {
    if (onPointerMove) window.removeEventListener('pointermove', onPointerMove)
    onPointerMove = null
  })

  return { glowRef }
}
