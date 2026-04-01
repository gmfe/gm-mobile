# List

## 简介

List 列表组件 - 用于展示选项列表的组件，支持单选、多选和分组显示，常用于地区选择、数据筛选等场景。

## API

### List Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 列表数据，基本格式：`[{value, text, disabled}]`，分组格式：`[{label, id, children: [{value, text, disabled}]}]` | array | - | 是 |
| selected | 选中的值，单选时为 value，多选时为 [value, value] | any | - | 否 |
| onSelect | 选择回调，单选返回 value，多选返回 [value, value] | function | - | 否 |
| multiple | 是否多选 | boolean | false | 否 |
| isGroupList | 是否为分组列表 | boolean | false | 否 |
| renderItem | 自定义列表项渲染 | function | (item) => item.text | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### List 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| apiDoScrollToLabel | 滚动到指定分组标签 | label: string - 分组标签 |
| apiDoScrollToValue | 滚动到指定值的列表项 | value: any - 列表项的值 |

## 示例

### 基础用法

```jsx
import { List } from '@gm-mobile/react'
import { observable } from 'mobx'

const data = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田' },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' },
]

const store = observable({
  selected: null,
  setSelected(selected) {
    this.selected = selected
  },
})

<List
  data={data}
  selected={store.selected}
  onSelect={(selected) => store.setSelected(selected)}
/>
```

### 多选列表

```jsx
import { List } from '@gm-mobile/react'

const data = [
  { value: '南山', text: '南山' },
  { value: '福田', text: '福田', disabled: true },
  { value: '龙岗', text: '龙岗' },
  { value: '罗湖', text: '罗湖' },
]

const [selected, setSelected] = useState([])

<List
  multiple
  data={data}
  selected={selected}
  onSelect={setSelected}
/>
```

### 分组列表

```jsx
import { List } from '@gm-mobile/react'

const groupData = [
  {
    label: '分组一',
    id: 'group1',
    children: [
      { value: '南山', text: '南山' },
      { value: '福田', text: '福田' },
    ],
  },
  {
    label: '分组二',
    id: 'group2',
    children: [
      { value: '龙岗', text: '龙岗' },
      { value: '罗湖', text: '罗湖' },
    ],
  },
]

const [selected, setSelected] = useState([])

<List
  data={groupData}
  multiple
  isGroupList
  selected={selected}
  onSelect={setSelected}
/>
```

### 高级用法

```jsx
import { List } from '@gm-mobile/react'

// 自定义列表项渲染
const data = [
  { value: '1', text: '选项一', extra: '额外信息' },
  { value: '2', text: '选项二', extra: '额外信息' },
]

<List
  data={data}
  selected={selected}
  onSelect={setSelected}
  renderItem={(item) => (
    <div>
      <div>{item.text}</div>
      <div className='m-text-gray'>{item.extra}</div>
    </div>
  )}
/>

// 使用 ref 方法滚动到指定项
const listRef = useRef()

<List
  ref={listRef}
  data={data}
  selected={selected}
  onSelect={setSelected}
/>

// 滚动到指定值
<button onClick={() => listRef.current.apiDoScrollToValue('2')}>
  滚动到选项二
</button>

// 滚动到指定分组
<button onClick={() => listRef.current.apiDoScrollToLabel('分组一')}>
  滚动到分组一
</button>

// 禁用某些选项
const dataWithDisabled = [
  { value: '1', text: '可选' },
  { value: '2', text: '已禁用', disabled: true },
  { value: '3', text: '可选' },
]

<List
  data={dataWithDisabled}
  selected={selected}
  onSelect={setSelected}
/>
```

## 注意事项

1. **单选与多选的区别**：
   - 单选时 `selected` 为单个值，`onSelect` 回调返回单个值
   - 多选时 `selected` 为数组，`onSelect` 回调返回数组
   - 设置 `multiple={true}` 时，列表项会显示复选框

2. **数据格式**：
   - 基本列表：`[{value, text, disabled}]`，`value` 是唯一标识，`text` 是显示文本
   - 分组列表：`[{label, id, children: [{value, text, disabled}]}]`，`label` 是分组标题，`id` 是分组标识
   - 使用分组数据时必须设置 `isGroupList={true}`

3. **禁用状态**：
   - 通过在数据项中设置 `disabled: true` 来禁用某个选项
   - 禁用的选项无法被选中，点击无反应
   - 禁用状态下选项会显示为灰色样式

4. **自定义渲染**：
   - 使用 `renderItem` 属性可以自定义列表项的展示内容
   - `renderItem` 是一个函数，接收数据项作为参数，返回 React 节点
   - 自定义渲染时可以使用数据项中的任意字段

5. **性能考虑**：
   - 对于大量数据的列表，建议使用分组方式组织数据
   - 使用 `apiDoScrollToLabel` 和 `apiDoScrollToValue` 方法可以快速定位到指定项
   - 列表项点击时会触发 `onSelect` 回调，请确保回调函数性能良好

## 相关组件

- **Checkbox** - 复选框组件，List 多选时内部使用
- **Radio** - 单选框组件，List 单选时内部使用
- **Picker** - 选择器组件，用于弹出式选择场景
- **ActionSheet** - 动作面板，可配合 List 使用
