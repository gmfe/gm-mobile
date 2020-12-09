import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import View from '../view'

const Cells = ({ title, mini, className, children, ...rest }) => {
  return (
    <View
      {...rest}
      className={classNames(
        'm-cells',
        {
          'm-cells-mini': mini,
        },
        className
      )}
    >
      {title && <View className='m-cells-title'>{title}</View>}
      <View className='m-cells-content'>{children}</View>
    </View>
  )
}

Cells.propTypes = {
  title: PropTypes.string,
  mini: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Cells
