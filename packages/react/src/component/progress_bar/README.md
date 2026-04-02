# ProgressBar

## 简介
进度条组件 - 支持在进度条内部或外部显示文字，适用于任务进度展示等场景。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { ProgressBar } from '@gm-mobile/react'

<ProgressBar percentage={80} />
```

## API

### Props

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比（0-100） | `number` | - | 是 |
| showText | 是否显示文字 | `boolean` | `false` | - |
| textInside | 文字是否显示在进度条内部 | `boolean` | `false` | - |
| text | 自定义显示的文字，不传则显示百分比数值 | `string` | - | - |
| className | 自定义类名 | `string` | - | - |
| style | 自定义样式 | `CSSProperties` | - | - |

## 示例

### 基础用法

```jsx
import { ProgressBar } from '@gm-mobile/react'

const App = () => {
  return (
    <div>
      <ProgressBar percentage={30} />
      <ProgressBar percentage={60} />
      <ProgressBar percentage={100} />
    </div>
  )
}
```

### 文字在进度条内部

```jsx
import { ProgressBar } from '@gm-mobile/react'

const App = () => {
  return <ProgressBar percentage={80} showText textInside />
}
```

### 文字在进度条外部

```jsx
import { ProgressBar } from '@gm-mobile/react'

const App = () => {
  return <ProgressBar percentage={80} showText />
}
```

### 自定义文字

```jsx
import { ProgressBar } from '@gm-mobile/react'

const App = () => {
  return (
    <ProgressBar
      percentage={66}
      showText
      text="加载中..."
    />
  )
}
```

## 注意事项
- `textInside` 仅在 `showText` 为 `true` 时生效
- `percentage` 值应在 0-100 之间
- 自定义 `text` 时不会自动显示百分比符号，需手动添加
