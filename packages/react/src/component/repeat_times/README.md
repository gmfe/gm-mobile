# RepeatTimes

## 简介
连续点击触发器 - 用于包装子元素，使其需要连续点击一定次数后才触发回调函数。适用于防止误触、确认操作等场景。

## API

### Props
| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| repeat | 需要连续点击的次数 | number | 5 | 否 |
| onRepeat | 达到点击次数时的回调函数 | function | - | 是 |
| children | 被包装的子元素（必须是一个可点击的 React 元素） | ReactNode | - | 是 |

## 示例

### 基础用法
```jsx
import { RepeatTimes } from '@gm-mobile/react'

<RepeatTimes
  onRepeat={() => {
    console.log('连续点击5次成功')
  }}
>
  <div>点我5次</div>
</RepeatTimes>
```

### 自定义点击次数
```jsx
import { RepeatTimes } from '@gm-mobile/react'

<RepeatTimes
  repeat={3}
  onRepeat={() => {
    console.log('连续点击3次成功')
  }}
>
  <Button>连续点击3次</Button>
</RepeatTimes>
```

### 与业务逻辑结合
```jsx
import { RepeatTimes } from '@gm-mobile/react'

const DeleteButton = () => {
  const handleDelete = () => {
    // 执行删除操作
    console.log('删除操作已执行')
  }

  return (
    <RepeatTimes
      repeat={5}
      onRepeat={handleDelete}
    >
      <Button type="danger">连续点击5次删除</Button>
    </RepeatTimes>
  )
}
```

## 注意事项
- 组件会在500毫秒内未点击时自动重置计数
- children 必须是一个单一的 React 元素（不能是多个元素或 Fragment）
- 确保子元素支持 onClick 事件，否则功能无法生效
- 连续点击期间会有 Toast 提示显示当前点击次数
- 适用于需要确认敏感操作的场景，如删除、重置等
