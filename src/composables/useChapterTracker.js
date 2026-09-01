import { nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
import { ScrollTrigger, gsap } from '@/motion/gsap'

export function useChapterTracker(chapters) {
  const activeIndex = ref(0)
  let ctx = null

  onMounted(async () => {
    await nextTick()

    ctx = gsap.context(() => {
      chapters.forEach((chapter, position) => {
        const element = document.getElementById(chapter.id)
        if (!element) return

        ScrollTrigger.create({
          trigger: element,
          start: 'top 55%',
          end: 'bottom 55%',
          onToggle: (self) => {
            if (self.isActive) activeIndex.value = position
          },
        })
      })
    })
  })

  onBeforeUnmount(() => {
    ctx?.revert()
    ctx = null
  })

  return { activeIndex }
}
