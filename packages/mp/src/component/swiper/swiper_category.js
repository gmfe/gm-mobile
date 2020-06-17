import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Swiper, SwiperItem } from '@tarojs/components'
import { View } from '@gm-mobile/components'
import SwiperPagination from './swiper_pagination'

const SwiperCategory = ({ options, children, ...rest }) => {
  const showIndicatorDots = React.Children.count(children) > 1
  const data = [...Array(React.Children.count(children)).keys()]
  const init = data.length ? data[0] : null
  const [current, setCurrent] = useState(init + '')

  const handleChange = (e) => {
    const { currentItemId } = e.detail
    if (currentItemId !== current) {
      setCurrent(currentItemId)
    }
  }

  return (
    <View {...rest}>
      <Swiper {...options} onChange={handleChange}>
        {React.Children.map(children, (v, i) => (
          <SwiperItem key={i} itemId={data[i]}>
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

SwiperCategory.propTypes = {
  options: PropTypes.object,
  className: PropTypes.string,
  style: PropTypes.object,
}

export default SwiperCategory
