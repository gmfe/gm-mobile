# Canvas

## 简介

Canvas 画布组件 - 提供手写签名、绘图功能的画布组件，支持设置背景图片，兼容移动端触摸和 PC 端鼠标操作，可用于电子签名、手写板等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| background | 画布背景图片 URL | string | - | 否 |
| width | 画布宽度（像素） | number | - | 是 |
| height | 画布高度（像素） | number | - | 是 |

### 方法

通过 ref 可以调用以下方法：

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| reset | 重置画布，清除所有绘制内容并恢复背景图 | - | - |
| toBlob | 将画布内容转换为 Blob 对象 | callback: 回调函数<br/>type: 图片类型（如 'image/png'）<br/>encoderOptions: 图片质量（0-1） | - |
| toDataURL | 将画布内容转换为 Data URL | type: 图片类型（如 'image/png'）<br/>encoderOptions: 图片质量（0-1） | string（base64 格式的图片数据） |

## 示例

### 基础用法

```jsx
import { Canvas } from '@gm-mobile/react'
import { useRef } from 'react'

const App = () => {
  const canvasRef = useRef(null)

  const handleClear = () => {
    canvasRef.current.reset()
  }

  const handleSave = () => {
    const dataURL = canvasRef.current.toDataURL('image/png')
    console.log(dataURL) // 输出 base64 格式的图片数据
  }

  return (
    <div>
      <Canvas ref={canvasRef} width={400} height={600} />
      <button onClick={handleClear}>清除</button>
      <button onClick={handleSave}>保存</button>
    </div>
  )
}
```

### 带背景图的画布

```jsx
import { Canvas } from '@gm-mobile/react'
import { useRef } from 'react'

const App = () => {
  const canvasRef = useRef(null)

  return (
    <Canvas
      ref={canvasRef}
      width={400}
      height={600}
      background="https://example.com/background-image.jpg"
    />
  )
}
```

### 电子签名场景

```jsx
import { Canvas } from '@gm-mobile/react'
import { useRef, useState } from 'react'

const SignaturePad = () => {
  const canvasRef = useRef(null)
  const [signatureImage, setSignatureImage] = useState('')

  const handleClear = () => {
    canvasRef.current.reset()
    setSignatureImage('')
  }

  const handleSave = () => {
    // 获取签名的 base64 数据
    const dataURL = canvasRef.current.toDataURL('image/png')
    setSignatureImage(dataURL)

    // 或者转换为 Blob 用于上传
    canvasRef.current.toBlob((blob) => {
      console.log('签名 Blob:', blob)
      // 这里可以上传到服务器
      // formData.append('signature', blob)
    }, 'image/png')
  }

  return (
    <div>
      <h3>请签名</h3>
      <Canvas
        ref={canvasRef}
        width={400}
        height={200}
      />
      <div style={{ marginTop: '10px' }}>
        <button onClick={handleClear}>重新签名</button>
        <button onClick={handleSave}>确认签名</button>
      </div>

      {signatureImage && (
        <div style={{ marginTop: '20px' }}>
          <h4>签名预览：</h4>
          <img src={signatureImage} alt="签名" style={{ border: '1px solid #ccc' }} />
        </div>
      )}
    </div>
  )
}
```

### 图片标注场景

```jsx
import { Canvas } from '@gm-mobile/react'
import { useRef } from 'react'

const ImageAnnotation = () => {
  const canvasRef = useRef(null)

  const handleExport = () => {
    // 导出标注后的图片（包含背景图和绘制内容）
    const dataURL = canvasRef.current.toDataURL('image/png', 0.8)

    // 创建下载链接
    const link = document.createElement('a')
    link.download = 'annotated-image.png'
    link.href = dataURL
    link.click()
  }

  return (
    <div>
      <Canvas
        ref={canvasRef}
        width={600}
        height={400}
        background="https://example.com/image-to-annotate.jpg"
      />
      <button onClick={handleExport}>导出图片</button>
    </div>
  )
}
```

## 注意事项

1. **尺寸设置**：
   - `width` 和 `height` 必须明确指定，它们定义了画布的实际像素尺寸
   - 画布尺寸应根据实际使用场景和设备屏幕合理设置
   - 移动端建议使用响应式尺寸，可以通过 CSS 控制显示尺寸

2. **背景图片处理**：
   - 背景图片会按照"contain"模式自适应居中显示，保持宽高比
   - 背景图片需要支持跨域访问（CORS），否则可能无法导出
   - 如果背景图片加载失败，画布仍可正常使用，只是没有背景

3. **方法调用时机**：
   - 通过 ref 调用方法时，确保组件已经挂载完成
   - `toBlob` 和 `toDataURL` 会导出包含背景图和绘制内容的完整图片
   - `reset` 方法会清除所有绘制内容，但会重新加载背景图

4. **兼容性说明**：
   - 组件会自动检测浏览器是否支持 Canvas，不支持时会显示提示信息
   - 同时支持移动端触摸事件和 PC 端鼠标事件
   - 推荐在现代浏览器中使用

5. **导出格式**：
   - `toDataURL` 默认返回 PNG 格式，支持透明背景
   - `toBlob` 适合用于文件上传场景
   - 第二个参数可以控制图片质量（0-1），仅对 JPEG/WebP 格式有效

## 相关组件

- **Uploader** - 配合使用，可以将签名或标注后的图片上传到服务器
- **Dialog** - 可以将签名板放在弹窗中使用
- **Button** - 用于清除、保存等操作按钮
