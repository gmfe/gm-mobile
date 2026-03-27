# Textarea

## 简介

Textarea 多行文本输入框 - 用于接收用户多行文本输入的基础组件，支持字符计数、禁用状态和表单样式。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| value | 输入框的值 | string | - | 是 |
| onChange | 值变化时的回调 | function | () => {} | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| maxLength | 最大输入字符数，设置后显示字符计数 | number | - | 否 |
| rows | 显示的行数 | string | '3' | 否 |
| form | 是否使用表单样式 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Textarea } from '@gm-mobile/react'

// 基础多行输入
const [value, setValue] = useState('')

<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder='请输入内容'
/>
```

### 常见用法

```jsx
import { Textarea } from '@gm-mobile/react'

// 禁用状态
<Textarea
  disabled
  value='这是不可编辑的内容'
/>

// 限制字符数并显示计数
const [content, setContent] = useState('')

<Textarea
  value={content}
  maxLength={100}
  onChange={(e) => setContent(e.target.value)}
  placeholder='最多输入100字'
/>

// 自定义行数
<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  rows={5}
  placeholder='显示5行'
/>

// 表单样式
<Textarea
  form
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder='表单样式的输入框'
/>
```

### 高级用法

```jsx
import { Textarea } from '@gm-mobile/react'

// 自定义样式
<Textarea
  value={value}
  onChange={(e) => setValue(e.target.value)}
  className='custom-textarea'
  style={{ fontSize: '16px', color: '#333' }}
  placeholder='自定义样式的输入框'
/>

// 获取 ref
const textareaRef = useRef()

<Textarea
  ref={textareaRef}
  value={value}
  onChange={(e) => setValue(e.target.value)}
  placeholder='可通过 ref 访问原生 textarea'
/>

// 字符限制场景
const [description, setDescription] = useState('')

<Textarea
  value={description}
  maxLength={200}
  onChange={(e) => {
    // maxLength 仅用于显示计数，如需真正限制需手动处理
    if (e.target.value.length <= 200) {
      setDescription(e.target.value)
    }
  }}
  rows={4}
  placeholder='请输入描述（最多200字）'
/>
```

## 注意事项

1. **受控组件**：
   - Textarea 是受控组件，必须同时提供 `value` 和 `onChange`
   - value 属性是必填的，确保组件状态完全受控

2. **字符计数**：
   - `maxLength` 属性仅用于显示字符计数（格式为 "已输入/最大"）
   - 不会自动限制用户输入，如需真正限制字符数，需要在 onChange 中手动处理
   - 计数显示在输入框右下角

3. **表单样式**：
   - `form` 属性会应用组件库预定义的表单样式
   - 适合在统一风格的表单场景中使用
   - 如需完全自定义，建议使用 `className` 和 `style`

4. **禁用状态**：
   - 设置 `disabled` 后，输入框不可编辑且样式变为灰色
   - 禁用状态下不响应点击和输入事件

5. **行数设置**：
   - `rows` 属性控制输入框的显示行数（高度）
   - 默认值为 '3'，可根据实际内容调整
   - 用户输入内容超过显示区域时，会自动出现滚动条

6. **ref 使用**：
   - 支持通过 `ref` 访问原生的 textarea DOM 元素
   - 可用于手动聚焦、获取选中内容等操作

## 相关组件

- **Input** - 单行文本输入框组件
- **InputPassword** - 密码输入框组件
- **BorderInput** - 带边框和字符计数的输入框组件
- **Form** - 表单容器组件
