import React, { FC, CSSProperties } from 'react'
import { ScrollView } from '@tarojs/components'
export interface ScrollIntoViewProps {
  /** 滚动目标id */
  targetId: string
  onScroll?: () => void
  /** 小程序独有 */
  horizontal: boolean
  style?: CSSProperties
  className?: string
}

// 先 默认纵向滚动
const ScrollIntoView: FC<ScrollIntoViewProps> = ({
  children,
  targetId,
  horizontal,
  ...rest
}) => {
  const options = {
    scrollY: !horizontal,
    scrollX: horizontal,
    scrollWithAnimation: true,
  }

  return (
    <ScrollView {...options} {...rest} scrollY scrollIntoView={targetId}>
      {children}
    </ScrollView>
  )
}

export default ScrollIntoView
