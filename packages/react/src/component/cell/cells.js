import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Cells = (props) => {
  const { title, className, children, ...rest } = props

  return (
    <div {...rest} className={classNames('m-cells', className)}>
      {title && <div className='m-cells-title'>{title}</div>}
      <div className='m-cells-content'>{children}</div>
    </div>
  )
}

Cells.propTypes = {
  title: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Cells
