import React, { FC } from 'react'
import moment from 'moment'
import _ from 'lodash'

import BaseCalendar from './base'
import { CALENDAR_TYPE } from './util'
import { RangeCalendarProps } from './types'

const RangeCalendar: FC<RangeCalendarProps> = ({
  begin = moment().toDate(),
  end = moment().toDate(),
  onSelect = _.noop,
  ...rest
}) => {
  const handleSelected = (selected: Date[]) => {
    onSelect({ begin: selected[0], end: selected[1] })
  }

  return (
    <BaseCalendar
      {...rest}
      selected={[begin, end]}
      onSelect={handleSelected}
      type={CALENDAR_TYPE.RANGE}
    />
  )
}

export default RangeCalendar
