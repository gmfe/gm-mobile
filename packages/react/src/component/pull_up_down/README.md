# PullUpDown

## 简介
下拉刷新/上拉加载组件 - 为可滚动区域添加下拉刷新和上拉加载功能。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { PullUpDown } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| scrollEl | 滚动元素的 CSS 选择器 | `string` | - | 是 |
| topRender | 顶部显示区域的渲染函数 | `() => ReactNode` | `_.noop` | 否 |
| bottomRender | 底部显示区域的渲染函数 | `() => ReactNode` | `_.noop` | 否 |
| onPullDown | 下拉到底部回调（percentage 到达 100 时触发） | `() => void` | `_.noop` | 否 |
| onPullUp | 上拉到顶部回调（percentage 到达 100 时触发） | `() => void` | `_.noop` | 否 |
| ratio | 手指滑动距离与页面滑动距离的比率 | `number` | - | 否 |

## 示例

### 下拉刷新

```jsx
import { PullUpDown } from '@gm-mobile/react'

const App = () => {
  const handlePullDown = () => {
    console.log('触发下拉刷新')
  }

  return (
    <PullUpDown
      scrollEl=".content"
      topRender={() => <div>下拉刷新</div>}
      onPullDown={handlePullDown}
    >
      <div className="content m-overflow-y" style={{ height: '300px' }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>内容 {i}</div>
        ))}
      </div>
    </PullUpDown>
  )
}
```

### 下拉刷新 + 上拉加载

```jsx
import { PullUpDown } from '@gm-mobile/react'

const App = () => {
  return (
    <PullUpDown
      scrollEl=".content"
      topRender={() => <div>下拉刷新</div>}
      onPullDown={() => console.log('pull down')}
      bottomRender={() => <div>上拉加载</div>}
      onPullUp={() => console.log('pull up')}
    >
      <div className="m-overflow-y content" style={{ height: '300px' }}>
        {Array.from({ length: 50 }, (_, i) => (
          <div key={i}>上下拉均可</div>
        ))}
      </div>
    </PullUpDown>
  )
}
```

## 注意事项
- `scrollEl` 必须指向一个真实存在的可滚动 DOM 元素
- 回调函数在拉动百分比达到 100% 时触发，不是每次拉动都触发
- `ratio` 用于调节拉动灵敏度，值越大拉动越不灵敏
