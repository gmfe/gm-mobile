import React from 'react'
import { View, Text } from '@gm-mobile/components'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import _ from 'lodash'

const SwiperPagination = ({ type, data, current }) => {
  return (
    <View
      className={classNames(
        'm-swiper-pagination',
        `m-swiper-pagination-${type}`
      )}
    >
      {_.map(data, (v) => (
        <Text
          key={v}
          className={classNames('m-swiper-pagination-bulletin', {
            'swiper-pagination-bullet-active': current === v + '',
          })}
        />
      ))}
    </View>
  )
}

SwiperPagination.propTypes = {
  type: PropTypes.oneOf(['dot', 'rect']),
  data: PropTypes.array,
  current: PropTypes.string,
}

export default SwiperPagination
