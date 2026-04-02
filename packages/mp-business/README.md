# @gm-mobile/mp-business

## 简介
小程序业务组件包 - 小程序端的业务组件，重新导出 `@gm-mobile/c-business` 的所有组件。

## 安装

```bash
npm install @gm-mobile/mp-business
```

## 使用

### 快速开始

```jsx
import { Coupon, ReceivedCoupon, TabDateSelect } from '@gm-mobile/mp-business'
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Coupon` | 组件 | 优惠券组件（来自 @gm-mobile/c-business） |
| `ReceivedCoupon` | 组件 | 已领取优惠券组件（来自 @gm-mobile/c-business） |
| `TabDateSelect` | 组件 | 日期标签选择组件（来自 @gm-mobile/c-business） |

## 注意事项
- 本包是 `@gm-mobile/c-business` 的小程序端重新导出，API 完全相同
- 所有组件均兼容 Taro.js 3.0.18 环境

## 相关包
- [@gm-mobile/c-business](../c-business) - 基础业务组件
- [@gm-mobile/business](../business) - Web 端业务组件
