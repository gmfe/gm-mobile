import React, { useEffect, useState } from 'react'
import { View } from '@tarojs/components'

const SafeHeaderMP = ({ style, children, ...rest }) => {
  const [right, setRight] = useState(100)

  useEffect(() => {
    // eslint-disable-next-line
    const rect = wx.getMenuButtonBoundingClientRect()

    // eslint-disable-next-line
    wx.getSystemInfo({
      success: (res) => {
        setRight(res.windowWidth - rect.left)
      },
    })
  }, [])

  return (
    <View {...rest} style={{ ...style, paddingRight: right }}>
      {children}
    </View>
  )
}

export default SafeHeaderMP
