# Checkbox

## 简介

Checkbox 复选框组件 - 用于多选场景的基础复选框组件，支持方形、圆形、主题色等多种样式，并提供禁用状态。

## API

### Checkbox Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| checked | 选中状态 | boolean | - | 是 |
| circle | 是否使用圆形样式 | boolean | false | 否 |
| primary | 是否使用主题色 | boolean | false | 否 |
| disabled | 是否禁用 | boolean | false | 否 |
| onChange | 状态变化时的回调函数 | function | () => {} | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**onChange 参数说明**：
- 参数类型：`Event`
- 返回值：无
- 触发时机：点击复选框时

## 示例

### 基础用法

```jsx
import { Checkbox } from '@gm-mobile/react'
import { useState } from 'react'

const [checked, setChecked] = useState(true)

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
>
  同意用户协议
</Checkbox>
```

### 样式变体

```jsx
import { Checkbox } from '@gm-mobile/react'

// 圆形复选框
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  circle
>
  圆形样式
</Checkbox>

// 主题色样式
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  primary
>
  主题色样式
</Checkbox>

// 圆形 + 主题色
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  circle
  primary
>
  圆形主题色
</Checkbox>
```

### 禁用状态

```jsx
import { Checkbox } from '@gm-mobile/react'

// 选中态禁用
<Checkbox checked disabled>选中并禁用</Checkbox>

// 未选中态禁用
<Checkbox checked={false} disabled>未选中并禁用</Checkbox>

// 主题色禁用
<Checkbox checked disabled primary>主题色禁用</Checkbox>
```

### 高级用法

```jsx
import { Checkbox } from '@gm-mobile/react'
import { useState } from 'react'

// 多选场景
const [hobbies, setHobbies] = useState({
  reading: false,
  sports: false,
  music: false,
})

const handleCheckboxChange = (key) => (e) => {
  setHobbies({
    ...hobbies,
    [key]: e.target.checked,
  })
}

<div>
  <Checkbox
    checked={hobbies.reading}
    onChange={handleCheckboxChange('reading')}
  >
    阅读
  </Checkbox>
  <Checkbox
    checked={hobbies.sports}
    onChange={handleCheckboxChange('sports')}
  >
    运动
  </Checkbox>
  <Checkbox
    checked={hobbies.music}
    onChange={handleCheckboxChange('music')}
  >
    音乐
  </Checkbox>
</div>

// 自定义样式
<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  className='custom-checkbox'
  style={{ margin: '10px' }}
>
  自定义样式
</Checkbox>

// 条件禁用
const [canAgree, setCanAgree] = useState(false)

<Checkbox
  checked={checked}
  onChange={(e) => setChecked(e.target.checked)}
  disabled={!canAgree}
>
  请先完成前置操作
</Checkbox>
```

## 注意事项

1. **受控组件**：
   - Checkbox 是受控组件，必须提供 `checked` 属性
   - 通常需要配合 `onChange` 来更新 checked 状态
   - 不要直接修改 checked 值，应通过 setState 更新

2. **样式选择**：
   - 默认为方形复选框，适合大多数场景
   - `circle` 属性会显示圆形样式，适合单选类的视觉场景（注意：仍为多选逻辑）
   - `primary` 属性会应用主题色，用于强调重要选项

3. **onChange 事件**：
   - onChange 接收的是原生 DOM 事件对象
   - 新的选中状态通过 `e.target.checked` 获取
   - 如果不传 onChange，点击不会有任何效果（默认为空函数）

4. **禁用状态**：
   - `disabled` 会使复选框不可点击
   - 禁用状态下仍会显示选中/未选中的视觉效果
   - 常用于权限控制、条件限制等场景

5. **全选/反选场景**：
   - 如需实现全选功能，需要在父组件维护选中状态数组
   - 建议将 Checkbox 与 List 组件配合使用
   - 可以通过计算属性实现"全选/取消全选"功能

## 相关组件

- **Radio** - 单选框组件，用于单选场景
- **Switch** - 开关组件，用于二选一的场景
- **Input** - 输入框组件
- **List** - 列表组件，常配合 Checkbox 实现选择列表
- **Button** - 按钮组件，常配合 Checkbox 实现批量操作
