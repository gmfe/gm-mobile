import React, { FC } from 'react'
import moment from 'moment'
import _ from 'lodash'

import BaseCalendar from './base'
import { CALENDAR_TYPE } from './util'
import { RangeCalendarProps } from './types'

const RangeCalendar: FC<RangeCalendarProps> = ({
  begin,
  end,
  onSelect = _.noop,
  ...rest
}) => {
  const handleSelected = (selected: Date[]) => {
    onSelect({ begin: selected[0], end: selected[1] })
  }

  const _begin: Date = begin || moment().toDate()
  const _end: Date = end || moment().toDate()

  return (
    <BaseCalendar
      {...rest}
      selected={[_begin, _end]}
      onSelect={handleSelected}
      type={CALENDAR_TYPE.RANGE}
    />
  )
}

export default RangeCalendar
