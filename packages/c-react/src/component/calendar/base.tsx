import React, { FC, useState } from 'react'
import { getLocale } from '@gm-mobile/locales'
import moment from 'dayjs'
import classNames from 'classnames'
import _ from 'lodash'

import { View } from '../view'
import { Flex } from '../flex'
import MonthsList from './months_list'
import { CALENDAR_TYPE } from './util'
import { BaseCalendarProps } from './types'

const weekDays = [
  getLocale('日'),
  getLocale('一'),
  getLocale('二'),
  getLocale('三'),
  getLocale('四'),
  getLocale('五'),
  getLocale('六'),
]

const BaseCalendar: FC<BaseCalendarProps> = ({
  type,
  selected,
  onSelect = _.noop,
  min,
  max,
  disabledDate,
  showDateLabel,
  height = 400,
  className,
  style,
  canScrollWhenMaxOrMinChange = false,
  ...rest
}) => {
  const [isSelectBegin, setIsSelectBegin] = useState(true)

  // 多个日期选择
  const handleSelectMulDay = (m: Date) => {
    let _selected = selected.slice()
    // 点击相同日期，取消该日期选择
    const dayIndex = _.findIndex(
      _selected,
      (date) => +moment(date).startOf('day') === +moment(m).startOf('day')
    )

    if (dayIndex !== -1) {
      _selected.splice(dayIndex, 1)
    } else {
      _selected = _selected.concat([m])
    }
    onSelect(_selected)
  }

  const handleSelectDay = (m: Date) => {
    // 日期段选择
    if (type === CALENDAR_TYPE.RANGE) {
      let sb = selected[0]
      let se = selected[1]

      // 一开始选择 开始时间
      if (isSelectBegin) {
        sb = m
        se = m

        setIsSelectBegin(false)
      } else {
        if (+m < +sb) {
          se = sb
          sb = m
          setIsSelectBegin(true)
        } else {
          se = m
          setIsSelectBegin(true)
        }
      }

      onSelect([sb, se])
      return
    }

    if (type === CALENDAR_TYPE.MULTIPLE) {
      handleSelectMulDay(m)
      return
    }

    onSelect([m])
  }

  return (
    <View
      {...rest}
      className={classNames('m-calendar', className)}
      style={{ height, ...(style || {}) }}
    >
      <Flex none className='m-calendar-week'>
        {_.map(weekDays, (v, i) => (
          <Flex flex justifyCenter alignCenter key={i}>
            {v}
          </Flex>
        ))}
      </Flex>
      <MonthsList
        canScrollWhenMaxOrMinChange={canScrollWhenMaxOrMinChange}
        selected={selected}
        type={type}
        height={height - 40} // 固定展示星期头部高度40
        onSelectDay={handleSelectDay}
        min={min}
        max={max}
        disabledDate={disabledDate}
        showDateLabel={showDateLabel}
      />
    </View>
  )
}

export default BaseCalendar
