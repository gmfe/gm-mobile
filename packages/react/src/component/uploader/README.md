# Uploader

## 简介
文件上传组件 - 提供文件选择和上传触发功能，支持自定义触发区域和拖拽上传。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Uploader } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onUpload | 文件选择后回调 | `(files: UploaderFile[], e?: ChangeEvent \| DragEvent) => void` | - | 是 |
| accept | 接受的文件类型（MIME type） | `string` | - | 否 |
| multiple | 是否支持多选 | `boolean` | `false` | 否 |
| children | 自定义触发区域（不传则使用默认加号图标） | `ReactNode` | - | 否 |

继承 `HTMLAttributes<HTMLDivElement>` 的所有属性。

### UploaderFile

| 字段 | 说明 | 类型 |
|------|------|------|
| preview | 文件预览 URL（通过 `URL.createObjectURL` 生成） | `string` |

继承 `File` 的所有属性。

## 示例

### 默认样式

```jsx
import { Uploader } from '@gm-mobile/react'

const App = () => {
  const handleUpload = (files) => {
    console.log('选择的文件：', files)
  }

  return <Uploader onUpload={handleUpload} accept="image/*" />
}
```

### 自定义触发区域

```jsx
import { Uploader } from '@gm-mobile/react'

const App = () => {
  return (
    <Uploader onUpload={(files) => console.log(files)} accept="image/*">
      <div className="m-uploader-custom">
        点击上传图片
      </div>
    </Uploader>
  )
}
```

### 多选上传

```jsx
import { Uploader } from '@gm-mobile/react'

const App = () => {
  return (
    <Uploader
      onUpload={(files) => console.log(files)}
      accept="image/*"
      multiple
    />
  )
}
```

## 注意事项
- 微信环境中 `multiple` 属性会强制设为 `false`，微信不支持多选
- 每次选择文件前会自动清空上一次的选择，确保同一文件可以重复选择
- `onUpload` 回调中的 `files` 参数包含 `preview` 属性，可直接用于图片预览
- 默认触发区域显示加号图标，传入 `children` 可完全自定义触发区域的样式和内容
