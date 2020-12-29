import { ReactNode } from 'react'

interface LayoutRootState {
  innerLayer: null | ReactNode
  popup: null | ReactNode
  picker: null | ReactNode
  keyboard: null | ReactNode
  modal: null | ReactNode
  toast: null | ReactNode
  nProgress: null | ReactNode
}

enum LayoutRootType {
  INNER_LAYER = 'innerLayer',
  POPUP = 'popup',
  PICKER = 'picker',
  KEYBOARD = 'keyboard', // 和 picker 平级
  MODAL = 'modal',
  TOAST = 'toast',
  N_PROGRESS = 'nProgress',
}

interface LayoutRootStaticsTypes {
  setComponent: (type: LayoutRootType, com: null | ReactNode) => void
  removeComponent: (type: LayoutRootType) => void
  renderWith: (
    type: LayoutRootType,
    Component: null | ReactNode,
    options?: object
  ) => void
  hideWith: (type: LayoutRootType) => void
  Type: any
}

interface CBMapType {
  [propName: string]: (
    type: LayoutRootType,
    component: null | ReactNode
  ) => void
}

export type { LayoutRootState, CBMapType, LayoutRootStaticsTypes }
export { LayoutRootType }
