# FlipNumber

## 简介
翻转数字 - 数字滚动动画组件，通过翻转效果展示数字从 from 到 to 的变化过程，适用于数据可视化、统计数字展示等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| to | 最后要显示的数字 | number | - | 是 |
| from | 滚动的起始数 | number | 0 | 否 |
| delay | 延迟执行时间（毫秒） | number | 0 | 否 |
| duration | 滚动动画时长（毫秒） | number | 1500 | 否 |
| easeFn | 缓动函数，控制滚动的加速度曲线 | function | easeInOutCubic | 否 |
| individually | 是否逐个数字独立滚动 | boolean | true | 否 |
| decimal | 保留小数点个数 | number | 0 | 否 |
| useGroup | 是否启用千分位逗号分组 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |

### 方法
无公开方法

## 示例

### 基础用法
```jsx
import { FlipNumber } from '@gm-mobile/react'

// 从 0 滚动到 9999.99，延迟 1 秒后开始
<FlipNumber from={0} to={9999.99} delay={1000} />
```

### 常见用法

```jsx
import { FlipNumber } from '@gm-mobile/react'

// 1. 快速滚动（缩短动画时长）
<FlipNumber from={0} to={2024} duration={800} />

// 2. 带千分位的数字滚动
<FlipNumber from={0} to={1234567} useGroup={true} />

// 3. 保留两位小数的金额滚动
<FlipNumber from={0} to={9999.99} decimal={2} />

// 4. 整体滚动（individually=false）
<FlipNumber from={100} to={999} individually={false} />
```

### 高级用法

```jsx
import { FlipNumber } from '@gm-mobile/react'

// 自定义缓动函数 - 线性匀速滚动
const linearEasing = (pos) => pos
<FlipNumber from={0} to={10000} easeFn={linearEasing} />

// 自定义缓动函数 - 先慢后快
const easeIn = (pos) => Math.pow(pos, 2)
<FlipNumber from={0} to={10000} easeFn={easeIn} />
```

## 注意事项
- to 属性为必填项，必须指定目标数字
- 数字滚动动画使用了 requestAnimationFrame，性能较好
- 当 to 属性变化时会重新触发滚动动画
- individually 为 true 时，每个数字位独立滚动，效果更生动；为 false 时整体滚动
- 小数位会自动向下取整（使用 _.floor）
- useGroup 启用后会按照 toLocaleString 的格式添加千分位分隔符
- 自定义缓动函数接收一个 0-1 的进度值，应返回 0-1 的值
- 组件会在组件卸载时自动清理动画帧和定时器

## 相关组件
无相关组件
