# @gm-mobile/c-react

## 简介
基础 React 组件库 - gm-mobile 的底层 UI 组件库，提供 40+ 基础移动端 React 组件，是 `@gm-mobile/react` 的核心依赖。

## 安装

```bash
npm install @gm-mobile/c-react
```

### peerDependencies

```json
{
  "@tarojs/components": "3.0.18",
  "@tarojs/taro": "3.0.18",
  "big.js": "^5.2.2",
  "classnames": "^2.2.6",
  "prop-types": "^15.7.2",
  "react": "^16.13.1"
}
```

## 使用

### 快速开始

```jsx
import { Button, Flex, Dialog, Toast, Input } from '@gm-mobile/c-react'

const App = () => {
  return <Button type="primary">按钮</Button>
}
```

## API

### 导出列表

#### 基础组件

| 导出项 | 说明 |
|--------|------|
| `Button` | 按钮 |
| `Flex` | 弹性布局 |
| `View` | 视图容器 |
| `Text` | 文本 |
| `Label` | 标签 |

#### 表单组件

| 导出项 | 说明 |
|--------|------|
| `Input` | 输入框 |
| `TextField` | 文本输入框 |
| `Textarea` | 多行文本输入 |
| `Checkbox` | 复选框 |
| `Radio` | 单选框 |
| `Switch` | 开关 |
| `Search` | 搜索框 |
| `Calendar` | 日历 |
| `DateSelector` | 日期选择器 |
| `DigitalKeyboard` | 数字键盘 |

#### 布局组件

| 导出项 | 说明 |
|--------|------|
| `Cell` | 单元格 |
| `Divider` | 分割线 |
| `Square` | 正方形容器 |
| `InnerLayer` | 内层布局 |
| `Panel` | 面板 |
| `Nav` | 导航 |
| `CustomTabbar` | 自定义标签栏 |
| `Draggable` | 可拖拽组件 |

#### 浮层/反馈组件

| 导出项 | 说明 |
|--------|------|
| `Dialog` | 弹窗（含 `alert`、`confirm`、`prompt`、`delete` 静态方法） |
| `Popup` | 弹出层 |
| `Toast` | 轻提示 |
| `Loading` | 加载中 |
| `Mask` | 遮罩层 |
| `ActionSheet` | 操作面板 |
| `ToolTip` | 文字提示 |

#### 数据展示

| 导出项 | 说明 |
|--------|------|
| `Tabs` | 标签页 |
| `Badge` | 徽标 |
| `Status` | 状态标识 |
| `TagWrap` | 标签组 |
| `Price` | 价格展示 |
| `VList` | 虚拟列表 |

#### 页面/容器

| 导出项 | 说明 |
|--------|------|
| `Page` | 页面容器 |
| `LayoutRoot` | 布局根容器（弹层挂载点） |
| `ScrollIntoView` | 滚动到可视区域 |

#### 其他

| 导出项 | 说明 |
|--------|------|
| `RepeatTimes` | 重复次数 |
| `Form` | 表单 |
| `Error` | 错误边界 |

## 注意事项
- 同时支持 Web 端（React）和小程序端（Taro），通过 `@tarojs/components` 适配
- `Dialog` 提供静态方法：`alert()`、`confirm()`、`prompt()`、`delete()`
- `LayoutRoot` 是弹层组件的挂载点，通常放在应用根节点
- 依赖 `@gm-mobile/c-font` 提供图标字体，依赖 `@gm-mobile/locales` 提供国际化

## 相关包
- [@gm-mobile/react](../react) - 主组件库（包含本包所有导出 + 扩展组件）
- [@gm-mobile/mp](../mp) - 小程序适配包
- [@gm-mobile/c-font](../c-font) - 图标字体
- [@gm-mobile/c-tool](../c-tool) - 工具函数库
- [@gm-mobile/locales](../locales) - 国际化工具
