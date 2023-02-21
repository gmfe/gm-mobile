---
nav: 组件
---

```tsx

import moment from 'dayjs'
import { TabDateSelect } from '@gm-mobile/c-business'
import { Button } from '@gm-mobile/c-react'

const tabs = [
  {
    text: '按下单日期',
    value: '1',
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
  },
  {
    text: '按收货日期',
    value: '2',
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
  },
]

 const Normal = () => {
  const handleClick = () => {
    TabDateSelect.render({
      title: '选择日期',
      tabs,
      selectedTab: '1',
      begin: moment().add(-5, 'days').toDate(),
      end: moment().toDate(),
    }).then(({ selectedTab, begin, end }) => {
      console.log(selectedTab, begin, end)
      return null
    }).catch(() => {})
  }
  return <Button onClick={handleClick}>Show TabDateSelect</Button>
}
export default Normal
```

```tsx
import moment from 'dayjs'
import { TabDateSelect } from '@gm-mobile/c-business'
import { Button } from '@gm-mobile/c-react'

const tabs = [
  {
    text: '按下单日期',
    value: '1',
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
  },
  {
    text: '按收货日期',
    value: '2',
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
  },
]
const WithServiceTime = () => {
  const data = tabs.map((item) => {
    return {
      ...item,
      selectedServiceTime: {
        type: 1,
        receive_time_limit: { e_span_time: 4 },
        order_time_limit: { e_span_time: 10 },
        value: 'time1',
        text: '这是运营时间1',
      },
    }
  })
  const serviceTimeList = [
    {
      type: 1,
      receive_time_limit: { e_span_time: 4 },
      order_time_limit: { e_span_time: 10 },
      value: 'time1',
      text: '这是运营时间1',
    },
    {
      type: 2,
      receive_time_limit: { e_span_time: 11 },
      order_time_limit: { e_span_time: 18 },
      value: 'time2',
      text: '这是运营时间2',
    },
  ]
  const handleClick = () => {
    TabDateSelect.render({
      title: '选择日期',
      tabs: data,
      selectedTab: '1',
      begin: moment().add(-5, 'days').toDate(),
      end: moment().toDate(),
      serviceTimeList,
    }).then(({ selectedTab, begin, end, serviceTimeId }) => {
      console.log(selectedTab, begin, end, serviceTimeId)
      return null
    }).catch(() => {})
  }
  return <Button onClick={handleClick}>Show TabDateSelect</Button>
}
export default WithServiceTime
```
