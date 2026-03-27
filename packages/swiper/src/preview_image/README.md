# PreviewImage

## 简介
图片预览组件 - 全屏图片预览组件，支持单张和多张图片的滑动浏览，适用于商品详情、相册查看等场景

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| images | 图片数组，每个元素包含 img（图片URL）和 onClick（点击回调）属性 | array | - | 是 |
| onHide | 关闭预览的回调函数 | function | _.noop | 否 |
| defaultIndex | 多张图片预览时，默认显示的图片索引 | number | 0 | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### 方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| PreviewImage.render | 静态方法，全屏渲染图片预览组件 | options (object) - 包含 images、defaultIndex、onHide 等属性 | void |
| PreviewImage.hide | 静态方法，隐藏当前显示的图片预览 | 无 | void |

## 示例

### 基础用法

```jsx
import { PreviewImage } from '@gm-mobile/swiper'

// 单张图片预览
PreviewImage.render({
  images: [
    {
      img: 'https://example.com/image1.jpg'
    }
  ]
})

// 多张图片预览
PreviewImage.render({
  images: [
    {
      img: 'https://example.com/image1.jpg'
    },
    {
      img: 'https://example.com/image2.jpg'
    },
    {
      img: 'https://example.com/image3.jpg'
    }
  ],
  defaultIndex: 1
})
```

### 常见用法

```jsx
import { PreviewImage } from '@gm-mobile/swiper'

// 带关闭回调的预览
PreviewImage.render({
  images: [
    {
      img: 'https://example.com/image1.jpg',
      onClick: () => {
        console.log('图片被点击')
      }
    }
  ],
  onHide: () => {
    console.log('预览已关闭')
  }
})

// 点击图片缩略图触发预览
const handleImageClick = (imageList, currentIndex) => {
  PreviewImage.render({
    images: imageList,
    defaultIndex: currentIndex
  })
}

// 在组件中使用
<div>
  {images.map((image, index) => (
    <img
      key={index}
      src={image.img}
      onClick={() => handleImageClick(images, index)}
    />
  ))}
</div>
```

### 高级用法

```jsx
import { PreviewImage } from '@gm-mobile/swiper'

// 手动控制预览的显示和隐藏
const showPreview = () => {
  PreviewImage.render({
    images: imageList,
    defaultIndex: 0,
    onHide: () => {
      console.log('用户关闭了预览')
    }
  })
}

const hidePreview = () => {
  PreviewImage.hide()
}

// 结合业务场景
const ProductImageGallery = ({ images }) => {
  return (
    <div>
      {images.map((image, index) => (
        <div
          key={index}
          className="thumbnail"
          onClick={() => {
            PreviewImage.render({
              images: images.map(img => ({
                img: img.url,
                onClick: () => {
                  // 图片点击事件
                  console.log('点击了图片:', img.url)
                }
              })),
              defaultIndex: index
            })
          }}
        >
          <img src={image.thumbnail} alt={`商品图片 ${index + 1}`} />
        </div>
      ))}
    </div>
  )
}
```

## 注意事项

- 组件使用 `LayoutRoot.renderWith()` 渲染到 POPUP 层，确保在应用中已正确配置 LayoutRoot
- `images` 数组中的每个元素必须包含 `img` 属性（图片 URL）
- `onClick` 是可选的，用于在预览时点击图片的回调处理
- 多张图片预览时，支持滑动切换和当前页码显示（格式：当前页/总页数）
- 点击预览区域背景会自动关闭预览（触发 `onHide` 回调）
- 单张图片预览时不显示页码计数器
- `PreviewImage.render()` 是静态方法，不需要实例化组件即可使用
- 确保 images 数组不为空，否则会导致组件异常

## 相关组件

- [SwiperImg](../swiper_img/) - 图片轮播组件
- [SwiperCategory](../swiper_category/) - 分类轮播组件
