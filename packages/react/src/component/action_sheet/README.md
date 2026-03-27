# ActionSheet

## 简介

ActionSheet 动作面板组件 - 从底部弹出的操作菜单，用于展示一组操作选项供用户选择，支持点击选择和取消操作。

## API

### ActionSheet Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 选项数组，格式为 `[{ text, value }]` | array | - | 是 |
| onSelect | 选择选项时的回调，接收 `value` 参数 | function | - | 是 |
| onCancel | 点击取消按钮时的回调 | function | - | 是 |

### 静态方法

ActionSheet 提供了便捷的静态方法，可以直接调用而无需手动管理组件状态。

#### ActionSheet.render()

从底部弹出动作面板，返回 Promise。

**参数：**
- `title` (string): 标题
- `data` (array): 选项数组，格式为 `[{ text, value }]`

**返回值：**
- 返回 Promise
- 选中选项时 resolve(value)
- 取消或关闭时 reject

#### ActionSheet.hide()

隐藏当前显示的 ActionSheet。

**参数：** 无

**返回值：** void

## 示例

### 基础用法

```jsx
import { ActionSheet } from '@gm-mobile/react'

// 定义选项数据
const data = [
  { text: '菜单一', value: 1 },
  { text: '菜单二', value: 2 },
  { text: '菜单三', value: 3 },
]

// 点击按钮弹出
const handleClick = () => {
  ActionSheet.render({
    title: '请选择操作',
    data,
  })
    .then((value) => {
      console.log('选中了：', value)
    })
    .catch(() => {
      console.log('已取消')
    })
}

<button onClick={handleClick}>显示 ActionSheet</button>
```

### 常见用法

```jsx
import { ActionSheet } from '@gm-mobile/react'

// 场景1：删除确认
const handleDelete = () => {
  ActionSheet.render({
    title: '确认删除？',
    data: [
      { text: '确认删除', value: 'delete' },
    ],
  })
    .then(() => {
      // 执行删除操作
      console.log('已删除')
      deleteApi()
    })
    .catch(() => {
      console.log('取消删除')
    })
}

// 场景2：多选项操作
const showMoreActions = () => {
  ActionSheet.render({
    title: '更多操作',
    data: [
      { text: '编辑', value: 'edit' },
      { text: '分享', value: 'share' },
      { text: '删除', value: 'delete' },
      { text: '举报', value: 'report' },
    ],
  })
    .then((value) => {
      // 根据选中的 value 执行不同操作
      switch (value) {
        case 'edit':
          editItem()
          break
        case 'share':
          shareItem()
          break
        case 'delete':
          deleteItem()
          break
        case 'report':
          reportItem()
          break
      }
    })
    .catch(() => {
      console.log('已取消')
    })
}

// 场景3：图片选择
const showImageSourceOptions = () => {
  ActionSheet.render({
    title: '选择图片',
    data: [
      { text: '拍照', value: 'camera' },
      { text: '从相册选择', value: 'album' },
    ],
  })
    .then((value) => {
      if (value === 'camera') {
        openCamera()
      } else if (value === 'album') {
        openAlbum()
      }
    })
    .catch(() => {
      console.log('已取消')
    })
}
```

### 高级用法

```jsx
import { ActionSheet } from '@gm-mobile/react'

// 异步操作后关闭
const handleAsyncAction = () => {
  ActionSheet.render({
    title: '请选择',
    data: [
      { text: '提交审核', value: 'submit' },
      { text: '保存草稿', value: 'draft' },
    ],
  })
    .then(async (value) => {
      // 执行异步操作
      if (value === 'submit') {
        await submitForReview()
        ActionSheet.hide() // 手动关闭
      } else if (value === 'draft') {
        await saveDraft()
        ActionSheet.hide()
      }
    })
    .catch(() => {
      console.log('用户取消')
    })
}

// 作为组件使用（不推荐，推荐使用静态方法）
const MyComponent = () => {
  const [visible, setVisible] = useState(false)
  const data = [
    { text: '选项1', value: 1 },
    { text: '选项2', value: 2 },
  ]

  return (
    <>
      <button onClick={() => setVisible(true)}>显示菜单</button>
      {visible && (
        <Popup visible={visible} onVisibleChange={setVisible} bottom>
          <ActionSheet
            data={data}
            onSelect={(value) => {
              console.log('选中：', value)
              setVisible(false)
            }}
            onCancel={() => {
              console.log('取消')
              setVisible(false)
            }}
          />
        </Popup>
      )}
    </>
  )
}
```

## 注意事项

1. **使用方式推荐**：
   - 优先使用静态方法 `ActionSheet.render()`，更简洁且无需管理显示状态
   - 组件方式 `<ActionSheet />` 需要配合 Popup 组件使用，不推荐

2. **data 数据格式**：
   - data 必须是数组，每项包含 `text`（显示文字）和 `value`（实际值）
   - text 会显示在菜单项中，value 会在 onSelect 回调中返回
   - 数组可以为空，但不会显示任何选项

3. **Promise 处理**：
   - `ActionSheet.render()` 返回 Promise，选中时 resolve，取消时 reject
   - 必须使用 `.then()` 和 `.catch()` 或 `async/await` 处理结果
   - 即使不需要处理取消操作，也建议添加 `.catch()` 避免警告

4. **手动关闭**：
   - 一般情况下，选中或取消后会自动关闭
   - 如果需要在选中后执行异步操作后再关闭，可以使用 `ActionSheet.hide()`

5. **样式定制**：
   - ActionSheet 使用组件库统一样式，不支持自定义样式
   - 如需完全自定义，建议使用 Popup 组件自行实现

## 相关组件

- **Popup** - ActionSheet 底层依赖的弹出层组件
- **Dialog** - 居中弹窗，适合需要用户确认的场景
- **Toast** - 轻提示，用于操作反馈
