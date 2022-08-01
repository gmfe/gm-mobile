import React, { FC, memo } from 'react'
import { getLocale } from '@gm-mobile/locales'
import classNames from 'classnames'
import moment, { Dayjs } from 'dayjs'
import { View } from '../view'
import _ from 'lodash'

import { DayProps } from './types'

const formatDay = (day: Date, span = 0): Dayjs => {
  return moment(day).add(span, 'day').startOf('day')
}

/**
 * day状态: disabled, start, end, active(用于日期段选择), selected
 * 优先级: disabled > active > start | end > selected
 */
const Day: FC<DayProps> = memo(
  ({ min, max, selected, onSelect, currentDate, disabledDate }) => {
    const _currentDateIndex = selected.findIndex((v) => +v === +currentDate)
    let lastDay: number
    let nextDay: number
    let lastSelected: number
    let nextSelected: number

    if (_currentDateIndex !== -1) {
      lastDay = +formatDay(currentDate, -1)
      nextDay = +formatDay(currentDate, 1)
      lastSelected = +formatDay(selected[_currentDateIndex - 1])
      nextSelected = +formatDay(selected[_currentDateIndex + 1])
    }

    const isActive = () => {
      if (_currentDateIndex === 0 || _currentDateIndex === selected.length - 1)
        return false

      // 左右均被选中
      return lastSelected === lastDay && nextSelected === nextDay
    }

    const isStartDate = () => {
      if (selected.length === 1 || _currentDateIndex === selected.length - 1)
        return false

      if (_currentDateIndex === 0) return nextSelected === nextDay

      // 只右侧被选中
      return lastSelected !== lastDay && nextSelected === nextDay
    }

    const isEndDate = () => {
      if (selected.length === 1 || _currentDateIndex === 0) return false

      if (_currentDateIndex === selected.length - 1)
        return lastSelected === lastDay

      // 只左侧被选中
      return lastSelected === lastDay && nextSelected !== nextDay
    }

    const isDisabled = () => {
      /** 无限制 */
      if (!disabledDate && !min && !max) return false

      /** disabledDate优先 */
      if (disabledDate) {
        return disabledDate(currentDate)
      }

      const _min = +formatDay(min)
      const _max = +formatDay(max)
      const _m = +formatDay(currentDate)

      if ((_min && _m < _min) || (_max && _m > _max)) {
        return true
      }

      return false
    }

    const handleSelected = () => {
      const new_selected = _.xorWith(
        selected,
        [currentDate],
        (a, b) => +a === +b
      )
      onSelect(new_selected)
    }

    let _isStartDate = false
    let _isEndDate = false
    const _isDisabled = isDisabled()
    let cn: any = { disabled: _isDisabled }

    if (_currentDateIndex !== -1) {
      _isStartDate = isStartDate()
      _isEndDate = isEndDate()

      cn = {
        ...cn,
        /** 连续选中开始 */
        'm-date-selector-day-start':
          _currentDateIndex !== -1 ? _isStartDate : false,
        /** 连续选中结束 */
        'm-date-selector-day-end':
          _currentDateIndex !== -1 ? _isEndDate : false,
        /** 连续选中中间态 */
        active: _currentDateIndex !== -1 && isActive(),
        /** 选中态 */
        'm-date-selector-day-selected':
          _currentDateIndex !== -1 && !_isStartDate && !_isEndDate,
      }
    }

    return (
      <View
        className={classNames('m-date-selector-day', cn)}
        onClick={_isDisabled ? _.noop : handleSelected}
      >
        <View className='m-date-selector-day-left' />
        <View className='m-date-selector-day-value'>
          {moment(currentDate).date() === 1 && (
            <View className='m-date-selector-month'>
              {moment(currentDate).month() + 1}
              {getLocale('月')}
            </View>
          )}
          {moment(currentDate).date()}
        </View>
        <View className='m-date-selector-day-right' />
      </View>
    )
  }
)

export default Day
