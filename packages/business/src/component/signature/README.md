# Signature

## 简介
电子签名组件 - 支持手写签名、查看已签名图片和重新签名，适用于签收、确认等需要电子签名的业务场景。组件会自动在查看模式和编辑模式之间切换。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| output | 输出类型，支持 base64 字符串或 blob 对象 | oneOf(['base64', 'blob']) | 'base64' | 否 |
| image | 已有的签名图片 URL，不传则直接进入编辑模式 | string | - | 否 |
| onSave | 保存签名的回调函数，接收签名数据（base64 字符串或 blob 对象） | function | - | 是 |
| disabledEdit | 是否禁止修改签名 | boolean | false | 否 |
| isEdit | 存在 image 时，是否直接进入编辑状态。Edit 场景按钮文案为'确定签收'，View 场景按钮文案为'保存' | boolean | false | 否 |

## 示例

### 基础用法 - 查看已有签名
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  const handleSave = (data) => {
    // data 是 base64 字符串或 blob 对象，取决于 output 属性
    console.log('签名数据:', data)
  }

  return (
    <Signature
      image="https://image.document.guanmai.cn/product_img/1588907508246-058712363353500274.png"
      onSave={handleSave}
    />
  )
}
```

### 直接进入签名模式
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  return (
    <Signature
      isEdit
      output="blob"
      onSave={(blob) => {
        // 处理 blob 格式的签名数据
        console.log('签名 Blob:', blob)
      }}
    />
  )
}
```

### 首次签名（无初始图片）
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  return (
    <Signature
      onSave={(base64) => {
        // 处理 base64 格式的签名数据
        console.log('签名 Base64:', base64)
      }}
    />
  )
}
```

### 禁止修改签名
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  return (
    <Signature
      image="https://example.com/signature.png"
      disabledEdit
      onSave={() => {
        // disabledEdit 为 true 时，不会触发 onSave
      }}
    />
  )
}
```

### 输出为 Blob 对象
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  const handleSave = async (blob) => {
    // 将 blob 转换为文件或上传到服务器
    const file = new File([blob], 'signature.png', { type: 'image/png' })

    // 示例：使用 FormData 上传
    const formData = new FormData()
    formData.append('signature', file)

    // await uploadSignature(formData)
    console.log('文件对象:', file)
  }

  return (
    <Signature
      output="blob"
      image="https://example.com/signature.png"
      onSave={handleSave}
    />
  )
}
```

### 确认签收场景
```jsx
import { Signature } from '@gm-mobile/react'

function App() {
  return (
    <Signature
      isEdit
      onSave={(data) => {
        console.log('确认签收，签名数据:', data)
        // 提交签收信息到后端
      }}
    />
  )
}
```

## 注意事项
- 组件内部会自动管理查看模式和编辑模式的切换，无需手动控制
- 当 `image` 不传时，会直接进入编辑模式
- 当 `image` 存在时，默认先显示查看模式，点击"修改签名"按钮进入编辑模式
- 当 `isEdit=true` 且 `image` 存在时，会直接进入编辑模式，按钮文案为"确定签收"
- 当 `isEdit=false` 且 `image` 存在时，从查看模式进入编辑模式，按钮文案为"保存"
- `disabledEdit=true` 时，查看模式下不显示"修改签名"按钮，签名不可修改
- 编辑模式下，Canvas 会自适应屏幕宽度，高度为屏幕高度减去底部按钮区域高度
- 在编辑模式下，组件会阻止 iOS 的橡皮筋滚动效果，保证签名体验
- `output="base64"` 时，`onSave` 接收 base64 字符串（以 `data:image/png;base64,` 开头）
- `output="blob"` 时，`onSave` 接收 Blob 对象（type 为 'image/png'），适合文件上传场景
- 确保在 `onSave` 回调中正确处理签名数据（保存到状态、上传服务器等）
