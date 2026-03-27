# Nav

## 简介
导航组件 - 用于展示垂直或水平方向的选项列表，支持选中状态切换和滚动定位功能，常用于分类筛选、标签切换等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 导航数据数组，每项包含 value 和 text | `Array<{value: any, text: string}>` | - | 是 |
| selected | 当前选中的值 | `any` | - | 是 |
| onSelect | 选中项时的回调函数 | `(value: any) => void` | - | 是 |
| horizontal | 是否水平布局 | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| apiDoScrollToValue | 滚动到指定值的选项 | `value: any` - 要滚动到的选项值 | `void` |

## 示例

### 基础用法

最简单的垂直导航用法：

```jsx
import React from 'react'
import { Nav } from '@gm-mobile/react'

const data = [
  { value: 1, text: '白菜' },
  { value: 2, text: '啦啦啦啦' },
  { value: 3, text: '熟食冻品' },
  { value: 4, text: '新鲜水果' },
]

function App() {
  const [selected, setSelected] = React.useState(1)

  return (
    <div style={{ width: '100px', height: '300px' }}>
      <Nav
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
```

### 水平导航

使用 `horizontal` 属性设置为水平方向：

```jsx
import React from 'react'
import { Nav } from '@gm-mobile/react'

const data = [
  { value: 1, text: '推荐' },
  { value: 2, text: '最新' },
  { value: 3, text: '热门' },
  { value: 4, text: '价格' },
]

function App() {
  const [selected, setSelected] = React.useState(1)

  return (
    <div style={{ width: '300px' }}>
      <Nav
        horizontal
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </div>
  )
}
```

### 结合滚动定位

使用 ref 调用 `apiDoScrollToValue` 方法自动滚动到指定选项：

```jsx
import React, { useRef } from 'react'
import { Nav, Button } from '@gm-mobile/react'

const data = Array.from({ length: 20 }, (_, i) => ({
  value: i + 1,
  text: `选项 ${i + 1}`,
}))

function App() {
  const [selected, setSelected] = React.useState(1)
  const navRef = useRef(null)

  const scrollToLast = () => {
    if (navRef.current) {
      navRef.current.apiDoScrollToValue(20)
    }
  }

  return (
    <div>
      <div style={{ width: '100px', height: '300px' }}>
        <Nav
          ref={navRef}
          data={data}
          selected={selected}
          onSelect={setSelected}
        />
      </div>
      <Button onClick={scrollToLast}>滚动到最后</Button>
    </div>
  )
}
```

### 结合状态管理

与 MobX 等状态管理库配合使用：

```jsx
import React from 'react'
import { Nav } from '@gm-mobile/react'
import { observable } from 'mobx'

const data = [
  { value: 'vegetables', text: '蔬菜' },
  { value: 'fruits', text: '水果' },
  { value: 'meat', text: '肉类' },
  { value: 'snacks', text: '零食' },
]

const store = observable({
  selected: 'vegetables',
  setSelected(value) {
    this.selected = value
  },
})

function App() {
  return (
    <div style={{ width: '100px', height: '300px' }}>
      <Nav
        data={data}
        selected={store.selected}
        onSelect={(value) => store.setSelected(value)}
      />
    </div>
  )
}
```

## 注意事项

- 确保 `data` 数组中的每一项都有唯一的 `value` 和显示用的 `text`
- `selected` 值必须在 `data` 数组的 `value` 中存在，否则不会显示任何选中状态
- 点击已选中的项不会触发 `onSelect` 回调
- 使用 `horizontal` 模式时，建议父容器设置固定宽度以获得最佳效果
- 通过 ref 调用 `apiDoScrollToValue` 时，确保目标值存在于 data 中
- 组件内部使用 `scrollIntoView` API 实现滚动，在某些旧版本浏览器可能存在兼容性问题

## 相关组件

- [Tabs](../tabs/) - 标签页组件，类似的切换功能
- [Tabbar](../tabbar/) - 底部标签栏
