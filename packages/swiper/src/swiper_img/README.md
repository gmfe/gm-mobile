# SwiperImg

## 简介
图片轮播组件 - 基于 Swiper 库实现，支持自动播放、循环滚动、图片懒加载等功能，适用于商品展示、广告轮播等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| data | 轮播图片数据数组，每个元素包含 img（图片地址，必填）和 onClick（点击回调，可选） | array | - | 是 |
| options | Swiper 配置项，用于覆盖默认配置（默认已配置 loop、autoplay、lazy、pagination） | object | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**data 数据结构：**
```typescript
{
  img: string  // 图片地址，必填
  onClick?: (item: any) => void  // 点击回调函数，可选
  [key: string]: any  // 其他自定义字段
}
```

**默认配置：**
组件已默认配置以下 Swiper 选项，可通过 options 覆盖：
- `loop: true` - 循环播放
- `autoplay: true` - 自动播放
- `disableOnInteraction: false` - 用户操作后继续自动播放
- `lazy.loadPrevNext: true` - 懒加载前后图片
- `pagination.el: '.swiper-pagination'` - 显示分页器

## 示例

### 基础用法
```jsx
import { SwiperImg } from '@gm-mobile/react'

const imageData = [
  {
    onClick: (item) => {
      console.log('点击了第1张图片', item)
    },
    img: 'https://img.guanmai.cn/station_pic/sha1_eb0e548b7a574fcb3069a91a1dd816a1d8dddef8.jpg',
  },
  {
    img: 'https://img.guanmai.cn/station_pic/sha1_6f6bd1497f8e5c1db37593110af99437589a570f.jpg',
  },
  {
    img: 'https://img.guanmai.cn/station_pic/sha1_d9600fa7ed07af43313992501128e7cbd13f6b58.jpg',
  },
]

<SwiperImg data={imageData} />
```

### 自定义配置
```jsx
import { SwiperImg } from '@gm-mobile/react'

const imageData = [
  {
    onClick: () => console.log('点击图片'),
    img: 'https://img.guanmai.cn/station_pic/xxx.jpg',
  },
]

// 自定义 Swiper 配置
const swiperOptions = {
  autoplay: {
    delay: 3000, // 自动播放间隔 3 秒
  },
  loop: false, // 关闭循环播放
  pagination: {
    clickable: true, // 分页器可点击
  },
}

<SwiperImg data={imageData} options={swiperOptions} />
```

### 自定义样式
```jsx
import { SwiperImg } from '@gm-mobile/react'

const imageData = [
  {
    img: 'https://img.guanmai.cn/station_pic/xxx.jpg',
  },
]

const customStyle = {
  height: '200px',
  borderRadius: '8px',
}

<SwiperImg
  data={imageData}
  className="my-custom-swiper"
  style={customStyle}
/>
```

## 注意事项
- 必须确保已引入 Swiper 的样式文件：`import 'swiper/css/swiper.css'`
- data 数组中每个对象必须包含 `img` 字段（图片地址）
- 在 loop 模式下（默认开启），点击事件已做特殊处理，可正常触发 onClick 回调
- 图片懒加载功能默认开启，有利于提升性能
- 如需关闭自动播放或修改播放间隔，请通过 options 配置 `autoplay` 属性

## 相关组件
- [PreviewImage](../preview_image/README.md) - 图片预览组件
- [SwiperCategory](../swiper_category/README.md) - 分类轮播组件
