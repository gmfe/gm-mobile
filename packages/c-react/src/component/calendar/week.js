import { getLocale } from '@gm-mobile/locales'
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
    <Flex none className='m-calendar-week'>
      {_.map(weekDays, (v, i) => (
        <Flex flex justifyCenter alignCenter key={i}>
          {v}
        </Flex>
      ))}
    </Flex>
  )
}

export default Week
