import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import { View } from '../view'
import Calendar from './calendar'
import RangeCalendar from './range_calendar'
import MultipleCalendar from './multiple_calendar'

const min = moment().add(-4, 'd').toDate()
const max = moment().toDate()

const store = observable({
  mulSelected: [min, max, moment().add(-3, 'd').toDate()],
  oneSelected: min,
  begin: min,
  end: max,
  setRangeSelected(selected: { begin: Date; end: Date }) {
    this.begin = selected.begin
    this.end = selected.end
  },
  setMulSelected(selected: Date[]) {
    this.mulSelected = selected
  },
  setOneSelected(selected: Date) {
    this.oneSelected = selected
  },
})

export const info = () => (
  <View className='m-text-16 m-padding-10'>
    <View>封装多种类型选择 Calendar</View>
    <View>单选类型 提供了 Calendar</View>
    <View>range类型 提供了 RangeCalendar</View>
    <View>multiple类型 提供了 MultipleCalendar</View>
  </View>
)

export const one = () => {
  return (
    <Calendar
      min={moment().add(-10, 'month').toDate()}
      max={moment().toDate()}
      height={500}
      selected={store.oneSelected}
      onSelect={(selected) => store.setOneSelected(selected)}
    />
  )
}

export const range = () => {
  return (
    <RangeCalendar
      min={moment().add(-10, 'month').toDate()}
      max={moment().toDate()}
      begin={store.begin}
      end={store.end}
      onSelect={(selected) => store.setRangeSelected(selected)}
      showDateLabel
    />
  )
}

export const multiple = () => {
  return (
    <MultipleCalendar
      min={moment().add(-1, 'month').toDate()}
      max={moment().toDate()}
      selected={store.mulSelected}
      onSelect={(selected) => store.setMulSelected(selected)}
    />
  )
}

export default {
  title: '表单/Calendar',
}
