import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { ScrollToPlugin } from 'gsap/ScrollToPlugin'
import { SplitText } from 'gsap/SplitText'
import { Flip } from 'gsap/Flip'
import { Observer } from 'gsap/Observer'

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, Flip, Observer)

gsap.defaults({ ease: 'power3.out', duration: 0.9 })

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export { gsap, ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText, Flip, Observer }
