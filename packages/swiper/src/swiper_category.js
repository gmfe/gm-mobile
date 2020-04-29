import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import Swiper from 'swiper'
import classNames from 'classnames'

const SwiperCategory = ({ options, className, children, ...rest }) => {
  const ref = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Swiper(findDOMNode(ref.current), {
      loop: true,
      pagination: {
        el: '.swiper-pagination',
      },
      ...options,
    })
  }, [])

  return (
    <div
      ref={ref}
      {...rest}
      className={classNames('swiper-container m-swiper-category', className)}
    >
      <div className='swiper-wrapper'>
        {React.Children.map(children, (v, i) => (
          <div key={i} className='swiper-slide'>
            {v}
          </div>
        ))}
      </div>
      <div className='swiper-pagination' />
    </div>
  )
}

SwiperCategory.propTypes = {
  options: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SwiperCategory
