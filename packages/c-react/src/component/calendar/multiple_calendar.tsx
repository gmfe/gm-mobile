import React, { FC } from 'react'

import BaseCalendar from './base'
import { CALENDAR_TYPE } from './util'
import { MultipleCalendarProps } from './types'

const MultipleCalendar: FC<MultipleCalendarProps> = (props) => {
  return <BaseCalendar {...props} type={CALENDAR_TYPE.MULTIPLE} />
}

export default MultipleCalendar
