import React, { FC } from 'react'
import classNames from 'classnames'
import { View, ViewProps } from '../view'
import SVGLoading from './loading.svg'
import SVGLoading2 from './loading2.svg'
import { Image } from '@tarojs/components'

interface LoadingProps extends ViewProps {
  // 专门给 Toast 用，Loading 是 图片，不能变颜色，toast 是灰度，估需要用白色loading
  _isToast?: boolean
}

const Loading: FC<LoadingProps> = ({
  children,
  className,
  _isToast,
  ...rest
}) => {
  return (
    <View {...rest} className={classNames('m-loading', className)}>
      <Image
        src={_isToast ? SVGLoading2 : SVGLoading}
        className='m-loading-icon'
      />
      {children}
    </View>
  )
}

export default Loading
