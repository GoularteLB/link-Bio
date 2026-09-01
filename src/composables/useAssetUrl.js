export function assetUrl(fileName) {
  if (!fileName) return ''
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '')
  return `${base}/images/${fileName}`
}
