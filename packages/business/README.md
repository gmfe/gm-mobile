# @gm-mobile/business

## 简介

@gm-mobile/business 是业务组件包，提供了常见的业务场景组件，包括优惠券、商品选择、日期选择和电子签名等功能。

## 安装

```bash
npm install @gm-mobile/business
# 或
yarn add @gm-mobile/business
```

## 包含的组件

### 1. Coupon & ReceivedCoupon
优惠券组件，支持多种状态的优惠券展示。

- **Coupon**: 可领取/可使用的优惠券组件
- **ReceivedCoupon**: 已领取优惠券组件
- **适用场景**：营销活动、优惠券管理、订单结算
- **详细文档**：[Coupon README](src/component/coupon/README.md)

### 2. ProductSelection
商品选择组件，支持字母索引和商品搜索。

- **适用场景**：商品选择、规格选择、商品列表
- **主要功能**：
  - 字母索引导航
  - 商品搜索
  - 多选/单选
  - 自定义渲染
- **详细文档**：[ProductSelection README](src/component/product_selection/README.md)

### 3. TabDateSelect
标签日期选择器，支持日期范围选择和服务时间配置。

- **适用场景**：配送日期选择、预约时间选择
- **主要功能**：
  - 日期标签切换
  - 时间段选择
  - 服务时间配置
  - 弹窗展示
- **详细文档**：[TabDateSelect README](src/component/tab_date_select/README.md)

### 4. Signature
电子签名组件，支持手写签名和签名查看。

- **适用场景**：电子合同、签收确认、授权签名
- **主要功能**：
  - 手写签名画布
  - 签名查看模式
  - Base64/Blob 导出
  - 禁用编辑
- **详细文档**：[Signature README](src/component/signature/README.md)

## 使用示例

```jsx
import {
  Coupon,
  ReceivedCoupon,
  ProductSelection,
  TabDateSelect,
  Signature
} from '@gm-mobile/business'

// 优惠券组件
<Coupon
  title="新人专享券"
  subTitle="满100减10"
  status="available"
  onChange={(checked) => console.log(checked)}
/>

// 商品选择组件
<ProductSelection
  data={productList}
  selected={selectedProducts}
  onSelect={handleSelect}
/>

// 日期选择器
<TabDateSelect.render({
  tabs: ['今天', '明天'],
  begin: '2026-03-27',
  end: '2026-03-28',
  onSelect: handleSelect,
})

// 电子签名
<Signature
  onSave={(base64) => console.log('签名保存:', base64)}
  disabledEdit={false}
/>
```

## 开发依赖

- **React**: ^16.13.1
- **@gm-mobile/react**: 依赖基础组件库

## 相关包

- [@gm-mobile/react](../react/README.md) - 基础组件库
- [@gm-mobile/swiper](../swiper/README.md) - 轮播组件库
- [@gm-mobile/service_time](../service_time/README.md) - 服务时间组件库

## 快速链接

- [Coupon 组件文档](src/component/coupon/README.md)
- [ProductSelection 组件文档](src/component/product_selection/README.md)
- [TabDateSelect 组件文档](src/component/tab_date_select/README.md)
- [Signature 组件文档](src/component/signature/README.md)

## 许可证

ISC

---

**版本**: v1.1.12
**最后更新**: 2026-03-27
