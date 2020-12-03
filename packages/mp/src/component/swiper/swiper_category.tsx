import React, { useState, FC, Children } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import { View } from '@gm-mobile/c-react'
import _ from 'lodash'

import { SwiperCategoryProps } from './types'
import SwiperPagination from './swiper_pagination'

const SwiperCategory: FC<SwiperCategoryProps> = ({
  options,
  children,
  style,
  height,
  ...rest
}) => {
  const showIndicatorDots = Children.count(children) > 1
  const data = _.map([...Array(Children.count(children)).keys()], (v) =>
    _.toString(v)
  )
  const init = data.length ? data[0] : null
  const [current, setCurrent] = useState(init)

  const handleChange = (e: any) => {
    const { currentItemId } = e.detail
    if (currentItemId !== current) {
      setCurrent(currentItemId)
    }
  }

  const s = Object.assign(style || {})
  const translate = (index: number) => {
    return options?.vertical ? `0px, ${index * 100}%` : `${index * 100}%, 0px`
  }
  return (
    <View {...rest} style={{ ...s, height }}>
      <Swiper {...options} onChange={handleChange} style={{ height: '100%' }}>
        {Children.map(children, (v, i) => (
          <SwiperItem
            key={i}
            itemId={data[i]}
            style={{
              transform: `translate(${translate(i)}) translateZ(0px)`,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <View>{v}</View>
          </SwiperItem>
        ))}
      </Swiper>
      {showIndicatorDots && (
        <SwiperPagination data={data} current={current} type='dot' />
      )}
    </View>
  )
}

export default SwiperCategory
