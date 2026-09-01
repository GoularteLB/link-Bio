import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { gsap, ScrollTrigger } from '@/motion/gsap'

export function useActiveSection(sectionIds) {
  const activeId = ref(sectionIds[0] ?? '')
  let ctx = null

  onMounted(async () => {
    await nextTick()

    ctx = gsap.context(() => {
      sectionIds.forEach((id) => {
        const element = document.getElementById(id)
        if (!element) return

        ScrollTrigger.create({
          trigger: element,
          start: 'top 45%',
          end: 'bottom 45%',
          onToggle: (self) => {
            if (self.isActive) activeId.value = id
          },
        })
      })
    })
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  return { activeId }
}
