# Toast

## 简介

Toast 轻提示 - 用于临时显示某些信息的轻量级提示组件，支持多种状态和自定义内容，常用于操作反馈、状态通知等场景。

## API

### 静态方法

Toast 主要通过静态方法调用，支持以下方法：

| 方法名 | 说明 | 参数 |
|--------|------|------|
| Toast.tip() | 显示普通提示 | options: string 或 { children, time } |
| Toast.success() | 显示成功提示 | options: string 或 { children, time } |
| Toast.info() | 显示信息提示 | options: string 或 { children, time } |
| Toast.warning() | 显示警告提示 | options: string 或 { children, time } |
| Toast.danger() | 显示危险/错误提示 | options: string 或 { children, time } |
| Toast.loading() | 显示加载提示 | options: string 或 { children, time } |
| Toast.clear() | 清除当前显示的 toast | - |

**参数说明**：
- `options` 为字符串时，直接作为提示内容
- `options` 为对象时：
  - `children`: 提示内容，支持字符串或 JSX
  - `time`: 显示时长（毫秒），不设置则自动使用默认值

### Props

当直接使用 `<Toast>` 组件时的属性：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 提示类型 | oneOf(['success', 'info', 'warning', 'danger', 'loading']) | - | 否 |
| time | 显示时长（毫秒），仅在静态方法调用时有效 | number | 2000（普通）/ 20000（loading） | 否 |
| children | 提示内容 | node | - | 否 |

## 示例

### 基础用法

```jsx
import { Toast } from '@gm-mobile/react'

// 普通提示
Toast.tip('操作成功')

// 成功提示
Toast.success('保存成功')

// 信息提示
Toast.info('有新消息')

// 警告提示
Toast.warning('请注意查收')

// 危险/错误提示
Toast.danger('操作失败')

// 加载提示
Toast.loading()
```

### 自定义内容

```jsx
import { Toast } from '@gm-mobile/react'

// 传入对象参数，自定义内容
Toast.success({
  children: (
    <div>
      <div>数据保存成功！</div>
      <div style={{ fontSize: '12px', marginTop: '5px' }}>
        2秒后自动关闭
      </div>
    </div>
  ),
})

// 自定义显示时长
Toast.warning({
  children: '请稍候...',
  time: 5000, // 显示 5 秒
})
```

### 加载状态

```jsx
import { Toast } from '@gm-mobile/react'

// 显示加载中
Toast.loading()

// 自定义加载文字
Toast.loading('正在提交数据...')

// 加载完成后手动清除
setTimeout(() => {
  Toast.clear()
  Toast.success('提交成功')
}, 2000)
```

### 常见业务场景

```jsx
import { Toast } from '@gm-mobile/react'

// 表单提交
const handleSubmit = async () => {
  try {
    Toast.loading('提交中...')
    await submitForm()
    Toast.clear()
    Toast.success('提交成功')
  } catch (error) {
    Toast.clear()
    Toast.danger('提交失败，请重试')
  }
}

// 数据删除
const handleDelete = () => {
  Toast.loading()
  deleteData()
    .then(() => {
      Toast.clear()
      Toast.success('删除成功')
    })
    .catch(() => {
      Toast.clear()
      Toast.danger('删除失败')
    })
}

// 复制成功
const handleCopy = () => {
  navigator.clipboard.writeText('复制的内容')
  Toast.success('已复制到剪贴板')
}

// 验证提示
const validateForm = () => {
  if (!username) {
    Toast.warning('请输入用户名')
    return false
  }
  if (!password) {
    Toast.warning('请输入密码')
    return false
  }
  return true
}
```

### 高级用法

```jsx
import { Toast } from '@gm-mobile/react'

// 长时间显示
Toast.info({
  children: '重要通知：系统将于今晚 22:00 进行维护',
  time: 10000, // 显示 10 秒
})

// 永不自动关闭（设置 time 为 0）
Toast.loading({
  children: '处理中...',
  time: 0, // 不会自动关闭，需要手动调用 Toast.clear()
})

// 手动清除
// setTimeout(() => {
//   Toast.clear()
// }, 3000)

// 复杂的自定义内容
Toast.success({
  children: (
    <div>
      <div style={{ fontSize: '16px', fontWeight: 'bold' }}>
        恭喜！
      </div>
      <div style={{ fontSize: '14px', marginTop: '8px' }}>
        您已成功完成所有任务
      </div>
    </div>
  ),
  time: 3000,
})
```

## 注意事项

1. **使用方式**：
   - 推荐使用静态方法调用（如 `Toast.success()`），而非直接渲染 `<Toast>` 组件
   - 静方方法会自动处理显示和隐藏逻辑，使用更简单

2. **显示时长**：
   - 普通提示（tip、success、info、warning、danger）默认显示 2 秒
   - loading 类型默认显示 20 秒，适合较长的异步操作
   - 可通过 `time` 参数自定义显示时长，设置为 0 则不自动关闭

3. **Loading 类型特殊处理**：
   - loading 状态会显示一个透明遮罩，防止用户操作其他区域
   - loading 完成后务必调用 `Toast.clear()` 清除，否则会一直显示
   - 建议在 try-catch 的 finally 中调用 `Toast.clear()`，确保一定被清除

4. **同时显示多个 Toast**：
   - 页面同时只能显示一个 Toast，新的 Toast 会自动替换旧的
   - 如果需要连续显示多个提示，需要注意时序，避免后一个提示覆盖前一个

5. **自定义内容**：
   - 支持 JSX 作为提示内容，可以自定义复杂的提示样式
   - 自定义内容时注意控制内容大小，避免遮挡过多屏幕空间
   - 推荐提示文字不超过 20 个字，保持简洁

6. **与 Dialog 的区别**：
   - Toast：轻量级提示，自动消失，不需要用户交互
   - Dialog：重量级弹窗，需要用户主动操作（确认/取消）

## 相关组件

- **Dialog** - 需要用户交互的模态弹窗
- **Mask** - 遮罩层组件
- **Loading** - 加载动画组件
