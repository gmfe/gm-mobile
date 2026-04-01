# Coupon

## 简介
优惠券组件 - 用于展示优惠券信息，支持多种状态（正常、过期、已使用、禁用）和交互（领取、使用、勾选），适用于电商、营销等业务场景。

## API

### Coupon Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| currency | 折扣金额货币符号 | string | - | 是 |
| discount | 折扣金额 | number | - | 是 |
| totalInfo | 满减说明，如"满1000元可用" | string | - | 否 |
| dateInfo | 使用日期说明，可以是字符串或 React 元素 | string \| element | - | 否 |
| title | 优惠券标题 | string | - | 否 |
| labels | 优惠券标签数组，如 ['分类券', '新人券'] | array | - | 否 |
| hasUseInfo | 是否显示使用说明区域 | boolean | false | 否 |
| useInfo | 使用说明的内容，可以是文本或 React 元素 | element | - | 否 |
| onUse | 点击"立即使用"按钮的回调函数 | function | - | 否 |
| disabled | 是否禁用优惠券 | boolean | false | 否 |
| checked | 优惠券的勾选状态 | boolean | false | 否 |
| onCheck | 点击优惠券进行勾选的回调函数 | function | - | 否 |
| isExpired | 优惠券是否已过期 | boolean | false | 否 |
| isUsed | 优惠券是否已使用 | boolean | false | 否 |
| onReceived | 点击"立即领取"按钮的回调函数 | function | - | 否 |
| couponAmount | 可领取的优惠券数量 | number | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### ReceivedCoupon Props

ReceivedCoupon 是 Coupon 的简化版本，专门用于优惠券领取场景。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| currency | 折扣金额货币符号 | string | - | 是 |
| discount | 折扣金额 | string | - | 是 |
| totalInfo | 满减说明 | string | - | 否 |
| labels | 优惠券标签数组 | array | - | 否 |
| couponAmount | 可领取的优惠券数量 | number | - | 否 |
| isReceived | 是否已领取 | boolean | false | 否 |
| onReceived | 点击"领取"按钮的回调函数 | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

最简单的优惠券展示，包含基本的金额、满减信息和日期：

```jsx
import { Coupon } from '@gm-mobile/react'

<Coupon
  currency='¥'
  discount={100}
  totalInfo='满1000元可用'
  dateInfo='2024-01-01~2024-12-31'
  title='新人优惠券'
/>
```

### 带标签和勾选的优惠券

支持显示多个标签和勾选功能：

```jsx
import { Coupon } from '@gm-mobile/react'
import { observable } from 'mobx'

const store = observable({
  checked: false,
  setChecked(checked) {
    this.checked = checked
  },
})

<Coupon
  currency='¥'
  discount={100}
  totalInfo='满1000元可用'
  dateInfo='2024-01-01~2024-12-31'
  title='分类优惠券'
  labels={['分类券', '新人券']}
  checked={store.checked}
  onCheck={() => store.setChecked(!store.checked)}
/>
```

### 带使用说明的优惠券

可以展开查看详细的使用说明：

```jsx
import { Coupon } from '@gm-mobile/react'

<Coupon
  currency='¥'
  discount={30}
  totalInfo='满1000元可用'
  dateInfo='2024-01-01~2024-12-31'
  title='分类优惠券'
  labels={['仅限特定商品使用', '商品券']}
  hasUseInfo
  useInfo={
    <div>
      1. 仅限指定商品使用
      <br />
      2. 每个订单限用一张
      <br />
      3. 不可与其他优惠叠加
    </div>
  }
  couponAmount={4}
  onUse={() => console.log('使用优惠券')}
/>
```

### 不同状态的优惠券

展示优惠券的不同状态：禁用、过期、已使用：

```jsx
import { Coupon, Flex } from '@gm-mobile/react'

<Flex column>
  {/* 禁用状态 */}
  <Coupon
    currency='¥'
    discount={200}
    totalInfo='满300元可用'
    dateInfo='2024-01-01到期'
    title='禁用优惠券'
    disabled
  />

  {/* 过期状态 */}
  <Coupon
    currency='¥'
    discount={200}
    totalInfo='满300元可用'
    dateInfo='2024-01-01到期'
    title='过期优惠券'
    isExpired
  />

  {/* 已使用状态 */}
  <Coupon
    currency='¥'
    discount={200}
    totalInfo='满300元可用'
    dateInfo='2024-01-01到期'
    title='已使用优惠券'
    isUsed
  />
</Flex>
```

### 可领取的优惠券

支持领取功能的优惠券：

```jsx
import { Coupon } from '@gm-mobile/react'

<Coupon
  currency='¥'
  discount={200}
  totalInfo='满300元可用'
  title='可领取优惠券'
  couponAmount={10}
  onReceived={() => console.log('领取优惠券')}
/>
```

### ReceivedCoupon 简化版优惠券

用于优惠券领取列表的简化展示：

```jsx
import { ReceivedCoupon } from '@gm-mobile/react'

{/* 未领取状态 */}
<ReceivedCoupon
  currency='¥'
  discount='10'
  totalInfo='满100元可用'
  couponAmount={1}
  labels={['仅限特定商品使用']}
  onReceived={() => console.log('领取')}
/>

{/* 已领取状态 */}
<ReceivedCoupon
  currency='¥'
  discount='100'
  totalInfo='满200元可用'
  isReceived
/>
```

### 自定义日期信息

dateInfo 支持传入 React 元素实现复杂的日期展示：

```jsx
import { Coupon, Flex } from '@gm-mobile/react'

<Coupon
  currency='¥'
  discount={30}
  totalInfo='满1000元可用'
  dateInfo={
    <Flex wrap>
      <span>2024-01-01</span>
      <span>~</span>
      <span>2024-12-31</span>
    </Flex>
  }
  title='自定义日期优惠券'
  labels={['仅限特定商品使用', '商品使用']}
  hasUseInfo
  useInfo='详细的使用说明内容'
  onUse={() => console.log('使用')}
/>
```

## 注意事项

1. **必填属性**：`currency` 和 `discount` 是必填属性，必须传入这两个参数才能正常显示优惠券。

2. **状态优先级**：当 `disabled`、`isExpired` 或 `isUsed` 任一为 true 时，优惠券会显示为不可用状态，并且"立即使用"/"立即领取"按钮将不可点击。

3. **勾选功能**：如果需要使用勾选功能，必须同时传入 `checked` 和 `onCheck` 属性。`onCheck` 会接收新的勾选状态作为参数。

4. **使用说明**：只有当 `hasUseInfo` 为 true 时，才会显示使用说明区域。点击可以展开/收起 `useInfo` 的内容。

5. **按钮互斥**：`onUse` 和 `onReceived` 不能同时使用，根据业务场景选择一个传入。

6. **labels 数组**：标签数组会自动渲染为多个小标签，建议传入 1-3 个标签，避免过多导致显示混乱。

7. **couponAmount 显示位置**：
   - 在 Coupon 组件中，显示在日期信息下方
   - 在 ReceivedCoupon 组件中，显示在金额右侧的括号中

8. **日期信息格式**：`dateInfo` 支持字符串或 React 元素，可以传入简单的日期字符串，也可以传入复杂的布局元素。

9. **ReceivedCoupon vs Coupon**：
   - Coupon：功能完整，适合优惠券列表、我的优惠券等场景
   - ReceivedCoupon：样式简洁，适合优惠券领取中心、首页优惠券推荐等场景

## 相关组件

- [Checkbox](../checkbox/README.md) - Coupon 内部使用的勾选组件
