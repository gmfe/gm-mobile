import { getLocale } from '@gm-mobile/locales'
import React, { FC, memo } from 'react'
import moment from 'dayjs'
import classNames from 'classnames'
import _ from 'lodash'

import { Flex } from '../flex'
import { View } from '../view'
import { CALENDAR_TYPE } from './util'
import { DayProps } from './types'

const Day: FC<DayProps> = ({
  onClick,
  value,
  selected,
  type,
  currentMonth,
  disabled,
  showDateLabel,
  locIndex,
}) => {
  // 各种判断用
  const v = +value.startOf('day')

  const handleClick = () => {
    onClick(value.toDate())
  }

  // 日期单独选中为正方形，选择一段时连续高亮，需要处理中间部分背景色，判断当前渲染日期是否为所在月份的 第一天/最后一天
  const isSelectedDayGap = (type: 'left' | 'right') => {
    const first = moment(value).startOf('month').date()
    const last = moment(value).endOf('month').date()

    const day = type === 'left' ? first : last
    const mod = type === 'left' ? 0 : 6

    if (value.date() === day || locIndex % 7 === mod) {
      return true
    }
    return false
  }

  const isSelectedDate = () => {
    if (type === CALENDAR_TYPE.RANGE) {
      return (
        v === +moment(selected[0]).startOf('day') &&
        v === +moment(selected[1]).startOf('day')
      )
    }

    let s = null
    if (type === CALENDAR_TYPE.MULTIPLE) {
      s = _.find(selected, (date) => +moment(date).startOf('day') === v)
    } else {
      // 单选直接判断
      s = +moment(selected[0]).startOf('day') === v
    }

    if (s) {
      return true
    }
    return false
  }

  // 不是当前月份的日期，不需要展示
  const vm = value.month()
  if (currentMonth !== vm) {
    return <Flex className='m-calendar-day' />
  }

  let bv = null
  let ev = null
  let isActive = false
  if (type === CALENDAR_TYPE.RANGE) {
    bv = selected[0] && +moment(selected[0]).startOf('day')
    ev = selected[1] && +moment(selected[1]).startOf('day')
    isActive = selected[0] && v > bv && v < ev
  }
  const isSelected = isSelectedDate()
  const isBegin = type === CALENDAR_TYPE.RANGE && selected[0] && v === bv
  const isEnd = type === CALENDAR_TYPE.RANGE && selected[1] && v === ev

  const cn = classNames('m-calendar-day', {
    // 无状态
    'm-calendar-day-now': +moment().startOf('day') === v,
    // 不可用
    disabled: disabled,
    // 单个选中态
    'm-calendar-day-selected': isSelected,
    // 日期段选中态
    'm-calendar-day-begin': isBegin,
    'm-calendar-day-end': isEnd,
    active: isActive,
  })

  return (
    <Flex
      justifyCenter
      alignCenter
      onClick={disabled ? _.noop : handleClick}
      className={cn}
    >
      <View
        className={classNames('m-calendar-day-left', {
          'm-calendar-day-left-first':
            type === CALENDAR_TYPE.RANGE && isSelectedDayGap('left'),
        })}
      />
      <Flex column alignCenter justifyCenter className='m-calendar-day-text'>
        {value.date()}
        {showDateLabel && type === CALENDAR_TYPE.RANGE && (
          <View className='m-calendar-day-label'>
            {v === bv && v === ev && <View>{getLocale('单天')}</View>}
            {v === bv && v !== ev && <View>{getLocale('开始')}</View>}
            {v !== bv && v === ev && <View>{getLocale('结束')}</View>}
          </View>
        )}
      </Flex>
      <View
        className={classNames('m-calendar-day-right', {
          'm-calendar-day-right-last':
            type === CALENDAR_TYPE.RANGE && isSelectedDayGap('right'),
        })}
      />
    </Flex>
  )
}

export default memo(Day)
