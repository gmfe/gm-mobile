# Switch

## 简介

Switch 开关组件 - 用于表示开关状态/二元选择的开关组件，支持受控模式和禁用状态。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 是否选中 | boolean | - | 否 |
| onChange | 状态变化时的回调函数 | function | () => {} | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**onChange 回调参数**：
- 事件对象（Event），可以通过 `e.target.checked` 获取当前状态

## 示例

### 基础用法

```jsx
import { Switch } from '@gm-mobile/react'

const [checked, setChecked] = useState(false)

<Switch
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
/>
```

### 受控组件

```jsx
import { Switch } from '@gm-mobile/react'

const [checked, setChecked] = useState(false)

const handleChange = (e) => {
  const newStatus = e.target.checked
  setChecked(newStatus)
  console.log('开关状态：', newStatus)
}

<Switch
  checked={checked}
  onChange={handleChange}
/>
```

### 禁用状态

```jsx
import { Switch } from '@gm-mobile/react'

// 禁用的开关
<Switch
  disabled
  checked={false}
  onChange={() => {}}
/>

// 禁用的选中状态
<Switch
  disabled
  checked={true}
  onChange={() => {}}
/>
```

### 高级用法

```jsx
import { Switch } from '@gm-mobile/react'

// 多个开关联动
const [settings, setSettings] = useState({
  wifi: true,
  bluetooth: false,
  notification: true,
})

<div>
  <Switch
    checked={settings.wifi}
    onChange={(e) => setSettings({ ...settings, wifi: e.target.checked })}
  />
  <Switch
    checked={settings.bluetooth}
    onChange={(e) => setSettings({ ...settings, bluetooth: e.target.checked })}
  />
  <Switch
    checked={settings.notification}
    onChange={(e) => setSettings({ ...settings, notification: e.target.checked })}
  />
</div>

// 条件禁用
const [isUserAllowed, setIsUserAllowed] = useState(false)

<Switch
  disabled={!isUserAllowed}
  checked={false}
  onChange={() => {}}
/>

// 自定义样式
<Switch
  checked={true}
  onChange={() => {}}
  className='custom-switch'
  style={{ transform: 'scale(1.2)' }}
/>
```

## 注意事项

1. **受控组件使用**：
   - Switch 是受控组件，建议同时提供 `checked` 和 `onChange` 属性
   - 通过 `e.target.checked` 获取开关的新状态，而非直接读取事件对象

2. **状态管理**：
   - 不要直接修改 `checked` prop，应通过 `onChange` 回调更新父组件状态
   - 如果只需要开关的视觉效果而不需要状态，可以只传 `checked` 不传 `onChange`

3. **禁用状态**：
   - `disabled` 为 true 时，开关不会响应用户点击
   - 禁用状态下仍可以通过 props 控制 `checked` 值

4. **事件处理**：
   - `onChange` 的默认行为是空函数，不会报错
   - 如果需要异步处理开关状态，建议在 onChange 外部处理后再更新 checked

5. **样式定制**：
   - 使用 `className` 可以覆盖开关的默认样式
   - 使用 `style` 可以进行内联样式调整
   - 开关使用 CSS 类 `m-switch`，可以通过全局 CSS 定制

## 相关组件

- **Checkbox** - 复选框组件，用于多选场景
- **Radio** - 单选框组件，用于单选场景
- **Input** - 输入框组件
- **Form** - 表单容器组件
