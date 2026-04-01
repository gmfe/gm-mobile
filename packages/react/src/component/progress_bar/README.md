# ProgressBar

## 简介
进度条 - 用于直观展示任务完成进度的组件，支持自定义文字显示位置和内容。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percentage | 进度百分比，取值范围 0-100 | number | - | 是 |
| showText | 是否显示文字（百分比或自定义文字） | boolean | false | 否 |
| text | 自定义显示的文字，不传则显示百分比 | string | - | 否 |
| textInside | 文字是否显示在进度条内部 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |

## 示例

### 基础用法

最简单的进度条，只设置百分比：

```jsx
import { ProgressBar } from '@gm-mobile/react'

// 不显示文字
<ProgressBar percentage={30} />

// 显示文字（外部）
<ProgressBar percentage={60} showText />

// 显示自定义文字（外部）
<ProgressBar percentage={90} showText text="即将完成" />
```

### 常见用法

#### 文字在进度条内部

当进度条宽度足够时，可以将文字显示在进度条内部：

```jsx
import { ProgressBar } from '@gm-mobile/react'

<ProgressBar percentage={80} showText textInside />

// 自定义内部文字
<ProgressBar percentage={50} showText textInside text="加载中" />
```

#### 不同进度展示

展示多个不同状态的进度条：

```jsx
import { ProgressBar } from '@gm-mobile/react'

<div>
  <ProgressBar percentage={20} showText />
  <ProgressBar percentage={50} showText text="进行中" />
  <ProgressBar percentage={80} showText textInside />
  <ProgressBar percentage={100} showText text="完成" />
</div>
```

#### 无文字显示

用于不需要显示具体数值的场景：

```jsx
import { ProgressBar } from '@gm-mobile/react'

<div>
  <ProgressBar percentage={25} />
  <ProgressBar percentage={50} />
  <ProgressBar percentage={75} />
  <ProgressBar percentage={100} />
</div>
```

## 注意事项

- percentage 必须在 0-100 之间，超出范围可能导致样式异常
- 当 showText 为 true 但未设置 text 时，默认显示百分比数值（如 "80%"）
- 当 textInside 为 true 时，建议 percentage 大于 10，否则文字可能显示不全
- text 属性优先级高于默认的百分比显示，设置后将覆盖百分比文字
- 进度条颜色和样式可以通过 className 自定义，需配合样式文件使用
