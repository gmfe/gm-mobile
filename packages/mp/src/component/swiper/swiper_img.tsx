import React, { useState, FC } from 'react'
import { Swiper, SwiperItem } from '@tarojs/components'
import _ from 'lodash'
import { View } from '@gm-mobile/c-react'
import { SwiperImgProps } from './types'

import { ImageMP } from '../image'
import SwiperPagination from './swiper_pagination'

const SwiperImg: FC<SwiperImgProps> = ({
  data,
  options,
  style,
  height,
  ...rest
}) => {
  const _data = _.map(data, (d) => d.img)
  const init = _data.length ? _data[0] : null
  const [current, setCurrent] = useState(init)

  const handleChange = (e: any) => {
    const { currentItemId } = e.detail
    if (currentItemId !== current) {
      setCurrent(currentItemId)
    }
  }

  // TODO: 提供类 autoHeight 功能
  const s = Object.assign(style || { height: '150px' })
  if (height) {
    s.height = height
  }
  const translate = (index: number) => {
    return options?.vertical ? `0px, ${index * 100}%` : `${index * 100}%, 0px`
  }

  return (
    <View {...rest} style={s}>
      <Swiper
        autoplay
        {...options}
        onChange={handleChange}
        style={{ height: '100%' }}
      >
        {_.map(data, ({ onClick, img }, index) => (
          <SwiperItem
            key={img}
            itemId={img}
            style={{
              transform: `translate(${translate(index)}) translateZ(0px)`,
              position: 'absolute',
              width: '100%',
              height: '100%',
            }}
          >
            <View
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                onClick && onClick()
              }}
            >
              <ImageMP src={img} width='100%' height='100%' />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <SwiperPagination data={_data} current={current} type='rect' />
    </View>
  )
}

export default SwiperImg
