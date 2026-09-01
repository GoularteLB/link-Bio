import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '@/motion/gsap'

export function useScrollProgress() {
  const progress = ref(0)
  let ctx = null

  onMounted(async () => {
    await nextTick()

    ctx = gsap.context(() => {
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          progress.value = self.progress
        },
      })
    })
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  return { progress }
}
