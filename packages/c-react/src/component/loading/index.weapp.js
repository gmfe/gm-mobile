import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import { View } from '../view'
import SVGLoading from './loading.svg'
import SVGLoading2 from './loading2.svg'
import { Image } from '@tarojs/components'

const Loading = ({ children, className, _isToast, ...rest }) => {
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

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  // 专门给 Toast 用，Loading 是 图片，不能变颜色，toast 是灰度，估需要用白色loading
  _isToast: PropTypes.bool,
}

export default Loading
