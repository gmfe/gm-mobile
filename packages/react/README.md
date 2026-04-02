# @gm-mobile/react

## 简介
主组件库 - gm-mobile 的核心 React UI 组件库，提供 16+ 移动端组件，涵盖表单、布局、数据展示等场景。同时重新导出 `@gm-mobile/c-react` 的所有基础组件。

## 安装

```bash
npm install @gm-mobile/react
```

### peerDependencies

```json
{
  "@gm-common/number": "^2.2.9",
  "big.js": "^5.2.2",
  "classnames": "^2.2.6",
  "react": "^16.13.1",
  "react-dom": "^16.13.1"
}
```

## 使用

### 快速开始

```jsx
import { Header, Keyboard, List, Tabbar } from '@gm-mobile/react'

const App = () => {
  return (
    <Header title="首页" onBack={() => window.history.back()} />
  )
}
```

## API

### 导出列表

#### 表单组件

| 导出项 | 说明 | 详细文档 |
|--------|------|----------|
| `Keyboard` | 数字键盘组件 | [README](./src/component/keyboard) |
| `KeyboardWrap` | 数字键盘包裹组件 | [README](./src/component/keyboard) |
| `Counter` | 计数器组件 | [README](./src/component/counter) |
| `FormScrollIntoView` | 表单滚动定位组件 | [README](./src/component/form_scroll_into_view) |

#### 布局组件

| 导出项 | 说明 | 详细文档 |
|--------|------|----------|
| `Tabbar` | 底部标签栏 | [README](./src/component/tab_bar) |
| `FlowBtnTabbar` | 中间浮动按钮标签栏 | [README](./src/component/tab_bar) |
| `PullUpDown` | 下拉刷新/上拉加载 | [README](./src/component/pull_up_down) |
| `List` | 通用列表 | [README](./src/component/list) |
| `Lazy` | 懒加载组件 | [README](./src/component/lazy) |
| `LazyList` | 懒加载列表 | [README](./src/component/lazy) |
| `Scroll` | 滚动列表 | [README](./src/component/scroll) |

#### 数据展示

| 导出项 | 说明 | 详细文档 |
|--------|------|----------|
| `FlipNumber` | 翻转数字动画 | [README](./src/component/flip_number) |
| `ProgressBar` | 进度条 | [README](./src/component/progress_bar) |
| `LetterIndex` | 字母索引（单选） | [README](./src/component/letter_index) |
| `LetterIndexMultiple` | 字母索引（多选） | [README](./src/component/letter_index) |
| `Image` | 图片组件 | [README](./src/component/image) |
| `Header` | 头部导航栏 | [README](./src/component/header) |

#### 浮层/反馈

| 导出项 | 说明 |
|--------|------|
| `NProgress` | 顶部进度条（静态方法） |
| `Alert` | 警告弹窗 |
| `Confirm` | 确认弹窗 |
| `Prompt` | 输入弹窗 |
| `Delete` | 删除确认弹窗 |

#### 其他

| 导出项 | 说明 | 详细文档 |
|--------|------|----------|
| `Canvas` | 画板组件 | [README](./src/component/canvas) |
| `Uploader` | 文件上传 | [README](./src/component/uploader) |
| `CSSVariable` | CSS 变量工具 | - |
| `LocalStorage` | 本地存储 | - |
| `SessionStorage` | 会话存储 | - |

#### 基础组件（从 @gm-mobile/c-react 重新导出）

同时导出 `@gm-mobile/c-react` 的所有组件，包括：Button、Flex、Dialog、Toast、Input、Checkbox、Radio、Switch、Tabs、Popover、ToolTip、Modal、Drawer、DatePicker、DateRangePicker、Cascader、Transfer 等。

## 示例

### 页面布局

```jsx
import { Header, List, Tabbar } from '@gm-mobile/react'

const App = () => {
  const [active, setActive] = useState('/home')

  return (
    <div>
      <Header title="首页" />
      <div>页面内容</div>
      <Tabbar
        configs={[
          { name: '首页', to: '/home', icon: <IconHome /> },
          { name: '我的', to: '/my', icon: <IconUser /> },
        ]}
        selected={active}
        onTabChange={(config) => setActive(config.to)}
      />
    </div>
  )
}
```

### 弹窗快捷方法

```jsx
import { Alert, Confirm, Prompt, Delete } from '@gm-mobile/react'

// 警告弹窗
Alert('操作成功')

// 确认弹窗
Confirm('确定要删除吗？').then(() => {
  console.log('确认')
})

// 输入弹窗
Prompt('请输入名称').then((value) => {
  console.log('输入值：', value)
})

// 删除确认
Delete('确定要删除此项吗？').then(() => {
  console.log('已删除')
})
```

## 注意事项
- 本包依赖 `@gm-mobile/c-react`，所有 c-react 的组件都可以直接从本包导入
- `NProgress` 通过静态方法调用，无需在 JSX 中渲染
- `Alert`、`Confirm`、`Prompt`、`Delete` 来自 `Dialog` 的快捷方法
- 各组件的详细文档请查看 `src/component/` 下各组件目录中的 README.md

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件库
- [@gm-mobile/locales](../locales) - 国际化工具
- [@gm-mobile/c-tool](../c-tool) - 工具函数库
- [@gm-mobile/business](../business) - 业务组件
- [@gm-mobile/mp](../mp) - 小程序适配包
