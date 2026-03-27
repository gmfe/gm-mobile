# ReceiveTimePicker 收货时间选择器

## 简介

收货时间选择器 - 用于用户下单时选择收货时间范围，提供普通下单和多日下单两种模式。

## API

### ReceiveTimePicker 普通下单收货时间选择器

用于单次下单场景，用户可以选择收货的开始时间和结束时间。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onConfirm | 确认选择后的回调函数，接收选中值 | function | _.noop | 否 |
| order | 订单对象，包含收货时间配置信息 | object | - | 是 |

#### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| render | 渲染收货时间选择弹窗 | props: 组件属性 | Promise，成功时返回选中的时间值 |
| hide | 关闭收货时间选择弹窗 | - | - |
| verifyReceiveTime | 校验是否有可用的收货周期时间 | order: 订单对象 | boolean |

#### onConfirm 回调参数

```javascript
{
  startValue: [日期偏移量, 时间字符串],  // 例如: [0, "20:30"]
  endValue: [日期偏移量, 时间字符串],    // 例如: [1, "00:00"]
  isLastCycle: boolean,                  // 是否为上个周期
  receiveTimeLimit: object               // 收货时间限制配置
}
```

#### order 对象结构

```javascript
{
  receive_time: {
    receive_time_limit: {
      r_start: "20:30",              // 收货开始时间
      r_end: "00:00",                // 收货结束时间
      receiveTimeSpan: "60",         // 时间间隔（分钟）
      s_span_time: 0,                // 开始跨度（天数）
      e_span_time: 2,                // 结束跨度（天数）
      receiveEndSpan: 1,             // 结束跨度（天数）
      time_config_type: 2,           // 时间配置类型
      weekdays: 127,                 // 星期配置（位掩码）
      customer_weekdays: 127         // 客户星期配置（位掩码）
    },
    receive_time: {                   // 默认收货时间
      defaultStart: "21:30",
      defaultEnd: "22:30",
      defaultSpanStartFlag: 0,
      defaultSpanEndFlag: 0
    },
    msg: "06-02 20:30~06-02 21:30"
  },
  order_time_limit: {
    start: "00:00",                   // 下单开始时间
    end: "00:00",                     // 下单结束时间
    e_span_time: 1                    // 下单结束跨度
  }
}
```

### MutiOrderReceiveTimePicker 多日下单收货时间选择器

用于多日下单场景，支持当日/次日的时间选择。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onConfirm | 确认选择后的回调函数，接收选中值 | function | _.noop | 否 |
| order | 订单对象，包含收货时间配置信息 | object | - | 是 |

#### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| render | 渲染收货时间选择弹窗 | props: 组件属性（支持 title 自定义标题） | Promise，成功时返回选中的时间值 |
| hide | 关闭收货时间选择弹窗 | - | - |

#### render 方法参数

```javascript
MutiOrderReceiveTimePicker.render({
  order: orderObject,    // 订单对象（必填）
  title: '自定义标题'    // 弹窗标题（可选）
})
```

#### onConfirm 回调参数

```javascript
{
  startValue: [0/1, "HH:mm"],  // [0:当日, 1:次日, 时间字符串]
  endValue: [0/1, "HH:mm"]     // [0:当日, 1:次日, 时间字符串]
}
```

## 示例

### ReceiveTimePicker 基础用法

```jsx
import { ReceiveTimePicker } from '@gm-mobile/service_time'

const orderData = {
  receive_time: {
    receive_time_limit: {
      r_start: "20:30",
      r_end: "00:00",
      customer_weekdays: 127,
      time_config_id: "ST1305",
      time_config_type: 2,
      e_span_time: 2,
      receiveEndSpan: 1,
      weekdays: 127,
      receiveTimeSpan: "60",
      s_span_time: 0
    },
    msg: "06-02 20:30~06-02 21:30",
    order_flag: true,
    receive_time: {
      defaultEnd: "22:30",
      defaultSpanStartFlag: 0,
      defaultSpanEndFlag: 0,
      defaultStart: "21:30"
    }
  },
  order_time_limit: {
    end: "00:00",
    start: "00:00",
    e_span_time: 1
  }
}

const handleSelect = () => {
  ReceiveTimePicker.render({
    order: orderData
  }).then((values) => {
    console.log('选中的收货时间:', values)
    // {
    //   startValue: [0, "20:30"],
    //   endValue: [0, "21:30"],
    //   isLastCycle: false,
    //   receiveTimeLimit: {...}
    // }
  }).catch(() => {
    console.log('取消选择')
  })
}

return <button onClick={handleSelect}>选择收货时间</button>
```

### ReceiveTimePicker 校验可用时间

```jsx
import { ReceiveTimePicker } from '@gm-mobile/service_time'

const checkReceiveTime = () => {
  const hasReceiveTime = ReceiveTimePicker.verifyReceiveTime(orderData)
  if (!hasReceiveTime) {
    console.log('当前没有可用的收货时间')
    return
  }
  // 显示收货时间选择器
  ReceiveTimePicker.render({ order: orderData })
}
```

### MutiOrderReceiveTimePicker 基础用法

```jsx
import { MutiOrderReceiveTimePicker } from '@gm-mobile/service_time'

const orderData = {
  receive_time: {
    receive_time_limit: {
      r_start: "20:30",
      r_end: "00:00",
      receiveTimeSpan: "60"
    }
  }
}

const handleSelect = () => {
  MutiOrderReceiveTimePicker.render({
    order: orderData,
    title: '选择多日收货时间'  // 自定义标题
  }).then((values) => {
    console.log('选中的收货时间:', values)
    // {
    //   startValue: [0, "20:30"],  // 当日 20:30
    //   endValue: [1, "00:00"]     // 次日 00:00
    // }
  }).catch(() => {
    console.log('取消选择')
  })
}

return <button onClick={handleSelect}>选择多日收货时间</button>
```

### 常见用法：根据业务场景选择组件

```jsx
import { ReceiveTimePicker, MutiOrderReceiveTimePicker } from '@gm-mobile/service_time'

const ReceiveTimeSelector = ({ isMultiOrder, orderData }) => {
  const handleSelect = () => {
    const Picker = isMultiOrder ? MutiOrderReceiveTimePicker : ReceiveTimePicker

    Picker.render({
      order: orderData,
      ...(isMultiOrder ? { title: '多日订单收货时间' } : {})
    }).then((values) => {
      // 处理选中的时间
      console.log('收货时间:', values)
      // 提交到后端
      submitOrder(values)
    })
  }

  return <button onClick={handleSelect}>选择收货时间</button>
}
```

### 高级用法：结合业务逻辑处理

```jsx
import { ReceiveTimePicker } from '@gm-mobile/service_time'

const OrderForm = ({ orderData }) => {
  const [receiveTime, setReceiveTime] = useState(null)

  const handleTimeSelect = async () => {
    // 先校验是否有可用时间
    if (!ReceiveTimePicker.verifyReceiveTime(orderData)) {
      alert('当前时间段不支持收货，请稍后再试')
      return
    }

    try {
      const values = await ReceiveTimePicker.render({
        order: orderData
      })

      // 格式化选中的时间
      const [startDays, startTime] = values.startValue
      const [endDays, endTime] = values.endValue

      setReceiveTime({
        start: `${startDays === 0 ? '当日' : '次日'} ${startTime}`,
        end: `${endDays === 0 ? '当日' : '次日'} ${endTime}`,
        raw: values
      })

      console.log('收货时间已选择:', receiveTime)
    } catch (error) {
      console.log('用户取消选择')
    }
  }

  return (
    <div>
      <div>已选收货时间: {receiveTime ? receiveTime.start : '未选择'}</div>
      <button onClick={handleTimeSelect}>选择收货时间</button>
    </div>
  )
}
```

## 注意事项

- ReceiveTimePicker 和 MutiOrderReceiveTimePicker 都使用 `render()` 静态方法打开弹窗，返回 Promise
- 用户点击遮罩层或返回按钮会触发 Promise 的 reject，需要做错误处理
- order 对象结构复杂，必须包含完整的 `receive_time.receive_time_limit` 配置
- ReceiveTimePicker 会根据订单的运营时间自动计算可用的收货时间段
- MutiOrderReceiveTimePicker 简化了时间计算逻辑，适用于多日订单场景
- 收货时间配置中的 `weekdays` 使用位掩码表示星期（1-127，每位代表一周中的某天）
- 时间间隔 `receiveTimeSpan` 会影响可选时间的密度，单位为分钟
- 调用 `verifyReceiveTime()` 可以避免在没有可用时间时打开选择器
- 选择器会自动过滤过去的时间点，只显示当前时间之后的选项

## 相关组件

- [CouplingPicker](/@gm-mobile/react) - 联动选择器，ReceiveTimePicker 基于此组件实现
- [Picker](/@gm-mobile/react) - 基础选择器组件
