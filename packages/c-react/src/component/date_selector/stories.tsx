import React from 'react'
import { View } from '../view'
import _ from 'lodash'
import { observable } from 'mobx'
import moment from 'moment'
import { DateSelector } from './date_selector'

const store = observable({
  selected: [],
  setSelected(selected: any) {
    this.selected = selected
  },
})

export const normal = () => {
  return (
    <View>
      <DateSelector
        selected={store.selected.slice()}
        onSelect={(selected) => store.setSelected(selected)}
      />
    </View>
  )
}

export const Max = () => {
  return (
    <View>
      <DateSelector
        selected={store.selected.slice()}
        onSelect={(selected) => store.setSelected(selected)}
        max={moment()
          .weekday(0)
          .startOf('day')
          .days(moment().days() + 7)
          .toDate()}
      />
    </View>
  )
}

export const DisabledDate = () => {
  const disabledDate = (date: Date) => {
    if (Number(moment(date).format('E')) > 5) return true
    return false
  }

  return (
    <View>
      <DateSelector
        selected={store.selected.slice()}
        onSelect={(selected) => store.setSelected(selected)}
        disabledDate={disabledDate}
      />
    </View>
  )
}

export default {
  title: '表单/DateSelector',
  component: DateSelector,
}
