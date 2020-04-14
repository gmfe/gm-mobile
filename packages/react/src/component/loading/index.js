import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'

const Circle = () => {
  return <i className='m-loading-circle' />
}

const Loading = ({ children, className, ...rest }) => {
  return (
    <span {...rest} className={classNames('m-loading', className)}>
      <Circle />
      {children && <span className='m-margin-left-4'>{children}</span>}
    </span>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
