# FlipNumber

## 简介
翻转数字组件 - 数字滚动动画效果组件，支持从起始数字滚动到目标数字，常用于数据大屏展示和数值动态变化场景。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { FlipNumber } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| to | 最后要显示的数字 | `number` | - | 是 |
| from | 滚动的起始数 | `number` | `0` | 否 |
| delay | 延迟执行时间（毫秒） | `number` | `0` | 否 |
| duration | 滚动动画时长（毫秒） | `number` | `1500` | 否 |
| easeFn | 缓动函数，控制滚动的加速度 | `(pos: number) => number` | easeInOutCubic | 否 |
| individually | 是否逐个数字滚动 | `boolean` | `true` | 否 |
| decimal | 小数点个数 | `number` | `0` | 否 |
| useGroup | 是否启用大数逗号分组（如 1,000,000） | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |

### 默认缓动函数

组件默认使用 easeInOutCubic 缓动函数：

```js
;(pos) =>
    (pos /= 0.5) < 1
        ? 0.5 * Math.pow(pos, 3)
        : 0.5 * (Math.pow(pos - 2, 3) + 2)
```

可以传入自定义缓动函数来控制滚动效果，参考 [easing-js](https://github.com/danro/easing-js)。

## 示例

### 基础用法

```jsx
import { FlipNumber } from '@gm-mobile/react'

const App = () => {
  return <FlipNumber from={0} to={9999} />
}
```

### 带小数和延迟

```jsx
import { FlipNumber } from '@gm-mobile/react'

const App = () => {
  return <FlipNumber from={0} to={9999.99} decimal={2} delay={1000} />
}
```

### 千分位分组

```jsx
import { FlipNumber } from '@gm-mobile/react'

const App = () => {
  return <FlipNumber from={0} to={1000000} useGroup duration={2000} />
}
```

## 注意事项
- `to` 属性为必填项，表示数字滚动最终停留的目标值
- 组件内部使用 `requestAnimationFrame` 实现流畅的动画效果，当 `to` 属性变化时会自动取消上一次动画并重新开始
- `individually` 为 `true` 时，每个数字位会独立滚动（类似老虎机效果），为 `false` 时所有数字位同步滚动
- `decimal` 属性控制显示的小数位数，会同时向下取整
- 组件会根据 from 和 to 的字符串长度自动对齐位数，不足的前面补 0
