# SliderFlag

## 简介
轮播指示器 - 用于轮播图或滑动场景的指示器组件，显示当前激活位置和总数量，支持圆点和线条两种展示样式。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| type | 指示器类型，可选值为 'dot'（圆点）或 'line'（线条） | oneOf(['dot', 'line']) | 'dot' | 否 |
| flag | 指示器位置，可选值为 'default'（默认）或 'inner'（内部） | oneOf(['default', 'inner']) | 'default' | 否 |
| count | 指示器总数 | number | - | 是 |
| index | 当前激活的索引（从 0 开始） | number | - | 是 |
| activeStyle | 激活状态的样式对象 | object | {} | 否 |

## 示例

### 基础用法
```jsx
import { SliderFlag } from '@gm-mobile/react'

// 圆点指示器（默认）
<SliderFlag count={5} index={0} />

// 线条指示器
<SliderFlag count={5} index={1} type="line" />
```

### 常见用法
```jsx
import { SliderFlag } from '@gm-mobile/react'

// 内部样式指示器
<SliderFlag count={3} index={2} flag="inner" />

// 自定义激活样式
<SliderFlag
  count={4}
  index={1}
  activeStyle={{ backgroundColor: '#ff0000', width: '20px' }}
/>

// 线条内部指示器
<SliderFlag
  count={6}
  index={3}
  type="line"
  flag="inner"
/>
```

### 高级用法
```jsx
import { SliderFlag } from '@gm-mobile/react'
import { useState, useEffect } from 'react'

// 结合轮播图使用
function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalCount = 5

  // 模拟轮播自动切换
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % totalCount)
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <div>
      {/* 轮播内容 */}
      <div className="carousel-content">
        <img src={`image-${currentIndex}.jpg`} alt={`slide ${currentIndex}`} />
      </div>

      {/* 指示器 */}
      <SliderFlag
        count={totalCount}
        index={currentIndex}
        type="dot"
        flag="inner"
      />
    </div>
  )
}
```

## 注意事项
- count 和 index 为必填属性，使用时必须提供
- index 从 0 开始计数，最大值为 count - 1
- 当 type 为 'line' 时，指示器显示为线条样式
- 当 flag 为 'inner' 时，指示器使用内部样式类名
- activeStyle 只会应用到激活状态的指示器上
- 该组件为纯展示组件，不包含点击交互逻辑

## 相关组件
- 常用于轮播图、滑动场景配合使用
