# Radio

## 简介

Radio 单选框组件 - 用于在多个选项中选择一个的基础表单组件，支持选中状态、禁用状态和自定义样式。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 选中状态 | boolean | - | 是 |
| disabled | 是否禁用 | boolean | false | 否 |
| onChange | 状态变化时的回调函数 | function | () => {} | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 子元素（通常为文本说明） | node | - | 否 |

## 示例

### 基础用法

```jsx
import { Radio } from '@gm-mobile/react'
import { useState } from 'react'

const [checked, setChecked] = useState(false)

<Radio
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
>
  选择项
</Radio>
```

### 受控组件

```jsx
import { Radio } from '@gm-mobile/react'
import { useState } from 'react'

const [selected, setSelected] = useState('option1')

// 单选场景通常需要多个 Radio 配合使用
<Radio
  checked={selected === 'option1'}
  onChange={() => setSelected('option1')}
>
  选项一
</Radio>
<Radio
  checked={selected === 'option2'}
  onChange={() => setSelected('option2')}
>
  选项二
</Radio>
```

### 禁用状态

```jsx
import { Radio } from '@gm-mobile/react'

// 禁用的单选框
<Radio checked={true} disabled>
  已选中的禁用项
</Radio>

<Radio checked={false} disabled>
  未选中的禁用项
</Radio>
```

### 常见用法

```jsx
import { Radio } from '@gm-mobile/react'
import { useState } from 'react'

const [gender, setGender] = useState('male')

// 性别选择
<div>
  <Radio
    checked={gender === 'male'}
    onChange={() => setGender('male')}
  >
    男
  </Radio>
  <Radio
    checked={gender === 'female'}
    onChange={() => setGender('female')}
  >
    女
  </Radio>
</div>

// 支付方式选择
const [paymentMethod, setPaymentMethod] = useState('alipay')

<div>
  <Radio
    checked={paymentMethod === 'alipay'}
    onChange={() => setPaymentMethod('alipay')}
  >
    支付宝
  </Radio>
  <Radio
    checked={paymentMethod === 'wechat'}
    onChange={() => setPaymentMethod('wechat')}
  >
    微信支付
  </Radio>
  <Radio
    checked={paymentMethod === 'bankcard'}
    onChange={() => setPaymentMethod('bankcard')}
  >
    银行卡
  </Radio>
</div>
```

### 高级用法

```jsx
import { Radio } from '@gm-mobile/react'
import { useState } from 'react'

// 自定义样式
<Radio
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  className='custom-radio'
  style={{ display: 'block', margin: '10px 0' }}
>
  自定义样式的单选框
</Radio>

// 带有业务逻辑的单选
const [agreed, setAgreed] = useState(false)

<Radio
  checked={agreed}
  onChange={(e) => {
    setAgreed(e.target.checked)
    if (e.target.checked) {
      console.log('用户同意协议')
    }
  }}
>
  我已阅读并同意《用户协议》
</Radio>

// 条件禁用
const [isPremium, setIsPremium] = useState(false)

<Radio
  checked={selected === 'vip-feature'}
  onChange={() => setSelected('vip-feature')}
  disabled={!isPremium}
>
  VIP专属功能 {!isPremium && '(升级VIP后可用)'}
</Radio>
```

## 注意事项

1. **checked 属性为必填**：
   - Radio 是受控组件，必须提供 `checked` 属性来控制选中状态
   - 必须配合 `onChange` 使用，否则无法改变选中状态

2. **单选场景的实现**：
   - Radio 组件本身只负责单个选项的展示和交互
   - 实现单选功能（多个选项中选一个）需要父组件维护一个共享状态
   - 每个 Radio 的 `checked` 属性根据共享状态判断是否选中

3. **onChange 事件**：
   - onChange 回调函数接收的是原生 DOM 事件对象
   - 可以通过 `e.target.checked` 获取新的选中状态
   - 通常在 onChange 中更新父组件的状态

4. **禁用状态**：
   - 禁用的 Radio 不会响应点击事件
   - 禁用状态下样式会有明显变化（变灰）
   - 常用于某些选项在特定条件下不可用的场景

5. **样式自定义**：
   - 使用 `className` 添加自定义类名
   - 使用 `style` 添加内联样式
   - 子元素可以是任意内容，通常是文本说明，也可以是复杂结构

6. **与 Checkbox 的区别**：
   - Radio：单选，一组选项中只能选一个
   - Checkbox：多选，可以同时选中多个选项
   - 根据业务场景选择合适的组件

## 相关组件

- **Checkbox** - 复选框组件，用于多选场景
- **Input** - 输入框组件
- **Switch** - 开关组件，用于布尔值切换
- **Form** - 表单容器组件
