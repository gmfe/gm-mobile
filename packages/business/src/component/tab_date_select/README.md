# TabDateSelect

## 简介
标签日期选择器 - 一个带有标签切换功能的日期范围选择组件，支持在不同标签下选择不同的日期范围，常用于按下单日期、按收货日期等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | 切换 tabs 配置数组，每项包含 text（显示文本）、value（唯一标识）、min（最小可选日期）、max（最大可选日期） | array | - | 是 |
| selectedTab | 选中的 tab value 值 | any | - | 否 |
| begin | 开始日期 | object(Date) | - | 否 |
| end | 结束日期 | object(Date) | - | 否 |
| onSelect | 确定按钮点击回调，接收参数 { selectedTab, begin, end, serviceTimeId } | function | - | 是 |
| serviceTimeList | 运营周期列表，用于动态调整可选日期范围，每项包含 value 和 text | array | - | 否 |

### 静态方法
| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| TabDateSelect.render | 以弹窗形式渲染日期选择器 | { title, tabs, selectedTab, begin, end, serviceTimeList } | Promise，成功时返回 { selectedTab, begin, end, serviceTimeId } |
| TabDateSelect.hide | 隐藏当前显示的日期选择器弹窗 | 无 | 无 |

## 示例

### 基础用法
```jsx
import { TabDateSelect } from '@gm-mobile/react'
import moment from 'moment'

const tabs = [
  {
    text: '按下单日期',
    value: 1,
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
  },
  {
    text: '按收货日期',
    value: 2,
    min: moment().subtract(365, 'day').toDate(),
    max: moment().add(30, 'days').toDate(),
  },
]

TabDateSelect.render({
  title: '选择日期',
  tabs,
  selectedTab: 1,
  begin: moment().add(-5, 'days').toDate(),
  end: moment().toDate(),
}).then(({ selectedTab, begin, end }) => {
  console.log('选中标签:', selectedTab)
  console.log('开始日期:', begin)
  console.log('结束日期:', end)
})
```

### 带运营时间的用法
```jsx
import { TabDateSelect } from '@gm-mobile/react'
import moment from 'moment'

const tabs = [
  {
    text: '按下单日期',
    value: 1,
    min: moment().subtract(365, 'day').toDate(),
    max: moment().toDate(),
    selectedServiceTime: {
      text: '全天',
      value: 'all_day',
    },
  },
  {
    text: '按收货日期',
    value: 2,
    min: moment().subtract(365, 'day').toDate(),
    max: moment().add(30, 'days').toDate(),
    selectedServiceTime: {
      text: '上午',
      value: 'morning',
    },
  },
]

const serviceTimeList = [
  { text: '全天', value: 'all_day' },
  { text: '上午', value: 'morning' },
  { text: '下午', value: 'afternoon' },
]

TabDateSelect.render({
  title: '选择日期',
  tabs,
  selectedTab: 2,
  serviceTimeList,
  begin: moment().toDate(),
  end: moment().add(7, 'days').toDate(),
}).then(({ selectedTab, begin, end, serviceTimeId }) => {
  console.log('选中标签:', selectedTab)
  console.log('开始日期:', begin)
  console.log('结束日期:', end)
  console.log('运营时间ID:', serviceTimeId)
})
```

### 直接嵌入页面使用
```jsx
import { TabDateSelect } from '@gm-mobile/react'
import moment from 'moment'

function MyComponent() {
  const [result, setResult] = useState(null)

  const tabs = [
    {
      text: '按下单日期',
      value: 1,
      min: moment().subtract(365, 'day').toDate(),
      max: moment().toDate(),
    },
    {
      text: '按收货日期',
      value: 2,
      min: moment().subtract(365, 'day').toDate(),
      max: moment().add(30, 'days').toDate(),
    },
  ]

  return (
    <div>
      <TabDateSelect
        tabs={tabs}
        selectedTab={1}
        begin={moment().add(-5, 'days').toDate()}
        end={moment().toDate()}
        onSelect={({ selectedTab, begin, end }) => {
          setResult({ selectedTab, begin, end })
        }}
      />
      {result && (
        <div>
          <p>选中标签: {result.selectedTab}</p>
          <p>日期范围: {moment(result.begin).format('YYYY-MM-DD')} ~ {moment(result.end).format('YYYY-MM-DD')}</p>
        </div>
      )}
    </div>
  )
}
```

## 注意事项
- tabs 配置中的 min 和 max 必须是 Date 对象，建议使用 moment.js 创建
- 当切换 tab 时，日期会自动重置为当前 tab 的 max 日期
- 如果提供了 serviceTimeList，组件会在 tab 标签下方显示运营时间选择器，切换运营时间时会根据服务时间限制自动调整可选日期范围
- TabDateSelect.render 返回的是 Promise，成功时 resolve，点击取消或遮罩时 reject
- begin 和 end 如果不提供，默认会使用当前选中 tab 的 max 日期
- 组件内部使用了 RangeCalendar 组件，支持单选和范围选择
- onSelect 回调会在点击确定按钮时触发，返回的 begin 和 end 都是 Date 对象
