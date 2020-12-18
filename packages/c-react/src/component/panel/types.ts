import { HTMLAttributes, ReactElement } from 'react'

interface PanelProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  title?: string | ReactElement
  /** 提供 onTitle，则 title 有右箭头 */
  onTitle?: () => void
  action?: ReactElement
  /** 贴上边，左上 右上 没有圆角 */
  top?: boolean
  /** 贴下边，左下 右下 没有圆角 */
  bottom?: boolean
}

export type { PanelProps }
