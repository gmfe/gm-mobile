import React, { useEffect, useState } from 'react'
import { View } from '@gm-mobile/components'
import UtilMP from '../../util'

const StatusBarMP = React.memo((style, ...rest) => {
  const [height, setHeight] = useState(20)
  useEffect(() => {
    const rect = UtilMP.getMenuButtonBoundingClientRect()

    UtilMP.getSystemInfo().then((res) => {
      // 不一定能读到胶囊,或者胶囊占据整个宽， 此时不需要设置statusBar
      setHeight(rect?.left ? res.statusBarHeight : 0)
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
