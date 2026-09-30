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
| enableUndeliveryFilter | 是否按不可配送时间（is_undelivery / undelivery_times）过滤可选项 | boolean | false | 否 |
| noEndReceiveTime | 最晚收货时间不可选，固定为「最早收货时间 + receiveTimeSpan（一个间隔）」，右列为禁用滚轮（仅展示这一个固定值，不可操作）。receiveTimeSpan 缺失或为 0 时该开关退化无效，恢复双列可选 | boolean | false | 否 |

#### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| render | 渲染收货时间选择弹窗 | props: 组件属性 | Promise，成功时返回选中的时间值 |
| hide | 关闭收货时间选择弹窗 | - | - |
| verifyReceiveTime | 校验是否有可用的收货周期时间 | order: 订单对象；enableUndeliveryFilter: 是否启用不可配送过滤（默认 false）；noEndReceiveTime: 是否为最晚时间自动计算模式（默认 false），与弹层入参保持一致 | boolean |

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
  },
  time_config: {                      // 时间配置（可缺省，历史配置无 forced_next_day_config 字段）
    forced_next_day_config: {         // 隔天送达时间段配置
      enable: 1,                      // 0 关闭 / 1 开启
      time_ranges: [                  // 1~3 段，HH:mm；end < start 表示跨天段（如 19:00~02:00）
        { start: "10:00", end: "12:00" },
        { start: "19:00", end: "02:00" }
      ]
    }
  }
}
```

### MutiOrderReceiveTimePicker 多日下单收货时间选择器

用于多日下单场景，支持当日/次日的时间选择。

隔天送达（同样读 `order.time_config.forced_next_day_config`）：**收货日期选择器不禁今天**（产品口径）；当下单时刻命中任一时间段 且 已选收货日期（`order.cart_order_data.order_many_days_receive_dates`）包含今天时，「每日收货时间」开始列的「当日」组被过滤、只能选「次日」组——今天的收货时间只能由「收货日期=今天 + 当日」产生，故按组合过滤而非禁日期。收货日期不含今天（最早明天）时「当日」照常可选（明天 + 当日 = 明天，合规）。窗口不跨天（无「次日」组）时过滤后无可选项，展示「暂无可选收货时间」。提交前「已选日期含今天 + 当日时间」的组合拦截由各端业务侧实现（组件库只管弹层内可选项）。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onConfirm | 确认选择后的回调函数，接收选中值 | function | _.noop | 否 |
| order | 订单对象，包含收货时间配置信息 | object | - | 是 |
| enableUndeliveryFilter | 是否按不可配送时间（is_undelivery / undelivery_times）过滤可选项 | boolean | false | 否 |
| noEndReceiveTime | 最晚收货时间不可选，固定为「最早收货时间 + receiveTimeSpan（一个间隔）」，右列为禁用滚轮（仅展示这一个固定值，不可操作）。receiveTimeSpan 缺失或为 0 时该开关退化无效，恢复双列可选 | boolean | false | 否 |

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

### 最晚收货时间自动计算（noEndReceiveTime）

```jsx
import { ReceiveTimePicker } from '@gm-mobile/service_time'

const handleSelect = () => {
  // 开启后用户只选「最早收货时间」；
  // 最晚收货时间固定为 最早 + receiveTimeSpan（一个间隔），
  // 右列为禁用滚轮，仅展示这个固定值、不给其他可选项。
  // onConfirm 的 endValue 仍返回计算值，回调协议不变。
  ReceiveTimePicker.render({
    order: orderData,
    noEndReceiveTime: true
  }).then((values) => {
    // receiveTimeSpan 为 "60" 时：
    // { startValue: [0, "20:30"], endValue: [0, "21:30"], ... }
    console.log('选中的收货时间:', values)
  })
}
```

MutiOrderReceiveTimePicker 同样支持 `noEndReceiveTime`，计算规则一致（endValue 的当日/次日标记按计算结果返回）。

### 隔天送达时间段过滤（order.time_config.forced_next_day_config）

```jsx
import { ReceiveTimePicker } from '@gm-mobile/service_time'

const handleSelect = () => {
  // 商家在运营时间上配置了「隔天送达时间段」：下单时刻命中任一时间段时，
  // 今天的收货时间不可选（含跨天延伸到今天的收货窗口），最早只能选明天。
  // 组件自动从 order.time_config.forced_next_day_config 读取（api.md 全局契约位置）；
  // 接口未透传该字段时（如 /order/confirm），由调用方合并进 order.time_config
  const orderData = {
    ...orderFromApi,
    time_config: {
      forced_next_day_config: {
        enable: 1,
        time_ranges: [
          { start: '10:00', end: '12:00' },
          { start: '19:00', end: '02:00' }  // 跨天段
        ]
      }
    }
  }

  // 入口校验与弹层走同一份 order，口径天然一致
  if (!ReceiveTimePicker.verifyReceiveTime(orderData)) {
    console.log('当前没有可用的收货时间')
    return
  }

  ReceiveTimePicker.render({
    order: orderData
  }).then((values) => {
    console.log('选中的收货时间:', values)
  })
}
```

默认收货时间指向今天时会自动回退到第一个可选项（明天）；enable 为 0、未配置或未命中时间段时行为不变。

单日（ReceiveTimePicker）过滤今天起算的收货周期；多日（MutiOrderReceiveTimePicker）按「日期 × 时间」组合处理（见下节），两者口径不同。

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
- 开启 `noEndReceiveTime` 后最晚收货时间 = 最早收货时间 + 一个 `receiveTimeSpan`，跨天时 `endValue` 的日期标记自动计算（普通下单为距今天数，多日下单为当日/次日）
- `order.time_config.forced_next_day_config` 开启且下单时刻命中任一时间段时，今天（含跨天延伸到今天）起算的收货周期整体被过滤，最早只能选明天；默认收货时间指向今天时自动回退到第一个可选项
- 多日选择器不禁收货日期今天，只在「已选日期含今天 + 命中时段」时过滤「当日」时间组（组合合规口径）；提交前的组合拦截由各端业务侧兜底
- **传给组件的 order 必须是整棵树纯化的普通对象**（如 mobx 的 `toJS(observableOrder)`）：`toJS` 对非 observable 的纯对象原样返回、不递归，若先做 `{...order, xxx}` 之类的字面量合并再造纯外壳再 `toJS`，嵌套 observable（`undelivery_times` / `time_ranges` / 日期数组）会原样泄漏进组件，被组件内 `_.cloneDeep` 损坏后在任何读取 `.length` 的地方崩溃
- 调用 `verifyReceiveTime()` 可以避免在没有可用时间时打开选择器
- 选择器会自动过滤过去的时间点，只显示当前时间之后的选项

## 相关组件

- [CouplingPicker](/@gm-mobile/react) - 联动选择器，ReceiveTimePicker 基于此组件实现
- [Picker](/@gm-mobile/react) - 基础选择器组件
