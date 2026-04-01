# Scroll

## 简介
滚动列表 - 支持下拉加载更多和懒加载的滚动列表组件，适用于长列表数据的展示与分页加载场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据源 | `array` | - | 是 |
| renderItem | 渲染每一项的函数，接收参数 `{item, index}` | `function` | - | 是 |
| itemKey | 生成每一项唯一 key 的函数，接收参数 `{item, index}` | `function` | `({ item, index }) => index` | 是 |
| onLoadMore | 滚动到底部时触发的加载更多函数，需要返回 Promise | `function` | - | 是 |
| noMore | 是否没有更多数据了 | `boolean` | - | 否 |
| lazy | 是否启用懒加载模式 | `boolean` | - | 否 |
| itemMinHeight | 返回每个列表项最小高度的函数，接收参数 `{item, index}`，启用 lazy 时必填 | `function` | - | 否 |
| onScroll | 滚动事件回调函数 | `function` | `() => {}` | 否 |
| className | 自定义 CSS 类名 | `string` | - | 否 |
| style | 自定义样式对象 | `object` | - | 否 |

### 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| apiDoScrollToKey | 滚动到指定 key 对应的列表项位置 | `key` (通过 itemKey 生成的唯一标识) | - |

## 示例

### 基础用法

最简单的滚动列表，支持下拉加载更多：

```jsx
import { Scroll } from '@gm-mobile/react'

const data = [1, 2, 3, 4, 5]

const renderItem = ({ item, index }) => {
  return (
    <div style={{ height: '50px', padding: '10px' }}>
      列表项 {item}
    </div>
  )
}

const onLoadMore = () => {
  return new Promise((resolve) => {
    // 模拟异步加载
    setTimeout(() => {
      // 加载更多数据...
      resolve()
    }, 1000)
  })
}

function App() {
  return (
    <Scroll
      style={{ height: '300px' }}
      data={data}
      renderItem={renderItem}
      onLoadMore={onLoadMore}
      noMore={false}
    />
  )
}
```

### 滚动到指定位置

使用 ref 调用方法滚动到指定列表项：

```jsx
import { Scroll } from '@gm-mobile/react'
import { useRef } from 'react'

const data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

const renderItem = ({ item, index }) => {
  return (
    <div style={{ height: '50px', padding: '10px' }}>
      列表项 {item}
    </div>
  )
}

const onLoadMore = () => {
  return Promise.resolve()
}

function App() {
  const scrollRef = useRef(null)

  return (
    <div>
      <button onClick={() => scrollRef.current.apiDoScrollToKey(5)}>
        滚动到第 6 项
      </button>
      <Scroll
        ref={scrollRef}
        style={{ height: '300px' }}
        data={data}
        renderItem={renderItem}
        onLoadMore={onLoadMore}
        noMore={true}
      />
    </div>
  )
}
```

### 懒加载模式

当列表项很多且内容复杂时，可以使用懒加载提升性能：

```jsx
import { Scroll } from '@gm-mobile/react'

const data = Array.from({ length: 100 }, (_, i) => i + 1)

const renderItem = ({ item, index }) => {
  return (
    <div style={{ height: '50px', padding: '10px' }}>
      列表项 {item} - 内容 {index}
    </div>
  )
}

const onLoadMore = () => {
  return Promise.resolve()
}

const itemMinHeight = ({ item, index }) => {
  // 返回每个列表项的最小高度
  return '50px'
}

function App() {
  return (
    <Scroll
      style={{ height: '300px' }}
      data={data}
      renderItem={renderItem}
      onLoadMore={onLoadMore}
      noMore={true}
      lazy
      itemMinHeight={itemMinHeight}
    />
  )
}
```

### 自定义 itemKey

为每个列表项指定唯一的 key：

```jsx
import { Scroll } from '@gm-mobile/react'

const data = [
  { id: 'a', name: '项目 A' },
  { id: 'b', name: '项目 B' },
  { id: 'c', name: '项目 C' },
]

const renderItem = ({ item, index }) => {
  return (
    <div style={{ height: '50px', padding: '10px' }}>
      {item.name}
    </div>
  )
}

const itemKey = ({ item, index }) => {
  return item.id
}

const onLoadMore = () => {
  return Promise.resolve()
}

function App() {
  return (
    <Scroll
      style={{ height: '300px' }}
      data={data}
      renderItem={renderItem}
      itemKey={itemKey}
      onLoadMore={onLoadMore}
      noMore={true}
    />
  )
}
```

### 监听滚动事件

通过 onScroll 回调监听滚动事件：

```jsx
import { Scroll } from '@gm-mobile/react'

const data = [1, 2, 3, 4, 5]

const renderItem = ({ item, index }) => {
  return (
    <div style={{ height: '50px', padding: '10px' }}>
      列表项 {item}
    </div>
  )
}

const onLoadMore = () => {
  return Promise.resolve()
}

const handleScroll = (e) => {
  console.log('滚动位置:', e.target.scrollTop)
}

function App() {
  return (
    <Scroll
      style={{ height: '300px' }}
      data={data}
      renderItem={renderItem}
      onLoadMore={onLoadMore}
      onScroll={handleScroll}
      noMore={true}
    />
  )
}
```

## 注意事项

- 组件必须设置固定高度（通过 style 的 height 属性），否则无法正常滚动
- onLoadMore 函数必须返回 Promise，组件会等待 Promise 完成后才允许再次触发加载
- 当 noMore 为 true 时，底部会显示"没有更多了"提示，且不再触发加载更多
- 启用 lazy 懒加载时，必须提供 itemMinHeight 函数来指定每个列表项的最小高度
- 使用 apiDoScrollToKey 方法时，key 值必须与 itemKey 函数返回的值一致
- 滚动触发的加载更多有 30px + 50px 的阈值缓冲，避免频繁触发
- renderItem 函数接收的对象包含 item（当前项数据）和 index（当前项索引）两个属性
