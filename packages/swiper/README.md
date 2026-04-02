# @gm-mobile/swiper

## 简介
轮播图组件包 - 基于 Swiper.js 封装的移动端轮播组件，提供图片轮播、分类轮播和图片预览功能。

## 安装

```bash
npm install @gm-mobile/swiper
```

### peerDependencies

```json
{
  "react": "^16.13.1",
  "react-dom": "^16.13.1",
  "swiper": "^5.3.8"
}
```

## 使用

### 快速开始

```jsx
import { SwiperImg } from '@gm-mobile/swiper'

const data = [
  { img: 'https://example.com/banner1.png' },
  { img: 'https://example.com/banner2.png' },
]

<SwiperImg data={data} />
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `SwiperImg` | 组件 | 图片轮播组件 |
| `SwiperCategory` | 组件 | 分类轮播组件 |
| `PreviewImage` | 组件 | 图片预览组件（支持静态方法） |

### SwiperImg Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 轮播数据，`[{ img, onClick? }]` | `array` | - | 是 |
| options | Swiper 配置项 | `SwiperOptions` | - | 否 |

### SwiperCategory Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | Swiper 配置项 | `SwiperOptions` | - | 否 |

### PreviewImage Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| images | 图片数组 `[{ img, onClick? }]` | `array` | - | 是 |
| onHide | 关闭预览回调 | `() => void` | - | 否 |
| defaultIndex | 默认预览的图片下标 | `number` | - | 否 |

### PreviewImage 静态方法

| 方法 | 说明 | 参数 |
|------|------|------|
| `PreviewImage.render(options)` | 打开图片预览 | `PreviewImageProps` |
| `PreviewImage.hide()` | 关闭图片预览 | - |

## 示例

### 图片轮播

```jsx
import { SwiperImg } from '@gm-mobile/swiper'

const data = [
  { img: 'https://example.com/1.png' },
  { img: 'https://example.com/2.png' },
]

const App = () => {
  return <SwiperImg data={data} options={{ autoplay: true }} />
}
```

### 图片预览

```jsx
import { PreviewImage } from '@gm-mobile/swiper'

const images = [
  { img: 'https://example.com/1.png' },
  { img: 'https://example.com/2.png' },
]

const App = () => {
  return (
    <div>
      <button onClick={() => PreviewImage.render({ images })}>预览图片</button>
    </div>
  )
}
```

## 注意事项
- 依赖 `swiper@^5.3.8`，请确保安装了正确版本
- `SwiperImg` 的 `options` 支持所有 Swiper.js 原生配置
- 组件会自动引入 `swiper/css/swiper.css` 样式文件

## 相关包
- [@gm-mobile/react](../react) - 主组件库
