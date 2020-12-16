import React, { useEffect, FC, HTMLAttributes } from 'react'
import { View } from '../view'
export interface ScrollIntoViewProps extends HTMLAttributes<HTMLDivElement> {
  /** 滚动目标id */
  targetId: string
  onScroll?: () => void
}

// 先 默认纵向滚动
const ScrollIntoView: FC<ScrollIntoViewProps> = ({
  children,
  targetId,
  ...rest
}) => {
  useEffect(() => {
    const d = document.getElementById(targetId)
    if (d) {
      // @ts-ignore
      d.scrollIntoViewIfNeeded(false)
    }
  }, [targetId])

  return <View {...rest}>{children}</View>
}

export default ScrollIntoView
