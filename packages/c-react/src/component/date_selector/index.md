# 表单/DateSelector

```tsx
import React from 'react'
import { View } from '../view'
import _ from 'lodash'
import { observable } from 'mobx'
import moment from 'dayjs'
import { observer } from 'mobx-react'

import { DateSelector } from './date_selector'

const store = observable({
  selected: [],
  setSelected(selected: any) {
    this.selected = selected
  },
})

const normal = () => {
  return (
    <View>
      <DateSelector
        selected={store.selected.slice()}
        onSelect={(selected) => store.setSelected(selected)}
      />
    </View>
  )
}

export default observer(normal)
```
```tsx
import React from 'react'
import { View } from '../view'
import _ from 'lodash'
import { observable } from 'mobx'
import moment, { extend } from 'dayjs'
import { observer } from 'mobx-react'

import { DateSelector } from './date_selector'



const store = observable({
  selected: [],
  setSelected(selected: any) {
    this.selected = selected
  },
})
const Max = () => {
  return (
    <View>
      <DateSelector
        selected={store.selected.slice()}
        onSelect={(selected) => store.setSelected(selected)}
        max={moment()
          .weekday(0)
          .startOf('day')
          .day(moment().day() + 7)
          .toDate()}
      />
    </View>
  )
}

export default observer(Max)
```
```tsx
import React from 'react'
import { View } from '../view'
import _ from 'lodash'
import { observable } from 'mobx'
import moment, { extend } from 'dayjs'
import { observer } from 'mobx-react'
import { DateSelector } from './date_selector'

const store = observable({
  selected: [],
  setSelected(selected: any) {
    this.selected = selected
  },
})
const DisabledDate = () => {
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

export default observer(DisabledDate)
```

