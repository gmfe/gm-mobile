import React, { FC } from 'react'
import { ScrollView } from '@tarojs/components'
import { ScrollIntoViewProps } from './types'

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
    /** @ts-ignore */
    <ScrollView {...options} {...rest} scrollY scrollIntoView={targetId}>
      {children}
    </ScrollView>
  )
}

export default ScrollIntoView
