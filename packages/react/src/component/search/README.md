# Search

## 简介
Search 搜索组件 - 提供完整的搜索功能解决方案，包括搜索输入框、假搜索框和搜索页面三种形式，适用于各种搜索场景。

## API

### Search
搜索输入框组件，支持搜索按钮和取消按钮两种模式。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 搜索按钮类型，'search' 表示带搜索按钮，'cancel' 表示带取消按钮 | 'search' \| 'cancel' | 'search' | 否 |
| value | 输入框的值 | string | - | 是 |
| onChange | 值变化回调，参数为当前输入值 | function | - | 是 |
| autoFocus | 是否自动聚焦 | boolean | false | 否 |
| onSearch | 搜索回调，参数为当前输入值，即时搜索可不传 | function | _.noop | 否 |
| onCancel | 取消回调，点击取消按钮时触发 | function | _.noop | 否 |
| placeholder | 占位文本 | string | '搜索' | 否 |
| searchText | 自定义搜索按钮/取消按钮的文案 | string | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### FakeSearch
假搜索框组件，用于展示静态搜索框，点击后可触发跳转或其他操作。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onClick | 点击事件回调 | function | - | 否 |
| placeholder | 占位文本 | string | '搜索' | 否 |
| center | 内容是否居中显示 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 子元素，可用于自定义内容 | node | - | 否 |

### SearchPage
搜索页面组件，支持在普通页面和搜索状态之间切换，常用于实现"点击头部搜索按钮进入搜索模式"的场景。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| active | 是否激活搜索状态，true 时显示搜索框，false 时显示自定义 header | boolean | - | 是 |
| value | 输入框的值 | string | - | 是 |
| onChange | 值变化回调，参数为当前输入值 | function | - | 是 |
| onCancel | 取消回调，点击取消按钮时触发，用于退出搜索状态 | function | - | 是 |
| onSearch | 搜索回调，参数为当前输入值 | function | _.noop | 否 |
| header | 自定义头部，在非搜索状态下显示 | node | - | 否 |
| ...rest | 其他属性会传递给 Page 组件 | any | - | 否 |

## 示例

### 基础用法 - 带搜索按钮
适用于独立的搜索页面，用户输入后点击搜索按钮触发搜索。

```jsx
import { Search } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <Search
      placeholder='在站内搜索'
      value={value}
      onChange={setValue}
      onSearch={(value) => console.log('搜索:', value)}
    />
  )
}
```

### 基础用法 - 带取消按钮
适用于从其他页面进入搜索模式的场景，点击取消按钮返回原页面。

```jsx
import { Search } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <Search
      type='cancel'
      placeholder='在站内搜索'
      value={value}
      onChange={setValue}
      onCancel={() => console.log('取消')}
    />
  )
}
```

### 基础用法 - 假搜索框
适用于在页面头部展示搜索框入口，点击后跳转到搜索页面。

```jsx
import { FakeSearch } from '@gm-mobile/react'

function App() {
  return (
    <FakeSearch
      placeholder='站内搜索'
      onClick={() => console.log('跳转到搜索页')}
    />
  )
}
```

### 常见用法 - 搜索页面切换
实现点击头部搜索按钮进入搜索模式，点击取消返回原页面的完整场景。

```jsx
import { SearchPage } from '@gm-mobile/react'
import { Header } from '@gm-mobile/react'
import { Flex } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  return (
    <SearchPage
      header={
        <Header
          title='商品列表'
          right={
            <Flex
              alignCenter
              className='m-padding-lr-15'
              onClick={() => {
                setActive(true)
                setValue('')
                setSearchValue('')
              }}
            >
              搜索
            </Flex>
          }
        />
      }
      active={active}
      value={value}
      onChange={setValue}
      onSearch={() => {
        setSearchValue(value)
        // 执行搜索逻辑
      }}
      onCancel={() => {
        setActive(false)
        setValue(searchValue)
      }}
    >
      {/* 页面内容 */}
      <div>
        输入框值: {value}
        <br />
        搜索值: {searchValue}
      </div>
    </SearchPage>
  )
}
```

### 常见用法 - 历史搜索记录
在搜索页面中显示历史搜索记录，点击记录项快速填充搜索框。

```jsx
import { SearchPage } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [active, setActive] = useState(false)
  const [value, setValue] = useState('')
  const [searchValue, setSearchValue] = useState('')

  const historyItems = ['青菜', '黄瓜', '西红柿']

  return (
    <SearchPage
      active={active}
      value={value}
      onChange={setValue}
      onSearch={() => {
        setSearchValue(value)
      }}
      onCancel={() => {
        setActive(false)
        setValue(searchValue)
      }}
    >
      <div>
        <h4>历史搜索</h4>
        {historyItems.map((item) => (
          <button
            key={item}
            onClick={() => {
              setActive(true)
              setValue(item)
              setSearchValue(item)
            }}
          >
            {item}
          </button>
        ))}
      </div>
    </SearchPage>
  )
}
```

### 常见用法 - 自定义按钮文案
自定义搜索或取消按钮的文案。

```jsx
import { Search } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [value, setValue] = useState('')

  return (
    <div>
      <Search
        value={value}
        onChange={setValue}
        searchText='查找'
        onSearch={(value) => console.log(value)}
      />
      <br />
      <Search
        type='cancel'
        value={value}
        onChange={setValue}
        searchText='关闭'
        onCancel={() => console.log('取消')}
      />
    </div>
  )
}
```

## 注意事项
- **Search 组件的 value 和 onChange 是必填的**，必须使用受控模式
- **type='search' 模式**：适用于独立搜索页面，点击搜索按钮触发搜索
- **type='cancel' 模式**：适用于从其他页面进入搜索模式的场景，点击取消按钮返回
- **SearchPage 组件**：用于实现页面头部和搜索模式的切换，需要配合 active 状态使用
- **即时搜索场景**：如果需要在输入时即时搜索（如输入联想），可以在 onChange 中直接处理，不传 onSearch
- **FakeSearch 组件**：只用于展示，不能输入，通常配合跳转逻辑使用
- **Search 组件内部使用了 form 元素**，在提交表单时会阻止默认行为并触发 onSearch
- **国际化支持**：组件默认文案会根据当前语言环境显示中文或其他语言
