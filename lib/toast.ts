export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastPayload {
  id: string
  message: string
  type: ToastType
}

export function toast(message: string, type: ToastType = 'success') {
  if (typeof window === 'undefined') return
  const id = crypto.randomUUID()
  window.dispatchEvent(
    new CustomEvent<ToastPayload>('studyhub:toast', { detail: { id, message, type } })
  )
}
