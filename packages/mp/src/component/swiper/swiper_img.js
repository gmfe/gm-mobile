import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperItem } from '@tarojs/components'
import _ from 'lodash'
import { View } from '@gm-mobile/components'

import Image from '../image'
import SwiperPagination from './swiper_pagination'

const SwiperImg = ({ data, options, style, height, ...rest }) => {
  const _data = _.map(data, (d) => d.img)
  const init = _data.length ? _data[0] : null
  const [current, setCurrent] = useState(init)

  const handleChange = (e) => {
    const { currentItemId } = e.detail
    if (currentItemId !== current) {
      setCurrent(currentItemId)
    }
  }

  // TODO: 提供类 autoHeight功能
  const s = Object.assign(style || { height: '150px' })
  if (height) {
    s.height = height
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
          <SwiperItem key={index} itemId={img}>
            <View
              style={{ width: '100%', height: '100%' }}
              onClick={() => {
                onClick && onClick()
              }}
            >
              <Image src={img} width='100%' height='100%' />
            </View>
          </SwiperItem>
        ))}
      </Swiper>
      <SwiperPagination data={_data} current={current} type='rect' />
    </View>
  )
}

SwiperImg.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      onClick: PropTypes.func,
      img: PropTypes.string.isRequired,
    })
  ),
  /** 小程序 swiper 相关参数设置 */
  options: PropTypes.object,
  /** 定义swiper高度，官方默认 150px */
  height: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SwiperImg
