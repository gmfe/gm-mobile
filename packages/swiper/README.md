# @gm-mobile/swiper

## 简介

@gm-mobile/swiper 是基于 Swiper 库封装的轮播组件包，提供了多个轮播场景的解决方案，包括图片轮播、分类导航和图片预览等功能。

## 安装

```bash
npm install @gm-mobile/swiper
# 或
yarn add @gm-mobile/swiper
```

## 包含的组件

### 1. SwiperImg
图片轮播组件，支持自动播放、循环滚动、图片懒加载等功能。

- **适用场景**：商品展示、广告轮播、Banner 轮播
- **主要功能**：
  - 自动播放和循环模式
  - 图片懒加载
  - 分页器指示
  - 点击事件回调
- **详细文档**：[SwiperImg README](src/swiper_img/README.md)

### 2. SwiperCategory
分类轮播组件，用于展示分类导航的轮播容器。

- **适用场景**：分类菜单、导航选项、标签页
- **主要功能**：
  - 自定义轮播内容
  - 支持多个分类页
  - 滑动交互
  - Swiper 配置定制
- **详细文档**：[SwiperCategory README](src/swiper_category/README.md)

### 3. PreviewImage
图片预览组件，支持单张和多张图片的全屏预览。

- **适用场景**：商品详情、相册查看、图片浏览
- **主要功能**：
  - 全屏图片预览
  - 多图滑动切换
  - 页码显示
  - 静态方法调用
- **详细文档**：[PreviewImage README](src/preview_image/README.md)

## 使用示例

### 引入样式

在使用组件前，需要先引入 Swiper 的样式文件：

```jsx
import 'swiper/css/swiper.css'
```

### 基础用法

```jsx
import { SwiperImg, SwiperCategory, PreviewImage } from '@gm-mobile/swiper'
import 'swiper/css/swiper.css'

// 图片轮播
const imageData = [
  { img: 'https://example.com/image1.jpg' },
  { img: 'https://example.com/image2.jpg' },
]

<SwiperImg data={imageData} />

// 分类轮播
<SwiperCategory>
  <div>
    <div>分类1</div>
    <div>分类2</div>
  </div>
  <div>
    <div>分类3</div>
    <div>分类4</div>
  </div>
</SwiperCategory>

// 图片预览
PreviewImage.render({
  images: [
    { img: 'https://example.com/image1.jpg' },
    { img: 'https://example.com/image2.jpg' },
  ],
  defaultIndex: 0,
})
```

## 开发依赖

- **React**: ^16.13.1
- **Swiper**: ^5.3.8
- **@gm-mobile/react**: ^1.1.11

## 相关包

- [@gm-mobile/react](../react/README.md) - 基础组件库
- [@gm-mobile/business](../business/README.md) - 业务组件库
- [@gm-mobile/service_time](../service_time/README.md) - 服务时间组件库

## 快速链接

- [SwiperImg 组件文档](src/swiper_img/README.md)
- [SwiperCategory 组件文档](src/swiper_category/README.md)
- [PreviewImage 组件文档](src/preview_image/README.md)

## 许可证

ISC

---

**版本**: v1.1.12
**最后更新**: 2026-03-27
