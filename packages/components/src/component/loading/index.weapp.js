import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import View from '../view'
import SVGLoading from './loading.svg'
import { Image } from '@tarojs/components'

const Loading = ({ children, className, ...rest }) => {
  return (
    <View {...rest} className={classNames('m-loading', className)}>
      <Image src={SVGLoading} className='m-loading-icon' />
      {children}
    </View>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
