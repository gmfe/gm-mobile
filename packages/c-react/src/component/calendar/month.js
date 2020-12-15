import { getLocale } from '@gm-mobile/locales'
import React from 'react'
import _ from 'lodash'

import moment from 'moment'
import PropTypes from 'prop-types'

import { Flex } from '../flex'
import Day from './day'

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

const Month = ({
  currentMoment,
  index,
  selected,
  type,
  onSelectDay,
  getDisabled,
  showDateLabel,
}) => {
  const getDayRowOfMonth = (currentMoment) => {
    if (
      moment(currentMoment).day(0).add(35, 'day').month() !==
      currentMoment.month()
    ) {
      return _.groupBy(_.range(35), (v) => parseInt(v / 7))
    }
    return _.groupBy(_.range(42), (v) => parseInt(v / 7))
  }

  const lastDay = moment(currentMoment).day(0).add(-1, 'day')
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
          style={{ padding: _.size(dayGroup) > 5 ? '5px 0' : '9px 0' }}
        >
          {_.map(v, (value, index) => {
            const day = moment(lastDay.add(1, 'day'))

            return (
              <Day
                key={`${value}${index}`}
                selected={selected}
                type={type}
                currentMoment={currentMoment}
                value={day}
                locIndex={index}
                onClick={onSelectDay}
                disabled={getDisabled(day)}
                showDateLabel={showDateLabel}
              />
            )
          })}
        </Flex>
      ))}
    </Flex>
  )
}

Month.propTypes = {
  currentMoment: PropTypes.object,
  index: PropTypes.number,
  selected: PropTypes.array,
  type: PropTypes.string,
  onSelectDay: PropTypes.func,
  getDisabled: PropTypes.func,
  showDateLabel: PropTypes.bool,
}

export default Month
