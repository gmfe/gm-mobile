# @gm-mobile/mp

## 简介
小程序适配包 - 基于 Taro.js 的微信小程序组件和工具库，提供小程序端的页面组件、存储、路由、上传等功能。

## 安装

```bash
npm install @gm-mobile/mp
```

### peerDependencies

```json
{
  "@tarojs/components": "3.0.18",
  "classnames": "^2.2.6",
  "lodash": "^4.17.15",
  "moment": "^2.26.0",
  "prop-types": "^15.7.2",
  "react": "^16.13.1"
}
```

## 使用

### 快速开始

```jsx
import { PageMP, Router, LocalStorage } from '@gm-mobile/mp'
```

## API

### 导出列表

#### 工具类

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `LocalStorage` | 类 | 本地存储封装 |
| `useFirstDidShow` | Hook | 首次 `didShow` 生命周期钩子 |
| `Router` | 类 | 路由工具 |
| `upload` | 函数 | 文件上传工具 |

#### 小程序组件

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Image` | 组件 | 小程序图片组件 |
| `PageMP` | 组件 | 小程序页面容器组件 |
| `Counter` | 组件 | 小程序计数器组件 |
| `StatusBar` | 组件 | 状态栏组件 |
| `Swiper` | 组件 | 轮播组件 |
| `SafeHeader` | 组件 | 安全区域头部组件 |
| `SafeBottom` | 组件 | 安全区域底部组件 |

#### 基础组件（从 @gm-mobile/c-react 重新导出）

同时导出 `@gm-mobile/c-react` 的所有组件，包括 Button、Flex、Dialog、Toast 等。

## 示例

### 小程序页面

```jsx
import { PageMP, SafeHeader, SafeBottom } from '@gm-mobile/mp'

const App = () => {
  return (
    <PageMP>
      <SafeHeader />
      <div>页面内容</div>
      <SafeBottom />
    </PageMP>
  )
}
```

### 本地存储

```jsx
import { LocalStorage } from '@gm-mobile/mp'

// 设置值
LocalStorage.set('key', 'value')

// 获取值
const value = LocalStorage.get('key')

// 移除值
LocalStorage.remove('key')
```

### 首次显示钩子

```jsx
import { useFirstDidShow } from '@gm-mobile/mp'

const App = () => {
  useFirstDidShow(() => {
    console.log('页面首次显示')
  })

  return <div>内容</div>
}
```

## 注意事项
- 该包基于 Taro.js 3.0.18，需配合 Taro 项目使用
- 不提供 `LayoutRoot` 和 `Page`（Web 端组件），请使用 `PageMP` 代替
- 同时导出 `@gm-mobile/c-react` 的所有组件，可直接从本包导入
- 依赖 `dayjs` 进行日期处理

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件
- [@gm-mobile/react](../react) - Web 端主组件库
- [@gm-mobile/locales](../locales) - 国际化工具
