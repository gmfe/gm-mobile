import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperItem } from '@tarojs/components'
import _map from 'lodash/map'
import { View } from '@gm-mobile/components'

import Image from '../image'

const SwiperImg = ({ data, options }) => {
  return (
    <Swiper indicatorDots={false} autoplay {...options}>
      {_map(data, ({ onClick, img }) => (
        <SwiperItem key={img}>
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
}

export default SwiperImg
