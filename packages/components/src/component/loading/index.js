import React from 'react'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import View from '../view'

const Icon = (props) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='120'
      height='120'
      viewBox='0 0 100 100'
    >
      <path fill='none' d='M0 0h100v100H0z' />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.50'
        rx='5'
        ry='5'
        transform='translate(0 -30)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.46'
        rx='5'
        ry='5'
        transform='rotate(30 105.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.42'
        rx='5'
        ry='5'
        transform='rotate(60 75.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.38'
        rx='5'
        ry='5'
        transform='rotate(90 65 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.34'
        rx='5'
        ry='5'
        transform='rotate(120 58.66 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.30'
        rx='5'
        ry='5'
        transform='rotate(150 54.02 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.26'
        rx='5'
        ry='5'
        transform='rotate(180 50 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.22'
        rx='5'
        ry='5'
        transform='rotate(-150 45.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.18'
        rx='5'
        ry='5'
        transform='rotate(-120 41.34 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.14'
        rx='5'
        ry='5'
        transform='rotate(-90 35 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.10'
        rx='5'
        ry='5'
        transform='rotate(-60 24.02 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.06'
        rx='5'
        ry='5'
        transform='rotate(-30 -5.98 65)'
      />
    </svg>
  )
}

const Icon2 = (props) => {
  return (
    <svg
      {...props}
      xmlns='http://www.w3.org/2000/svg'
      width='120'
      height='120'
      viewBox='0 0 100 100'
      fill='white'
    >
      <path fill='none' d='M0 0h100v100H0z' />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.70'
        rx='5'
        ry='5'
        transform='translate(0 -30)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.66'
        rx='5'
        ry='5'
        transform='rotate(30 105.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.62'
        rx='5'
        ry='5'
        transform='rotate(60 75.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.58'
        rx='5'
        ry='5'
        transform='rotate(90 65 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.54'
        rx='5'
        ry='5'
        transform='rotate(120 58.66 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.50'
        rx='5'
        ry='5'
        transform='rotate(150 54.02 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.46'
        rx='5'
        ry='5'
        transform='rotate(180 50 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.42'
        rx='5'
        ry='5'
        transform='rotate(-150 45.98 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.38'
        rx='5'
        ry='5'
        transform='rotate(-120 41.34 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.34'
        rx='5'
        ry='5'
        transform='rotate(-90 35 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.30'
        rx='5'
        ry='5'
        transform='rotate(-60 24.02 65)'
      />
      <rect
        width='7'
        height='20'
        x='46.5'
        y='40'
        fillOpacity='0.26'
        rx='5'
        ry='5'
        transform='rotate(-30 -5.98 65)'
      />
    </svg>
  )
}

const Loading = ({ children, className, _isToast, ...rest }) => {
  return (
    <View {...rest} className={classNames('m-loading', className)}>
      {_isToast ? (
        <Icon2 className='m-loading-icon' />
      ) : (
        <Icon className='m-loading-icon' />
      )}
      {children}
    </View>
  )
}

Loading.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  _isToast: PropTypes.bool,
}

export default Loading
