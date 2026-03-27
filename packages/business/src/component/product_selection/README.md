# ProductSelection

## 简介
商品选择组件 - 一个支持多选的商品列表组件，带字母索引导航、已选商品展示弹窗和底部操作栏，适用于需要从大量商品中选择多个商品的业务场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 商品列表数据，格式为 `[{value, text}]`，value 为唯一标识，text 为显示文本 | `array` | - | 是 |
| selected | 已选商品的 value 数组 | `array` | `[]` | 否 |
| onSelect | 选择变化时的回调函数，参数为当前选中的 value 数组 | `function` | - | 是 |
| renderItem | 自定义列表项渲染函数，接收一个 item 参数，返回 React 节点 | `function` | `(item) => item.text` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

### 组件结构说明

ProductSelection 由以下三个部分组成：

1. **字母索引列表**（继承自 LetterIndexMultiple）
   - 支持按字母分组快速定位
   - 支持多选操作
   - 可自定义列表项渲染

2. **底部操作栏**
   - 显示已选商品数量（带角标提示）
   - 购物车图标，点击可查看已选商品列表
   - 确定添加按钮，提交最终选择结果

3. **已选商品弹窗**
   - 展示所有已选商品
   - 支持单个删除操作
   - 带遮罩层，点击遮罩关闭

## 示例

### 基础用法

最简单的使用方式，配合状态管理库（如 mobx）管理选中状态：

```jsx
import React from 'react'
import { Page } from '@gm-mobile/react'
import { ProductSelection } from '@gm-mobile/business'

const Example = () => {
  const [selected, setSelected] = React.useState([])

  const data = [
    { value: 'apple', text: '苹果' },
    { value: 'banana', text: '香蕉' },
    { value: 'orange', text: '橙子' },
    { value: 'watermelon', text: '西瓜' },
  ]

  return (
    <Page>
      <ProductSelection
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </Page>
  )
}

export default Example
```

### 带默认选中值

初始化时传入已选中的商品：

```jsx
import React from 'react'
import { Page } from '@gm-mobile/react'
import { ProductSelection } from '@gm-mobile/business'

const Example = () => {
  // 默认选中苹果和香蕉
  const [selected, setSelected] = React.useState(['apple', 'banana'])

  const data = [
    { value: 'apple', text: '苹果' },
    { value: 'banana', text: '香蕉' },
    { value: 'orange', text: '橙子' },
    { value: 'watermelon', text: '西瓜' },
    { value: 'grape', text: '葡萄' },
  ]

  return (
    <Page>
      <ProductSelection
        data={data}
        selected={selected}
        onSelect={setSelected}
      />
    </Page>
  )
}

export default Example
```

### 自定义列表项渲染

通过 `renderItem` 属性自定义每个商品的展示样式：

```jsx
import React from 'react'
import { Page } from '@gm-mobile/react'
import { ProductSelection } from '@gm-mobile/business'

const Example = () => {
  const [selected, setSelected] = React.useState([])

  const data = [
    { value: 'apple', text: '苹果', price: '5.00', stock: 100 },
    { value: 'banana', text: '香蕉', price: '3.50', stock: 50 },
    { value: 'orange', text: '橙子', price: '4.00', stock: 80 },
  ]

  // 自定义渲染，显示价格和库存
  const renderItem = (item) => (
    <div>
      <div>{item.text}</div>
      <div style={{ fontSize: '12px', color: '#999' }}>
        ¥{item.price} | 库存: {item.stock}
      </div>
    </div>
  )

  return (
    <Page>
      <ProductSelection
        data={data}
        selected={selected}
        onSelect={setSelected}
        renderItem={renderItem}
      />
    </Page>
  )
}

export default Example
```

### 提交已选商品

监听 `onSelect` 回调，在点击确定按钮后处理选中的商品：

```jsx
import React from 'react'
import { Page, Toast } from '@gm-mobile/react'
import { ProductSelection } from '@gm-mobile/business'

const Example = () => {
  const [selected, setSelected] = React.useState([])

  const data = [
    { value: 'apple', text: '苹果' },
    { value: 'banana', text: '香蕉' },
    { value: 'orange', text: '橙子' },
  ]

  // 处理选择确认
  const handleSelect = (selectedList) => {
    setSelected(selectedList)

    // 可以在这里执行提交逻辑
    if (selectedList.length > 0) {
      console.log('已选商品：', selectedList)
      Toast.success(`已添加 ${selectedList.length} 个商品`)
    }
  }

  return (
    <Page>
      <ProductSelection
        data={data}
        selected={selected}
        onSelect={handleSelect}
      />
    </Page>
  )
}

export default Example
```

## 注意事项

1. **数据格式要求**：`data` 属性必须是对象数组，每个对象必须包含 `value`（唯一标识）和 `text`（显示文本）字段。

2. **状态管理**：建议使用 React hooks（如 `useState`）或状态管理库（如 MobX）来管理 `selected` 状态，确保视图正确更新。

3. **选中值传递**：`selected` 和 `onSelect` 参数中的选中项都是 `value` 数组，不是完整的商品对象。

4. **字母分组**：组件会自动根据 `text` 字段的首字母进行分组和索引，无需手动处理。

5. **底部按钮状态**：当没有选中任何商品时，底部购物车图标和确定按钮处于禁用状态，不可点击。

6. **已选商品弹窗**：点击底部购物车图标可展开已选商品弹窗，在弹窗中可以快速删除已选商品。

7. **样式定制**：可以通过 `className` 和 `style` 属性自定义组件样式，如需深度定制样式，建议使用全局 CSS 覆盖。
