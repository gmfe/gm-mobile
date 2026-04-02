# FormScrollIntoView

## 简介
表单滚动定位组件 - 解决安卓端唤起键盘后输入框被遮挡的问题，在输入框获取焦点时自动将输入框滚动到可视区域内。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { FormScrollIntoView } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 需要包裹的表单输入元素（只能有一个子元素） | `ReactElement` | - | 是 |

## 示例

### 基础用法

```jsx
import { useState } from 'react'
import { FormScrollIntoView } from '@gm-mobile/react'

const App = () => {
  const [value, setValue] = useState('')

  return (
    <>
      <div style={{ height: '450px' }}>空白处...</div>
      <FormScrollIntoView>
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="请输入"
        />
      </FormScrollIntoView>
    </>
  )
}
```

## 注意事项
- 组件仅接受单个子元素，子元素应该是带有 `onFocus` 属性的表单控件
- 该组件只在非 iOS 设备上生效，因为 iOS 端浏览器通常会自动处理键盘遮挡问题
- 组件通过 `cloneElement` 给子元素注入 `onFocus` 事件处理，会在原有 `onFocus` 回调之后执行滚动逻辑
- 滚动操作有 500ms 的延迟，以等待键盘完全弹出后再执行滚动
- 组件内部使用了 `scrollIntoViewIfNeeded` 方法来确保输入框在可视区域内
