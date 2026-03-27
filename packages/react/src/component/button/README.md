# Button

## 简介

Button 按钮组件 - 用于触发操作的基础按钮组件，支持多种样式、尺寸和状态，并具备自动 loading 处理能力。

## API

### Button Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 按钮类型 | oneOf(['default', 'primary', 'danger', 'link']) | 'default' | 否 |
| plain | 是否为朴素按钮 | boolean | false | 否 |
| mini | 是否为小尺寸按钮 | boolean | false | 否 |
| block | 是否为块级按钮（宽度 100%） | boolean | false | 否 |
| noRound | 是否去除圆角 | boolean | false | 否 |
| htmlType | 原生 button 的 type 属性 | string | 'button' | 否 |
| loading | 是否显示加载状态 | boolean | false | 否 |
| onClick | 点击事件，返回 Promise 会自动显示 loading | function | () => {} | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### ButtonTime Props

ButtonTime 是 Button 的特殊变体，用于倒计时按钮场景（如验证码）。继承 Button 的所有 props，额外添加以下属性：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| time | 倒计时时长（秒） | number | 60 | 否 |
| onClick | 点击事件，返回 false 不计时，返回 true/Promise 则开始计时 | function | - | 是 |

## 示例

### 基础用法

```jsx
import { Button } from '@gm-mobile/react'

// 默认按钮
<Button>默认按钮</Button>

// 主色按钮
<Button type='primary'>主色按钮</Button>

// 危险按钮
<Button type='danger'>危险操作</Button>

// 链接按钮
<Button type='link'>链接</Button>
```

### 样式变体

```jsx
import { Button } from '@gm-mobile/react'

// 朴素按钮
<Button plain>朴素按钮</Button>
<Button plain type='primary'>朴素主色</Button>

// 小尺寸按钮
<Button mini type='primary'>小按钮</Button>

// 块级按钮
<Button block type='primary'>块级按钮</Button>

// 无圆角按钮
<Button noRound type='primary'>无圆角</Button>

// 禁用状态
<Button disabled>禁用按钮</Button>
<Button disabled type='primary'>禁用主色</Button>
```

### 加载状态

```jsx
import { Button } from '@gm-mobile/react'

// 直接控制 loading
<Button loading>加载中...</Button>

// onClick 返回 Promise，自动显示 loading
const handleSubmit = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('提交完成')
      resolve()
    }, 2000)
  })
}

<Button onClick={handleSubmit}>点击提交</Button>
```

### 倒计时按钮（ButtonTime）

```jsx
import { ButtonTime } from '@gm-mobile/react'

// 基础倒计时
<ButtonTime
  time={60}
  type='primary'
  onClick={() => {
    console.log('发送验证码')
    return true
  }}
>
  获取验证码
</ButtonTime>

// 表单验证后倒计时
const [canSend, setCanSend] = useState(false)

<ButtonTime
  time={60}
  type='primary'
  onClick={() => {
    if (!canSend) {
      alert('请先输入手机号')
      return false
    }
    // 发送验证码请求
    return sendCodeApi()
  }}
>
  获取验证码
</ButtonTime>
```

### 高级用法

```jsx
import { Button, ButtonTime } from '@gm-mobile/react'

// 自定义样式和类名
<Button
  type='primary'
  className='custom-btn'
  style={{ margin: '10px' }}
>
  自定义按钮
</Button>

// 表单提交按钮
<Button
  htmlType='submit'
  type='primary'
  block
  onClick={async (e) => {
    e.preventDefault()
    await submitForm()
  }}
>
  提交表单
</Button>

// 异步验证码发送
<ButtonTime
  time={60}
  type='primary'
  mini
  onClick={async () => {
    const result = await checkPhoneNumber()
    if (result.valid) {
      await sendSmsCode()
      return true
    }
    alert('手机号格式不正确')
    return false
  }}
>
  发送验证码
</ButtonTime>
```

## 注意事项

1. **onClick 返回值处理**：
   - 如果 onClick 返回 Promise，Button 会自动显示 loading 状态
   - ButtonTime 中，onClick 返回 `false` 不会触发倒计时，返回 `true` 或 `Promise` 则会触发

2. **loading 和 disabled 的区别**：
   - `loading`：显示加载图标，禁止点击，常用于异步操作
   - `disabled`：不显示加载图标，禁止点击，常用于表单验证等场景
   - 两者同时存在时，只要有一个为 true，按钮就会被禁用

3. **ButtonTime 的使用场景**：
   - 主要用于验证码发送、防重复提交等需要倒计时的场景
   - onClick 必须是必填函数，用于控制是否开始倒计时
   - 计时期间按钮自动禁用，无需手动控制

4. **样式组合**：
   - `plain` 属性在 `type='link'` 时无效
   - `mini` 和 `block` 可以同时使用，生成小尺寸的块级按钮
   - 自定义样式时，建议使用 `className` 而非直接修改 `style`，便于统一管理

## 相关组件

- **Input** - 常与 ButtonTime 配合使用，用于手机号、验证码输入
- **Dialog** - 弹窗底部的确认/取消按钮
- **Form** - 表单提交按钮
