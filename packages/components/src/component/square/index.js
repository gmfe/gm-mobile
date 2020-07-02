import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

import View from '../view'

const Square = (props) => {
  const { className, children, ...rest } = props
  const cn = classNames('m-square-inner', className)

  return (
    <View className='m-square'>
      <View {...rest} className={cn}>
        {children}
      </View>
    </View>
  )
}

Square.propTypes = {
  className: PropTypes.string,
}

export default Square
