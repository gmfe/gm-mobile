import React, { useEffect, useState, memo, FC, CSSProperties } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import UtilMP from '../../util'
import { ViewProps } from '@tarojs/components/types/View'

type SafeHeaderMPProps = ViewProps

const SafeHeaderMP: FC<SafeHeaderMPProps> = memo(
  ({ className, style, children, ...rest }) => {
    const [right, setRight] = useState(100)

    useEffect(() => {
      const rect = UtilMP.getMenuButtonBoundingClientRect()

      UtilMP.getSystemInfo().then((info) => {
        // 不一定能读到胶囊,或者胶囊占据整个宽
        return setRight(rect?.left ? info.windowWidth - rect.left : 0)
      })
    }, [])

    return (
      <View
        {...rest}
        style={{ ...(style as CSSProperties), paddingRight: right }}
        className={classNames('m-safe-header', className)}
      >
        {children}
      </View>
    )
  }
)

export default SafeHeaderMP
export type { SafeHeaderMPProps }
