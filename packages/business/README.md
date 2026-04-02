# @gm-mobile/business

## 简介
业务组件包 - 提供通用的业务级组件，包括商品选择、签名、优惠券等业务场景组件。

## 安装

```bash
npm install @gm-mobile/business
```

### peerDependencies

```json
{
  "react": "^16.13.1"
}
```

## 使用

### 快速开始

```jsx
import { ProductSelection, Signature } from '@gm-mobile/business'
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `ProductSelection` | 组件 | 商品选择组件 |
| `Signature` | 组件 | 手写签名组件 |
| `Coupon` | 组件 | 优惠券组件（来自 @gm-mobile/c-business） |
| `ReceivedCoupon` | 组件 | 已领取优惠券组件（来自 @gm-mobile/c-business） |
| `TabDateSelect` | 组件 | 日期标签选择组件（来自 @gm-mobile/c-business） |

## 示例

### 商品选择

```jsx
import { ProductSelection } from '@gm-mobile/business'

const App = () => {
  return <ProductSelection />
}
```

### 签名

```jsx
import { Signature } from '@gm-mobile/business'

const App = () => {
  return <Signature />
}
```

### 优惠券

```jsx
import { Coupon } from '@gm-mobile/business'

const App = () => {
  return <Coupon />
}
```

## 注意事项
- `Coupon`、`ReceivedCoupon`、`TabDateSelect` 从 `@gm-mobile/c-business` 重新导出
- 该包依赖 `@gm-mobile/c-react` 和 `@gm-mobile/locales`

## 相关包
- [@gm-mobile/c-business](../c-business) - 基础业务组件
- [@gm-mobile/c-react](../c-react) - 基础 React 组件
- [@gm-mobile/react](../react) - 主组件库
