import { getLocale } from '@gm-mobile/locales'
import React, { FC } from 'react'
import _ from 'lodash'
import moment, { Dayjs } from 'dayjs'

import { Flex } from '../flex'
import Day from './day'
import { MonthProps } from './types'

const months = [
  getLocale('1月'),
  getLocale('2月'),
  getLocale('3月'),
  getLocale('4月'),
  getLocale('5月'),
  getLocale('6月'),
  getLocale('7月'),
  getLocale('8月'),
  getLocale('9月'),
  getLocale('10月'),
  getLocale('11月'),
  getLocale('12月'),
]

const Month: FC<MonthProps> = ({
  min,
  max,
  type,
  selected,
  onSelectDay,
  disabledDate,
  currentMoment,
  showDateLabel,
}) => {
  const getDayRowOfMonth = (currentMoment: Dayjs) => {
    if (
      moment(currentMoment).day(0).add(35, 'day').month() !==
      currentMoment.month()
    ) {
      return _.groupBy(_.range(35), (v) => parseInt(`${v / 7}`))
    }
    return _.groupBy(_.range(42), (v) => parseInt(`${v / 7}`))
  }

  const getDisabled = (m: Date) => {
    // disabledDate 优先
    if (disabledDate) {
      return disabledDate(m)
    }

    const _min = min ? +moment(min).startOf('day') : null
    const _max = max ? +moment(max).startOf('day') : null
    const _m = +moment(m).startOf('day')

    let disabled = false

    if (_min && _m < _min) {
      disabled = true
    }
    if (_max && _m > _max) {
      disabled = true
    }

    return disabled
  }

  let lastDay = moment(currentMoment).day(0).add(-1, 'day')
  const month = currentMoment.month()
  const dayGroup = getDayRowOfMonth(currentMoment)

  return (
    <Flex column none>
      <Flex flex className='m-calendar-month-head m-bg-back m-text-bold'>
        {currentMoment.year()}
        {getLocale('年')}
        {months[month]}
      </Flex>
      {_.map(dayGroup, (v, i) => (
        <Flex
          none
          key={i}
          // 目前定了固定高度，防止当月天数较小留出空白，暂做一下处理
          style={{ padding: _.size(dayGroup) > 5 ? '5px 0' : '9px 0' }}
        >
          {_.map(v, (value, index) => {
            lastDay = lastDay.add(1, 'day')
            const day = moment(lastDay)
            return (
              <Day
                key={`${value}${index}`}
                selected={selected}
                type={type}
                currentMonth={currentMoment.month()}
                value={day}
                locIndex={index}
                onClick={onSelectDay}
                disabled={getDisabled(day.toDate())}
                showDateLabel={showDateLabel}
              />
            )
          })}
        </Flex>
      ))}
    </Flex>
  )
}

export default Month
