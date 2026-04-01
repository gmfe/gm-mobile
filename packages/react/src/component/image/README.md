# Image

## 简介

Image 图片组件 - 增强的图片组件，支持占位图、错误处理、自动重试、多种填充模式和圆形展示，适用于头像、商品图、展示图等多种场景。

## API

### Image Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| src | 图片地址 | string | - | 否 |
| width | 图片宽度 | number | - | 否 |
| height | 图片高度 | number | - | 否 |
| round | 是否为圆形 | boolean | false | 否 |
| objectFix | 图片填充模式 | oneOf(['contain', 'cover', 'fill', 'none', 'scale-down']) | 'fill' | 否 |
| placeholder | 默认占位图地址 | string | 内置占位图 | 否 |
| error | 加载出错占位图 | string | 内置错误图 | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Image } from '@gm-mobile/react'

// 基础图片显示
<Image width={100} src='https://example.com/image.png' />

// 设置宽高
<Image
  width={100}
  height={100}
  src='https://example.com/avatar.png'
/>
```

### 圆形图片

```jsx
import { Image } from '@gm-mobile/react'

// 圆形头像
<Image
  round
  width={80}
  height={80}
  src='https://example.com/avatar.png'
  className='m-border'
/>
```

### 填充模式

```jsx
import { Image } from '@gm-mobile/react'

// fill - 拉伸填充（默认）
<Image
  objectFix='fill'
  src='https://example.com/image.png'
  style={{ width: '200px', height: '100px' }}
/>

// contain - 等比缩放，完整显示
<Image
  objectFix='contain'
  src='https://example.com/image.png'
  style={{ width: '200px', height: '100px' }}
/>

// cover - 等比缩放，填满容器
<Image
  objectFix='cover'
  src='https://example.com/image.png'
  style={{ width: '200px', height: '100px' }}
/>

// none - 不缩放，原始尺寸
<Image
  objectFix='none'
  src='https://example.com/image.png'
  style={{ width: '200px', height: '100px' }}
/>

// scale-down - 等比缩小，不放大
<Image
  objectFix='scale-down'
  src='https://example.com/image.png'
  style={{ width: '200px', height: '100px' }}
/>
```

### 错误处理

```jsx
import { Image } from '@gm-mobile/react'

// 加载失败自动显示错误占位图
<Image
  width={100}
  height={100}
  src='https://example.com/not-exist.png'
/>

// 自定义错误占位图
<Image
  width={100}
  height={100}
  src='https://example.com/not-exist.png'
  error='https://example.com/custom-error.png'
/>
```

### 高级用法

```jsx
import { Image } from '@gm-mobile/react'

// 自定义占位图
<Image
  width={200}
  height={200}
  src='https://example.com/image.png'
  placeholder='https://example.com/custom-placeholder.png'
/>

// 结合样式使用
<Image
  round
  width={60}
  height={60}
  src='https://example.com/avatar.png'
  style={{ border: '2px solid #1890ff' }}
/>

// 多图展示
<div style={{ display: 'flex', gap: '10px' }}>
  <Image width={80} height={80} src='image1.png' />
  <Image width={80} height={80} src='image2.png' />
  <Image width={80} height={80} src='image3.png' />
</div>
```

## 注意事项

1. **自动重试机制**：
   - 组件内置了自动重试机制，图片加载失败时会自动重试 2 次
   - 每次重试间隔 200ms，避免网络抖动导致的加载失败
   - 重试失败后会显示错误占位图（内置或自定义）

2. **objectFill 填充模式选择**：
   - `fill`（默认）：拉伸图片填满容器，可能导致图片变形
   - `contain`：等比缩放，完整显示图片，可能会有留白
   - `cover`：等比缩放，填满容器，可能裁剪图片
   - `none`：不缩放，保持原始尺寸
   - `scale-down`：等比缩小但不放大，类似 contain 的效果
   - 根据实际场景选择合适的模式，头像推荐使用 `cover` + `round`

3. **圆形图片**：
   - 设置 `round` 属性后，图片会显示为圆形
   - 建议同时设置相等的 `width` 和 `height` 以获得最佳效果
   - 常用于用户头像展示

4. **占位图**：
   - 组件内置了默认的占位图和错误图
   - 可以通过 `placeholder` 和 `error` 属性自定义占位图
   - 占位图在图片加载前或加载失败时显示

5. **样式控制**：
   - 优先使用 `width` 和 `height` 属性控制尺寸
   - 复杂样式使用 `style` 对象传入
   - 类名定制使用 `className` 属性
   - 支持所有原生 img 标签的其他属性（如 alt、onClick 等）

## 相关组件

- **Uploader** - 图片上传组件，常与 Image 配合使用
- **Avatar** - 头像组件（如果存在）
