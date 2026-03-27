# Calendar

## 简介

Calendar 日历组件 - 用于日期选择的日历组件，支持单选、日期范围选择和多选三种模式，提供灵活的日期限制和自定义功能。

## API

### Calendar Props

Calendar 是单选日历组件，用于选择单个日期。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| selected | 当前选中日期 | Date 对象 | - | 否 |
| onSelect | 选中日期的回调函数 | function | - | 否 |
| min | 可选日期最小值 | Date 对象 | - | 否 |
| max | 可选日期最大值 | Date 对象 | - | 否 |
| disabledDate | 自定义不可选日期函数 | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**onSelect 回调参数**：
```javascript
(selected: Date) => void
```

**disabledDate 函数签名**：
```javascript
(currentDate: moment) => boolean
// 返回 true 表示该日期不可选
```

### RangeCalendar Props

RangeCalendar 是日期范围选择组件，用于选择开始和结束日期。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| begin | 开始日期 | Date 对象 | - | 否 |
| end | 结束日期 | Date 对象 | - | 否 |
| onSelect | 选中日期范围的回调函数 | function | - | 否 |
| min | 可选日期最小值 | Date 对象 | - | 否 |
| max | 可选日期最大值 | Date 对象 | - | 否 |
| showDateLabel | 是否显示日期下方标签备注（开始/结束） | boolean | false | 否 |
| disabledDate | 自定义不可选日期函数 | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**onSelect 回调参数**：
```javascript
({ begin: Date, end: Date }) => void
```

### MultipleCalendar Props

MultipleCalendar 是多选日历组件，用于选择多个日期。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| selected | 当前选中日期数组 | array | - | 是 |
| onSelect | 选中日期数组的回调函数 | function | - | 否 |
| min | 可选日期最小值 | Date 对象 | - | 否 |
| max | 可选日期最大值 | Date 对象 | - | 否 |
| disabledDate | 自定义不可选日期函数 | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**onSelect 回调参数**：
```javascript
(selected: Date[]) => void
```

### 共同方法

所有三个日历组件都提供了 `apiScrollToSelected` 方法，可以通过 ref 调用：

```javascript
const calendarRef = useRef()

// 滚动到选中的日期位置
calendarRef.current.apiScrollToSelected()
```

## 示例

### 单选日历（Calendar）

```jsx
import { Calendar } from '@gm-mobile/react'
import moment from 'moment'

const [selected, setSelected] = useState(moment().toDate())

<Calendar
  min={moment().add(-1, 'month').toDate()}
  max={moment().toDate()}
  selected={selected}
  onSelect={(date) => {
    setSelected(date)
    console.log('选中日期:', moment(date).format('YYYY-MM-DD'))
  }}
/>
```

### 日期范围选择（RangeCalendar）

```jsx
import { RangeCalendar } from '@gm-mobile/react'
import moment from 'moment'

const [begin, setBegin] = useState(moment().add(-7, 'days').toDate())
const [end, setEnd] = useState(moment().toDate())

<RangeCalendar
  min={moment().add(-1, 'month').toDate()}
  max={moment().toDate()}
  begin={begin}
  end={end}
  showDateLabel
  onSelect={({ begin, end }) => {
    setBegin(begin)
    setEnd(end)
    console.log('开始日期:', moment(begin).format('YYYY-MM-DD'))
    console.log('结束日期:', moment(end).format('YYYY-MM-DD'))
  }}
/>
```

### 多选日历（MultipleCalendar）

```jsx
import { MultipleCalendar } from '@gm-mobile/react'
import moment from 'moment'

const [selected, setSelected] = useState([
  moment().toDate(),
  moment().add(1, 'day').toDate(),
  moment().add(2, 'day').toDate(),
])

<MultipleCalendar
  min={moment().add(-1, 'month').toDate()}
  max={moment().add(1, 'month').toDate()}
  selected={selected}
  onSelect={(dates) => {
    setSelected(dates)
    console.log('选中的日期数量:', dates.length)
  }}
/>
```

### 高级用法

```jsx
import { Calendar, RangeCalendar, MultipleCalendar } from '@gm-mobile/react'
import moment from 'moment'

// 自定义不可选日期（禁用周末）
const disabledDate = (date) => {
  const day = date.day()
  return day === 0 || day === 6 // 0是周日，6是周六
}

<Calendar
  selected={selected}
  onSelect={setSelected}
  disabledDate={disabledDate}
/>

// 限制可选日期范围
<RangeCalendar
  begin={begin}
  end={end}
  onSelect={handleRangeSelect}
  min={moment().startOf('month').toDate()}
  max={moment().endOf('month').toDate()}
/>

// 使用 ref 滚动到选中位置
const calendarRef = useRef()

<Calendar
  ref={calendarRef}
  selected={selected}
  onSelect={setSelected}
/>

<Button onClick={() => calendarRef.current.apiScrollToSelected()}>
  滚动到选中日期
</Button>

// 自定义样式
<Calendar
  selected={selected}
  onSelect={setSelected}
  className='custom-calendar'
  style={{ height: '400px' }}
/>
```

## 注意事项

1. **日期格式**：
   - 所有日期属性（selected、begin、end、min、max）都接受 JavaScript 原生 Date 对象
   - 建议使用 `moment.js` 或类似库来创建和操作日期对象
   - 日期比较时会自动处理到天级别（忽略时分秒）

2. **日期范围选择的行为**：
   - RangeCalendar 采用两次点击选择方式：第一次点击选择开始日期，第二次点击选择结束日期
   - 如果第二次点击的日期早于开始日期，会自动交换开始和结束日期
   - 选择过程中会自动高亮显示中间的日期范围

3. **多选日历的交互**：
   - MultipleCalendar 支持点击已选日期来取消选择
   - 每次点击都会触发 onSelect 回调，返回最新的选中数组
   - 选中数组中的日期会自动去重

4. **disabledDate 的优先级**：
   - `disabledDate` 函数的优先级高于 `min` 和 `max` 属性
   - 如果提供了 `disabledDate`，`min` 和 `max` 将被忽略
   - `disabledDate` 函数接收 moment 对象作为参数，方便进行日期判断

5. **日历渲染范围**：
   - 单选日历（Calendar）：根据 min 和 max 自动计算需要显示的月份
   - 日期范围（RangeCalendar）：根据 begin、end 或 min、max 自动计算显示范围
   - 多选日历（MultipleCalendar）：根据 min 和 max 自动计算显示范围
   - 如果不设置范围，默认显示当前月份

6. **ref 使用**：
   - 所有日历组件都支持 ref，可以访问 `apiScrollToSelected` 方法
   - 该方法会将视图滚动到当前选中的日期位置，适用于日历内容较多时的快速定位

7. **样式建议**：
   - 日历组件建议放在固定高度的容器中（如 400px），以保证最佳显示效果
   - 可以通过 className 自定义样式，但需要注意组件内部使用的类名前缀为 `m-calendar`
   - 滚动行为由浏览器原生实现，确保父容器有适当的 overflow 设置

## 相关组件

- **DatePicker** - 日期选择器，提供了弹窗形式的日期选择
- **Input** - 输入框组件，常与日历组件配合使用显示选中的日期
- **Button** - 按钮组件，可用于触发日历显示或确认选择
- **Flex** - 布局组件，日历内部使用 Flex 进行布局
