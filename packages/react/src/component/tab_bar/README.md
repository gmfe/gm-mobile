# Tabbar

## 简介
底部标签栏组件 - 用于底部导航切换，包含 `Tabbar` 和 `FlowBtnTabbar` 两种样式。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Tabbar, FlowBtnTabbar } from '@gm-mobile/react'
```

## API

### Tabbar Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| configs | 标签配置数组 | `TabbarConfig[]` | - | 是 |
| selected | 当前选中项的路由路径（根据 `config.to` 匹配） | `string` | - | 是 |
| onTabChange | 标签点击回调 | `(config: TabbarConfig, index: number) => void` | `_.noop` | 否 |

### FlowBtnTabbar Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| leftConfigs | 左侧标签配置数组 | `TabbarConfig[]` | - | 否 |
| rightConfigs | 右侧标签配置数组 | `TabbarConfig[]` | - | 否 |
| selected | 当前选中项的路由路径 | `string` | - | 是 |
| onTabChange | 标签点击回调 | `(config: TabbarConfig, index: number) => void` | `_.noop` | 否 |
| FlowButton | 自定义中间浮动按钮 | `ReactElement` | 加号图标 | 否 |
| onFlowButtonClick | 中间按钮点击事件 | `() => void` | `_.noop` | 否 |

### TabbarConfig

| 字段 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 标签名称 | `string` | 是 |
| to | 路由路径，用于匹配选中状态 | `string` | 是 |
| icon | 未选中时的图标 | `ReactElement` | 是 |
| activeIcon | 选中时的图标 | `ReactElement` | 否 |
| badge | 徽标配置 | `object` | 否 |
| showBadge | 是否显示徽标 | `boolean` | 否 |

## 示例

### 基础 Tabbar

```jsx
import { useState } from 'react'
import { Tabbar } from '@gm-mobile/react'

const App = () => {
  const [active, setActive] = useState('/my')

  const configs = [
    { name: '订单', to: '/order', icon: <i className="m-font m-font-order" /> },
    { name: '我的', to: '/my', icon: <i className="m-font m-font-user" /> },
    {
      name: '购物车',
      to: '/cart',
      icon: <i className="m-font m-font-cart" />,
      showBadge: true,
      badge: { count: 7, corner: true },
    },
  ]

  return (
    <Tabbar
      configs={configs}
      selected={active}
      onTabChange={(config) => setActive(config.to)}
    />
  )
}
```

### FlowBtnTabbar（中间浮动按钮）

```jsx
import { useState } from 'react'
import { FlowBtnTabbar } from '@gm-mobile/react'

const App = () => {
  const [active, setActive] = useState('/my')

  const leftConfigs = [
    { name: '订单', to: '/order', icon: <i className="m-font m-font-order" /> },
    { name: '我的', to: '/my', icon: <i className="m-font m-font-user" /> },
  ]

  const rightConfigs = [
    { name: '其他', to: '/other', icon: <i className="m-font m-font-other" /> },
    { name: '购物车', to: '/cart', icon: <i className="m-font m-font-cart" /> },
  ]

  return (
    <FlowBtnTabbar
      leftConfigs={leftConfigs}
      rightConfigs={rightConfigs}
      selected={active}
      onTabChange={(config) => setActive(config.to)}
      onFlowButtonClick={() => console.log('点击中间按钮')}
    />
  )
}
```

## 注意事项
- `selected` 通过 `startsWith` 匹配 `config.to`，支持子路由自动高亮
- `badge` 配置支持 `count`（数量）和 `corner`（是否为角标模式）
- `FlowBtnTabbar` 的中间按钮默认显示加号图标，可通过 `FlowButton` 自定义
- `activeIcon` 不传时，选中状态也使用默认 `icon`
