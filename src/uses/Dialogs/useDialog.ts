import { ref } from 'vue'

export const useDialog = () => {
  const dialog = ref(false)

  const show = () => {
    dialog.value = true
  }

  const hide = () => {
    dialog.value = false
  }

  const toggle = () => {
    dialog.value = !dialog.value
  }

  return { dialog, show, hide, toggle }
}
