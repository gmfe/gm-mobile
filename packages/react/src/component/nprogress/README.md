# NProgress

## 简介
顶部进度条组件 - 用于页面加载、路由切换等场景，通过静态方法控制进度条的显示与隐藏。

## 安装
已包含在 `@gm-mobile/react` 中，无需额外安装。

## 使用
```jsx
import NProgress from '@gm-mobile/react/lib/nprogress'

NProgress.start()
NProgress.done()
```

## API

### 静态方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `NProgress.start()` | 开始显示进度条，进度条会自动递增到 90% | - | - |
| `NProgress.done()` | 完成进度条，进度条将动画至 100% 后自动移除 | - | - |

## 示例

### 基础用法

```jsx
import NProgress from '@gm-mobile/react/lib/nprogress'

const App = () => {
  const handleStart = () => {
    NProgress.start()
  }

  const handleDone = () => {
    NProgress.done()
  }

  return (
    <div>
      <button onClick={handleStart}>开始加载</button>
      <button onClick={handleDone}>完成加载</button>
    </div>
  )
}
```

### 配合路由使用

```jsx
import NProgress from '@gm-mobile/react/lib/nprogress'

// 在路由守卫中使用
NProgress.start()

// 页面加载完成后
window.addEventListener('load', () => {
  NProgress.done()
})
```

## 注意事项
- NProgress 通过静态方法调用，无需在 JSX 中渲染
- 调用 `start()` 后进度条会自动递增，但不会自动完成，需手动调用 `done()`
- 支持多次调用 `start()`，`done()` 会完成最后一次进度
