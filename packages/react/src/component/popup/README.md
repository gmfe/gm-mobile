# Popup

## 简介

Popup 弹出层组件 - 从左侧、右侧或底部弹出的浮层面板组件，支持遮罩层、动画效果和自定义样式，适用于菜单、表单、详情等弹出场景。

## API

### Popup Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹出层标题文字 | string | - | 否 |
| onHide | 关闭弹出层的回调函数 | function | () => {} | 否 |
| left | 是否从左侧弹出 | boolean | false | 是* |
| right | 是否从右侧弹出 | boolean | false | 是* |
| bottom | 是否从底部弹出 | boolean | false | 是* |
| width | 弹出层宽度（仅用于 left/right） | string | - | 否 |
| height | 弹出层高度（仅用于 bottom） | string | - | 否 |
| opacity | 遮罩层透明度（0-1） | number | - | 否 |
| disabledHeader | 是否禁用头部（不显示标题和关闭按钮） | boolean | false | 否 |
| disabledMask | 是否禁用遮罩层 | boolean | false | 否 |
| disabledAnimate | 是否禁用弹出动画 | boolean | true | 否 |
| isPickPopup | 内部使用（用于 picker 组件） | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**注意**：left、right、bottom 三个属性中必须传入一个（三选一）

### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| Popup.render(options) | 全局渲染弹出层 | options (Popup 组件的所有 props) | - |
| Popup.hide() | 隐藏当前显示的弹出层 | - | - |

## 示例

### 基础用法

```jsx
import { Popup } from '@gm-mobile/react'

// 左侧弹出
<button onClick={() => {
  Popup.render({
    left: true,
    children: <div>左侧菜单内容</div>,
    onHide: Popup.hide
  })
}}>
  显示左侧菜单
</button>

// 右侧弹出
<button onClick={() => {
  Popup.render({
    right: true,
    children: <div>右侧详情内容</div>,
    onHide: Popup.hide
  })
}}>
  显示右侧详情
</button>

// 底部弹出
<button onClick={() => {
  Popup.render({
    bottom: true,
    children: <div>底部表单内容</div>,
    onHide: Popup.hide
  })
}}>
  显示底部表单
</button>
```

### 带标题的弹出层

```jsx
import { Popup } from '@gm-mobile/react'

<button onClick={() => {
  Popup.render({
    title: '编辑信息',
    bottom: true,
    children: (
      <div>
        <p>这里是弹出层的内容区域</p>
        <p>可以放置表单、列表或其他组件</p>
      </div>
    ),
    onHide: Popup.hide
  })
}}>
  显示带标题的弹出层
</button>
```

### 自定义尺寸和位置

```jsx
import { Popup } from '@gm-mobile/react'

// 自定义宽度（左右弹出）
<button onClick={() => {
  Popup.render({
    left: true,
    width: '80%',
    children: <div>宽度为80%的左侧弹出层</div>,
    onHide: Popup.hide
  })
}}>
  自定义宽度
</button>

// 自定义高度（底部弹出）
<button onClick={() => {
  Popup.render({
    bottom: true,
    height: '60%',
    children: <div>高度为60%的底部弹出层</div>,
    onHide: Popup.hide
  })
}}>
  自定义高度
</button>

// 自定义位置（居中弹出）
<button onClick={() => {
  Popup.render({
    style: {
      top: '50%',
      left: '50%',
      marginTop: '-200px',
      marginLeft: '-150px',
      width: '300px',
      height: '400px',
    },
    disabledHeader: true,
    children: <div>居中弹出层</div>,
    onHide: Popup.hide
  })
}}>
  居中显示
</button>
```

### 高级用法

```jsx
import { Popup } from '@gm-mobile/react'

// 禁用遮罩层
<button onClick={() => {
  Popup.render({
    right: true,
    disabledMask: true,
    children: <div>没有遮罩层的弹出层</div>,
    onHide: Popup.hide
  })
}}>
  无遮罩层
</button>

// 自定义遮罩透明度
<button onClick={() => {
  Popup.render({
    bottom: true,
    opacity: 0.3,
    children: <div>遮罩透明度为0.3</div>,
    onHide: Popup.hide
  })
}}>
  自定义遮罩透明度
</button>

// 复杂内容示例
<button onClick={() => {
  Popup.render({
    title: '选择选项',
    bottom: true,
    children: (
      <div>
        <ul>
          <li>选项 1</li>
          <li>选项 2</li>
          <li>选项 3</li>
        </ul>
        <button onClick={Popup.hide}>关闭</button>
      </div>
    ),
    onHide: () => {
      console.log('弹出层关闭了')
      Popup.hide()
    }
  })
}}>
  复杂内容
</button>

// 启用动画（默认禁用）
<button onClick={() => {
  Popup.render({
    left: true,
    disabledAnimate: false,
    children: <div>带动画效果的左侧弹出层</div>,
    onHide: Popup.hide
  })
}}>
  启用动画
</button>

// 自定义样式
<button onClick={() => {
  Popup.render({
    bottom: true,
    className: 'custom-popup',
    style: {
      backgroundColor: '#f5f5f5',
      borderRadius: '16px 16px 0 0',
    },
    children: <div>自定义样式的弹出层</div>,
    onHide: Popup.hide
  })
}}>
  自定义样式
</button>
```

## 注意事项

1. **位置属性必选**：
   - left、right、bottom 三个属性中必须传入一个（三选一）
   - 如果都不传，组件会在控制台输出错误提示
   - 不能同时设置多个位置属性，否则行为不可预期

2. **关闭处理**：
   - 必须传入 `onHide` 回调，通常设置为 `Popup.hide`
   - 点击遮罩层会自动触发 `onHide`
   - 点击头部的关闭按钮也会触发 `onHide`
   - 如果需要在关闭时执行其他操作，可以在 `onHide` 中处理

3. **尺寸属性**：
   - `width` 只在 `left` 或 `right` 为 true 时生效
   - `height` 只在 `bottom` 为 true 时生效
   - 如果需要完全自定义尺寸和位置，使用 `style` 属性

4. **动画性能**：
   - 默认情况下 `disabledAnimate` 为 true（禁用动画）
   - 这是因为在某些设备上动画可能出现卡顿
   - 如需启用动画，设置 `disabledAnimate: false`

5. **遮罩层控制**：
   - 使用 `disabledMask` 可以禁用遮罩层
   - 禁用遮罩后，弹出层会显示阴影效果
   - 使用 `opacity` 可以精确控制遮罩透明度（0-1）

6. **样式自定义**：
   - 优先使用 `className` 进行样式定制
   - `style` 可以覆盖默认样式，但要注意样式的优先级问题
   - 头部包含标题和关闭按钮，如需完全自定义可使用 `disabledHeader`

## 相关组件

- **Dialog** - 弹窗组件，适合确认、提示等场景
- **ActionSheet** - 动作面板，适合从底部弹出的选项列表
- **Mask** - 遮罩层组件
- **LayoutRoot** - 布局根容器，用于全局渲染
