# Dialog

## 简介

Dialog 弹窗组件 - 用于显示模态对话框的组件，提供静态方法和组件两种使用方式。支持 Alert、Confirm、Delete、Prompt 等常见对话框场景，并支持自定义内容和按钮。

## API

### Dialog Props

Dialog 组件的属性，既用于组件方式，也用于静态方法的 options 参数。

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 对话框标题 | string | '提示' | 否 |
| children | 对话框内容 | ReactNode | - | 是 |
| confirmText | 确定按钮文字 | string | '确定' | 否 |
| onConfirm | 确定按钮点击回调 | function | - | 是 |
| cancelText | 取消按钮文字 | string | '取消' | 否 |
| onCancel | 取消按钮点击回调 | function | - | 否 |
| otherText | 其他按钮文字 | string | - | 否 |
| onOther | 其他按钮点击回调 | function | - | 否 |

### Prompt 专用属性

使用 `Dialog.prompt()` 方法时，可额外传入以下属性：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| promptText | 输入框上方的提示文字 | string | - | 否 |
| promptInputProps | 传递给输入框的 props | object | - | 否 |
| promptGetError | 输入框的验证函数，返回错误提示文字 | function | - | 否 |

### 静态方法

Dialog 提供了以下静态方法：

#### Dialog.alert(options)

显示只有一个确定按钮的对话框。

**参数**：
- options (string | object): 对话框内容字符串，或配置对象

**返回值**：Promise，点击确定后 resolve

#### Dialog.confirm(options)

显示确定和取消按钮的对话框。

**参数**：
- options (string | object): 对话框内容字符串，或配置对象

**返回值**：Promise
- 点击确定后 resolve
- 点击取消后 reject

#### Dialog.delete(options)

显示删除确认对话框，确定按钮为红色"删除"文字。

**参数**：
- options (string | object): 对话框内容字符串，或配置对象

**返回值**：Promise
- 点击删除后 resolve
- 点击取消后 reject

#### Dialog.prompt(options)

显示带输入框的对话框，用于收集用户输入。

**参数**：
- options (object): 配置对象，除基础属性外，支持 prompt 专用属性

**返回值**：Promise
- 点击确定后 resolve，返回输入框的值
- 点击取消后 reject
- 如果 onConfirm 返回 false，阻止关闭

#### Dialog.render(options, type)

底层渲染方法，用于完全自定义对话框。

**参数**：
- options (object): 配置对象
- type (string): 对话框类型 ('confirm' | 'prompt' | 'delete')

**返回值**：Promise

#### Dialog.hide()

手动关闭当前显示的对话框。

## 示例

### Alert - 提示对话框

最简单的提示对话框，只有一个确定按钮。

```jsx
import { Dialog } from '@gm-mobile/react'

// 字符串形式
Dialog.alert('操作成功').then(() => {
  console.log('用户点击了确定')
})

// 对象形式
Dialog.alert({
  title: '提示',
  children: '数据保存成功',
  confirmText: '我知道了',
  onConfirm: () => {
    console.log('确定按钮被点击')
  }
}).then(() => {
  console.log('对话框已关闭')
})
```

### Confirm - 确认对话框

带确定和取消按钮的对话框，用于需要用户确认的操作。

```jsx
import { Dialog } from '@gm-mobile/react'

// 字符串形式
Dialog.confirm('确定要提交吗？').then(
  () => {
    console.log('用户点击了确定')
  },
  () => {
    console.log('用户点击了取消')
  }
)

// 对象形式
Dialog.confirm({
  title: '确认操作',
  children: '确定要删除这条数据吗？',
  confirmText: '确定删除',
  cancelText: '我再想想',
  onConfirm: () => {
    // 执行删除操作
    console.log('执行删除')
  },
  onCancel: () => {
    console.log('取消删除')
  }
}).then(
  () => {
    console.log('已删除')
  },
  () => {
    console.log('已取消')
  }
)
```

### Delete - 删除确认对话框

专门用于删除操作的确认对话框，确定按钮为红色。

```jsx
import { Dialog } from '@gm-mobile/react'

// 字符串形式
Dialog.delete('确定要删除吗？').then(
  () => {
    console.log('用户确认删除')
  },
  () => {
    console.log('用户取消删除')
  }
)

// 对象形式
Dialog.delete({
  title: '删除确认',
  children: '删除后数据将无法恢复，确定要删除吗？',
  onConfirm: () => {
    // 执行删除操作
    deleteItem()
  }
}).then(
  () => {
    console.log('删除成功')
  },
  () => {
    console.log('已取消删除')
  }
)
```

### Prompt - 输入对话框

带输入框的对话框，用于收集用户输入。

```jsx
import { Dialog } from '@gm-mobile/react'

// 基础用法
Dialog.prompt({
  promptText: '请输入文件夹名称',
  promptInputProps: {
    placeholder: '请输入名称'
  }
}).then(
  (value) => {
    console.log('用户输入：', value)
  },
  () => {
    console.log('用户取消输入')
  }
)

// 带输入验证
Dialog.prompt({
  title: '新建文件夹',
  promptText: '请输入文件夹名称（最多5个字）',
  promptInputProps: {
    placeholder: '请输入名称',
    maxLength: 5
  },
  promptGetError: (value) => {
    if (value.length > 5) {
      return '不能超过5个字'
    }
    if (value.length === 0) {
      return '名称不能为空'
    }
  },
  onConfirm: (value) => {
    console.log('输入值：', value)
    // 返回 false 阻止关闭对话框
    if (!value) {
      return false
    }
    // 返回 Promise 进行异步验证
    return checkNameExists(value).then((exists) => {
      if (exists) {
        alert('名称已存在')
        return false
      }
    })
  }
}).then(
  (value) => {
    console.log('最终输入值：', value)
    // 创建文件夹
    createFolder(value)
  },
  () => {
    console.log('取消输入')
  }
)
```

### 三按钮对话框

支持同时显示取消、其他、确定三个按钮。

```jsx
import { Dialog } from '@gm-mobile/react'

Dialog.render({
  title: '选择操作',
  children: '请选择要执行的操作',
  cancelText: '取消',
  otherText: '保存草稿',
  confirmText: '直接发布',
  onCancel: () => {
    console.log('取消')
    Dialog.hide()
  },
  onOther: () => {
    console.log('保存草稿')
    Dialog.hide()
  },
  onConfirm: () => {
    console.log('直接发布')
    Dialog.hide()
  }
})
```

### 组件方式使用

除了静态方法，也可以直接使用 Dialog 组件。

```jsx
import { Dialog } from '@gm-mobile/react'
import { useState } from 'state'

function MyComponent() {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <button onClick={() => setVisible(true)}>显示对话框</button>

      {visible && (
        <Dialog
          title='组件方式使用'
          children='这是通过组件方式渲染的对话框'
          onConfirm={() => {
            console.log('确定')
            setVisible(false)
          }}
          onCancel={() => {
            console.log('取消')
            setVisible(false)
          }}
        />
      )}
    </>
  )
}
```

### 自定义内容

对话框的内容可以是任何 React 节点。

```jsx
import { Dialog } from '@gm-mobile/react'

Dialog.alert({
  title: '订单详情',
  children: (
    <div>
      <p>商品名称：xxx</p>
      <p>订单金额：¥99.00</p>
      <p>订单状态：已完成</p>
    </div>
  ),
  onConfirm: () => {
    Dialog.hide()
  }
})
```

### 异步确认操作

在 onConfirm 中返回 Promise，可以实现异步确认。

```jsx
import { Dialog } from '@gm-mobile/react'

Dialog.confirm({
  title: '提交订单',
  children: '确定要提交订单吗？',
  onConfirm: async () => {
    // 显示 loading
    const result = await submitOrder()
    if (result.success) {
      console.log('提交成功')
    } else {
      console.log('提交失败')
      // 返回 rejected Promise 不会关闭对话框
      return Promise.reject('提交失败')
    }
  }
}).then(
  () => {
    console.log('订单提交成功')
  },
  (error) => {
    console.log('订单提交失败：', error)
  }
)
```

## 注意事项

1. **静态方法 vs 组件方式**：
   - 推荐使用静态方法（`Dialog.alert`、`Dialog.confirm` 等），代码更简洁
   - 组件方式适合需要完全控制显示/隐藏逻辑的场景
   - 静态方法通过 `LayoutRoot` 渲染，会自动处理层级和遮罩

2. **参数传递方式**：
   - `Dialog.alert('简单文本')` - 传入字符串，作为对话框内容
   - `Dialog.alert({ children: '内容', title: '标题' })` - 传入对象，完整配置
   - 字符串形式仅适用于 `alert`、`confirm`、`delete`，`prompt` 必须使用对象形式

3. **Promise 返回值**：
   - `alert`：点击确定后 resolve，无参数
   - `confirm`/`delete`：确定后 resolve，取消后 reject
   - `prompt`：确定后 resolve 并返回输入值，取消后 reject
   - 可以通过 `.then()` 和 `.catch()` 或第二个参数处理结果

4. **阻止对话框关闭**：
   - 在 `onConfirm` 中返回 `false`，可以阻止对话框关闭（适用于 `prompt`）
   - 返回 `Promise.reject()` 也会阻止关闭
   - 适用于表单验证失败等场景

5. **Prompt 输入验证**：
   - `promptGetError` 函数会在输入时实时调用
   - 返回错误字符串时，会在输入框下方显示错误提示
   - 返回空字符串或 undefined 时，不显示错误
   - `promptInputProps` 会传递给 `BorderInput` 组件，支持所有输入框属性

6. **三按钮对话框**：
   - 必须同时提供 `otherText` 和 `onOther`，才会显示第三个按钮
   - 按钮顺序为：取消、其他、确定
   - 使用 `Dialog.render()` 方法实现

7. **手动关闭**：
   - 调用 `Dialog.hide()` 可以手动关闭当前对话框
   - 组件方式中，通过控制组件的渲染来关闭

8. **国际化**：
   - 默认按钮文字（确定、取消、提示）会根据语言环境自动显示
   - 如需自定义，通过 `confirmText`、`cancelText` 等属性覆盖

9. **多个对话框**：
   - 同一时间只会显示一个对话框
   - 新的对话框会自动替换旧的
   - 如需多个对话框依次显示，使用 Promise 链式调用

## 相关组件

- **Mask** - 遮罩层组件，Dialog 内部使用
- **Toast** - 轻提示组件，用于简单提示
- **LayoutRoot** - 根节点渲染组件，Dialog 内部使用
- **Input** - 输入框组件，Prompt 内部使用
- **BorderInput** - 带边框的输入框，Prompt 内部使用
