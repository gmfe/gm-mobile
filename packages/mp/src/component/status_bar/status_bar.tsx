import React, { useEffect, useState, memo, FC, HTMLAttributes } from 'react'
import { View } from '@gm-mobile/c-react'
import UtilMP from '../../util'

export type StatusBarMPProps = HTMLAttributes<HTMLDivElement>

const StatusBarMP: FC<StatusBarMPProps> = memo((style, ...rest) => {
  const [height, setHeight] = useState(wx.getSystemInfoSync().statusBarHeight)
  useEffect(() => {
    const rect = UtilMP.getMenuButtonBoundingClientRect()
    UtilMP.getSystemInfo().then((res) => {
      // 不一定能读到胶囊,或者胶囊占据整个宽， 此时不需要设置statusBar
      return setHeight(rect?.left ? res.statusBarHeight : 0)
    })
  }, [])
  if (!height) return null
  return (
    <View
      {...rest}
      style={{
        height,
        ...style,
      }}
    />
  )
})

export default StatusBarMP
