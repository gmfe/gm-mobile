# Header

## 简介
头部导航栏组件 - 提供返回按钮、标题和右侧操作区域的通用头部导航栏。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Header } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onBack | 返回按钮点击回调 | `() => void` | `_.noop` | 否 |
| title | 标题文字 | `string` | - | 否 |
| hideBack | 是否隐藏返回按钮 | `boolean` | `false` | 否 |
| right | 右侧自定义内容 | `ReactNode` | - | 否 |
| className | 自定义类名 | `string` | - | 否 |

继承 `HTMLAttributes<HTMLDivElement>` 的所有属性。

## 示例

### 基础用法

```jsx
import { Header } from '@gm-mobile/react'

const App = () => {
  return (
    <Header
      title="页面标题"
      onBack={() => console.log('返回')}
    />
  )
}
```

### 隐藏返回按钮

```jsx
import { Header } from '@gm-mobile/react'

const App = () => {
  return <Header title="首页" hideBack />
}
```

### 自定义右侧内容

```jsx
import { Header } from '@gm-mobile/react'

const App = () => {
  return (
    <Header
      title="页面标题"
      onBack={() => console.log('返回')}
      right={<span style={{ color: '#fff' }}>更多</span>}
    />
  )
}
```

## 注意事项
- Header 默认样式为白色文字深色背景（`m-header m-text-white`）
- 不传 `title` 时只显示返回箭头
- `hideBack` 为 `true` 时会同时增加标题左侧的间距
