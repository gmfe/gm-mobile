# Loading

## 简介

Loading 加载中组件 - 用于显示加载状态的轻量级组件，支持自定义加载提示文本和样式，适用于各类加载场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 加载提示文本或自定义内容 | node | - | 否 |

## 示例

### 基础用法

```jsx
import { Loading } from '@gm-mobile/react'

// 带提示文本
<Loading>loading...</Loading>

// 无文本（仅图标）
<Loading />
```

### 常见用法

```jsx
import { Loading } from '@gm-mobile/react'

// 自定义提示文本
<Loading>加载中，请稍候...</Loading>

// 与容器配合使用
<div style={{ textAlign: 'center', padding: '20px' }}>
  <Loading>正在提交数据...</Loading>
</div>

// 在列表中使用
<List>
  <List.Item>
    <Loading>加载中...</Loading>
  </List.Item>
</List>
```

### 高级用法

```jsx
import { Loading } from '@gm-mobile/react'

// 自定义样式
<Loading
  className='custom-loading'
  style={{ fontSize: '14px', color: '#666' }}
>
  加载中...
</Loading>

// 结合状态控制
const { loading } = useRequest(someApi)

{loading ? (
  <Loading>正在加载数据...</Loading>
) : (
  <div>数据内容</div>
)}

// 在按钮内使用
<Button disabled>
  <Loading>提交中...</Loading>
</Button>

// 在弹窗中使用
<Dialog visible={loading}>
  <div style={{ textAlign: 'center', padding: '40px 0' }}>
    <Loading style={{ fontSize: '16px' }}>处理中，请稍候...</Loading>
  </div>
</Dialog>
```

## 注意事项

1. **样式覆盖**：
   - Loading 组件默认使用组件库的 `.m-loading` 样式类
   - 可以通过 `className` 添加自定义类名来覆盖默认样式
   - 使用 `style` 属性可以快速调整内联样式

2. **子元素使用**：
   - `children` 属性用于显示加载提示文本
   - 可以不传 `children`，此时只显示加载图标
   - 也可以传入自定义的 React 节点，实现更复杂的加载提示

3. **使用场景**：
   - 适用于轻量级的加载状态展示
   - 对于全屏加载，建议结合 Dialog 或 Mask 组件使用
   - 在按钮内部使用时，注意配合按钮的 `disabled` 属性

4. **图标样式**：
   - 加载图标使用 SVG 格式，具有良好的缩放性
   - 图标会自动旋转，无需额外添加动画效果
   - 图标颜色继承父元素的文字颜色

5. **性能考虑**：
   - Loading 组件非常轻量，可以放心在列表中多次使用
   - 图标采用内联 SVG，不会产生额外的网络请求
