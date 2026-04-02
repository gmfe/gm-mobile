# Image

## 简介
图片组件 - 增强的图片组件，支持占位图、加载失败自动重试、圆形裁剪和多种填充模式。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import { Image } from '@gm-mobile/react'
```

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| src | 图片地址 | `string` | - | 否 |
| height | 图片高度 | `number` | - | 否 |
| width | 图片宽度 | `number` | - | 否 |
| round | 是否为圆形 | `boolean` | `false` | 否 |
| objectFix | 填充模式 | `'contain' \| 'cover' \| 'fill' \| 'none' \| 'scale-down'` | `'fill'` | 否 |
| placeholder | 默认占位图地址 | `string` | 内置占位图 | 否 |
| error | 加载出错占位图 | `string` | 内置错误图 | 否 |

继承 `HTMLAttributes<HTMLImageElement>` 的所有属性。

## 示例

### 基础用法

```jsx
import { Image } from '@gm-mobile/react'

const App = () => {
  return <Image width={100} src="https://example.com/photo.png" />
}
```

### 圆形图片

```jsx
import { Image } from '@gm-mobile/react'

const App = () => {
  return <Image round width={80} height={80} src="https://example.com/avatar.png" />
}
```

### 填充模式

```jsx
import { Image } from '@gm-mobile/react'

const App = () => {
  return (
    <div>
      <Image objectFix="contain" src={src} style={{ width: 100, height: 200 }} />
      <Image objectFix="cover" src={src} style={{ width: 100, height: 200 }} />
      <Image objectFix="fill" src={src} style={{ width: 100, height: 200 }} />
    </div>
  )
}
```

### 错误重试

```jsx
import { Image } from '@gm-mobile/react'

const App = () => {
  return <Image width={100} height={100} src="invalid-url" />
}
```

## 注意事项
- 图片加载失败后会自动重试最多 2 次，每次间隔 200ms
- 重试 2 次仍失败后会显示错误占位图
- `ImageWrapper`（默认导出）会给 `Image` 添加 `key={props.src}`，确保 `src` 变化时重新渲染
- 微信环境中 `Image` 导入使用 `ImageWrapper` 自动处理 key，直接使用 `Image` 即可
