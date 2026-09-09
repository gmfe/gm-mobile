import { ReactNode } from 'react'

type State = ReactNode

interface LayoutRootState {
  innerLayer?: State[]
  popup?: State[]
  picker?: State[]
  keyboard?: State[]
  modal?: State[]
  toast?: State[]
  nProgress?: State[]
}

// 使用 const 对象 + 联合类型替代 TS enum：Babel 的 TS 插件在跨模块以值方式
// 使用 enum 时会持续输出 scope tracker 告警（Taro 4 构建每次 100+ 条）
export const LayoutRootType = {
  INNER_LAYER: 'innerLayer',
  POPUP: 'popup',
  PICKER: 'picker',
  KEYBOARD: 'keyboard', // 和 picker 平级
  MODAL: 'modal',
  TOAST: 'toast',
  N_PROGRESS: 'nProgress',
} as const

export type LayoutRootType = typeof LayoutRootType[keyof typeof LayoutRootType]

interface LayoutRootStatic {
  Type: typeof LayoutRootType
  setComponent: (type: LayoutRootType, com: State) => void
  removeComponent: (type: LayoutRootType) => void
  renderWith: (type: LayoutRootType, Component: State, options?: object) => void
  hideWith: (type: LayoutRootType) => void
}

interface CBMapType {
  [propName: string]: ((type: LayoutRootType, component: State) => void) | null
}
interface LayoutV1RootStatic {
  Type: typeof LayoutRootType
  setComponent: (type: LayoutRootType, com: State, id?: string) => void
  removeComponent: (type: LayoutRootType, id?: string) => void
  renderWith: (type: LayoutRootType, Component: State, options?: object) => void
  hideWith: (type: LayoutRootType, id?: string) => void
}
interface CBMapV1Type {
  [propName: string]:
    | ((type: LayoutRootType, component: State, id?: string) => void)
    | null
}
export type {
  LayoutRootState,
  CBMapType,
  LayoutRootStatic,
  LayoutV1RootStatic,
  CBMapV1Type,
}
