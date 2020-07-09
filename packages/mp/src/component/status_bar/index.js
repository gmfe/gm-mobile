import React, { useEffect, useState } from 'react'
import { View } from '@gm-mobile/components'

const StatusBarMP = React.memo((style, ...rest) => {
  const [height, setHeight] = useState(20)
  useEffect(() => {
    // eslint-disable-next-line
    wx.getSystemInfo({
      success: (res) => {
        setHeight(res.statusBarHeight)
      },
    })
  }, [])
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
