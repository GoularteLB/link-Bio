const STATE = new WeakMap()

export const vSpotlight = {
  mounted(el) {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const onMove = (event) => {
      const bounds = el.getBoundingClientRect()
      el.style.setProperty('--spot-x', `${event.clientX - bounds.left}px`)
      el.style.setProperty('--spot-y', `${event.clientY - bounds.top}px`)
    }

    const onEnter = () => el.setAttribute('data-spotlight', 'on')
    const onLeave = () => el.setAttribute('data-spotlight', 'off')

    el.addEventListener('pointermove', onMove)
    el.addEventListener('pointerenter', onEnter)
    el.addEventListener('pointerleave', onLeave)
    STATE.set(el, { onMove, onEnter, onLeave })
  },

  unmounted(el) {
    const handlers = STATE.get(el)
    if (!handlers) return

    el.removeEventListener('pointermove', handlers.onMove)
    el.removeEventListener('pointerenter', handlers.onEnter)
    el.removeEventListener('pointerleave', handlers.onLeave)
    STATE.delete(el)
  },
}
