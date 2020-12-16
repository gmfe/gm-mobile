import React, { FC, useRef, useEffect } from 'react'
import moment, { Moment } from 'moment'
import _ from 'lodash'

import VList from '../v_list'
import Month from './month'
import { CALENDAR_TYPE } from './util'
import { MonthListProps } from './types'

const MonthsList: FC<MonthListProps> = ({
  monthsList,
  selected,
  type,
  onSelectDay,
  getDisabled,
  showDateLabel,
  height,
}) => {
  const refList = useRef(null)

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
        refList.current.apiDoScrollToKey(targetId)
      }, 200)
    }
  }, [])

  return (
    <VList
      ref={refList}
      className='m-calendar-content'
      data={monthsList}
      height={height}
      itemHeight={265}
      distance={0}
      renderItem={(month: { item: Moment; index: number }) => {
        return (
          <Month
            key={month.index}
            currentMoment={month.item}
            selected={selected}
            type={type}
            onSelectDay={onSelectDay}
            getDisabled={getDisabled}
            showDateLabel={showDateLabel}
          />
        )
      }}
    />
  )
}

export default MonthsList
