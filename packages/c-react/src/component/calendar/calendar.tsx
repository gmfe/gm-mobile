import React, { FC } from 'react'
import moment from 'moment'
import _ from 'lodash'

import BaseCalendar from './base'
import { CALENDAR_TYPE } from './util'
import { CalendarProps } from './types'

export const Calendar: FC<CalendarProps> = ({
  selected = moment().toDate(),
  onSelect = _.noop,
  ...rest
}) => {
  const handleSelect = (selected: Date[]) => {
    onSelect(selected[0])
  }

  return (
    <BaseCalendar
      {...rest}
      selected={[selected]}
      onSelect={handleSelect}
      type={CALENDAR_TYPE.SINGLE}
    />
  )
}

export default Calendar
