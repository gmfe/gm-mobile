import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'

import Calendar from './'

const refCalendar = React.createRef(null)

const store = {
  begin: moment().add(-4, 'd').toDate(),
  end: moment().toDate(),
  setDate(begin, end) {
    this.begin = begin
    this.end = end
  },
}
const normalStore = observable(store)
const otherStore = observable(store)

export const Default = () => (
  <Calendar
    ref={refCalendar}
    begin={normalStore.begin}
    end={normalStore.end}
    onChange={({ begin, end }) => normalStore.setDate(begin, end)}
  />
)

export const MinAndMax = () => (
  <div style={{ height: '400px' }}>
    <Calendar
      ref={refCalendar}
      min={moment().add(-1, 'month').toDate()}
      max={moment().toDate()}
      begin={otherStore.begin}
      end={otherStore.end}
      onChange={({ begin, end }) => otherStore.setDate(begin, end)}
      showDateLabel
    />
  </div>
)

export default {
  title: '表单/Calendar',
}
