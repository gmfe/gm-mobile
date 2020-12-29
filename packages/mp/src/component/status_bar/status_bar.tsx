import React, { useEffect, useState, memo, FC, HtmlHTMLAttributes } from 'react'
import { View } from '@gm-mobile/c-react'
import UtilMP from '../../util'

const StatusBarMP: FC<HtmlHTMLAttributes<HTMLDivElement>> = memo(
  (style, ...rest) => {
    const [height, setHeight] = useState(20)
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
  }
)

export default StatusBarMP
