import React from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'

const Cells = (props) => {
  const { title, mini, className, children, ...rest } = props

  return (
    <div
      {...rest}
      className={classNames(
        'm-cells',
        {
          'm-cells-mini': mini,
        },
        className
      )}
    >
      {title && <div className='m-cells-title'>{title}</div>}
      <div className='m-cells-content'>{children}</div>
    </div>
  )
}

Cells.propTypes = {
  title: PropTypes.string,
  mini: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Cells
