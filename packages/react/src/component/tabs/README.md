# Tabs

## 简介

Tabs 标签页组件 - 用于切换不同内容的标签页组件，支持默认式、标签式和胶囊式三种样式类型，适用于内容分类、页面切换等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tabs | tabs 数据，格式为 [{ value, text }] | array | - | 是 |
| active | 当前选中 tab 对应的 value 值 | any | - | 是 |
| onChange | 切换 tab 时的回调函数 | function | () => {} | 否 |
| type | 标签页样式类型 | oneOf(['default', 'label', 'capsule']) | 'default' | 否 |
| className | 自定义类名 | string | - | 否 |

## 示例

### 基础用法

```jsx
import { Tabs } from '@gm-mobile/react'
import { useState } from 'react'

const [active, setActive] = useState(1)

const tabsList = [
  { value: 1, text: '模块一' },
  { value: 2, text: '模块二' },
  { value: 3, text: '模块三' },
]

<Tabs
  active={active}
  tabs={tabsList}
  onChange={(value) => setActive(value)}
/>
```

### 不同样式类型

```jsx
import { Tabs } from '@gm-mobile/react'
import { useState } from 'react'

const [active, setActive] = useState(1)

const tabsList = [
  { value: 1, text: '首页' },
  { value: 2, text: '分类' },
  { value: 3, text: '我的' },
]

// 默认样式
<Tabs
  active={active}
  tabs={tabsList}
  onChange={(value) => setActive(value)}
/>

// 标签式（适合深色背景）
<div style={{ background: '#f5f5f5', padding: '10px 0' }}>
  <Tabs
    active={active}
    tabs={tabsList}
    onChange={(value) => setActive(value)}
    type='label'
  />
</div>

// 胶囊式
<Tabs
  active={active}
  tabs={tabsList}
  onChange={(value) => setActive(value)}
  type='capsule'
/>
```

### 动态内容切换

```jsx
import { Tabs } from '@gm-mobile/react'
import { useState } from 'react'

const [active, setActive] = useState(1)

const tabsList = [
  { value: 'hot', text: '热门' },
  { value: 'new', text: '最新' },
  { value: 'recommend', text: '推荐' },
]

const contentMap = {
  hot: <div>热门内容</div>,
  new: <div>最新内容</div>,
  recommend: <div>推荐内容</div>,
}

<>
  <Tabs
    active={active}
    tabs={tabsList}
    onChange={(value) => setActive(value)}
  />
  <div style={{ padding: '20px' }}>
    {contentMap[active]}
  </div>
</>
```

### 受控与非受控

```jsx
import { Tabs } from '@gm-mobile/react'
import { useState } from 'react'

// 受控组件（推荐）
const [active, setActive] = useState(1)

<Tabs
  active={active}
  tabs={[
    { value: 1, text: '选项一' },
    { value: 2, text: '选项二' },
  ]}
  onChange={(value) => {
    setActive(value)
    console.log('切换到：', value)
  }}
/>

// 非受控组件（不推荐，仅用于演示）
// 如果不传 onChange，切换不会生效
<Tabs
  active={1}
  tabs={[
    { value: 1, text: '选项一' },
    { value: 2, text: '选项二' },
  ]}
/>
```

## 注意事项

1. **受控组件使用**：
   - Tabs 是受控组件，必须同时提供 `active` 和 `onChange` 才能正常工作
   - `onChange` 回调会接收被点击 tab 的 `value` 值，需要更新 `active` 状态

2. **tabs 数据格式**：
   - `tabs` 数组中每一项必须包含 `value` 和 `text` 两个字段
   - `value` 可以是任意类型（string、number 等），但要与 `active` 的类型一致
   - `text` 是显示在标签上的文字

3. **样式类型选择**：
   - `default`：默认样式，适合大多数场景
   - `label`：标签式样式，通常配合背景色使用，适合卡片内部或深色背景
   - `capsule`：胶囊式样式，适合需要突出标签的场景

4. **性能考虑**：
   - 切换 tab 本身不会触发内容渲染，需要根据 `active` 值自行控制内容显示
   - 建议配合条件渲染或路由使用，避免一次性渲染所有内容

5. **自定义样式**：
   - 可以通过 `className` 添加自定义类名
   - 组件会传递所有未在 props 中定义的属性给底层的 Flex 组件
   - 可通过 `style` 属性自定义样式

## 相关组件

- **TabBar** - 底部导航栏组件，常用于页面级导航
- **Nav** - 导航组件，常用于页面头部导航
