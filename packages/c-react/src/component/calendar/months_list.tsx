import React, { FC, useRef, useEffect } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'

import VList from '../v_list'
import Month from './month'
import { CALENDAR_TYPE } from './util'
import { MonthListProps } from './types'

// 目前只支持固定高度，定为265
const MONTH_HEIGHT = 265

const MonthsList: FC<MonthListProps> = ({
  min,
  max,
  type,
  height,
  selected,
  onSelectDay,
  disabledDate,
  showDateLabel,
}) => {
  const refList = useRef<VList>(null)

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
  const monthsList = computedMonthList()

  useEffect(() => {
    if (selected.length) {
      const date = type === CALENDAR_TYPE.RANGE ? selected[1] : selected[0]
      const targetId = _.findIndex(
        monthsList,
        (item) =>
          moment(item).year() === moment(date).year() &&
          moment(item).month() === moment(date).month()
      )

      setTimeout(() => {
        refList.current && refList.current.apiDoScrollToKey(targetId)
      }, 200)
    }
  }, [])

  return (
    <VList
      ref={refList}
      className='m-calendar-content'
      data={monthsList}
      height={height}
      itemHeight={MONTH_HEIGHT}
      distance={0}
      renderItem={(month: { item: Moment; index: number }) => {
        return (
          <Month
            key={month.index}
            currentMoment={month.item}
            selected={selected}
            type={type}
            onSelectDay={onSelectDay}
            showDateLabel={showDateLabel}
            min={min}
            max={max}
            disabledDate={disabledDate}
          />
        )
      }}
    />
  )
}

export default MonthsList
