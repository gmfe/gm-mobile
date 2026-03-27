# LetterIndex

## 简介
字母索引列表组件 - 基于字母索引的快速滚动列表组件，支持单选和多选两种模式，适用于联系人列表、城市选择等需要按字母分组并进行快速定位的场景。

## API

### LetterIndex
单选模式的字母索引列表组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据，格式为 `[{value, text}]` 的数组，其中 text 会被用于首字母分组 | array | - | 是 |
| selected | 当前选中的项，对应数据项的 value 值 | any | - | 否 |
| onSelect | 选择项时的回调函数，参数为选中的数据项的 value 值 | function | - | 是 |
| renderItem | 自定义列表项的渲染函数，接收数据项作为参数，返回渲染内容 | function | `(item) => item.text` | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### LetterIndexMultiple
多选模式的字母索引列表组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据，格式为 `[{value, text}]` 的数组，其中 text 会被用于首字母分组 | array | - | 是 |
| selected | 当前选中的项数组，元素为数据项的 value 值 | array | - | 否 |
| onSelect | 选择项时的回调函数，参数为选中项的 value 值数组 | function | - | 是 |
| renderItem | 自定义列表项的渲染函数，接收数据项作为参数，返回渲染内容 | function | `(item) => item.text` | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法 - 单选模式
```jsx
import { LetterIndex } from '@gm-mobile/react'
import { observable } from 'mobx'

const data = [
  { value: 'apple', text: '苹果' },
  { value: 'banana', text: '香蕉' },
  { value: 'orange', text: '橙子' },
  { value: 'watermelon', text: '西瓜' },
  { value: 'chicken', text: '鸡' },
  { value: 'duck', text: '鸭' },
  { value: 'goose', text: '鹅' },
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
  },
})

<LetterIndex
  data={data}
  selected={store.selected}
  onSelect={(selected) => store.setSelected(selected)}
/>
```

### 基础用法 - 多选模式
```jsx
import { LetterIndexMultiple } from '@gm-mobile/react'
import { observable } from 'mobx'

const data = [
  { value: 'apple', text: '苹果' },
  { value: 'banana', text: '香蕉' },
  { value: 'orange', text: '橙子' },
  { value: 'watermelon', text: '西瓜' },
  { value: 'chicken', text: '鸡' },
  { value: 'duck', text: '鸭' },
  { value: 'goose', text: '鹅' },
]

const mulStore = observable({
  selected: [],
  setSelected(selected) {
    this.selected = selected
  },
})

<LetterIndexMultiple
  data={data}
  selected={mulStore.selected}
  onSelect={(selected) => mulStore.setSelected(selected)}
/>
```

### 自定义列表项渲染
```jsx
import { LetterIndex } from '@gm-mobile/react'

const data = [
  { value: '1', text: '张三', phone: '13800138000' },
  { value: '2', text: '李四', phone: '13900139000' },
  { value: '3', text: '王五', phone: '13700137000' },
]

<LetterIndex
  data={data}
  selected={selected}
  onSelect={setSelected}
  renderItem={(item) => (
    <div>
      <div>{item.text}</div>
      <div style={{ fontSize: '12px', color: '#999' }}>{item.phone}</div>
    </div>
  )}
/>
```

### 城市选择场景
```jsx
import { LetterIndex } from '@gm-mobile/react'

const cities = [
  { value: 'beijing', text: '北京' },
  { value: 'shanghai', text: '上海' },
  { value: 'guangzhou', text: '广州' },
  { value: 'shenzhen', text: '深圳' },
  { value: 'hangzhou', text: '杭州' },
  { value: 'nanjing', text: '南京' },
  { value: 'chengdu', text: '成都' },
  { value: 'wuhan', text: '武汉' },
]

<LetterIndex
  data={cities}
  selected={currentCity}
  onSelect={(city) => {
    console.log('选择城市:', city)
    setCurrentCity(city)
  }}
/>
```

## 注意事项
- 数据格式必须为 `[{value, text}]` 的数组，其中 text 字段用于首字母分组和显示
- 组件会自动根据 text 的首字母（支持中文拼音和英文）进行分组
- 点击右侧字母导航可以快速滚动到对应字母的分组
- LetterIndex 的 selected 是单个值，LetterIndexMultiple 的 selected 是数组
- 使用多选模式时，onSelect 回调接收的是选中项的 value 值数组
- 自定义 renderItem 时，建议保持合理的尺寸，避免列表项过高影响滚动体验

## 相关组件
- [List](../list/) - 基础列表组件
- [Flex](../flex/) - 弹性布局组件
