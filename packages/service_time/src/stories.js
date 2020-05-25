import React from 'react'
import { ReceiveTimePicker, MutiOrderReceiveTimePicker } from './index'
import { observable } from 'mobx'

const orderStr =
  '{"station_id":"T7442","fee_type":"CNY","sku_ids":["D22139675","D28050575","D9796764","D26974885"],"order_time_limit":{"e_span_time":1,"end":"03:30","start":"03:30"},"is_price_timing":false,"allow_remark":true,"order_many_days_total_rounding_price":326776,"total_rounding_price":163388,"cart_order_data":{"is_order_many_days":0,"order_many_days_receive_time":null,"order_many_days_receive_dates":["2020-05-26","2020-05-28"]},"out_of_distance":0,"date_time":null,"reward_sku_ids":[],"freight":2000,"remark":null,"order_many_days_total_price":326776,"receive_time":{"msg":"05-29 10:30~05-29 11:30","order_flag":true,"receive_time_limit":{"r_end":"11:30","s_span_time":1,"receiveTimeSpan":"60","r_start":"11:30","e_span_time":4,"receiveEndSpan":1,"weekdays":127,"time_config_type":2,"customer_weekdays":127,"time_config_id":"ST662"},"receive_time":{"defaultEnd":"11:30","defaultSpanEndFlag":4,"defaultSpanStartFlag":4,"defaultStart":"10:30"}},"salemenu_ids":["S7824","S13144","S6436","S14108"],"discounted_price":49380,"order_id":null,"total_price":163388,"order_many_days_freight":4000,"order_pay_method":2,"combine_good_ids":[]}'

export const order = () => {
  const handleClick = () => {
    ReceiveTimePicker.render({
      order: JSON.parse(orderStr),
    }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <button onClick={handleClick}>ReceiveTimePicker</button>
}

export const mutiOrder = () => {
  const handleClick = () => {
    MutiOrderReceiveTimePicker.render({
      order: JSON.parse(orderStr),
    }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <button onClick={handleClick}>MutiOrderReceiveTimePicker</button>
}

export default {
  title: '业务/ReceiveTimePicker',
}
