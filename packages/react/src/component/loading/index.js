import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import Flex from '../flex'

const Line = () => {
  return (
    <Flex alignEnd className='m-loading-linear'>
      <div className='m-loading-line' />
      <div className='m-loading-line' />
      <div className='m-loading-line' />
      <div className='m-loading-line' />
      <div className='m-loading-line' />
    </Flex>
  )
}

const Circle = () => {
  return <i className='m-loading-circle' />
}

const Loading = ({ line, children, className, ...rest }) => {
  return (
    <span {...rest} className={classNames('m-loading', className)}>
      {line ? <Line /> : <Circle />}
      {children && <span className='m-margin-left-4'>{children}</span>}
    </span>
  )
}

Loading.propTypes = {
  line: PropTypes.bool,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default Loading
