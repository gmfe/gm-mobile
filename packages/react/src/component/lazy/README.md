# Lazy

## 简介
懒加载组件 - 根据滚动区域判断元素是否在可视区域内，实现懒渲染。包含 `Lazy` 和 `LazyList` 两个组件。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Lazy, LazyList } from '@gm-mobile/react'
```

## API

### Lazy Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| targetId | 指定监听滚动的 DOM id，不传则监听 `.m-page-content` | `string` | - | 否 |
| delay | 滚动节流延迟（ms） | `number` | - | 否 |

继承 `HTMLAttributes<HTMLDivElement>` 的所有属性。

### LazyList Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据 | `any[]` | - | 是 |
| renderItem | 列表项渲染函数 | `(param: { item, index }) => ReactNode` | - | 是 |
| itemMinHeight | 列表项最小高度（px） | `(param: { item, index }) => number` | - | 是 |
| itemKey | 列表项唯一标识 | `(param: { item, index }) => string` | `(param) => String(param.index)` | 否 |
| delay | 滚动节流延迟（ms） | `number` | `100` | 否 |

继承 `HTMLAttributes<HTMLDivElement>` 的所有属性。

### LazyList Ref 方法

| 方法 | 说明 | 参数 |
|------|------|------|
| apiDoScrollToKey | 滚动到指定 key 的列表项 | `key: string` |

### LazyList.Item

`LazyList.Item` 是 `LazyList` 的子组件，通常不需要直接使用。

## 示例

### 基础懒加载

```jsx
import _ from 'lodash'
import { Lazy } from '@gm-mobile/react'

const App = () => {
  return (
    <div className="m-page">
      <div className="m-page-content">
        {_.map(_.range(30), (v) => (
          <Lazy key={v} style={{ height: '100px' }}>
            <div>内容 {v}</div>
          </Lazy>
        ))}
      </div>
    </div>
  )
}
```

### LazyList 列表懒加载

```jsx
import { useRef } from 'react'
import { LazyList } from '@gm-mobile/react'
import { LazyListRef } from '@gm-mobile/react'

const App = () => {
  const ref = useRef<LazyListRef>(null)
  const data = Array.from({ length: 30 }, (_, i) => i)

  return (
    <div>
      <button onClick={() => ref.current?.apiDoScrollToKey('29')}>
        滚动到第 29 项
      </button>
      <LazyList
        ref={ref}
        style={{ height: '100vh' }}
        data={data}
        renderItem={({ item, index }) => <div>项目 {index}</div>}
        itemMinHeight={() => 100}
      />
    </div>
  )
}
```

## 注意事项
- `Lazy` 需要在可滚动的容器内使用，默认监听 `.m-page-content` 的滚动事件
- 如果没有找到滚动容器（`.m-page-content` 和 `targetId` 对应的元素），组件会直接渲染子内容
- `LazyList` 使用 `itemMinHeight` 来确定懒加载项的最小占位高度，确保滚动条计算准确
- 离开可视区域的元素会被卸载，重新滚入时会重新渲染
