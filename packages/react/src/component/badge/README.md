# Badge

## 简介

Badge 徽章组件 - 用于在元素右上角显示数字、红点等提示信息，常用于消息通知、未读提醒等场景。

## API

### Badge Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| count | 徽章显示的数字 | number | - | 否 |
| dot | 是否仅显示红点 | boolean | false | 否 |
| corner | 是否在子元素右上角显示徽章数 | boolean | false | 否 |
| overflowCount | 徽章显示的最大数值 | number | 99 | 否 |
| showOverflow | 是否显示 '+' 表示数值溢出 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 子元素 | node | - | 否 |

## 示例

### 基础用法

```jsx
import { Badge } from '@gm-mobile/react'

// 显示数字徽章
<Badge count={8} />
<Badge count={100} />

// 超出最大值显示指定数值
<Badge count={100} overflowCount={99} />

// 超出最大值时显示 + 号
<Badge count={100} overflowCount={99} showOverflow />
```

### 红点徽章

```jsx
import { Badge } from '@gm-mobile/react'

// 简单红点
<Badge dot>
  <div>消息</div>
</Badge>

// 红点配合数字（dot 优先，会忽略 count）
<Badge dot count={99}>
  <div>通知</div>
</Badge>
```

### 右上角徽章

```jsx
import { Badge } from '@gm-mobile/react'

// 在元素右上角显示数字
<Badge corner count={5}>
  <div style={{ padding: '5px' }}>消息</div>
</Badge>

// 在元素右上角显示红点
<Badge corner dot>
  <div style={{ padding: '5px' }}>通知</div>
</Badge>

// 超出显示 +
<Badge corner count={100} showOverflow>
  <div style={{ padding: '5px' }}>消息</div>
</Badge>
```

### 常见用法

```jsx
import { Badge } from '@gm-mobile/react'

// 消息通知图标
<Badge corner count={8}>
  <Icon type="message" />
</Badge>

// 未读消息提示
<Badge corner dot>
  <span>系统消息</span>
</Badge>

// 购物车商品数量
<Badge corner count={3} overflowCount={99} showOverflow>
  <Icon type="cart" />
</Badge>

// 数量较大的徽章
<Badge count={9999} overflowCount={999} showOverflow />
```

### 高级用法

```jsx
import { Badge } from '@gm-mobile/react'

// 自定义样式
<Badge
  corner
  count={99}
  className="custom-badge"
  style={{ top: '0', right: '0' }}
>
  <div>自定义位置</div>
</Badge>

// 动态更新徽章数量
const [unreadCount, setUnreadCount] = useState(0)

<Badge corner count={unreadCount} showOverflow>
  <Icon type="message" onClick={() => setUnreadCount(0)} />
</Badge>

// 条件显示红点
const hasNewMessage = true

<Badge corner dot={hasNewMessage}>
  <span>消息</span>
</Badge>

// 自定义溢出阈值
<Badge count={1000} overflowCount={999} showOverflow />
```

## 注意事项

1. **corner 属性的使用**：
   - 当 `corner` 为 `true` 时，徽章会显示在子元素的右上角
   - 必须提供 `children` 子元素才能正确显示位置
   - 适合用于图标、文字等需要提示的元素

2. **dot 属性优先级**：
   - 当 `dot` 为 `true` 时，会显示红点，忽略 `count` 的值
   - 红点模式适合提示"有新内容"，但不需要显示具体数量的场景

3. **数值溢出处理**：
   - 当 `count` 超过 `overflowCount` 时，会显示 `overflowCount` 的值
   - 如果 `showOverflow` 为 `true`，会在后面显示 '+' 号（如 '99+'）
   - 默认 `overflowCount` 为 99，可根据业务需求调整

4. **样式自定义**：
   - 使用 `className` 可以应用自定义样式类
   - 使用 `style` 可以直接修改内联样式
   - 徽章的定位可以通过 CSS 进一步调整

5. **子元素说明**：
   - `children` 是可选的，不提供时独立显示徽章
   - 提供 `children` 时，徽章会叠加在子元素上（`corner` 模式）
   - 子元素可以是任意 React 元素（图标、文字、图片等）

## 相关组件

- **Tag** - 标签组件，用于分类和标记
- **Icon** - 图标组件，常与 Badge 配合使用
- **List** - 列表组件，列表项中常配合 Badge 使用
