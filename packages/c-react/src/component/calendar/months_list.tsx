import React, { FC, useRef, useEffect } from 'react'
import moment, { Dayjs } from 'dayjs'
import _ from 'lodash'

import { VList, VListRef } from '../v_list'
import Month from './month'
import { CALENDAR_TYPE } from './util'
import { MonthListProps } from './types'
import usePreviousObject from './use_previous'

// 目前只支持固定高度，定为265
const MONTH_HEIGHT = 285

function whichValueChanged(
  prevArray: [Dayjs, Dayjs],
  currentArray: [Dayjs, Dayjs]
) {
  const changes: number[] = []

  if (!prevArray) {
    return 0
  }

  if (!moment(prevArray[0]).isSame(moment(currentArray[0]))) {
    changes.push(0)
  }

  if (!moment(prevArray[1]).isSame(moment(currentArray[1]))) {
    changes.push(1)
  }

  /** 没有变化 */
  if (changes.length === 0) return 0
  /** 两个都变化了 */
  if (changes.length === 2) return 1
  return 0
}

const MonthsList: FC<MonthListProps> = ({
  min,
  max,
  type,
  height,
  selected,
  onSelectDay,
  disabledDate,
  showDateLabel,
  canScrollWhenMaxOrMinChange = false,
  itemHeight = MONTH_HEIGHT,
}) => {
  const refList = useRef<VListRef>(null)
  const previous = usePreviousObject(selected)
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

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
      mMin = mMin.add(1, 'month')
    }

    return arr
  }
  const monthsList = computedMonthList()

  const scrollToTarget = (flag: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (selected.length) {
      const date = type === CALENDAR_TYPE.RANGE ? selected[1] : selected[0]
      const targetId = _.findIndex(
        monthsList,
        (item) =>
          moment(item).year() === moment(date).year() &&
          moment(item).month() === moment(date).month()
      )

      timeoutRef.current = setTimeout(() => {
        refList.current && refList.current.apiDoScrollToKey(targetId)
      }, 200)
    }
  }

  useEffect(() => {
    scrollToTarget(true)
  }, [])

  useEffect(() => {
    if (!canScrollWhenMaxOrMinChange) {
      return
    }
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    if (max || min) {
      const date = selected[0]

      const targetId = _.findIndex(
        monthsList,
        (item) =>
          moment(item).year() === moment(date).year() &&
          moment(item).month() === moment(date).month()
      )
      if (targetId !== -1) {
        setTimeout(() => {
          refList.current && refList.current.apiDoScrollToKey(targetId)
        }, 200)
      }
    }
  }, [max, min, monthsList])

  return (
    <VList
      ref={refList}
      className='m-calendar-content'
      data={monthsList}
      height={height}
      itemHeight={itemHeight}
      distance={0}
      renderItem={(month: { item: Dayjs; index: number }) => {
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
