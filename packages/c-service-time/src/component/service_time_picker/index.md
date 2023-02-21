# 业务/ReceiveTimePicker

```tsx
import React from 'react'
import ReceiveTimePicker from './receive_time_picker'
import MultiOrderReceiveTimePicker from './multi_order_receive_time_picker'
import { Button } from '@gm-mobile/c-react'

const orderStr =
  '{"remark":null,"receive_time":{"receive_time_limit":{"r_start":"20:30","r_end":"00:00","customer_weekdays":127,"time_config_id":"ST1305","time_config_type":2,"e_span_time":2,"receiveEndSpan":1,"weekdays":127,"receiveTimeSpan":"60","s_span_time":0},"msg":"06-02 20:30~06-02 21:30","order_flag":true,"receive_time":{"defaultEnd":"22:30","defaultSpanStartFlag":0,"defaultSpanEndFlag":0,"defaultStart":"21:30"}},"cart_order_data":{"order_many_days_receive_time":null,"order_many_days_receive_dates":[],"is_order_many_days":0},"order_time_limit":{"end":"00:00","start":"00:00","e_span_time":1},"order_id":null,"freight":-5,"total_price":200,"salemenu_ids":["S40596"],"date_time":null,"reward_sku_ids":[],"allow_remark":false,"order_many_days_freight":-5,"total_rounding_price":200,"order_many_days_total_price":200,"sku_ids":["D39872331","D39872327"],"fee_type":"HKD","is_price_timing":false,"station_id":"T7936","order_many_days_total_rounding_price":200,"out_of_distance":0,"discounted_price":0,"combine_good_ids":[],"order_pay_method":2}'

const order = () => {
  const handleClick = () => {
    ReceiveTimePicker.render({
      order: JSON.parse(orderStr),
    }).then(
      (values) => {
        console.log('resolve', values)
        return null
      },
      (err) => {
        console.log('reject', err)
      }
    )
  }

  return <Button onClick={handleClick}>ReceiveTimePicker</Button>
}
export default order
```

```tsx
import React from 'react'
import ReceiveTimePicker from './receive_time_picker'
import MultiOrderReceiveTimePicker from './multi_order_receive_time_picker'
import { Button } from '@gm-mobile/c-react'

const orderStr =
  '{"remark":null,"receive_time":{"receive_time_limit":{"r_start":"20:30","r_end":"00:00","customer_weekdays":127,"time_config_id":"ST1305","time_config_type":2,"e_span_time":2,"receiveEndSpan":1,"weekdays":127,"receiveTimeSpan":"60","s_span_time":0},"msg":"06-02 20:30~06-02 21:30","order_flag":true,"receive_time":{"defaultEnd":"22:30","defaultSpanStartFlag":0,"defaultSpanEndFlag":0,"defaultStart":"21:30"}},"cart_order_data":{"order_many_days_receive_time":null,"order_many_days_receive_dates":[],"is_order_many_days":0},"order_time_limit":{"end":"00:00","start":"00:00","e_span_time":1},"order_id":null,"freight":-5,"total_price":200,"salemenu_ids":["S40596"],"date_time":null,"reward_sku_ids":[],"allow_remark":false,"order_many_days_freight":-5,"total_rounding_price":200,"order_many_days_total_price":200,"sku_ids":["D39872331","D39872327"],"fee_type":"HKD","is_price_timing":false,"station_id":"T7936","order_many_days_total_rounding_price":200,"out_of_distance":0,"discounted_price":0,"combine_good_ids":[],"order_pay_method":2}'
  
const multiOrder = () => {
  const handleClick = () => {
    MultiOrderReceiveTimePicker.render({
      order: JSON.parse(orderStr),
      title: '标题',
    }).then(
      (values) => {
        console.log('resolve', values)
        return null
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <Button onClick={handleClick}>MultiOrderReceiveTimePicker</Button>
}
export default multiOrder
```
