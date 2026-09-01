import { onBeforeUnmount, ref } from 'vue'

export function useCopyToClipboard(resetDelay = 2000) {
  const copied = ref(false)
  const failed = ref(false)
  let timer = null

  const clearTimer = () => {
    if (timer) clearTimeout(timer)
    timer = null
  }

  const schedule = () => {
    clearTimer()
    timer = setTimeout(() => {
      copied.value = false
      failed.value = false
    }, resetDelay)
  }

  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text)
      copied.value = true
      failed.value = false
    } catch {
      copied.value = false
      failed.value = true
    }
    schedule()
  }

  onBeforeUnmount(clearTimer)

  return { copied, failed, copy }
}
