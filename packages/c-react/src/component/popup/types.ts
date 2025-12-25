import { HTMLAttributes, ReactNode } from 'react'
import { anyCallback } from '../../types'

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
  /** 禁用下方安全边距，默认为false */
  disableBottomSafeArea?: boolean
  /** 预留底部自定义导航高度,默认为true */
  hasCustomTab?: boolean
  zIndex?: number
}

interface PopupStaticsTypes {
  render: (options: PopupProps) => void
  hide: () => void
}
type PopupDirection = 'bottom' | 'left' | 'right' | 'center'
interface PopupV1Props
  extends Omit<PopupProps, 'onHide' | 'left' | 'right' | 'bottom'> {
  /** 默认关闭是个icon，如果不满足可自定义传入 */
  closeText?: ReactNode
  /** header的class,针对的是整个container */
  headerClassName?: string
  /** title的class,针对的是title文本 */
  titleClassName?: string
  /** title是否居中 */
  titleCenter?: boolean
  /** onHide是监听关闭后的回调，而不是关闭Popup的命令，如果要几秒后关闭弹窗可以返回一个Promise */
  onHide?: () => Promise<any> | void
  /** 点击mask是否关闭弹窗 */
  clickMaskClose?: boolean
  /** @deprecated 弃用，请用direction='left' 左侧弹出 */
  left?: boolean
  /** @deprecated 弃用，请用direction='right' 右侧弹出 */
  right?: boolean
  /** @deprecated 弃用，请用direction='bottom' 底部弹出 */
  bottom?: boolean
  /** @deprecated 弃用，请用direction='center' 中心弹出 */
  center?: boolean
  /** 从哪个方向弹出，默认从底部 */
  direction?: PopupDirection
}

interface PopupStaticsV1Types {
  /** 支持多个Popup，后pop的层级更高，会返回一个关闭该Popup的函数，用于特殊情况下想自己关闭弹窗，否则内部会默认关闭 */
  render: (options: PopupV1Props) => anyCallback
  /** 与renderV1配套，只用于特殊情况下需要手动关闭才使用，传入id可以关闭特定的弹窗 */
  hide: (id: string) => void
}

export type { PopupProps, PopupStaticsTypes, PopupV1Props, PopupStaticsV1Types }
