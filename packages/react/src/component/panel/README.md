# Panel

## 简介

Panel 面板组件 - 用于展示内容区域的卡片式容器，支持标题、操作按钮和自定义边距圆角，常用于移动端页面的内容分组展示。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 面板标题，支持字符串或 React 元素 | string or element | - | 否 |
| onTitle | 标题点击事件，提供后标题右侧会显示右箭头图标 | function | - | 否 |
| action | 标题右侧的操作按钮区域 | element | - | 否 |
| top | 贴上边，左上和右上角没有圆角 | boolean | false | 否 |
| bottom | 贴下边，左下和右下角没有圆角 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Panel } from '@gm-mobile/react'

// 无标题的面板
<Panel>
  <div>面板内容</div>
</Panel>

// 带标题的面板
<Panel title="标题">
  <div>面板内容</div>
</Panel>
```

### 常见用法

```jsx
import { Panel } from '@gm-mobile/react'

// 带操作按钮的面板
<Panel
  title="订单信息"
  action={<div className="m-padding-lr-15">待分拣</div>}
>
  <div>面板内容</div>
</Panel>

// 可点击标题的面板（带右箭头）
<Panel
  title="查看详情"
  onTitle={() => {
    window.location.href = 'https://www.example.com'
  }}
>
  <div>面板内容</div>
</Panel>

// 连续面板组合（顶部贴边）
<div>
  <Panel title="面板1" top>
    <div>内容1</div>
  </Panel>
  <div className="m-gap-5" />
  <Panel title="面板2">
    <div>内容2</div>
  </Panel>
  <div className="m-gap-5" />
  <Panel title="面板3" bottom>
    <div>内容3</div>
  </Panel>
</div>
```

### 高级用法

```jsx
import { Panel } from '@gm-mobile/react'

// 自定义内容区域边框
<Panel title="自定义边框样式">
  <div className="m-border-1px-top-before m-margin-lr-15 m-padding-tb-10">
    内容区域自带上边框
  </div>
</Panel>

// 自定义样式和类名
<Panel
  title="自定义样式"
  className="custom-panel"
  style={{ backgroundColor: '#f5f5f5' }}
>
  <div>面板内容</div>
</Panel>

// 复杂的面板布局
<Panel
  title={
    <div>
      <span className="m-text-bold">标题</span>
      <span className="m-text-gray m-margin-left-5">副标题</span>
    </div>
  }
  action={
    <div>
      <button className="m-btn-small">编辑</button>
    </div>
  }
>
  <div>复杂的内容区域</div>
</Panel>
```

## 注意事项

1. **连续面板使用**：
   - 当多个 Panel 连续使用时，第一个 Panel 使用 `top` 属性，最后一个使用 `bottom` 属性
   - 中间的 Panel 不需要设置 `top` 或 `bottom`
   - 这样可以保持面板之间的圆角和间距效果一致

2. **标题点击交互**：
   - 只提供 `onTitle` 属性时，标题会自动显示右箭头图标
   - 点击标题区域会触发 `onTitle` 回调函数
   - 适合用于跳转到详情页或展开更多内容的场景

3. **操作按钮区域**：
   - `action` 属性用于在标题右侧放置操作按钮或状态标签
   - `action` 内容会自动对齐到右侧
   - 可以放置按钮、文本、图标等任意 React 元素

4. **内容区域样式**：
   - Panel 组件本身不提供内容区域的边框样式
   - 如需在内容区域内添加分隔线，请使用 CSS 类名（如 `m-border-1px-top-before`）
   - 内容区域的内边距需要自行控制

5. **自定义样式**：
   - 优先使用 `className` 添加自定义样式
   - 复杂样式使用 `style` 属性
   - 避免直接修改 Panel 内部的 class 样式

## 相关组件

- **Flex** - 弹性布局组件，Panel 内部使用 Flex 进行布局
- **List** - 列表组件，可以与 Panel 组合使用实现列表分组
- **Divider** - 分割线组件，可用于 Panel 内部的分隔
- **Card** - 卡片组件，类似 Panel 但适用于不同的业务场景
