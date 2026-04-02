# @gm-mobile/c-qrcode

## 简介
二维码组件包 - 提供跨平台的二维码渲染组件，支持 Web 端和小程序端。

## 安装

```bash
npm install @gm-mobile/c-qrcode
```

### peerDependencies

```json
{
  "qrcode.react": "^1.0.0",
  "weapp-qrcode": "^1.0.0"
}
```

## 使用

### 快速开始

```jsx
import { QRCode } from '@gm-mobile/c-qrcode'

<QRCode value="https://example.com" />
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `QRCode` | 组件 | 二维码渲染组件 |
| `QRCodeProps` | 类型 | QRCode 组件的 Props 类型 |

## 示例

### 基础用法

```jsx
import { QRCode } from '@gm-mobile/c-qrcode'

const App = () => {
  return (
    <div>
      <QRCode value="https://example.com" />
    </div>
  )
}
```

## 注意事项
- Web 端使用 `qrcode.react` 渲染二维码
- 小程序端使用 `weapp-qrcode` 渲染二维码
- 需要根据运行环境安装对应的 peerDependencies

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件
