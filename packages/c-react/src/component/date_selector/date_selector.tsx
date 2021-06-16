import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import { View } from '../view'
import _ from 'lodash'
import moment from 'moment'

import { DateSelectorProps } from './types'
import Container from './container'

const weekDays = [
  getLocale('日'),
  getLocale('一'),
  getLocale('二'),
  getLocale('三'),
  getLocale('四'),
  getLocale('五'),
  getLocale('六'),
]

export const DateSelector: FC<DateSelectorProps> = ({
  selected,
  onSelect,
  disabledDate,
  /** 默认当前日期 */
  min = moment().toDate(),
  /** 默认含当前日期四周 */
  max = moment().weekday(0).startOf('day').add(27, 'days').toDate(),
  ...rest
}) => {
  return (
    <View {...rest} className='m-date-selector'>
      <View className='m-date-selector-weekdays'>
        {_.map(weekDays, (v, i) => (
          <View className='m-date-selector-weekdays-week' key={i}>
            {v}
          </View>
        ))}
      </View>
      <Container
        min={min}
        max={max}
        onSelect={onSelect}
        disabledDate={disabledDate}
        selected={selected}
      />
    </View>
  )
}

export default DateSelector
