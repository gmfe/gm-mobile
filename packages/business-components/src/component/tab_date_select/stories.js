import React from 'react'
import moment from 'moment'
import TabDateSelect from './index'
import { Button, View } from '@gm-mobile/components'

export const normal = () => {
  const tabs = [
    {
      text: '按下单日期',
      value: 1,
      min: moment().subtract(365, 'day').toDate(),
      max: moment(),
    },
    {
      text: '按收货日期',
      value: 2,
      min: moment().subtract(365, 'day').toDate(),
      max: moment().add(30, 'days').toDate(),
    },
  ]

  const handleClick = () => {
    TabDateSelect.render({
      title: '选择日期',
      tabs,
      selectedTab: 1,
      begin: moment().add(-5, 'days').toDate(),
      end: moment().toDate(),
    }).then(({ selectedTab, begin, end }) => {
      console.log(selectedTab, begin, end)
    })
  }
  return <Button onClick={handleClick}>Show TabDateSelect</Button>
}

export default {
  title: '业务/TabDateSelect',
}
