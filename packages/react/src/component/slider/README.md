# Slider

## 简介
轮播图组件 - 支持触摸滑动和自动播放的轮播图组件，适用于图片轮播、广告展示、商品展示等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| defaultIndex | 默认显示的幻灯片索引（从0开始） | number | 0 | 否 |
| onChange | 幻灯片切换时的回调函数，参数为当前索引 | function | () => {} | 否 |
| flag | 指示器位置：default-底部外部，inner-底部内部，none-不显示 | oneOf(['default', 'inner', 'none']) | default | 否 |
| flagType | 指示器类型：dot-圆点，line-线条 | oneOf(['dot', 'line']) | dot | 否 |
| activeFlagStyle | 激活指示器的自定义样式 | object | - | 否 |
| enableAutoSlide | 是否启用自动播放 | boolean | false | 否 |
| autoSlideTime | 自动播放间隔时间（毫秒） | number | 5000 | 否 |
| slideTimeKey | 自动播放时间同步 key，用于多个轮播实例同步 | string | - | 否 |
| className | 自定义类名 | string | - | 否 |

## 示例

### 基础用法
```jsx
import { Slider } from '@gm-mobile/react'
import './custom.css'

<Slider>
  <div className="slide-item">幻灯片 1</div>
  <div className="slide-item">幻灯片 2</div>
  <div className="slide-item">幻灯片 3</div>
</Slider>
```

### 图片轮播
```jsx
import { Slider } from '@gm-mobile/react'

<Slider>
  <img src="https://example.com/image1.jpg" alt="图片1" />
  <img src="https://example.com/image2.jpg" alt="图片2" />
  <img src="https://example.com/image3.jpg" alt="图片3" />
</Slider>
```

### 自动播放
```jsx
import { Slider } from '@gm-mobile/react'

<Slider
  enableAutoSlide={true}
  autoSlideTime={3000}
  defaultIndex={0}
>
  <div className="slide-item">自动播放 1</div>
  <div className="slide-item">自动播放 2</div>
  <div className="slide-item">自动播放 3</div>
</Slider>
```

### 自定义指示器
```jsx
import { Slider } from '@gm-mobile/react'

<Slider
  flag="inner"
  flagType="line"
  activeFlagStyle={{ backgroundColor: '#ff0000' }}
>
  <div className="slide-item">自定义指示器 1</div>
  <div className="slide-item">自定义指示器 2</div>
  <div className="slide-item">自定义指示器 3</div>
</Slider>
```

### 监听切换事件
```jsx
import { Slider } from '@gm-mobile/react'

function handleChange(index) {
  console.log('当前幻灯片索引：', index)
}

<Slider
  onChange={handleChange}
  defaultIndex={1}
>
  <div className="slide-item">页面 1</div>
  <div className="slide-item">页面 2</div>
  <div className="slide-item">页面 3</div>
</Slider>
```

### 不显示指示器
```jsx
import { Slider } from '@gm-mobile/react'

<Slider flag="none">
  <div className="slide-item">无指示器 1</div>
  <div className="slide-item">无指示器 2</div>
</Slider>
```

## 注意事项
- 每个幻灯片子元素会自动被设置为 100% 宽度，无需手动设置
- 滑动距离超过 50px 才会触发切换，小于该距离会回弹到原位置
- 触摸滑动时会自动暂停自动播放，松开后恢复
- 多个轮播实例使用相同的 slideTimeKey 时，会共享同一个定时器，用于同步多个轮播的自动播放
- 组件会自动监听窗口大小变化并重新计算宽度，支持响应式布局
- 建议为每个幻灯片内容设置固定高度，以保证轮播效果正常

## 相关组件
- 无相关组件
