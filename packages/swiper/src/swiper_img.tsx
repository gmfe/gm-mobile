import React, { useEffect, useRef, FC } from 'react'
import { findDOMNode } from 'react-dom'
import Swiper from 'swiper'
import _ from 'lodash'
import classNames from 'classnames'

import { SwiperImgProps } from './types'

const SwiperImg: FC<SwiperImgProps> = ({
  data,
  options,
  className,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement | null>(null)
  const key = useRef<number | null>(null)
  key.current = Date.now()

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Swiper(findDOMNode(ref.current) as HTMLElement, {
      loop: true,
      autoplay: {
        disableOnInteraction: false, // 用户操作后不自动停止
      },
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
    const dom = document.getElementById(`swiper-slide-${key.current}`)
    if (dom) {
      dom.addEventListener('click', (e: any) => {
        e.stopPropagation()
        var item = JSON.parse(e.target.dataset.item) || {}
        if (data[item.index].onClick) {
          data[item.index].onClick!(item)
        }
      })
    }
  }, [data])

  return (
    <div
      ref={ref}
      className={classNames('swiper-container m-swiper-img', className)}
      {...rest}
    >
      <div id={`swiper-slide-${key.current}`} className='swiper-wrapper'>
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

export default SwiperImg
