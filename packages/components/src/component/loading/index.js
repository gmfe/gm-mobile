import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import View from '../view'
import Text from '../text'

const Loading = ({ children, className, ...rest }) => {
  return (
    <View {...rest} className={classNames('m-loading', className)}>
      <Text className='m-font m-font-loading m-loading-icon' />
      {children}
    </View>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
