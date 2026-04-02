# @gm-mobile/c-font

## 简介
图标字体包 - 提供 gm-mobile 组件库使用的图标字体样式文件。

## 安装

```bash
npm install @gm-mobile/c-font
```

## 使用

### 快速开始

引入样式文件即可使用图标：

```jsx
// 在入口文件引入
import '@gm-mobile/c-font'
```

使用图标：

```jsx
<i className="m-font m-font-plus" />
<i className="m-font m-font-angle-left" />
<i className="m-font m-font-close" />
```

## 注意事项
- 本包仅提供样式文件，无需额外配置
- 图标类名格式为 `m-font m-font-{name}`
- 被 `@gm-mobile/c-react` 依赖，安装 `c-react` 后通常无需单独安装

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件库（自动依赖本包）
