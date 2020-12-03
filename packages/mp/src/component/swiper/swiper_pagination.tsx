import React, { FC } from 'react'
import { View, Text } from '@gm-mobile/c-react'
import classNames from 'classnames'
import _ from 'lodash'

import { SwiperPaginationProps } from './types'

const SwiperPagination: FC<SwiperPaginationProps> = ({
  type,
  data,
  current,
}) => (
  <View
    className={classNames('m-swiper-pagination', `m-swiper-pagination-${type}`)}
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

export default SwiperPagination
