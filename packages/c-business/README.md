# @gm-mobile/c-business

## 简介
基础业务组件包 - 提供通用的基础业务组件，包括优惠券和日期标签选择等。

## 安装

```bash
npm install @gm-mobile/c-business
```

## 使用

### 快速开始

```jsx
import { Coupon, ReceivedCoupon, TabDateSelect } from '@gm-mobile/c-business'
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Coupon` | 组件 | 优惠券组件 |
| `ReceivedCoupon` | 组件 | 已领取优惠券组件 |
| `TabDateSelect` | 组件 | 日期标签选择组件 |

## 示例

### 优惠券

```jsx
import { Coupon } from '@gm-mobile/c-business'

const App = () => {
  return <Coupon data={couponData} />
}
```

### 日期标签选择

```jsx
import { TabDateSelect } from '@gm-mobile/c-business'

const App = () => {
  return <TabDateSelect />
}
```

## 注意事项
- 本包被 `@gm-mobile/business` 和 `@gm-mobile/mp-business` 重新导出
- 同时兼容 Web 端和小程序端

## 相关包
- [@gm-mobile/business](../business) - Web 端业务组件（重新导出本包）
- [@gm-mobile/mp-business](../mp-business) - 小程序业务组件（重新导出本包）
