# NProgress

## 简介
进度条 - 用于显示页面加载进度的全局进度条组件，常用于路由切换或异步请求时的加载提示。采用静态方法调用，自动管理组件的挂载和卸载。

## API

### Props
NProgress 通过静态方法调用，不直接使用 Props。组件内部使用以下属性：

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| percent | 进度百分比，0-100 之间 | number | 0 | 否 |

### 方法
| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| NProgress.start() | 开始显示进度条，自动从 0% 递增到 90% | 无 | 无 |
| NProgress.done() | 完成进度条显示，跳转到 100% 后自动消失 | 无 | 无 |

## 示例

### 基础用法
```jsx
import { NProgress } from '@gm-mobile/react'
import { Button } from '@gm-mobile/react'

function App() {
  return (
    <div>
      <Button onClick={() => NProgress.start()}>开始加载</Button>
      <Button onClick={() => NProgress.done()}>完成加载</Button>
    </div>
  )
}
```

### 路由切换场景
```jsx
import { NProgress } from '@gm-mobile/react'
import { useEffect } from 'react'

// 在路由守卫中使用
function useRouterGuard() {
  useEffect(() => {
    const handleRouteChangeStart = () => {
      NProgress.start()
    }

    const handleRouteChangeComplete = () => {
      NProgress.done()
    }

    // 监听路由变化事件
    window.addEventListener('routeChangeStart', handleRouteChangeStart)
    window.addEventListener('routeChangeComplete', handleRouteChangeComplete)

    return () => {
      window.removeEventListener('routeChangeStart', handleRouteChangeStart)
      window.removeEventListener('routeChangeComplete', handleRouteChangeComplete)
    }
  }, [])

  return null
}
```

### 异步请求场景
```jsx
import { NProgress } from '@gm-mobile/react'
import axios from 'axios'

// 在 axios 拦截器中使用
axios.interceptors.request.use((config) => {
  NProgress.start()
  return config
})

axios.interceptors.response.use((response) => {
  NProgress.done()
  return response
})
```

### 手动控制场景
```jsx
import { NProgress } from '@gm-mobile/react'

function LongRunningTask() {
  const handleStart = () => {
    NProgress.start()

    // 模拟异步任务
    setTimeout(() => {
      NProgress.done()
    }, 3000)
  }

  return (
    <button onClick={handleStart}>
      执行长时间任务
    </button>
  )
}
```

## 注意事项
- NProgress 使用静态方法调用，会自动管理组件在页面顶部的挂载和卸载
- start() 方法会自动从 0% 递增到 90%，递增速度逐渐变慢，模拟真实的加载进度
- done() 方法会将进度条跳转到 100%，并在 250ms 后自动移除组件
- 多次调用 start() 会清除之前的定时器并重新开始
- 进度条位置固定在页面顶部，使用 CSS 变量 `--m-z-index-nprogress` 控制层级
- 进度条高度固定为 2px，颜色使用 CSS 变量 `--m-color-bg-primary`

## 相关组件
- [ProgressBar](../progress_bar/) - 线性进度条组件，可嵌入到页面任意位置
- [Loading](../loading/) - 加载中提示组件
- [LayoutRoot](../layout_root/) - 全局布局容器，NProgress 依赖此组件挂载
