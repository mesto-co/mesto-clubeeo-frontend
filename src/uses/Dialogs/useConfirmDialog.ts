import { useDialog } from './useDialog'
import { ref } from 'vue'

export const useConfirmDialog = () => {
  const { dialog, show, hide } = useDialog()
  const confirmed = ref(false)
  const confirm = () => {
    confirmed.value = true
  }
  const cancel = () => {
    confirmed.value = false
  }

  return { dialog, show, hide, confirmed, confirm, cancel }
}
