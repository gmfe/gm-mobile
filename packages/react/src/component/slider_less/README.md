# SliderLess

## 简介
SliderLess 轻量级轮播组件 - 通过仅渲染当前、前一个、后一个三个子元素来实现高性能的轮播效果，适用于需要展示大量内容的轮播场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| onChange | 轮播切换时的回调函数，参数为当前索引 | function | () => {} | 否 |
| flag | 指示器类型，可选值：'default'（默认）、'inner'（内部）、'none'（无） | oneOf(['default', 'inner', 'none']) | 'default' | 否 |
| flagType | 指示器样式，可选值：'dot'（点状）、'line'（线状） | oneOf(['dot', 'line']) | 'dot' | 否 |
| activeFlagStyle | 当前指示器的激活样式对象 | object | - | 否 |
| enableAutoSlide | 是否启用自动轮播 | boolean | false | 否 |
| autoSlideTime | 自动轮播时间间隔（毫秒） | number | 5000 | 否 |
| slideTimeKey | 轮播时间键，用于控制自动轮播的唯一标识 | string | - | 否 |

## 示例

### 基础用法
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  return (
    <SliderLess>
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
    </SliderLess>
  )
}
```

### 常见用法

#### 带切换回调
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  const handleChange = (index) => {
    console.log('当前轮播索引：', index)
  }

  return (
    <SliderLess onChange={handleChange}>
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
    </SliderLess>
  )
}
```

#### 线状指示器
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  return (
    <SliderLess flagType="line">
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
      <div style={{ background: '#96ceb4', height: '200px' }}>页面 4</div>
    </SliderLess>
  )
}
```

#### 无指示器
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  return (
    <SliderLess flag="none">
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
    </SliderLess>
  )
}
```

#### 自定义指示器样式
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  return (
    <SliderLess
      activeFlagStyle={{ background: '#ff6b6b', width: '20px' }}
    >
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
    </SliderLess>
  )
}
```

### 高级用法

#### 自动轮播
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  return (
    <SliderLess
      enableAutoSlide={true}
      autoSlideTime={3000}
    >
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
    </SliderLess>
  )
}
```

#### 内部指示器 + 自动轮播
```jsx
import { SliderLess } from '@gm-mobile/react'

function App() {
  const handleChange = (index) => {
    console.log('切换到：', index)
  }

  return (
    <SliderLess
      flag="inner"
      flagType="line"
      enableAutoSlide={true}
      autoSlideTime={5000}
      onChange={handleChange}
    >
      <div style={{ background: '#ff6b6b', height: '200px' }}>页面 1</div>
      <div style={{ background: '#4ecdc4', height: '200px' }}>页面 2</div>
      <div style={{ background: '#45b7d1', height: '200px' }}>页面 3</div>
      <div style={{ background: '#96ceb4', height: '200px' }}>页面 4</div>
      <div style={{ background: '#ffeaa7', height: '200px' }}>页面 5</div>
    </SliderLess>
  )
}
```

## 注意事项
- SliderLess 通过只渲染当前页面的前后元素来优化性能，特别适合子元素较多或内容较复杂的场景
- 子元素数量建议至少为 2 个，单个子元素也能正常显示但无法切换
- onChange 回调的参数是切换后的索引（0 到 count-1）
- 轮播切换动画时间为 200ms，与底层 Slider 组件保持一致
- 自动轮播功能需要在用户手动滑动后重新触发，使用 slideTimeKey 可以控制自动轮播的重新启动时机
- flag 为 'inner' 时，指示器会显示在轮播内容内部；为 'default' 时显示在外部下方
- 自定义 activeFlagStyle 时，样式对象会应用到指示器的激活状态上

## 相关组件
- [Slider](../slider/) - 完整功能的轮播组件，渲染所有子元素
- [SliderFlag](../slider_flag/) - 轮播指示器组件
