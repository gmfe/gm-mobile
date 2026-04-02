# Canvas

## 简介
画板组件 - 提供手写签名/绘画功能的 Canvas 画板，支持背景图绘制和导出。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Canvas } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| width | 画布宽度 | `number` | - | 是 |
| height | 画布高度 | `number` | - | 是 |
| background | 背景图片地址 | `string` | - | 否 |

### Ref 方法

通过 `ref` 可以调用以下方法：

| 方法 | 说明 | 类型 |
|------|------|------|
| reset | 重置画布（清除绘制内容，恢复背景图） | `() => void` |
| toBlob | 将画布内容导出为 Blob 对象 | `(callback: BlobCallback, type?: string, encoderOptions?: any) => void` |
| toDataURL | 将画布内容导出为 Data URL | `(type?: string, quality?: any) => string` |

### Types

```ts
interface CanvasProps {
    /** 背景 */
    background?: string
    width: number
    height: number
}

interface CanvasRef {
    reset: () => void
    toBlob: (
        callback: BlobCallback,
        type?: string | undefined,
        encoderOptions?: any
    ) => void
    toDataURL: (type?: string | undefined, quality?: any) => string
}
```

## 示例

### 基础用法

```jsx
import { useRef } from 'react'
import { Canvas } from '@gm-mobile/react'

const App = () => {
  const canvasRef = useRef(null)

  return (
    <div>
      <Canvas ref={canvasRef} width={400} height={600} />
      <button onClick={() => canvasRef.current?.reset()}>重置</button>
      <button
        onClick={() => {
          const dataURL = canvasRef.current?.toDataURL('image/png')
          console.log(dataURL)
        }}
      >
        导出图片
      </button>
    </div>
  )
}
```

### 带背景图

```jsx
import { useRef } from 'react'
import { Canvas } from '@gm-mobile/react'

const App = () => {
  const canvasRef = useRef(null)

  return (
    <Canvas
      ref={canvasRef}
      width={400}
      height={600}
      background="https://example.com/background.png"
    />
  )
}
```

## 注意事项
- 组件同时支持触摸事件和鼠标事件，在移动端使用 `touch` 事件，在桌面端使用 `mouse` 事件
- 通过 `background` 属性设置的背景图会以 `contain` 模式（保持比例居中）绘制在画布上
- 调用 `toBlob` 或 `toDataURL` 可以获取画布内容，用于上传或保存签名图片
- 如果浏览器不支持 Canvas，组件会显示提示文案"对不起，当前浏览器暂不支持此功能！"
- 背景图片加载使用 `crossOrigin="Anonymous"` 属性，确保跨域图片可以正常绘制和导出
