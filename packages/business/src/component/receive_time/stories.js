import React from 'react'
import { ReceiveTimePicker, MutiOrderReceiveTimePicker } from './index'
import { observable } from 'mobx'

const orderStr =
  '{"total_rounding_price":13941,"station_id":"T7442","out_of_distance":0,"allow_remark":true,"salemenu_ids":["S14108","S6534","S6436"],"order_pay_method":2,"cart_order_data":{"order_many_days_receive_dates":[],"order_many_days_receive_time":{"defaultSpanEndFlag":0,"defaultSpanStartFlag":0,"defaultEnd":"17:00","defaultStart":"11:00"},"is_order_many_days":1},"order_many_days_freight":2000,"receive_time":{"msg":"04-28 10:30~04-28 10:45","receive_time":{"defaultSpanEndFlag":1,"defaultSpanStartFlag":1,"defaultEnd":"10:45","defaultStart":"10:30"},"order_flag":true,"receive_time_limit":{"customer_weekdays":127,"receiveTimeSpan":"15","r_end":"10:30","time_config_id":"ST662","time_config_type":2,"receiveEndSpan":1,"r_start":"10:30","s_span_time":1,"weekdays":127,"e_span_time":4}},"order_id":null,"total_price":13941,"discounted_price":0,"is_price_timing":false,"combine_good_ids":["M00448_S14108","M00541_S6534"],"fee_type":"CNY","order_many_days_total_price":13941,"date_time":null,"reward_sku_ids":[],"freight":2000,"order_time_limit":{"start":"03:30","end":"03:30","e_span_time":1},"remark":null,"order_many_days_total_rounding_price":13941,"sku_ids":["D23334546","D9796764"]}'

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
