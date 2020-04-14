import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import SVGLoading from '../../../svg/loading.svg'

const Loading = ({ children, className, ...rest }) => {
  return (
    <span {...rest} className={classNames('m-loading', className)}>
      <SVGLoading className='m-loading-icon' />
      {children}
    </span>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
