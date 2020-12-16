import React, { FC } from 'react'

import BaseCalendar from './base'
import { MultipleCalendarProps } from './types'

const MultipleCalendar: FC<MultipleCalendarProps> = (props) => {
  return <BaseCalendar {...props} type='multiple' />
}

export default MultipleCalendar
