# Input

## 简介

Input 输入框组件 - 用于接收用户输入的基础输入组件，提供基础输入框、密码输入框和带字符计数的边框输入框三种变体。

## API

### Input Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 原生 input 的 type 属性 | string | 'text' | 否 |
| value | 输入框的值 | string | - | 否 |
| onChange | 值变化时的回调 | function | - | 否 |
| placeholder | 占位提示文字 | string | - | 否 |
| autoFocus | 是否自动聚焦 | boolean | false | 否 |
| form | 是否使用表单样式 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### InputPassword Props

InputPassword 是 Input 的密码输入变体，继承 Input 的所有 props，无需额外属性。

**特殊功能**：
- 自动将 type 设置为 'password'
- 右侧显示眼睛图标，点击切换密码可见性

### BorderInput Props

BorderInput 是 Input 的带边框和字符计数变体，继承 Input 的所有 props，额外添加：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| maxLength | 最大输入字符数，设置后显示字符计数 | number | - | 否 |

**特殊功能**：
- 带边框的容器样式
- 设置 maxLength 后，右侧显示 "已输入/最大" 的字符计数

## 示例

### 基础用法

```jsx
import { Input } from '@gm-mobile/react'

// 基础输入框
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder='请输入内容'
/>

// 不同类型的输入框
<Input type='text' placeholder='文本输入' />
<Input type='number' placeholder='数字输入' />
<Input type='tel' placeholder='电话号码' />
```

### 表单样式

```jsx
import { Input } from '@gm-mobile/react'

// 使用表单样式（form=true）
<Input
  form
  value={username}
  onChange={(e) => setUsername(e.target.value)}
  placeholder='用户名'
/>
```

### 密码输入框

```jsx
import { InputPassword } from '@gm-mobile/react'

<InputPassword
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder='请输入密码'
/>
```

### 带字符计数的输入框

```jsx
import { BorderInput } from '@gm-mobile/react'

// 不限制字符数（仅边框样式）
<BorderInput
  value={content}
  onChange={(e) => setContent(e.target.value)}
  placeholder='请输入内容'
/>

// 限制字符数并显示计数
<BorderInput
  value={content}
  maxLength={200}
  onChange={(e) => setContent(e.target.value)}
  placeholder='最多输入200字'
/>
```

### 高级用法

```jsx
import { Input, InputPassword, BorderInput } from '@gm-mobile/react'

// 受控组件
const [value, setValue] = useState('')
<Input
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder='受控输入框'
/>

// 自动聚焦
<Input
  autoFocus
  placeholder='自动聚焦的输入框'
/>

// 自定义样式
<Input
  className='custom-input'
  style={{ fontSize: '16px' }}
  placeholder='自定义样式'
/>

// 获取 ref
const inputRef = useRef()
<Input
  ref={inputRef}
  placeholder='可通过 ref 访问原生 input'
/>

// 字符限制场景
<BorderInput
  value={description}
  maxLength={100}
  onChange={(e) => {
    if (e.target.value.length <= 100) {
      setDescription(e.target.value)
    }
  }}
  placeholder='个人简介（最多100字）'
/>
```

## 注意事项

1. **组件选择**：
   - 普通文本输入使用 `Input`
   - 密码输入使用 `InputPassword`（自动处理显示/隐藏）
   - 需要字符计数或边框样式时使用 `BorderInput`

2. **受控组件**：
   - Input 是受控组件，必须同时提供 `value` 和 `onChange`
   - 对于非受控场景（不需要实时获取值），可以不传 value，但不推荐

3. **字符计数**：
   - `BorderInput` 的 `maxLength` 仅用于显示字符计数，不会自动限制输入
   - 如需真正限制字符数，需要在 onChange 中手动处理
   - 计数格式为 "已输入/最大"（如 "15/100"）

4. **表单样式**：
   - `form` 属性会应用组件库预定义的表单样式
   - 适合在统一风格的表单场景中使用
   - 如需完全自定义，建议使用 `className` 和 `style`

5. **ref 使用**：
   - 所有组件都支持 `ref`，可以访问原生的 input DOM 元素
   - 使用 `React.forwardRef` 实现，支持 ref 转发

## 相关组件

- **Button** - 常与输入框配合使用，如表单提交按钮
- **Form** - 表单容器组件
- **Checkbox** - 复选框组件
- **Radio** - 单选框组件
- **TextArea** - 多行文本输入组件
