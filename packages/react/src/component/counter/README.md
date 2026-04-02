# Counter

## 简介
计数器组件 - 提供加/减按钮和数字键盘输入的数量选择器，常用于商品数量选择等场景。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Counter } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onChange | +/- 按钮回调及数字键盘确定按钮回调函数 | `(value: string) => void` | - | 是 |
| value | 当前展示值 | `string` | `''` | 否 |
| title | 键盘标题，辅助展示 | `string` | - | 否 |
| min | 最小值 | `number` | `0` | 否 |
| max | 最大值 | `number` | - | 否 |
| precision | 键盘输入数字精度，可输入几位小数及展示 | `number` | `2` | 否 |
| large | 是否使用大尺寸，默认为 mini 尺寸 | `boolean` | `false` | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| getErrorMsg | 自定义不同情况下的错误提示信息 | `(value: CounterErrorMsg) => string` | - | 否 |

### Types

```ts
interface CounterProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange'> {
    /** + / - 按钮回调, 数字键盘确定按钮回调函数 */
    onChange: (value: string) => void
    /** 当前展示值 */
    value?: string
    /** 键盘标题, 辅助展示 */
    title?: string
    /** 最小值, 默认为0 */
    min?: number
    /** 最大值 */
    max?: number
    /** 键盘输入数字精度, 可输入几位小数 及 展示 */
    precision?: number
    /** 默认为mini尺寸 */
    large?: boolean
    /** 禁用状态 */
    disabled?: boolean
    /** 回调函数, 自定义不同情况下的错误提示信息 */
    getErrorMsg?: (value: CounterErrorMsg) => string
}

interface CounterErrorMsg {
    value: string
    min?: number
    max?: number
    precision?: number
}
```

## 示例

### 基础用法

```jsx
import { useState } from 'react'
import { Counter } from '@gm-mobile/react'

const App = () => {
  const [value, setValue] = useState('')

  return <Counter value={value} min={3} max={100} onChange={(v) => setValue(v)} />
}
```

### 大尺寸模式

```jsx
import { useState } from 'react'
import { Counter } from '@gm-mobile/react'

const App = () => {
  const [value, setValue] = useState('')

  return <Counter value={value} onChange={(v) => setValue(v)} large />
}
```

### 自定义提示信息

```jsx
import { useState } from 'react'
import { Counter } from '@gm-mobile/react'

const App = () => {
  const [value, setValue] = useState('')

  const handleCheckValue = ({ value }) => {
    if (+value > 10) {
      return '库存不足'
    }
    if (+value < 3) {
      return '最小起售为3'
    }
    return ''
  }

  return (
    <Counter
      value={value}
      min={3}
      max={10}
      onChange={(v) => setValue(v)}
      getErrorMsg={handleCheckValue}
    />
  )
}
```

## 注意事项
- `onChange` 回调的参数类型为 `string`，使用时需要注意类型转换
- 点击中间数字区域会弹出数字键盘，支持自定义键盘标题 `title`
- `precision` 控制小数位数，默认为 2 位小数
- 设置了 `min` 后，加号按钮首次点击会直接跳到最小值，而不是从 0 开始
- 减号按钮点击到 0 时会自动禁用，加号按钮在达到 `max` 时自动禁用
