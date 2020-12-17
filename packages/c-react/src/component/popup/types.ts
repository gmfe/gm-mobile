import { HTMLAttributes } from 'react'

interface PopupStaticsTypes<T> {
  render: (options: T) => void
  hide: () => void
}

interface PopupProps extends HTMLAttributes<HTMLDivElement> {
  title?: string
  onHide?: () => void
  /** 左侧弹出 */
  left?: boolean
  /** 右侧弹出 */
  right?: boolean
  /** 底部弹出 */
  bottom?: boolean
  width?: string
  height?: string
  /** 遮罩透明度 */
  opacity?: number
  disabledHeader?: boolean
  disabledMask?: boolean
  disabledAnimate?: boolean
  /** 内部用 */
  isPickPopup?: boolean
}

export type { PopupProps, PopupStaticsTypes }
