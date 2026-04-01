# Divider

## 简介

Divider 分割线组件 - 用于在内容之间添加分割线，支持带文字的分割线，常用于页面内容的区域划分。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 分割线中间的内容，通常为文字 | ReactNode | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**说明**：
- `children` 是字符串时，会使用 `<h4>` 标签包裹
- `children` 是其他 React 元素时，会直接渲染
- 不传 `children` 时，仅显示一条分割线

## 示例

### 基础用法

```jsx
import { Divider } from '@gm-mobile/react'

// 带文字的分割线
<Divider>文字分割</Divider>

// 不带文字的分割线
<Divider />
```

### 常见用法

```jsx
import { Divider } from '@gm-mobile/react'

// 在表单中使用
<Form>
  <Input placeholder="用户名" />
  <Divider />
  <Input type="password" placeholder="密码" />
</Form>

// 在列表中使用
<List>
  <List.Item>列表项 1</List.Item>
  <Divider>分割标题</Divider>
  <List.Item>列表项 2</List.Item>
  <List.Item>列表项 3</List.Item>
</List>

// 自定义样式
<Divider
  className='custom-divider'
  style={{ margin: '20px 0' }}
>
  自定义样式
</Divider>
```

### 高级用法

```jsx
import { Divider } from '@gm-mobile/react'

// 使用 React 元素作为 children
<Divider>
  <span style={{ color: '#ff0000' }}>红色文字</span>
</Divider>

// 带图标的分割线
<Divider>
  <Icon type="star" />
  <span>带图标的分割线</span>
  <Icon type="star" />
</Divider>

// 动态内容
<Divider>
  {isLoggedIn ? '已登录用户' : '未登录用户'}
</Divider>
```

## 注意事项

1. **组件使用场景**：
   - Divider 主要用于视觉上的内容分隔，不建议用于逻辑结构划分
   - 在表单、列表、卡片等内容区域之间使用效果最佳

2. **样式自定义**：
   - 组件默认使用 Flex 布局，左右两条线会自动填充剩余空间
   - 如需修改分割线颜色、粗细等样式，建议通过 `className` 配合全局 CSS 实现
   - 直接使用 `style` 可以快速调整间距、背景等简单样式

3. **内容处理**：
   - 字符串内容会自动包裹在 `<h4>` 标签中，应用默认的标题样式
   - 如需要完全自定义内容的样式，请传入 React 元素而非字符串

4. **嵌套使用**：
   - 不建议在 Divider 内部嵌套复杂的组件结构
   - 如果需要在分割线中放置复杂内容，建议使用 React 元素并自行控制布局

## 相关组件

- **List** - 列表组件，常与 Divider 配合使用
- **Form** - 表单组件，可在表单项之间使用 Divider 进行分隔
- **Panel** - 面板组件，可在不同面板之间使用 Divider
