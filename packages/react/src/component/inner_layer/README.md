# InnerLayer

## 简介

内页容器 - 用于在应用内打开全屏内页的浮层组件，通过静态方法调用，适合实现页面跳转、详情展示等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 内页内容 | ReactNode | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| InnerLayer.render | 渲染内页 | props: InnerLayerProps | void |
| InnerLayer.hide | 隐藏内页 | - | void |

## 示例

### 基础用法

```jsx
import { InnerLayer } from '@gm-mobile/react'

// 打开内页
InnerLayer.render({
  children: (
    <div className='m-bg-back m-text-center m-padding-20'>
      这是内页内容
      <button
        mini
        className='m-margin-left-20'
        onClick={() => InnerLayer.hide()}
      >
        关闭
      </button>
    </div>
  ),
})

// 关闭内页
InnerLayer.hide()
```

### 常见用法

```jsx
import { InnerLayer } from '@gm-mobile/react'

// 场景1：展示详情内容
const showDetail = () => {
  InnerLayer.render({
    children: (
      <div className='m-padding-20'>
        <h2>详情标题</h2>
        <p>详情内容...</p>
        <button onClick={() => InnerLayer.hide()}>返回</button>
      </div>
    ),
  })
}

// 场景2：表单页面
const showForm = () => {
  InnerLayer.render({
    children: (
      <form className='m-padding-20' onSubmit={handleSubmit}>
        <input type='text' placeholder='请输入' />
        <button type='submit'>提交</button>
        <button type='button' onClick={() => InnerLayer.hide()}>
          取消
        </button>
      </form>
    ),
  })
}

// 场景3：配合自定义样式
const showStyledPage = () => {
  InnerLayer.render({
    className: 'custom-inner-page',
    style: {
      backgroundColor: '#f5f5f5',
    },
    children: (
      <div className='m-padding-20'>
        自定义样式的内页
      </div>
    ),
  })
}
```

### 高级用法

```jsx
import { InnerLayer } from '@gm-mobile/react'
import { useState } from 'react'

// 场景1：动态内容
const showDynamicContent = () => {
  const [count, setCount] = useState(0)

  InnerLayer.render({
    children: (
      <div className='m-padding-20 m-text-center'>
        <p>计数: {count}</p>
        <button onClick={() => setCount(count + 1)}>增加</button>
        <button onClick={() => InnerLayer.hide()}>关闭</button>
      </div>
    ),
  })
}

// 场景2：嵌套组件
const ComplexPage = () => {
  return (
    <div className='m-padding-20'>
      <header>页面头部</header>
      <main>页面主体内容</main>
      <footer>
        <button onClick={() => InnerLayer.hide()}>返回</button>
      </footer>
    </div>
  )
}

const showComplexPage = () => {
  InnerLayer.render({
    children: <ComplexPage />,
  })
}

// 场景3：异步加载内容
const showAsyncContent = async () => {
  // 先显示加载状态
  InnerLayer.render({
    children: <div className='m-text-center'>加载中...</div>,
  })

  // 模拟异步请求
  const data = await fetchData()

  // 更新内容
  InnerLayer.render({
    children: (
      <div className='m-padding-20'>
        <h2>{data.title}</h2>
        <p>{data.content}</p>
        <button onClick={() => InnerLayer.hide()}>关闭</button>
      </div>
    ),
  })
}
```

## 注意事项

1. **静态方法调用**：
   - InnerLayer 是通过静态方法调用的组件，不是直接在 JSX 中使用
   - 必须使用 `InnerLayer.render()` 来显示内页
   - 使用 `InnerLayer.hide()` 来关闭内页

2. **内容渲染**：
   - `children` 属性是必需的，用于指定内页显示的内容
   - children 可以是任何合法的 React 节点（JSX、字符串、数字等）
   - 支持传入复杂的组件树结构

3. **样式定制**：
   - 使用 `className` 可以添加自定义 CSS 类名
   - 使用 `style` 可以添加内联样式
   - 内页容器默认有 `m-inner-layer-container` 和 `m-container-full` 类名

4. **生命周期**：
   - 每次调用 `InnerLayer.render()` 会替换当前显示的内页内容
   - 调用 `InnerLayer.hide()` 会完全隐藏内页
   - 内页的显示/隐藏由 LayoutRoot 统一管理

5. **使用场景**：
   - 适合需要全屏展示内容的场景（如详情页、表单页）
   - 不适合需要同时显示多个内页的场景（同时只能显示一个）
   - 如果需要更灵活的弹窗功能，建议使用 Dialog 组件

6. **与其他组件的区别**：
   - **InnerLayer**: 全屏内页，适合展示完整页面内容
   - **Dialog**: 弹窗对话框，适合提示、确认等场景
   - **Toast**: 轻量级提示，自动消失
   - **ActionSheet**: 底部动作面板，适合选择操作

7. **关闭内页**：
   - 内页不会自动关闭，必须手动调用 `InnerLayer.hide()`
   - 建议在内页内容中提供关闭按钮或返回按钮
   - 可以在内容中添加点击遮罩关闭的逻辑（需要自己实现）

## 相关组件

- **Dialog** - 弹窗对话框组件
- **Toast** - 轻量级提示组件
- **ActionSheet** - 底部动作面板
- **LayoutRoot** - 布局根容器（InnerLayer 的底层实现）
