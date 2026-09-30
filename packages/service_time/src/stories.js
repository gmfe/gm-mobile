import React from 'react'
import { ReceiveTimePicker, MutiOrderReceiveTimePicker } from './index'
import { observable } from 'mobx'
import moment from 'moment'

const orderStr =
  '{"remark":null,"receive_time":{"receive_time_limit":{"r_start":"20:30","r_end":"00:00","customer_weekdays":127,"time_config_id":"ST1305","time_config_type":2,"e_span_time":2,"receiveEndSpan":1,"weekdays":127,"receiveTimeSpan":"60","s_span_time":0},"msg":"06-02 20:30~06-02 21:30","order_flag":true,"receive_time":{"defaultEnd":"22:30","defaultSpanStartFlag":0,"defaultSpanEndFlag":0,"defaultStart":"21:30"}},"cart_order_data":{"order_many_days_receive_time":null,"order_many_days_receive_dates":[],"is_order_many_days":0},"order_time_limit":{"end":"00:00","start":"00:00","e_span_time":1},"order_id":null,"freight":-5,"total_price":200,"salemenu_ids":["S40596"],"date_time":null,"reward_sku_ids":[],"allow_remark":false,"order_many_days_freight":-5,"total_rounding_price":200,"order_many_days_total_price":200,"sku_ids":["D39872331","D39872327"],"fee_type":"HKD","is_price_timing":false,"station_id":"T7936","order_many_days_total_rounding_price":200,"out_of_distance":0,"discounted_price":0,"combine_good_ids":[],"order_pay_method":2}'

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
      title: '标题'
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

export const orderNoEnd = () => {
  const handleClick = () => {
    ReceiveTimePicker.render({
      order: JSON.parse(orderStr),
      noEndReceiveTime: true
    }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <button onClick={handleClick}>ReceiveTimePicker noEndReceiveTime</button>
}

export const orderForcedNextDay = () => {
  const handleClick = () => {
    // 隔天送达配置走 order.time_config.forced_next_day_config（api.md 全局契约位置），
    // 接口未透传时由调用方合并进 order
    const order = {
      ...JSON.parse(orderStr),
      time_config: {
        forced_next_day_config: {
          enable: 1,
          // 三段拼起来覆盖全天，任何时刻打开都能看到效果：今天被过滤，最早只能选明天
          time_ranges: [
            { start: '00:00', end: '12:00' },
            { start: '11:00', end: '23:59' },
            { start: '23:50', end: '00:10' }
          ]
        }
      }
    }

    ReceiveTimePicker.render({ order }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return (
    <button onClick={handleClick}>
      ReceiveTimePicker forced_next_day_config
    </button>
  )
}

export const mutiOrderForcedNextDay = () => {
  const handleClick = () => {
    const base = JSON.parse(orderStr)
    const order = {
      ...base,
      receive_time: {
        ...base.receive_time,
        receive_time_limit: {
          ...base.receive_time.receive_time_limit,
          // 跨天窗口：当日 20:00~23:00 + 次日 00:00~06:00
          r_start: '20:00',
          r_end: '06:00'
        }
      },
      time_config: {
        forced_next_day_config: {
          enable: 1,
          // 三段拼起来覆盖全天：命中时段 + 已选收货日期含今天 → 「每日收货时间」只剩「次日」组
          time_ranges: [
            { start: '00:00', end: '12:00' },
            { start: '11:00', end: '23:59' },
            { start: '23:50', end: '00:10' }
          ]
        }
      },
      cart_order_data: {
        ...base.cart_order_data,
        // 已选收货日期含今天
        order_many_days_receive_dates: [moment().format('YYYY-MM-DD')]
      }
    }

    MutiOrderReceiveTimePicker.render({
      order,
      title: '标题'
    }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return (
    <button onClick={handleClick}>
      MutiOrderReceiveTimePicker forced_next_day_config
    </button>
  )
}

export const mutiOrderNoEnd = () => {
  const handleClick = () => {
    MutiOrderReceiveTimePicker.render({
      order: JSON.parse(orderStr),
      title: '标题',
      noEndReceiveTime: true
    }).then(
      (values) => {
        console.log('resolve', values)
      },
      () => {
        console.log('reject')
      }
    )
  }

  return <button onClick={handleClick}>MutiOrderReceiveTimePicker noEndReceiveTime</button>
}

export default {
  title: '业务/ReceiveTimePicker',
}
