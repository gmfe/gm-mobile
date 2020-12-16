import React, { FC, useState } from 'react'
import moment, { Moment } from 'moment'
import classNames from 'classnames'
import _ from 'lodash'

import Week from './week'
import { View } from '../view'
import MonthsList from './months_list'
import { CALENDAR_TYPE } from './util'
import { BaseCalendarProps } from './types'

const BaseCalendar: FC<BaseCalendarProps> = ({
  type,
  selected,
  onSelect,
  min,
  max,
  disabledDate,
  showDateLabel,
  height = 400,
  className,
  style,
  ...rest
}) => {
  const [isSelectBegin, setIsSelectBegin] = useState(true)

  // 多个日期选择
  const handleSelectMulDay = (m: Moment) => {
    let _selected = selected.slice()
    // 点击相同日期，取消该日期选择
    const dayIndex = _.findIndex(
      _selected,
      (date) => +moment(date).startOf('day') === +moment(m).startOf('day')
    )

    if (dayIndex !== -1) {
      _selected.splice(dayIndex, 1)
    } else {
      _selected = _selected.concat([m.toDate()])
    }
    onSelect(_selected)
  }

  const handleSelectDay = (m: Moment) => {
    // 日期段选择
    if (type === CALENDAR_TYPE.RANGE) {
      let sb = selected[0]
      let se = selected[1]

      // 一开始选择 开始时间
      if (isSelectBegin) {
        sb = m.toDate()
        se = m.toDate()

        setIsSelectBegin(false)
      } else {
        if (+m < +sb) {
          se = sb
          sb = m.toDate()
          setIsSelectBegin(true)
        } else {
          se = m.toDate()
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

    onSelect([m.toDate()])
  }

  const getDisabled = (m: Moment) => {
    // disabledDate 优先
    if (disabledDate) {
      return disabledDate(m.toDate())
    }

    const _min = min ? moment(min).startOf('day') : null
    const _max = max ? moment(max).startOf('day') : null

    let disabled = false

    if (_min && m < _min) {
      disabled = true
    }
    if (_max && m > _max) {
      disabled = true
    }

    return disabled
  }

  const computedMonthList = () => {
    // 优先 min，其次 begin ，其次 当前
    let mMin = null
    let mMax = null

    if (type === CALENDAR_TYPE.RANGE) {
      const _min = min || selected[0]
      const _max = max || selected[1]

      mMin = (_min ? moment(_min) : moment()).startOf('month')
      mMax = (_max ? moment(_max) : moment()).startOf('month')
    } else {
      mMin = moment(min).startOf('month')
      mMax = moment(max).startOf('month')
    }

    const arr = []

    // eslint-disable-next-line
    while (mMin <= mMax) {
      arr.push(moment(mMin))
      mMin.add(1, 'month')
    }

    return arr
  }

  const s = Object.assign({ height }, style || {})

  return (
    <View {...rest} className={classNames('m-calendar', className)} style={s}>
      <Week />
      <MonthsList
        monthsList={computedMonthList()}
        selected={selected}
        type={type}
        height={height - 40}
        onSelectDay={handleSelectDay}
        getDisabled={getDisabled}
        showDateLabel={showDateLabel}
      />
    </View>
  )
}

export default BaseCalendar
