# Counter

## 简介
计数器组件 - 用于增减数值的计数器，支持通过加减按钮或数字键盘输入数值，常用于购物车数量调整、商品数量选择等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 当前展示值 | string | '' | 否 |
| title | 键盘标题，辅助展示 | string | - | 否 |
| min | 最小值 | number | 0 | 否 |
| max | 最大值 | number | - | 否 |
| precision | 键盘输入数字精度，可输入几位小数及展示 | number | 2 | 否 |
| onChange | +/- 按钮回调，数字键盘确定按钮回调函数 | function | - | 是 |
| large | 是否使用大尺寸（默认为 mini 尺寸） | boolean | false | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| getErrorMsg | 自定义不同情况下的错误提示信息，参数为 { value, min, max, precision }，满足条件返回错误信息字符串，否则返回 null | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| keyboardDefaultNone | 键盘默认值不跟随原值 | boolean | false | 否 |

## 示例

### 基础用法
```jsx
import { Counter } from '@gm-mobile/react'
import { observable } from 'mobx'

const store = observable({
  count: '',
  setValue(v) {
    this.count = v
  },
})

function App() {
  return (
    <Counter
      value={store.count}
      min={1}
      max={100}
      onChange={(v) => store.setValue(v)}
    />
  )
}
```

### 常见用法
```jsx
import { Counter } from '@gm-mobile/react'
import { observable } from 'mobx'

const store = observable({
  count: '',
  setValue(v) {
    this.count = v
  },
})

function App() {
  return (
    <>
      {/* 大尺寸计数器 */}
      <Counter
        value={store.count}
        onChange={(v) => store.setValue(v)}
        large
      />

      {/* 支持小数输入 */}
      <Counter
        value={store.count}
        min={0}
        max={999}
        precision={3}
        onChange={(v) => store.setValue(v)}
      />

      {/* 键盘默认为空 */}
      <Counter
        value={store.count}
        min={1}
        onChange={(v) => store.setValue(v)}
        keyboardDefaultNone
      />
    </>
  )
}
```

### 高级用法
```jsx
import { Counter } from '@gm-mobile/react'
import { observable } from 'mobx'

const store = observable({
  count: '',
  setValue(v) {
    this.count = v
  },
})

function App() {
  // 自定义错误提示信息
  const handleCheckValue = ({ value, min, max, precision }) => {
    if (value > 10) {
      return '库存不足'
    }
    if (value < 3) {
      return '最小起售为3'
    }
    return null
  }

  return (
    <Counter
      value={store.count}
      min={3}
      max={10}
      title="商品数量"
      onChange={(v) => store.setValue(v)}
      getErrorMsg={handleCheckValue}
    />
  )
}
```

## 注意事项
- value 属性使用 string 类型，使用时需要注意类型转换
- 当达到最大值时点击加号按钮，会显示"下单数量超出当前库存"的提示
- 当值为空或为 0 时，减号按钮会被禁用
- 精度控制仅影响键盘输入和数字显示，加减按钮每次变化量为 1
- 当设置 min 值时，如果当前值为空，点击加号会从 min 值开始
- 使用 getErrorMsg 可以自定义验证逻辑和错误提示，返回字符串时会显示该错误信息
- keyboardDefaultNone 为 true 时，打开键盘默认显示空值，不跟随当前 value

## 相关组件
- [Keyboard](../keyboard) - 数字键盘组件，Counter 内部使用该组件实现输入功能
