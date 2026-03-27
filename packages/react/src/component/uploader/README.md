# Uploader

## 简介
上传组件 - 用于文件上传的基础组件，支持点击上传和自定义上传按钮，适用于图片、文档等各类文件上传场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| multiple | 是否支持多文件上传 | boolean | false | 否 |
| onUpload | 文件上传后的回调函数，接收参数：(files, event) | function | - | 是 |
| accept | 接受的文件类型，如 'image/*'、'.pdf' 等 | string | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 自定义上传按钮内容 | ReactNode | - | 否 |

## 示例

### 基础用法
```jsx
import { Uploader } from '@gm-mobile/react'

function App() {
  const handleUpload = (files) => {
    console.log('上传的文件：', files)
    // files[0].preview 可以直接用于图片预览
  }

  return (
    <Uploader onUpload={handleUpload} accept='image/*' />
  )
}
```

### 自定义上传按钮
```jsx
import { Uploader } from '@gm-mobile/react'

function App() {
  const handleUpload = (files) => {
    console.log('上传的文件：', files)
  }

  return (
    <Uploader onUpload={handleUpload}>
      <button className='btn'>点击上传</button>
    </Uploader>
  )
}
```

### 多文件上传
```jsx
import { Uploader } from '@gm-mobile/react'

function App() {
  const handleUpload = (files) => {
    console.log(`上传了 ${files.length} 个文件`)
    files.forEach(file => {
      console.log(file.name, file.preview)
    })
  }

  return (
    <Uploader
      onUpload={handleUpload}
      multiple
      accept='image/*'
    />
  )
}
```

### 图片预览
```jsx
import { Uploader } from '@gm-mobile/react'
import { useState } from 'react'

function App() {
  const [preview, setPreview] = useState(null)

  const handleUpload = (files) => {
    // 组件自动生成了 preview 属性
    setPreview(files[0].preview)
  }

  return (
    <div>
      <Uploader onUpload={handleUpload} accept='image/*' />

      {preview && (
        <div>
          <img src={preview} alt='预览' style={{ maxWidth: '100%' }} />
        </div>
      )}
    </div>
  )
}
```

### 上传文档
```jsx
import { Uploader } from '@gm-mobile/react'

function App() {
  const handleUpload = (files) => {
    console.log('上传的文档：', files[0].name)
    // 在这里调用文件上传接口
  }

  return (
    <Uploader onUpload={handleUpload} accept='.pdf,.doc,.docx' />
  )
}
```

## 注意事项
- onUpload 回调函数中，每个文件对象都会自动添加 preview 属性，可直接用于图片预览
- 在微信环境下，multiple 属性会强制禁用（微信不支持多文件上传）
- 每次点击上传前会自动清空上一次的选择，确保同一文件可以重复选择
- accept 属性的值遵循 HTML input 的 accept 规范，如 'image/*'、'.pdf'、'image/png' 等
- 如需实现拖拽上传，需要自行处理拖拽事件，本组件仅支持点击上传
- 预览 URL 使用的是 blob 协议，页面卸载时会自动失效，无需手动释放
