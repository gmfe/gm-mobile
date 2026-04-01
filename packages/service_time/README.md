# @gm-mobile/service_time

## 简介

@gm-mobile/service_time 是服务时间选择组件包，提供了订单收货时间选择的完整解决方案，支持单日和多日订单场景。

## 安装

```bash
npm install @gm-mobile/service_time
# 或
yarn add @gm-mobile/service_time
```

## 包含的组件

### 1. ReceiveTimePicker
普通订单收货时间选择器。

- **适用场景**：单日订单、即时配送、预约配送
- **主要功能**：
  - 日期选择
  - 时间段选择
  - 可用时间校验
  - 静态方法调用
- **详细文档**：[ReceiveTimePicker README](src/receive_time_picker/README.md)

### 2. MutiOrderReceiveTimePicker
多日订单收货时间选择器。

- **适用场景**：多日订单、批量下单、跨天配送
- **主要功能**：
  - 多日期选择
  - 批量时间配置
  - 订单分组管理
  - 静态方法调用
- **详细文档**：[MutiOrderReceiveTimePicker README](src/receive_time_picker/README.md)

## 使用示例

```jsx
import {
  ReceiveTimePicker,
  MutiOrderReceiveTimePicker
} from '@gm-mobile/service_time'

// 普通订单收货时间选择
ReceiveTimePicker.render({
  title: '选择收货时间',
  begin: '2026-03-27',
  end: '2026-03-28',
  onSelect: (date, time) => {
    console.log('选择时间:', date, time)
  },
  onHide: () => {
    console.log('关闭选择器')
  }
})

// 校验可用时间
ReceiveTimePicker.verifyReceiveTime({
  receiveDate: '2026-03-27',
  receiveTime: '09:00-10:00',
  onError: (msg) => {
    console.log('时间不可用:', msg)
  }
})

// 多日订单收货时间选择
MutiOrderReceiveTimePicker.render({
  orders: [
    { id: 1, name: '订单1' },
    { id: 2, name: '订单2' },
  ],
  title: '批量选择收货时间',
  onSelect: (result) => {
    console.log('选择结果:', result)
  }
})
```

## API 说明

### 静态方法

#### ReceiveTimePicker.render(options)
渲染收货时间选择器弹窗。

**参数：**
- `title` (string) - 弹窗标题
- `begin` (string) - 开始日期，格式：YYYY-MM-DD
- `end` (string) - 结束日期，格式：YYYY-MM-DD
- `onSelect` (function) - 选择回调，参数：(date, time, serviceTimeList)
- `onHide` (function) - 关闭回调
- `serviceTimeList` (array) - 服务时间配置列表

#### ReceiveTimePicker.hide()
隐藏当前显示的收货时间选择器。

#### ReceiveTimePicker.verifyReceiveTime(options)
校验收货时间是否可用。

**参数：**
- `receiveDate` (string) - 收货日期
- `receiveTime` (string) - 收货时间段
- `onError` (function) - 错误回调

#### MutiOrderReceiveTimePicker.render(options)
渲染多日订单收货时间选择器弹窗。

**参数：**
- `orders` (array) - 订单数组
- `title` (string) - 弹窗标题
- `onSelect` (function) - 选择回调，参数：选择结果对象

#### MutiOrderReceiveTimePicker.hide()
隐藏当前显示的多日订单收货时间选择器。

## 开发依赖

- **React**: ^16.13.1
- **@gm-mobile/react**: 依赖基础组件库

## 相关包

- [@gm-mobile/react](../react/README.md) - 基础组件库
- [@gm-mobile/business](../business/README.md) - 业务组件库
- [@gm-mobile/swiper](../swiper/README.md) - 轮播组件库

## 快速链接

- [ReceiveTimePicker 详细文档](src/receive_time_picker/README.md)

## 注意事项

- 收货时间选择器使用 `LayoutRoot.renderWith()` 渲染到弹窗层
- 时间格式必须为 HH:mm-HH:mm（如：09:00-10:00）
- 日期格式必须为 YYYY-MM-DD（如：2026-03-27）
- 建议在调用选择器前先使用 `verifyReceiveTime` 校验时间可用性
- 多日订单场景下，不同订单可能有不同的可用时间段

## 许可证

ISC

---

**版本**: v1.1.12
**最后更新**: 2026-03-27
