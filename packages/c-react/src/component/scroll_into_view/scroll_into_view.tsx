import React, { useEffect, FC } from 'react'
import { View } from '../view'
import { ScrollIntoViewProps } from './types'

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
