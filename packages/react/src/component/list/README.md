# List

## 简介
通用列表组件 - 支持单选和多选模式，支持分组展示，可通过 ref 调用方法滚动到指定位置。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { List } from '@gm-mobile/react'
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据列表。普通格式：`[{value, text, disabled}]`；分组格式：`[{label, id, children}]` | `array` | - | 是 |
| selected | 单选时为 `value`，多选时为 `[value, value]` | `any` | - | - |
| onSelect | 选择回调。单选返回 `value`，多选返回 `[value, value]` | `(selected) => void` | - | - |
| multiple | 是否多选 | `boolean` | `false` | - |
| isGroupList | 数据是否为分组格式 | `boolean` | `false` | - |
| renderItem | 自定义列表项渲染 | `(item) => ReactNode` | `(item) => item.text` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `object` | - | - |

### Ref 方法

| 方法 | 说明 | 参数 |
|------|------|------|
| apiDoScrollToLabel | 滚动到指定分组标签 | `label: string` |
| apiDoScrollToValue | 滚动到指定 value 的项 | `value: any` |

### 数据字段说明

| 字段 | 说明 | 类型 |
|------|------|------|
| value | 数据唯一标识 | `any` |
| text | 显示文本 | `string` |
| disabled | 是否禁用 | `boolean` |
| label | 分组标签（分组数据时使用） | `string` |
| id | 分组标识（分组数据时使用） | `string` |
| children | 分组子项（分组数据时使用） | `array` |

## 示例

### 单选列表

```jsx
import { useState } from 'react'
import { List } from '@gm-mobile/react'

const data = [
  { value: 'nanshan', text: '南山' },
  { value: 'futian', text: '福田', disabled: true },
  { value: 'longgang', text: '龙岗' },
  { value: 'luohu', text: '罗湖' },
]

const App = () => {
  const [selected, setSelected] = useState(null)

  return (
    <List
      data={data}
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

### 多选列表

```jsx
import { useState } from 'react'
import { List } from '@gm-mobile/react'

const data = [
  { value: 'nanshan', text: '南山' },
  { value: 'futian', text: '福田', disabled: true },
  { value: 'longgang', text: '龙岗' },
  { value: 'luohu', text: '罗湖' },
]

const App = () => {
  const [selected, setSelected] = useState([])

  return (
    <List
      multiple
      data={data}
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

### 分组多选列表

```jsx
import { useState, useRef } from 'react'
import { List } from '@gm-mobile/react'

const groupData = [
  {
    label: '分组一',
    id: 'g1',
    children: [
      { value: 'nanshan', text: '南山' },
      { value: 'futian', text: '福田' },
    ],
  },
  {
    label: '分组二',
    id: 'g2',
    children: [
      { value: 'longgang', text: '龙岗' },
      { value: 'luohu', text: '罗湖' },
    ],
  },
]

const App = () => {
  const [selected, setSelected] = useState([])
  const ref = useRef(null)

  return (
    <div>
      <List
        ref={ref}
        data={groupData}
        multiple
        isGroupList
        selected={selected}
        onSelect={setSelected}
      />
      <button onClick={() => ref.current.apiDoScrollToLabel('分组二')}>
        滚动到分组二
      </button>
    </div>
  )
}
```

## 注意事项
- 使用分组模式时需设置 `isGroupList` 为 `true`，数据格式包含 `label`、`id` 和 `children` 字段
- 通过 `ref` 可以调用 `apiDoScrollToLabel` 和 `apiDoScrollToValue` 方法实现滚动定位
- 设置 `disabled: true` 可禁用单个列表项
- 单选时 `selected` 为单个值，多选时为数组，注意类型区分
