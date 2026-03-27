# Keyboard

## 简介
数字键盘 - 移动端数字输入键盘组件，支持数值范围限制、小数精度控制和自定义校验规则。适用于需要精确数字输入的场景，如金额、数量、价格等输入。

## API

### Keyboard

数字键盘组件，提供完整的数字输入界面和校验功能。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| defaultValue | 初始默认值 | string | '' | 否 |
| onSubmit | 确定按钮回调函数，参数为输入值 | function | - | 是 |
| min | 最小值限制 | number | - | 否 |
| max | 最大值限制 | number | - | 否 |
| precision | 小数精度，可输入几位小数 | number | 2 | 否 |
| getErrorMsg | 自定义错误提示函数，参数为 {value, min, max, precision}，返回错误信息字符串，满足条件返回 null | function | 内置校验函数 | 否 |
| children | 键盘区域的自定义内容，通常不需要传递 | ReactNode | - | 否 |

### KeyboardWrap

数字键盘包装器，用于包装其他元素（如 Button、Input 等），点击被包装元素时唤起键盘。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 标题，用于辅助展示 | string | - | 否 |
| onSubmit | 确定按钮回调函数，参数为输入值 | function | - | 是 |
| defaultValue | 初始默认值 | string | '' | 否 |
| min | 最小值限制 | number | - | 否 |
| max | 最大值限制 | number | - | 否 |
| precision | 小数精度，可输入几位小数 | number | 2 | 否 |
| getErrorMsg | 自定义错误提示函数 | function | 内置校验函数 | 否 |
| children | 被包装的 React 元素 | ReactElement | - | 是 |

### KeyboardBox

键盘占位框组件，用于在键盘弹出时提供占位空间，自动适配 tabbar 高度。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabbar | 是否需要减去 tabbar 高度 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

使用 KeyboardWrap 包裹 Button，点击后唤起数字键盘：

```jsx
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/react'

function App() {
  const handleSubmit = (value) => {
    console.log('输入的值：', value)
  }

  return (
    <KeyboardWrap
      defaultValue="0"
      onSubmit={handleSubmit}
    >
      <Button plain>点击输入</Button>
    </KeyboardWrap>
  )
}
```

### 常见用法

#### 带范围限制的输入

限制输入范围在 10-100 之间，精度为 2 位小数：

```jsx
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/react'

function App() {
  const [value, setValue] = useState('50')

  return (
    <KeyboardWrap
      defaultValue={value}
      onSubmit={setValue}
      min={10}
      max={100}
      precision={2}
    >
      <Button plain>{value || '点击输入数量'}</Button>
    </KeyboardWrap>
  )
}
```

#### 整数输入

设置 precision 为 0，只允许输入整数：

```jsx
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/react'

function App() {
  return (
    <KeyboardWrap
      defaultValue=""
      onSubmit={(value) => console.log(value)}
      precision={0}
      min={1}
      max={1000}
    >
      <Button plain>输入整数数量</Button>
    </KeyboardWrap>
  )
}
```

#### 自定义错误提示

使用 getErrorMsg 自定义校验逻辑和错误提示：

```jsx
import { KeyboardWrap } from '@gm-mobile/react'
import { Button } from '@gm-mobile/react'

function App() {
  const getErrorMsg = ({ value, min, max, precision }) => {
    const num = parseFloat(value)

    if (isNaN(num)) {
      return '请输入有效的数字'
    }

    if (num < min) {
      return `数量不能少于 ${min} 个`
    }

    if (num > max) {
      return `数量不能超过 ${max} 个`
    }

    // 检查小数位数
    if (value.includes('.')) {
      const decimalPlaces = value.split('.')[1].length
      if (decimalPlaces > precision) {
        return `最多只能输入 ${precision} 位小数`
      }
    }

    return null
  }

  return (
    <KeyboardWrap
      defaultValue="0"
      onSubmit={(value) => console.log(value)}
      min={1}
      max={999}
      precision={2}
      getErrorMsg={getErrorMsg}
    >
      <Button plain>自定义校验</Button>
    </KeyboardWrap>
  )
}
```

#### 在列表中使用

在页面中多个输入项使用键盘：

```jsx
import { KeyboardWrap, Page, Button } from '@gm-mobile/react'
import { observable } from 'mobx'

const numStore = observable({
  item1: '',
  item2: '',
  item3: '',
  setValue(id, value) {
    this[id] = value
  },
})

function App() {
  return (
    <Page
      bottom={<div className="m-border-top m-padding-10">底部内容</div>}
      tabbar={<div className="m-border-top m-padding-10">标签栏</div>}
    >
      <div style={{ padding: '20px' }}>
        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '10px' }}>商品1:</span>
          <KeyboardWrap
            title="商品1"
            defaultValue={numStore.item1}
            onSubmit={(v) => numStore.setValue('item1', v)}
            min={1}
            max={100}
          >
            <Button plain>{numStore.item1 || '点击输入'}</Button>
          </KeyboardWrap>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '10px' }}>商品2:</span>
          <KeyboardWrap
            title="商品2"
            defaultValue={numStore.item2}
            onSubmit={(v) => numStore.setValue('item2', v)}
            min={1}
            max={100}
          >
            <Button plain>{numStore.item2 || '点击输入'}</Button>
          </KeyboardWrap>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <span style={{ marginRight: '10px' }}>商品3:</span>
          <KeyboardWrap
            title="商品3"
            defaultValue={numStore.item3}
            onSubmit={(v) => numStore.setValue('item3', v)}
            min={1}
            max={100}
          >
            <Button plain>{numStore.item3 || '点击输入'}</Button>
          </KeyboardWrap>
        </div>
      </div>
    </Page>
  )
}
```

### 高级用法

#### 直接使用 Keyboard 组件

如果需要完全自定义键盘的展示，可以直接使用 Keyboard 组件：

```jsx
import { Keyboard } from '@gm-mobile/react'

function App() {
  const [visible, setVisible] = useState(false)

  return (
    <div>
      <Button onClick={() => setVisible(true)}>显示键盘</Button>

      {visible && (
        <Keyboard
          defaultValue="0"
          onSubmit={(value) => {
            console.log('输入值：', value)
            setVisible(false)
          }}
          min={0}
          max={999999}
          precision={2}
        />
      )}
    </div>
  )
}
```

#### 使用 KeyboardBox 适配布局

在需要键盘占位的场景使用 KeyboardBox：

```jsx
import { KeyboardBox } from '@gm-mobile/react'

function App() {
  return (
    <div>
      {/* 内容区域 */}

      {/* 键盘占位，适配 tabbar */}
      <KeyboardBox tabbar={true} />
    </div>
  )
}
```

## 注意事项

1. **输入校验**
   - 组件内置了 min、max 和 precision 的校验逻辑
   - 当输入超出范围时，会自动显示 Toast 提示
   - 有错误提示时，点击确定按钮不会触发 onSubmit 回调

2. **小数点处理**
   - precision 为 0 时，只允许输入整数，点击小数点会提示"当前只能输入整数"
   - 第一个小数点会自动在前面补充 0（如输入 "." 自动变为 "0."）
   - 超出精度限制的小数位会被阻止并提示

3. **键盘显示隐藏**
   - 使用 KeyboardWrap 时，键盘的显示和隐藏由组件内部管理
   - 使用 Keyboard 组件时，需要自行控制组件的渲染和卸载

4. **默认值处理**
   - defaultValue 只在组件初始化时生效
   - 如果需要动态更新显示值，应该重新渲染组件或使用受控模式

5. **移动端适配**
   - 该组件专为移动端设计，建议在移动设备或移动端模拟器中测试
   - 在桌面端可能存在布局问题

6. **键盘高度**
   - 键盘固定高度为 225px
   - 使用 KeyboardBox 且 tabbar 为 true 时，会自动减去 tabbar 高度

7. **多键盘场景**
   - 在同一页面使用多个键盘时，建议使用 KeyboardWrap 并配合状态管理
   - 每个键盘实例应该有独立的 defaultValue 和 onSubmit

## 相关组件

- [Input](../input/) - 文本输入框组件
- [Counter](../counter/) - 计数器组件
- [Button](../button/) - 按钮组件
