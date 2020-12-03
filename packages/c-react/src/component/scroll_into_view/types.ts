import { CSSProperties, UIEvent } from 'react'

interface ScrollIntoViewProps {
  /** 滚动目标id */
  targetId: string
  onScroll?: (event: UIEvent<HTMLDivElement>) => void
  /** 小程序独有 */
  horizontal?: boolean
  style?: CSSProperties
  className?: string
}

export type { ScrollIntoViewProps }
