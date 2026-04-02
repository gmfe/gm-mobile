# Scroll

## 简介
滚动列表组件 - 带滚动加载更多功能的列表组件，支持懒渲染和滚动定位。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Scroll } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据 | `any[]` | - | 是 |
| renderItem | 列表项渲染函数 | `(param: { item, index }) => ReactNode` | - | 是 |
| onLoadMore | 加载更多回调，需返回 Promise | `() => Promise<any>` | - | 是 |
| itemKey | 列表项唯一标识 | `(param: { item, index }) => string` | `(param) => String(param.index)` | 否 |
| noMore | 是否没有更多数据 | `boolean` | `false` | 否 |
| lazy | 是否开启列表项懒渲染 | `boolean` | `false` | 否 |
| itemMinHeight | 列表项最小高度（开启 lazy 时必填） | `(param: { item, index }) => string` | - | 否 |
| onScroll | 滚动事件回调 | `(event: UIEvent<HTMLDivElement>) => void` | `_.noop` | 否 |

继承 `HTMLAttributes<HTMLDivElement>` 的所有属性。

### Ref 方法

| 方法 | 说明 | 参数 |
|------|------|------|
| apiDoScrollToKey | 滚动到指定 key 的列表项 | `key: string` |

## 示例

### 基础用法

```jsx
import { useRef } from 'react'
import { Scroll } from '@gm-mobile/react'
import { ScrollRef } from '@gm-mobile/react'

const App = () => {
  const ref = useRef<ScrollRef>(null)
  const [data, setData] = useState(Array.from({ length: 20 }, (_, i) => i))
  const [noMore, setNoMore] = useState(false)

  const handleLoadMore = () => {
    return new Promise<void>((resolve) => {
      setTimeout(() => {
        const newData = [...data, ...Array.from({ length: 10 }, (_, i) => data.length + i)]
        setData(newData)
        if (newData.length >= 30) {
          setNoMore(true)
        }
        resolve()
      }, 1000)
    })
  }

  return (
    <div>
      <button onClick={() => ref.current?.apiDoScrollToKey('10')}>
        滚动到第 10 项
      </button>
      <Scroll
        ref={ref}
        style={{ height: '300px' }}
        data={data}
        renderItem={({ item, index }) => <div style={{ height: '50px' }}>{item} {index}</div>}
        onLoadMore={handleLoadMore}
        noMore={noMore}
      />
    </div>
  )
}
```

### 开启懒渲染

```jsx
import { Scroll } from '@gm-mobile/react'

const App = () => {
  return (
    <Scroll
      style={{ height: '300px' }}
      data={data}
      renderItem={({ item, index }) => <div>{item}</div>}
      onLoadMore={handleLoadMore}
      noMore={noMore}
      lazy
      itemMinHeight={() => '50px'}
    />
  )
}
```

## 注意事项
- `onLoadMore` 必须返回 Promise，加载过程中会自动显示 Loading 状态
- 向下滚动到底部（距底部 80px 以内）时自动触发加载更多
- 设置 `noMore` 为 `true` 后将不再触发加载
- 开启 `lazy` 模式时必须提供 `itemMinHeight`，用于懒渲染的占位高度计算
- `itemMinHeight` 返回值类型为字符串（如 `'50px'`）
