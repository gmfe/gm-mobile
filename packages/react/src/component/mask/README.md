# Mask

## 简介

Mask 遮罩层 - 用于创建半透明遮罩层的基础组件，常用于弹窗、加载等场景的背景遮罩，支持自定义透明度和样式。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| opacity | 遮罩透明度，取值范围 0-1 | number | 0.5 | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Mask } from '@gm-mobile/react'

<Mask />
```

### 自定义透明度

```jsx
import { Mask } from '@gm-mobile/react'

// 轻度遮罩
<Mask opacity={0.3} />

// 中度遮罩（默认）
<Mask opacity={0.5} />

// 重度遮罩
<Mask opacity={0.8} />
```

### 完全透明遮罩

```jsx
import { Mask } from '@gm-mobile/react'

// 用于阻挡交互但不遮挡视觉
<Mask opacity={0} />
```

### 自定义样式

```jsx
import { Mask } from '@gm-mobile/react'

<Mask
  opacity={0.6}
  style={{
    backgroundColor: '#000',
    zIndex: 1000,
  }}
/>
```

### 配合自定义类名

```jsx
import { Mask } from '@gm-mobile/react'

<Mask
  opacity={0.4}
  className="custom-mask"
/>

// 在 CSS 中定义
// .custom-mask {
//   backdrop-filter: blur(2px);
// }
```

### 常见业务场景

```jsx
import { Mask } from '@gm-mobile/react'

// 场景1：配合弹窗使用
const [visible, setVisible] = useState(false)

return (
  <div>
    <button onClick={() => setVisible(true)}>打开弹窗</button>
    {visible && (
      <>
        <Mask opacity={0.5} onClick={() => setVisible(false)} />
        <div className="dialog">弹窗内容</div>
      </>
    )}
  </div>
)

// 场景2：加载状态
const [loading, setLoading] = useState(false)

return (
  <div>
    <button onClick={() => setLoading(true)}>开始加载</button>
    {loading && (
      <Mask opacity={0.3}>
        <div className="loading-spinner">加载中...</div>
      </Mask>
    )}
  </div>
)

// 场景3：禁止交互
const [disabled, setDisabled] = useState(false)

return (
  <div style={{ position: 'relative' }}>
    <button onClick={handleSubmit}>提交</button>
    {disabled && (
      <Mask
        opacity={0}
        style={{ cursor: 'not-allowed' }}
      />
    )}
  </div>
)
```

### 高级用法

```jsx
import { Mask } from '@gm-mobile/react'

// 使用渐变遮罩
<Mask
  opacity={0.7}
  style={{
    background: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.8))',
  }}
/>

// 带模糊效果的遮罩
<Mask
  opacity={0.3}
  style={{
    backdropFilter: 'blur(5px)',
    WebkitBackdropFilter: 'blur(5px)',
  }}
/>

// 动画遮罩
<Mask
  opacity={0.5}
  className="animated-mask"
/>

// 在 CSS 中定义淡入动画
// .animated-mask {
//   animation: fadeIn 0.3s ease-in-out;
// }
//
// @keyframes fadeIn {
//   from { opacity: 0; }
//   to { opacity: 0.5; }
// }
```

## 注意事项

1. **定位问题**：
   - Mask 组件默认是相对定位，需要父元素设置 `position: relative` 或 `position: absolute`
   - 如果要全屏遮罩，需要设置 Mask 的样式为 `position: fixed; top: 0; left: 0; right: 0; bottom: 0;`

2. **透明度取值范围**：
   - `opacity` 的有效范围是 0-1 之间的数字
   - 0 表示完全透明，1 表示完全不透明
   - 超出范围的值会被浏览器自动处理，建议控制在 0-1 之间

3. **点击事件**：
   - Mask 组件支持传递所有原生 div 的事件，包括 `onClick`
   - 常见用法是点击遮罩关闭弹窗：`<Mask onClick={handleClose} />`

4. **层级问题**：
   - 如果遮罩层被其他元素覆盖，可以通过 `style={{ zIndex: 999 }}` 调整层级
   - 确保遮罩层的 z-index 高于底层内容，低于弹窗内容

5. **性能考虑**：
   - 在不需要遮罩时，建议使用条件渲染而非 opacity=0，避免占用渲染资源
   - 例如：`{showMask && <Mask />}` 比 `<Mask opacity={0} />` 更好

6. **与 Toast、Dialog 的区别**：
   - Mask：纯遮罩层组件，需要自己控制显示逻辑和交互
   - Toast：内置完整逻辑的轻量级提示，自动显示和隐藏
   - Dialog：内置遮罩的完整弹窗组件，开箱即用

7. **样式覆盖**：
   - `style` 属性会与默认的 opacity 样式合并，不会覆盖
   - 如果需要完全自定义样式，建议使用 `className` 配合 CSS 文件
   - 传递的 `style` 对象优先级高于内联的 opacity 样式

## 相关组件

- **Dialog** - 内置遮罩的弹窗组件
- **Toast** - 轻量级提示组件
- **Loading** - 加载动画组件
- **ActionSheet** - 底部动作面板（内置遮罩）
