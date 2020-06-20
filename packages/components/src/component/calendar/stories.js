import React, { useRef, useEffect } from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import View from '../view'
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
  setRangeSelected({ begin, end }) {
    this.begin = begin
    this.end = end
  },
  setMulSelected(selected) {
    this.mulSelected = selected
  },
  setOneSelected(selected) {
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
  const refCalendar = useRef(null)
  useEffect(() => {
    setTimeout(() => {
      refCalendar.current.apiScrollToSelected()
    }, 250)
  }, [])
  return (
    <View style={{ height: '400px' }}>
      <Calendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        selected={store.oneSelected}
        onSelect={(selected) => store.setOneSelected(selected)}
      />
    </View>
  )
}

export const range = () => {
  const refCalendar = useRef(null)
  return (
    <View style={{ height: '400px' }}>
      <RangeCalendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        begin={store.begin}
        end={store.end}
        onSelect={(selected) => store.setRangeSelected(selected)}
        showDateLabel
      />
    </View>
  )
}

export const multiple = () => {
  const refCalendar = useRef(null)
  return (
    <View style={{ height: '400px' }}>
      <MultipleCalendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        selected={store.mulSelected}
        onSelect={(selected) => store.setMulSelected(selected)}
      />
    </View>
  )
}

export default {
  title: '表单/Calendar',
}
