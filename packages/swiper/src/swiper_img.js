import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { findDOMNode } from 'react-dom'
import Swiper from 'swiper'
import _ from 'lodash'
import classNames from 'classnames'

const SwiperImg = ({ data, options, className, ...rest }) => {
  const ref = useRef(null)

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Swiper(findDOMNode(ref.current), {
      loop: true,
      autoplay: true,
      disableOnInteraction: false, // 用户操作后不自动停止
      lazy: {
        loadPrevNext: true,
      },
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
      className={classNames('swiper-container m-swiper-img', className)}
    >
      <div className='swiper-wrapper'>
        {_.map(data, ({ url, img }) => (
          <div
            key={img}
            className='swiper-slide'
            onClick={() => {
              if (url) {
                window.location.href = url
              }
            }}
          >
            <img data-src={img} className='swiper-lazy m-swiper-img-img' />
          </div>
        ))}
      </div>
      <div className='swiper-pagination' />
    </div>
  )
}

SwiperImg.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      url: PropTypes.string,
      img: PropTypes.string.isRequired,
    })
  ),
  options: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SwiperImg
