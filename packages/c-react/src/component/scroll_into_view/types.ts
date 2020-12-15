import { HTMLAttributes, CSSProperties } from 'react'

interface ScrollIntoViewProps extends HTMLAttributes<HTMLDivElement> {
  /** 滚动目标id */
  targetId: string
  onScroll?: () => void
}

interface ScrollIntoViewWeAPPProps {
  /** 滚动目标id */
  targetId: string
  onScroll?: () => void
  /** 小程序独有 */
  horizontal: boolean
  style?: CSSProperties
  className?: string
}

export type { ScrollIntoViewProps, ScrollIntoViewWeAPPProps }
