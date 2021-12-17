import React, { memo, FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { ViewProps } from '@tarojs/components/types/View'

type SafeBottomMPProps = ViewProps

const SafeBottomMP: FC<SafeBottomMPProps> = memo(
  ({ className, children, ...rest }) => {
    const { safeArea, screenHeight } = wx.getSystemInfoSync()
    const paddingBottom = screenHeight - safeArea.bottom

    return (
      <View className={classNames(className)} {...rest}>
        {React.cloneElement((children as React.ReactElement) || <View />, {
          style: {
            paddingBottom:
              paddingBottom > 0 ? `${paddingBottom}px!important` : undefined,
          },
        })}
      </View>
    )
  }
)

export default SafeBottomMP
export type { SafeBottomMPProps }
