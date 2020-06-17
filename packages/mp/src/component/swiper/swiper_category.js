import React from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperItem } from '@tarojs/components'
import { View } from '@gm-mobile/components'

const SwiperCategory = ({ options, children }) => {
  const showIndicatorDots = React.Children.count(children) > 1

  return (
    <Swiper indicatorDots={showIndicatorDots} {...options}>
      {React.Children.map(children, (v, i) => (
        <SwiperItem key={i}>
          <View>{v}</View>
        </SwiperItem>
      ))}
    </Swiper>
  )
}

SwiperCategory.propTypes = {
  options: PropTypes.object,
}

export default SwiperCategory
