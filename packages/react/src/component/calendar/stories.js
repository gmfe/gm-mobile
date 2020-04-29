import React from 'react'
import moment from 'moment'
import { observable, toJS } from 'mobx'

import Calendar from './calendar'
import RangeCalendar from './range_calendar'
import MultipleCalendar from './multiple_calendar'

const refCalendar = React.createRef(null)

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
  <div className='m-text-16 m-padding-10'>
    封装多种类型选择 Calendar
    <br />
    单选类型 提供了 Calendar
    <br />
    range类型 提供了 RangeCalendar
    <br />
    multiple类型 提供了 MultipleCalendar
  </div>
)

export const one = () => {
  return (
    <div style={{ height: '400px' }}>
      <Calendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        selected={store.oneSelected}
        onSelect={(selected) => store.setOneSelected(selected)}
      />
    </div>
  )
}

export const range = () => {
  return (
    <div style={{ height: '400px' }}>
      <RangeCalendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        begin={store.begin}
        end={store.end}
        onSelect={(selected) => store.setRangeSelected(selected)}
        showDateLabel
      />
    </div>
  )
}

export const multiple = () => {
  return (
    <div style={{ height: '400px' }}>
      <MultipleCalendar
        ref={refCalendar}
        min={moment().add(-1, 'month').toDate()}
        max={moment().toDate()}
        selected={store.mulSelected}
        onSelect={(selected) => store.setMulSelected(selected)}
      />
    </div>
  )
}

export default {
  title: '表单/Calendar',
}
