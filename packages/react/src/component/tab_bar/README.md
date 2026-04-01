# Tabbar

## 简介
Tabbar 底部导航栏组件 - 用于在移动端应用底部展示主导航菜单，支持图标、文字、徽标等多种展示形式，并提供带中间浮动按钮的特殊布局。

## API

### Tabbar Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| configs | tabbar 配置项数组 | `array` | - | 是 |
| selected | 当前选中的路由路径，根据 config.to 匹配 | `string` | - | 是 |
| onTabChange | tab 点击回调函数 | `function` | `() => {}` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### FlowBtnTabbar Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| leftConfigs | 左侧导航配置项数组 | `array` | - | 否 |
| rightConfigs | 右侧导航配置项数组 | `array` | - | 否 |
| selected | 当前选中的路由路径，根据 config.to 匹配 | `string` | - | 是 |
| onTabChange | tab 点击回调函数 | `function` | `() => {}` | 否 |
| FlowButton | 自定义中间浮动按钮元素 | `element` | - | 否 |
| onFlowButtonClick | 中间浮动按钮点击回调函数 | `function` | `() => {}` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### Config 配置项说明

configs、leftConfigs、rightConfigs 数组中的每个配置项包含以下属性：

| 属性 | 说明 | 类型 | 必填 |
|------|------|------|------|
| name | 导航项显示的文字 | `string` | 是 |
| to | 导航项对应的路由路径 | `string` | 是 |
| icon | 未激活状态显示的图标（React 元素） | `element` | 是 |
| activeIcon | 激活状态显示的图标（React 元素），不传则使用 icon | `element` | 否 |
| badge | 徽标配置，参考 Badge 组件的 props | `object` | 否 |
| showBadge | 是否显示徽标 | `boolean` | 否 |

**badge 配置示例：**
```javascript
badge: {
  count: 7,        // 徽标显示的数字
  corner: true     // 是否为角标样式
}
```

## 示例

### 基础用法 - Tabbar

```jsx
import { Tabbar } from '@gm-mobile/react'
import { useState } from 'react'

const App = () => {
  const [active, setActive] = useState('/my')

  const handleTabChange = (config, index) => {
    setActive(config.to)
  }

  const configs = [
    {
      name: '订单',
      to: '/order',
      icon: <SvgPlus />,
      activeIcon: <SvgClose />,
    },
    {
      name: '我的',
      to: '/my',
      icon: <SvgPlus />,
    },
    {
      name: '购物车',
      icon: <SvgClose />,
      to: '/cart',
      showBadge: true,
      badge: { count: 7, corner: true },
    },
  ]

  return (
    <div className='m-padding-top-10'>
      <Tabbar
        configs={configs}
        onTabChange={handleTabChange}
        selected={active}
      />
    </div>
  )
}
```

### 带浮动按钮的导航 - FlowBtnTabbar

```jsx
import { FlowBtnTabbar } from '@gm-mobile/react'
import { useState } from 'react'

const App = () => {
  const [active, setActive] = useState('/my')

  const handleTabChange = (config, index) => {
    setActive(config.to)
  }

  const handleFlowBtnClick = () => {
    console.log('点击了中间浮动按钮')
  }

  const leftConfigs = [
    {
      name: '订单',
      to: '/order',
      icon: <SvgPlus />,
      activeIcon: <SvgClose />,
    },
    {
      name: '我的',
      to: '/my',
      icon: <SvgPlus />,
    },
  ]

  const rightConfigs = [
    {
      name: '其他',
      to: '/other',
      icon: <SvgPlus />,
    },
    {
      name: '购物车',
      icon: <SvgClose />,
      to: '/cart',
      showBadge: true,
      badge: { count: 7, corner: true },
    },
  ]

  return (
    <div>
      <FlowBtnTabbar
        leftConfigs={leftConfigs}
        rightConfigs={rightConfigs}
        onTabChange={handleTabChange}
        onFlowButtonClick={handleFlowBtnClick}
        selected={active}
      />
    </div>
  )
}
```

### 自定义浮动按钮

```jsx
import { FlowBtnTabbar } from '@gm-mobile/react'

const App = () => {
  const customFlowButton = (
    <div style={{
      width: '50px',
      height: '50px',
      borderRadius: '50%',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px'
    }}>
      +
    </div>
  )

  return (
    <FlowBtnTabbar
      leftConfigs={leftConfigs}
      rightConfigs={rightConfigs}
      selected={active}
      onTabChange={handleTabChange}
      onFlowButtonClick={handleFlowBtnClick}
      FlowButton={customFlowButton}
    />
  )
}
```

### 配合路由使用

```jsx
import { Tabbar } from '@gm-mobile/react'
import { useLocation, useNavigate } from 'react-router-dom'

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()

  const configs = [
    {
      name: '首页',
      to: '/home',
      icon: <HomeIcon />,
    },
    {
      name: '订单',
      to: '/order',
      icon: <OrderIcon />,
      activeIcon: <OrderActiveIcon />,
    },
    {
      name: '我的',
      to: '/profile',
      icon: <ProfileIcon />,
    },
  ]

  const handleTabChange = (config) => {
    navigate(config.to)
  }

  return (
    <Tabbar
      configs={configs}
      selected={location.pathname}
      onTabChange={handleTabChange}
    />
  )
}
```

## 注意事项

1. **图标要求**：icon 和 activeIcon 必须是 React 元素（JSX），不能是字符串或图片路径
2. **路由匹配**：selected 属性使用 startsWith 进行匹配，因此 `/order` 会匹配 `/order/detail`，确保路由路径设置合理
3. **FlowBtnTabbar 布局**：左右两侧的配置项数量建议相等，以保证视觉平衡
4. **徽标显示**：showBadge 为 true 时才会显示徽标，同时需要传入 badge 配置
5. **activeIcon 可选**：如果不传 activeIcon，激活状态下会显示 icon
6. **样式定制**：可以通过 className 和 style 属性自定义组件样式
7. **点击回调**：onTabChange 回调函数接收两个参数：（config, index），分别代表当前点击的配置项和索引
