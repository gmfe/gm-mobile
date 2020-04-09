import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Square = (props) => {
  const { className, children, ...rest } = props
  const cn = classNames('m-square-inner', className)

  return (
    <div className='m-square'>
      <div {...rest} className={cn}>
        {children}
      </div>
    </div>
  )
}

Square.propTypes = {
  className: PropTypes.string,
}

export default Square
