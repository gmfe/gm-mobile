# Picker

## 简介

Picker 选择器组件 - 用于从多个选项中选择一个或多个值，提供基础选择器、联动选择器、带确认按钮的选择器、带搜索功能的选择器等多种变体，适用于单列/多列选择、级联选择、弹窗选择等多种场景。

## API

### Picker Props

Picker 是基础的多列选择器组件。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| datas | 选择器数据，每列都是一个数组，格式为 `[{value, text}, ...]` | array | - | 是 |
| values | 每列选中的值数组 | array | - | 是 |
| headers | 每列的标题，格式为 `[header, ...]` | array | - | 否 |
| itemHeight | 每个选项的高度 | number | 40 | 否 |
| onChange | 值变化时的回调，参数为新的 values 数组 | function | - | 是 |
| renderOption | 自定义选项渲染函数，参数为 `(dataIndex, option)` | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**datas 数据格式示例**：
```javascript
// 多列数据
const datas = [
  [
    { value: '1', text: '选项1' },
    { value: '2', text: '选项2' }
  ],
  [
    { value: 'a', text: '选项A' },
    { value: 'b', text: '选项B' }
  ]
]
```

### CouplingPicker Props

CouplingPicker 是联动选择器，选择某一列会影响后续列的可用选项。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| datas | 联动数据，格式为嵌套的 children 结构 | array | - | 是 |
| values | 每列选中的值数组 | array | - | 是 |
| itemHeight | 每个选项的高度 | number | 40 | 否 |
| onChange | 值变化时的回调，参数为新的 values 数组 | function | - | 是 |
| renderOption | 自定义选项渲染函数，参数为 `(dataIndex, option)` | function | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**datas 数据格式示例**：
```javascript
// 三级联动数据
const datas = [
  {
    value: '1',
    text: '广东省',
    children: [
      {
        value: '11',
        text: '深圳市',
        children: [
          { value: '111', text: '南山区' },
          { value: '112', text: '福田区' }
        ]
      }
    ]
  }
]
```

### ConfirmPicker Props

ConfirmPicker 是底部弹窗形式的选择器，带确认和取消按钮。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | string | - | 否 |
| datas | 选择器数据，格式与 Picker 相同 | array | - | 是 |
| headers | 每列的标题 | array | - | 否 |
| values | 每列选中的值数组 | array | - | 是 |
| renderOption | 自定义选项渲染函数 | function | - | 否 |
| onConfirm | 点击确认按钮的回调，参数为选中的 values | function | - | 是 |
| onCancel | 点击取消按钮的回调 | function | - | 是 |

**静态方法**：
- `ConfirmPicker.render(props)` - 渲染弹窗选择器，返回 Promise，确认时 resolve 选中的 values，取消时 reject
- `ConfirmPicker.hide()` - 隐藏弹窗

### ConfirmCouplingPicker Props

ConfirmCouplingPicker 是底部弹窗形式的联动选择器。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | string | - | 否 |
| datas | 联动数据，格式与 CouplingPicker 相同 | array | - | 是 |
| values | 每列选中的值数组 | array | - | 是 |
| renderOption | 自定义选项渲染函数 | function | - | 否 |
| onConfirm | 点击确认按钮的回调，参数为选中的 values | function | - | 是 |
| onCancel | 点击取消按钮的回调 | function | - | 是 |

**静态方法**：
- `ConfirmCouplingPicker.render(props)` - 渲染弹窗联动选择器，返回 Promise
- `ConfirmCouplingPicker.hide()` - 隐藏弹窗

### SearchPicker Props

SearchPicker 是带搜索功能的选择器，仅支持单栏选择。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | string | - | 否 |
| data | 选择器数据，格式为 `[{value, text}, ...]` | array | - | 是 |
| headers | 列的标题 | array | - | 否 |
| value | 当前选中的值 | any | - | 是 |
| placeholder | 搜索框占位文字 | string | - | 否 |
| searchBtnText | 搜索按钮文字 | string | - | 否 |
| renderOption | 自定义选项渲染函数 | function | - | 否 |
| onConfirm | 点击确认按钮的回调，参数为选中的 values 数组 | function | - | 是 |
| onCancel | 点击取消按钮的回调 | function | - | 是 |

**静态方法**：
- `SearchPicker.render(props)` - 渲染带搜索的选择器弹窗，返回 Promise
- `SearchPicker.hide()` - 隐藏弹窗

### SelectPicker Props

SelectPicker 是简化的单选选择器，只有一个 render 静态方法。

| 参数 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 选择器数据，格式为 `[{value, text}, ...]` | array | - | 否 |
| value | 当前选中的值 | any | - | 否 |
| title | 弹窗标题 | string | '选择' | 否 |

**静态方法**：
- `SelectPicker.render(props)` - 渲染单选弹窗，返回 Promise，确认时 resolve 选中的 value（不是数组），取消时 reject
- `SelectPicker.hide()` - 隐藏弹窗

## 示例

### 基础用法

```jsx
import { Picker } from '@gm-mobile/react'

// 单列选择器
const singleColumnData = [
  [
    { value: '1', text: '选项1' },
    { value: '2', text: '选项2' },
    { value: '3', text: '选项3' }
  ]
]

<Picker
  datas={singleColumnData}
  values={['1']}
  onChange={(values) => {
    console.log('选中值：', values[0])
  }}
/>

// 多列选择器
const multiColumnData = [
  [
    { value: 'Mr.', text: '先生' },
    { value: 'Mrs.', text: '女士' }
  ],
  [
    { value: 'John', text: 'John' },
    { value: 'Micheal', text: 'Micheal' }
  ]
]

<Picker
  datas={multiColumnData}
  values={['Mr.', 'John']}
  onChange={(values) => {
    console.log('选中值：', values)
  }}
/>

// 带列标题的选择器
<Picker
  datas={multiColumnData}
  values={['Mr.', 'John']}
  headers={['称呼', '名字']}
  onChange={(values) => {
    console.log('选中值：', values)
  }}
/>
```

### 联动选择器

```jsx
import { CouplingPicker } from '@gm-mobile/react'

// 三级联动数据（省市区）
const couplingData = [
  {
    value: 'guangdong',
    text: '广东省',
    children: [
      {
        value: 'shenzhen',
        text: '深圳市',
        children: [
          { value: 'nanshan', text: '南山区' },
          { value: 'futian', text: '福田区' }
        ]
      },
      {
        value: 'guangzhou',
        text: '广州市',
        children: [
          { value: 'tianhe', text: '天河区' }
        ]
      }
    ]
  }
]

<CouplingPicker
  datas={couplingData}
  values={['guangdong', 'shenzhen', 'nanshan']}
  onChange={(values) => {
    console.log('联动选择：', values)
  }}
/>
```

### 底部弹窗选择器

```jsx
import { ConfirmPicker } from '@gm-mobile/react'

const handleClick = () => {
  ConfirmPicker.render({
    title: '请选择',
    datas: [
      [
        { value: '1', text: '选项1' },
        { value: '2', text: '选项2' }
      ]
    ],
    values: ['1'],
    headers: ['选项'],
    onConfirm: (values) => {
      console.log('确认选择：', values)
    },
    onCancel: () => {
      console.log('取消选择')
    }
  }).then(
    (values) => {
      console.log('Promise resolved:', values)
    },
    () => {
      console.log('Promise rejected')
    }
  )
}

<button onClick={handleClick}>打开选择器</button>
```

### 底部弹窗联动选择器

```jsx
import { ConfirmCouplingPicker } from '@gm-mobile/react'

const handleCouplingClick = () => {
  ConfirmCouplingPicker.render({
    title: '选择地区',
    datas: couplingData,
    values: ['guangdong', 'shenzhen', 'nanshan'],
    onConfirm: (values) => {
      console.log('确认选择：', values)
    }
  }).then(
    (values) => {
      console.log('选中的地区：', values)
    }
  )
}

<button onClick={handleCouplingClick}>选择地区</button>
```

### 带搜索功能的选择器

```jsx
import { SearchPicker } from '@gm-mobile/react'

const handleSearchClick = () => {
  const data = [
    { value: 1, text: '深圳' },
    { value: 2, text: '罗湖' },
    { value: 3, text: '南山' },
    { value: 4, text: '宝安' },
    { value: 5, text: '福田' }
  ]

  SearchPicker.render({
    title: '选择城市',
    placeholder: '请输入地名',
    data: data,
    value: 1,
    onConfirm: (values) => {
      console.log('选中值：', values[0])
    }
  }).then(
    (values) => {
      console.log('选中的城市：', values)
    }
  )
}

<button onClick={handleSearchClick}>搜索选择</button>
```

### 简化的单选选择器

```jsx
import { SelectPicker } from '@gm-mobile/react'

const handleSelectClick = () => {
  const data = [
    { value: 1, text: '深圳' },
    { value: 2, text: '罗湖' },
    { value: 3, text: '南山' }
  ]

  SelectPicker.render({
    title: '选择城市',
    data: data,
    value: 1
  }).then(
    (value) => {
      console.log('选中的值：', value) // 注意：返回的是单个值，不是数组
    }
  )
}

<button onClick={handleSelectClick}>单选</button>
```

### 高级用法

```jsx
import { Picker, ConfirmPicker } from '@gm-mobile/react'

// 自定义选项渲染
const customData = [
  [
    { value: '1', text: '普通选项' },
    { value: '2', text: '重要选项', important: true }
  ]
]

<Picker
  datas={customData}
  values={['1']}
  renderOption={(index, option) => {
    return (
      <div>
        {option.text}
        {option.important && <span style={{ color: 'red' }}> 重要</span>}
      </div>
    )
  }}
  onChange={(values) => {
    console.log('选中：', values)
  }}
/>

// 自定义每项高度
<Picker
  datas={customData}
  values={['1']}
  itemHeight={50}
  onChange={(values) => {
    console.log('选中：', values)
  }}
/>

// 异步加载数据后显示选择器
const loadDataAndShowPicker = async () => {
  const data = await fetchOptionsFromAPI()

  ConfirmPicker.render({
    title: '请选择',
    datas: [data],
    values: [data[0].value],
    onConfirm: (values) => {
      console.log('选中：', values)
    }
  })
}

// 使用 useState 管理选中值
const [selectedValues, setSelectedValues] = useState(['1'])

<Picker
  datas={data}
  values={selectedValues}
  onChange={(values) => {
    setSelectedValues(values)
  }}
/>
```

## 注意事项

1. **数据格式区分**：
   - Picker/ConfirmPicker 的 datas 格式为二维数组 `[column1, column2, ...]`
   - CouplingPicker/ConfirmCouplingPicker 的 datas 格式为嵌套的 children 结构
   - SearchPicker 的 data 格式为一维数组 `[{value, text}, ...]`
   - SelectPicker 的 data 格式与 SearchPicker 相同

2. **values 参数**：
   - Picker/CouplingPicker 是受控组件，values 必须由父组件管理
   - ConfirmPicker/ConfirmCouplingPicker/SearchPicker 初始 values 会在内部管理，调用 onChange 时更新内部状态
   - SelectPicker 的 value 是单个值，不是数组

3. **Promise 返回值**：
   - ConfirmPicker/ConfirmCouplingPicker 的 Promise resolve 的是 values 数组
   - SearchPicker 的 Promise resolve 的也是 values 数组（单元素）
   - SelectPicker 的 Promise resolve 的是单个 value（不是数组）
   - 所有弹窗选择器取消时都会 reject

4. **自定义渲染**：
   - renderOption 的参数是 `(dataIndex, option)`， dataIndex 是列索引
   - 可以根据 dataIndex 或 option 的属性自定义渲染
   - 注意 renderOption 返回的是 React 节点

5. **弹窗关闭**：
   - 点击弹窗外部区域、取消按钮会触发 Promise reject
   - 调用 `.hide()` 方法可以手动关闭弹窗
   - 确认后弹窗会自动关闭

6. **SearchPicker 限制**：
   - 仅支持单列选择
   - 搜索功能基于 text 字段的模糊匹配（indexOf）
   - 搜索结果为空时会显示空列表

## 相关组件

- **Button** - 用于触发选择器弹窗
- **Input** - 常与选择器配合使用，显示选中的值
- **List** - 选择器常用于列表项的选择
- **Calendar** - 日期选择组件，与选择器类似的交互方式
