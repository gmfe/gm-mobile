# Keyboard

## 简介
数字键盘组件 - 提供自定义数字输入键盘，支持最小值/最大值限制、精度控制和输入校验。包含 `Keyboard` 和 `KeyboardWrap` 两个组件。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Keyboard, KeyboardWrap } from '@gm-mobile/react'
```

## API

### Keyboard Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| defaultValue | 初始默认值 | `string` | `''` | 否 |
| onSubmit | 确定回调函数 | `(value: string) => void` | `_.noop` | 否 |
| onChange | 点击输入回调 | `(value: string) => void` | `_.noop` | 否 |
| min | 最小值 | `number` | - | 否 |
| max | 最大值 | `number` | - | 否 |
| precision | 精度，可输入几位小数 | `number` | `2` | 否 |
| getErrorMsg | 自定义错误提示信息 | `(value: { value, min, max, precision }) => string \| null` | 内置校验 | 否 |
| disabledHeader | 是否隐藏键盘头部（输入框和确定按钮） | `boolean` | `false` | 否 |

### KeyboardWrap Props

继承 `Keyboard` 的所有 Props，另外新增：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 键盘标题，辅助展示 | `string` | - | 否 |
| disabled | 是否禁用 | `boolean` | `false` | 否 |
| children | 需要包裹的触发元素（只能有一个子元素） | `ReactElement` | - | 是 |

## 示例

### 基础用法

```jsx
import { useState } from 'react'
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/c-react'

const App = () => {
  const [value, setValue] = useState('')

  return (
    <KeyboardWrap
      title="商品数量"
      defaultValue={value}
      onSubmit={(v) => setValue(v)}
      min={2}
      max={100}
    >
      <Button plain>{value || '请输入'}</Button>
    </KeyboardWrap>
  )
}
```

### 自定义错误提示

```jsx
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/c-react'

const App = () => {
  const getErrorMsg = ({ value, min, max, precision }) => {
    if (max && +value > max) {
      return '超出库存数量'
    }
    if (min && +value < min) {
      return '低于最小起售量'
    }
    return null
  }

  return (
    <KeyboardWrap
      title="数量"
      onSubmit={(v) => console.log(v)}
      min={1}
      max={50}
      getErrorMsg={getErrorMsg}
    >
      <Button plain>选择数量</Button>
    </KeyboardWrap>
  )
}
```

## 注意事项
- `KeyboardWrap` 通过 `cloneElement` 给子元素注入 `onClick` 事件，点击子元素时弹出键盘
- 键盘通过 `LayoutRoot` 的 `render/hide` 方法控制显示/隐藏
- `getErrorMsg` 返回字符串时会在键盘上方显示错误信息并弹出 Toast 提示，返回 `null` 时表示校验通过
- 存在错误信息时点击"确定"按钮不会触发 `onSubmit` 回调
- `precision` 设为 `0` 时只能输入整数，点击小数点会提示"当前只能输入整数"
