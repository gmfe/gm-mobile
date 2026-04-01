# Square

## 简介
方形容器组件 - 用于创建一个 1:1 比例的方形容器，常用于图片展示、头像等场景。组件会自动根据宽度计算高度，保持正方形比例。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| className | 自定义类名，用于设置内部容器样式 | string | - | 否 |
| children | 子元素，通常是图片或其他内容 | node | - | 否 |

注意：其他 HTML div 属性（如 style、onClick 等）会透传到内部容器元素上。

## 示例

### 基础用法
```jsx
import { Square } from '@gm-mobile/react'

// 基础方形容器，内部放置图片
<div style={{ width: '50%' }}>
  <Square className='m-bg-white'>
    <img src='https://example.com/image.jpg' style={{ width: '100%', height: '100%' }} alt='' />
  </Square>
</div>
```

### 常见用法

#### 设置不同宽度
```jsx
import { Square } from '@gm-mobile/react'

// 方形容器会根据父容器宽度自动保持 1:1 比例
<div style={{ width: '100px' }}>
  <Square>
    <img src='https://example.com/image.jpg' style={{ width: '100%', height: '100%' }} alt='' />
  </Square>
</div>

<div style={{ width: '50%' }}>
  <Square>
    <img src='https://example.com/image.jpg' style={{ width: '100%', height: '100%' }} alt='' />
  </Square>
</div>
```

#### 添加背景色和圆角
```jsx
import { Square } from '@gm-mobile/react'

<div style={{ width: '50%' }}>
  <Square className='m-bg-primary m-radius'>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#fff' }}>
      方形内容
    </div>
  </Square>
</div>
```

#### 响应式布局
```jsx
import { Square } from '@gm-mobile/react'

// 在 Grid 布局中使用方形容器
<div style={{ display: 'flex', gap: '10px' }}>
  {[1, 2, 3, 4].map((item) => (
    <div key={item} style={{ flex: 1 }}>
      <Square className='m-bg-white'>
        <img src={`https://example.com/image${item}.jpg`} style={{ width: '100%', height: '100%' }} alt='' />
      </Square>
    </div>
  ))}
</div>
```

### 高级用法

#### 懒加载图片
```jsx
import { Square } from '@gm-mobile/react'

<div style={{ width: '50%' }}>
  <Square className='m-bg-gray-light'>
    <img
      src='https://example.com/image.jpg'
      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      alt=''
      loading='lazy'
    />
  </Square>
</div>
```

#### 点击事件
```jsx
import { Square } from '@gm-mobile/react'

const handleClick = () => {
  console.log('Square 被点击')
}

<div style={{ width: '50%' }}>
  <Square onClick={handleClick} className='m-bg-white' style={{ cursor: 'pointer' }}>
    <img src='https://example.com/image.jpg' style={{ width: '100%', height: '100%' }} alt='' />
  </Square>
</div>
```

## 注意事项
- Square 组件本身不设置宽度，需要通过父容器或 style 属性设置宽度
- 组件会自动根据宽度计算高度，始终保持 1:1 的正方形比例
- 图片建议设置 `width: 100%` 和 `height: 100%` 以填满容器
- 如需图片裁剪效果，可以添加 `objectFit: 'cover'` 样式
- className 会添加到内部容器元素（.m-square-inner）上，而不是外层容器
- 组件透传所有 HTML div 属性，可以直接添加 style、onClick 等属性

## 相关组件
- [Layout](../layout-root/) - 根布局容器
- [Flex](../flex/) - 弹性布局组件
