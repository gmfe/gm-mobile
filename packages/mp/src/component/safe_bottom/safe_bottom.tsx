import React, { memo, FC } from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { ViewProps } from '@tarojs/components/types/View'
import _ from 'lodash'

type SafeBottomMPProps = ViewProps

const SafeBottomMP: FC<SafeBottomMPProps> = ({
  className,
  children,
  ...rest
}) => {
  const getPaddingBottom = () => {
    const { safeArea, screenHeight } = wx.getSystemInfoSync()
    const paddingBottom = 0 || Number(screenHeight || 0) - safeArea.bottom
    /** 控制区间，禁止大于34 */
    return _.clamp(paddingBottom, 0, 34)
  }
  return (
    <View className={classNames(className)} {...rest}>
      {React.cloneElement((children as React.ReactElement) || <View />, {
        style: {
          paddingBottom:
            getPaddingBottom() > 0
              ? `${getPaddingBottom()}px!important`
              : undefined,
        },
      })}
    </View>
  )
}

export default SafeBottomMP
export type { SafeBottomMPProps }
