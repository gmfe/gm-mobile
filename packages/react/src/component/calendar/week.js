import { getLocale } from '../../../../locales'
import React from 'react'
import _ from 'lodash'

import Flex from '../flex'

const weekDays = [
  getLocale('日'),
  getLocale('一'),
  getLocale('二'),
  getLocale('三'),
  getLocale('四'),
  getLocale('五'),
  getLocale('六'),
]
const Week = () => {
  return (
    <Flex className='m-bg-back'>
      {_.map(weekDays, (v, i) => (
        <Flex
          flex
          justifyCenter
          alignCenter
          key={i}
          className='m-calendar-day-name'
        >
          {v}
        </Flex>
      ))}
    </Flex>
  )
}

export default Week
