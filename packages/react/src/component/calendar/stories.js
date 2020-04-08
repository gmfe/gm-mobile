import React from 'react'
import moment from 'moment'
import { observable } from 'mobx'
import { storiesOf } from '@storybook/react'

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

storiesOf('Calendar', module)
  .add('default', () => (
    <Calendar
      ref={refCalendar}
      begin={normalStore.begin}
      end={normalStore.end}
      onChange={({ begin, end }) => normalStore.setDate(begin, end)}
      label
    />
  ))
  .add('min && max', () => (
    <Calendar
      ref={refCalendar}
      min={moment().add(-1, 'month').toDate()}
      max={moment().toDate()}
      begin={otherStore.begin}
      end={otherStore.end}
      onChange={({ begin, end }) => otherStore.setDate(begin, end)}
      label
    />
  ))
