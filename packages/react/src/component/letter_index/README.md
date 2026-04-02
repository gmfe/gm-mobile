# LetterIndex

## 简介
字母索引列表 - 根据数据文本的首字母拼音自动分组，并提供侧边字母快速定位功能，支持单选和多选模式。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { LetterIndex, LetterIndexMultiple } from '@gm-mobile/react'
```

## API

### LetterIndex Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据，格式为 `[{value, text}]` | `array` | - | 是 |
| selected | 当前选择项 | `any` | - | - |
| onSelect | 选中回调函数 | `(selected: any) => void` | - | 是 |
| renderItem | 自定义列表项渲染 | `(item) => ReactNode` | `(item) => item.text` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `object` | - | - |

### LetterIndexMultiple Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 数据，格式为 `[{value, text}]` | `array` | - | 是 |
| selected | 当前选择项数组 | `array` | - | - |
| onSelect | 选择回调函数 | `(selected: array) => void` | - | 是 |
| renderItem | 自定义列表项渲染 | `(item) => ReactNode` | `(item) => item.text` | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `object` | - | - |

### 数据字段说明

| 字段 | 说明 | 类型 |
|------|------|------|
| value | 数据唯一标识 | `any` |
| text | 显示文本（用于首字母拼音分组） | `string` |

## 示例

### 单选字母索引

```jsx
import { useState } from 'react'
import { LetterIndex } from '@gm-mobile/react'

const data = [
  { value: 'apple', text: '苹果' },
  { value: 'banana', text: '香蕉' },
  { value: 'orange', text: '橙子' },
  { value: 'watermelon', text: '西瓜' },
  { value: 'chicken', text: '鸡' },
  { value: 'duck', text: '鸭' },
]

const App = () => {
  const [selected, setSelected] = useState(null)

  return (
    <LetterIndex
      data={data}
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

### 多选字母索引

```jsx
import { useState } from 'react'
import { LetterIndexMultiple } from '@gm-mobile/react'

const data = [
  { value: 'apple', text: '苹果' },
  { value: 'banana', text: '香蕉' },
  { value: 'orange', text: '橙子' },
  { value: 'watermelon', text: '西瓜' },
]

const App = () => {
  const [selected, setSelected] = useState([])

  return (
    <LetterIndexMultiple
      data={data}
      selected={selected}
      onSelect={setSelected}
    />
  )
}
```

### 自定义列表项渲染

```jsx
import { useState } from 'react'
import { LetterIndex } from '@gm-mobile/react'

const data = [
  { value: 'apple', text: '苹果', desc: '红色水果' },
  { value: 'banana', text: '香蕉', desc: '黄色水果' },
]

const App = () => {
  const [selected, setSelected] = useState(null)

  return (
    <LetterIndex
      data={data}
      selected={selected}
      onSelect={setSelected}
      renderItem={(item) => (
        <div>
          <div>{item.text}</div>
          <div style={{ fontSize: 12, color: '#999' }}>{item.desc}</div>
        </div>
      )}
    />
  )
}
```

## 注意事项
- `text` 字段用于计算拼音首字母分组，需确保传入有效的中文文本
- `LetterIndex` 为单选模式，`LetterIndexMultiple` 为多选模式，根据场景选择
- 侧边字母栏仅显示当前数据中存在的字母分组
