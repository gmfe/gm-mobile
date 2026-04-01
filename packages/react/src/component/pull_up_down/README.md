# PullUpDown

## 简介

下拉上拉组件 - 用于实现移动端页面的下拉刷新和上拉加载功能，支持自定义顶部和底部的显示内容，适用于列表数据刷新和分页加载等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| topRender | 顶部显示区域的渲染函数 | function | - | 否 |
| bottomRender | 底部显示区域的渲染函数 | function | - | 否 |
| onPullDown | 下拉到触发距离时的回调函数 | function | () => {} | 否 |
| onPullUp | 上拉到触发距离时的回调函数 | function | () => {} | 否 |
| ratio | 手指滑动距离与页面滑动距离的比率，数值越小滑动越灵敏 | number | 2.2 | 否 |
| scrollEl | 滚动元素的选择器，如果不设置则自动查找父级滚动元素 | string | - | 否 |

## 示例

### 基础用法

最简单的下拉刷新示例，当用户在内容区域向下拉时会触发 onPullDown 回调。

```jsx
import { PullUpDown } from '@gm-mobile/react'
import _ from 'lodash'

const App = () => {
  const renderTop = () => <div>释放刷新</div>

  const handlePullDown = () => {
    console.log('触发下拉刷新')
    // 执行刷新逻辑
  }

  return (
    <PullUpDown
      scrollEl='.content'
      topRender={renderTop}
      onPullDown={handlePullDown}
    >
      <div className='content m-overflow-y' style={{ height: '300px' }}>
        {_.times(50, (i) => (
          <div key={i}>列表项 {i}</div>
        ))}
      </div>
    </PullUpDown>
  )
}
```

### 常见用法

#### 上拉加载更多

同时支持下拉刷新和上拉加载，适用于列表分页场景。

```jsx
import { PullUpDown } from '@gm-mobile/react'
import _ from 'lodash'

const App = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState([])

  const renderTop = () => (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      下拉刷新
    </div>
  )

  const renderBottom = () => (
    <div style={{ textAlign: 'center', padding: '10px' }}>
      {loading ? '加载中...' : '上拉加载更多'}
    </div>
  )

  const handlePullDown = () => {
    console.log('刷新数据')
    // 执行刷新逻辑
  }

  const handlePullUp = () => {
    if (loading) return
    setLoading(true)
    // 模拟加载更多数据
    setTimeout(() => {
      setData([...data, ..._.times(10, (i) => `新数据 ${data.length + i}`)])
      setLoading(false)
    }, 1000)
  }

  return (
    <PullUpDown
      scrollEl='.content'
      topRender={renderTop}
      bottomRender={renderBottom}
      onPullDown={handlePullDown}
      onPullUp={handlePullUp}
    >
      <div className='content m-overflow-y' style={{ height: '400px' }}>
        {data.map((item, index) => (
          <div key={index} style={{ padding: '10px', borderBottom: '1px solid #eee' }}>
            {item}
          </div>
        ))}
      </div>
    </PullUpDown>
  )
}
```

#### 自定义滑动灵敏度

通过 ratio 属性调整滑动的灵敏度，数值越小，滑动距离越大。

```jsx
import { PullUpDown } from '@gm-mobile/react'

const App = () => {
  const renderTop = () => <div>继续下拉刷新</div>

  const handlePullDown = () => {
    console.log('触发刷新')
  }

  return (
    <PullUpDown
      scrollEl='.content'
      topRender={renderTop}
      onPullDown={handlePullDown}
      ratio={3} // 更大的值表示需要滑动更长的距离
    >
      <div className='content m-overflow-y' style={{ height: '300px' }}>
        {/* 内容 */}
      </div>
    </PullUpDown>
  )
}
```

#### 使用自定义 Loading 组件

配合 Loading 组件展示更友好的加载状态。

```jsx
import { PullUpDown, Loading } from '@gm-mobile/react'

const App = () => {
  const [refreshing, setRefreshing] = useState(false)

  const renderTop = () => (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: '15px' }}>
      {refreshing && <Loading />}
      <span style={{ marginLeft: '10px' }}>{refreshing ? '刷新中...' : '下拉刷新'}</span>
    </div>
  )

  const handlePullDown = () => {
    setRefreshing(true)
    // 模拟刷新
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  return (
    <PullUpDown
      scrollEl='.content'
      topRender={renderTop}
      onPullDown={handlePullDown}
    >
      <div className='content m-overflow-y' style={{ height: '300px' }}>
        {/* 内容 */}
      </div>
    </PullUpDown>
  )
}
```

## 注意事项

- scrollEl 属性用于指定滚动容器，如果子元素有固定高度且可滚动，必须设置此属性
- 当不设置 scrollEl 时，组件会自动向上查找父级的滚动元素
- topRender 和 bottomRender 返回的内容会显示在对应区域的固定位置
- onPullDown 和 onPullUp 回调会在用户下拉/上拉到 100% 时触发
- ratio 默认值为 2.2，表示手指滑动距离是页面滑动距离的 2.2 倍
- 确保滚动容器有明确的高度设置，否则可能无法正常工作
- 在同一时间只会触发一个方向的操作（下拉或上拉）
