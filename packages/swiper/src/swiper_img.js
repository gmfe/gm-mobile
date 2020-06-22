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

  // 解决loop开启的情况下，点击事件
  useEffect(() => {
    const bannerItems = document.getElementsByClassName('swiper-slide')
    _.forEach(bannerItems, (item) => {
      item.onclick = function (e) {
        e.stopPropagation()
        e.preventDefault()
        var dataItem = JSON.parse(e.target.dataset.item) || {}
        data[dataItem.index].onClick && data[dataItem.index].onClick(dataItem)
      }
    })
  }, [data])

  return (
    <div
      ref={ref}
      {...rest}
      className={classNames('swiper-container m-swiper-img', className)}
    >
      <div className='swiper-wrapper'>
        {_.map(data, (item, index) => (
          <div key={index} className='swiper-slide'>
            <img
              data-src={item.img}
              data-item={JSON.stringify({ ...item, index })}
              className='swiper-lazy m-swiper-img-img'
            />
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
      onClick: PropTypes.func,
      img: PropTypes.string.isRequired,
    })
  ),
  options: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SwiperImg
