# Lazy

## 简介
懒加载组件 - 用于优化长列表性能，当元素进入视口时才渲染内容。适合处理大量数据或复杂组件的延迟渲染场景，减少初始渲染压力和内存占用。

## API

### Lazy

基础懒加载组件，监听滚动容器，当子元素进入视口时才显示内容。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| targetId | 指定监听滚动的 DOM 元素 id。不传则监听 `.m-page-content` | string | - | 否 |
| delay | 节流延迟时间（毫秒），用于优化滚动事件监听性能 | number | 500 | 否 |
| children | 要懒加载的内容 | node | - | 是 |

### LazyList

高级列表懒加载组件，专为大列表性能优化设计，只渲染可视区域的列表项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据源 | array | - | 是 |
| renderItem | 渲染每个列表项，函数签名 `({item, index}) => node` | func | - | 是 |
| itemMinHeight | 获取每项的最小高度（像素），用于占位计算，函数签名 `({item, index}) => number` | func | - | 是 |
| itemKey | 获取每项的唯一 key，函数签名 `({item, index}) => string \| number` | func | ({item, index}) => index | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### LazyList 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| apiDoScrollToKey | 滚动到指定 key 的列表项位置 | key (string \| number) - 由 itemKey 生成的唯一标识 | void |

## 示例

### 基础用法

最简单的懒加载示例，适合任意数量的列表项：

```jsx
import { Lazy } from '@gm-mobile/react'
import _ from 'lodash'

function App() {
  return (
    <div>
      {_.map(_.range(30), (v) => (
        <Lazy key={v} style={{ height: '100px' }}>
          <div>列表项 {v}</div>
        </Lazy>
      ))}
    </div>
  )
}
```

### 指定滚动容器

当滚动容器不是默认的 `.m-page-content` 时，通过 `targetId` 指定：

```jsx
import { Lazy } from '@gm-mobile/react'

function App() {
  return (
    <div id="custom-container" style={{ height: '500px', overflow: 'auto' }}>
      <Lazy targetId="custom-container">
        <div>只在 custom-container 滚动时懒加载</div>
      </Lazy>
    </div>
  )
}
```

### 列表懒加载

使用 `LazyList` 组件处理大量数据，自带滚动容器和性能优化：

```jsx
import { LazyList } from '@gm-mobile/react'
import { useRef } from 'react'

function App() {
  const ref = useRef(null)

  const data = _.range(1000)

  return (
    <LazyList
      ref={ref}
      style={{ height: '100vh' }}
      data={data}
      renderItem={({ item, index }) => {
        return (
          <div style={{ padding: '20px', borderBottom: '1px solid #eee' }}>
            列表项 {item}
          </div>
        )
      }}
      itemMinHeight={() => 60}
    />
  )
}
```

### 动态高度的列表

当列表项高度不固定时，需要预估一个合理的 `itemMinHeight`：

```jsx
import { LazyList } from '@gm-mobile/react'

function App() {
  const data = [
    { id: 1, content: '短内容' },
    { id: 2, content: '这是一段较长的内容...' },
    { id: 3, content: '可能是任意长度的文本' },
  ]

  return (
    <LazyList
      style={{ height: '100vh' }}
      data={data}
      renderItem={({ item }) => {
        return (
          <div style={{ padding: '20px' }}>
            {item.content}
          </div>
        )
      }}
      itemMinHeight={({ item }) => {
        // 根据内容长度预估高度
        return item.content.length > 20 ? 100 : 60
      }}
      itemKey={({ item }) => item.id}
    />
  )
}
```

### 滚动到指定位置

通过 ref 调用 `apiDoScrollToKey` 方法，实现定位功能：

```jsx
import { LazyList } from '@gm-mobile/react'
import { useRef } from 'react'

function App() {
  const ref = useRef(null)

  const data = _.range(100)

  const scrollToLast = () => {
    ref.current.apiDoScrollToKey(99)
  }

  return (
    <div>
      <button onClick={scrollToLast}>滚动到底部</button>
      <LazyList
        ref={ref}
        style={{ height: '100vh' }}
        data={data}
        renderItem={({ item }) => <div style={{ height: '50px' }}>{item}</div>}
        itemMinHeight={() => 50}
      />
    </div>
  )
}
```

### 图片懒加载

典型的图片列表懒加载场景，只加载可视区域的图片：

```jsx
import { Lazy } from '@gm-mobile/react'
import _ from 'lodash'

function ImageList() {
  const images = _.map(_.range(50), (i) => ({
    id: i,
    url: `https://example.com/image${i}.jpg`,
    title: `图片 ${i}`,
  }))

  return (
    <div>
      {images.map((img) => (
        <Lazy key={img.id} style={{ height: '200px' }}>
          <img
            src={img.url}
            alt={img.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </Lazy>
      ))}
    </div>
  )
}
```

## 注意事项

- **Lazy 组件依赖滚动容器**：默认监听 `.m-page-content` 的滚动事件，如果项目中没有这个类名，需要通过 `targetId` 指定滚动容器，否则组件会立即渲染所有内容并在控制台输出警告。

- **itemMinHeight 必须准确**：LazyList 使用 `itemMinHeight` 来计算占位空间，如果设置过小，可能导致用户快速滚动时看到空白区域；设置过大则会影响滚动体验。建议根据实际内容合理预估。

- **LazyList 自带滚动容器**：LazyList 会创建一个 `div.m-overflow-y` 作为滚动容器，需要通过 `style` 或 `className` 设置明确的高度（如 `100vh`、`500px` 等），否则无法正常滚动。

- **ref 引用时机**：使用 `apiDoScrollToKey` 方法时，确保 LazyList 已经渲染完成，建议在组件挂载后的回调中调用。

- **key 的唯一性**：LazyList 的 `itemKey` 返回值必须唯一且稳定，建议使用数据中的唯一标识（如 id），避免使用 index 作为 key（除非数据不会发生增删改操作）。

- **性能优化**：Lazy 内部使用 lodash 的 throttle 进行节流处理（默认 500ms），通常不需要调整 `delay` 参数。如果列表项特别复杂，可以考虑配合 React.memo 进一步优化。

## 相关组件

- [PullUpDownload](./pull-up-down.md) - 下拉刷新、上拉加载组件，可与 Lazy 配合实现无限滚动
- [Scroll](./scroll.md) - 滚动容器组件，提供更多滚动控制能力
