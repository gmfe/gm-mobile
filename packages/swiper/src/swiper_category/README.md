# SwiperCategory

## 简介
分类轮播组件 - 用于展示分类导航的轮播容器，支持自定义内容和滑动交互，适用于分类菜单、导航选项等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| options | Swiper 配置对象，用于自定义轮播行为（如 autoplay、speed 等） | object | - | 否 |
| className | 自定义类名，用于添加额外的样式类 | string | - | 否 |
| style | 自定义内联样式 | object | - | 否 |
| children | 轮播内容，每个直接子元素会成为一个滑动页面 | node | - | 是 |

## 示例

### 基础用法
```jsx
import { SwiperCategory } from '@gm-mobile/react'

<SwiperCategory>
  <div>
    <div onClick={() => console.log('点击收藏')}>我的收藏</div>
    <div onClick={() => console.log('点击蔬菜')}>蔬菜</div>
    <div onClick={() => console.log('点击肉类')}>肉类</div>
  </div>
  <div>
    <div onClick={() => console.log('点击冻品')}>冻品</div>
    <div onClick={() => console.log('点击水果')}>水果</div>
  </div>
</SwiperCategory>
```

### 自定义轮播配置
```jsx
import { SwiperCategory } from '@gm-mobile/react'

<SwiperCategory
  options={{
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    speed: 500,
  }}
>
  <div>
    <div>分类1</div>
    <div>分类2</div>
  </div>
  <div>
    <div>分类3</div>
    <div>分类4</div>
  </div>
</SwiperCategory>
```

### 自定义样式
```jsx
import { SwiperCategory } from '@gm-mobile/react'

<SwiperCategory
  className="custom-category"
  style={{ height: '200px' }}
>
  <div style={{ background: '#f5f5f5' }}>
    <div>首页</div>
    <div>分类</div>
    <div>购物车</div>
  </div>
  <div style={{ background: '#e8e8e8' }}>
    <div>我的</div>
    <div>设置</div>
  </div>
</SwiperCategory>
```

## 注意事项
- 组件基于 Swiper 库实现，options 支持所有 Swiper 的配置选项
- 当只有一个子元素时，不会显示分页器
- 每个 slide 内可以包含多个交互元素，支持点击等事件
- 默认开启循环模式（loop: true）
- 确保已正确引入 Swiper 的样式文件

## 相关组件
- [SwiperImg](../swiper_img/README.md) - 图片轮播组件
- [PreviewImage](../preview_image/README.md) - 图片预览组件
