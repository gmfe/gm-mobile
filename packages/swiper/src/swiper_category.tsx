import React, { useEffect, useRef, FC, Children } from 'react'
import { findDOMNode } from 'react-dom'
import Swiper from 'swiper'
import classNames from 'classnames'
import { SwiperCategoryProps } from './types'

export const SwiperCategory: FC<SwiperCategoryProps> = ({
  options,
  className,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // eslint-disable-next-line no-new
    new Swiper(findDOMNode(ref.current) as HTMLElement, {
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
      className={classNames('swiper-container m-swiper-category', className)}
      {...rest}
    >
      <div className='swiper-wrapper'>
        {Children.map(children, (v, i) => (
          <div key={i} className='swiper-slide'>
            {v}
          </div>
        ))}
      </div>
      {Children.count(children) > 1 && <div className='swiper-pagination' />}
    </div>
  )
}

export default SwiperCategory
