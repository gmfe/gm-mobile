# LayoutRoot

## 简介
布局根容器 - 用于管理应用中所有浮层组件（如弹窗、选择器、键盘等）的根容器，提供统一的层级管理和历史记录支持。

## API

### Props
LayoutRoot 组件不接收任何 props。

### 静态方法

| 方法名 | 说明 | 参数 | 返回值 |
|--------|------|------|--------|
| TYPE | 类型常量对象，包含所有支持的浮层类型 | - | Object |
| setComponent | 设置指定类型的浮层组件 | type (String) - 浮层类型<br>com (ReactNode) - 要渲染的组件 | void |
| removeComponent | 移除指定类型的浮层组件 | type (String) - 浮层类型 | void |
| renderWith | 渲染浮层组件并添加历史记录支持（用户点击返回可自动关闭浮层） | type (String) - 浮层类型<br>Component (ReactNode) - 要渲染的组件<br>options (Object) - 配置选项，包含 onPopStateCallback 回调 | void |
| hideWith | 隐藏浮层组件并回退历史记录 | type (String) - 浮层类型 | void |

### TYPE 类型常量

| 常量 | 值 | 说明 |
|------|------|------|
| TYPE.INNERLAYER | 'innerLayer' | 内层浮层 |
| TYPE.POPUP | 'popup' | 弹出层 |
| TYPE.PICKER | 'picker' | 选择器 |
| TYPE.KEYBOARD | 'keyboard' | 键盘 |
| TYPE.MODAL | 'modal' | 模态框 |
| TYPE.TOAST | 'toast' | 轻提示 |
| TYPE.NPROGRESS | 'nprogress' | 进度条 |

### 浮层层级关系
从低到高的层级顺序：
1. innerLayer（内层浮层）
2. popup（弹出层）
3. picker（选择器）
4. keyboard（键盘）
5. modal（模态框）
6. toast（轻提示）
7. nprogress（进度条）

## 示例

### 基础用法
```jsx
import { LayoutRoot } from '@gm-mobile/react'

function App() {
  return (
    <div>
      {/* 你的应用内容 */}
      <div>App Content</div>

      {/* LayoutRoot 放在应用的最外层 */}
      <LayoutRoot />
    </div>
  )
}
```

### 显示和关闭浮层
```jsx
import { LayoutRoot, Button, Dialog } from '@gm-mobile/react'

function Example() {
  const showDialog = () => {
    const dialog = (
      <Dialog
        visible
        title="提示"
        content="这是一个对话框"
        onOk={() => LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)}
        onCancel={() => LayoutRoot.removeComponent(LayoutRoot.TYPE.MODAL)}
      />
    )
    LayoutRoot.setComponent(LayoutRoot.TYPE.MODAL, dialog)
  }

  return (
    <Button onClick={showDialog}>
      显示对话框
    </Button>
  )
}
```

### 支持返回键关闭的浮层
```jsx
import { LayoutRoot, Button, Popup } from '@gm-mobile/react'

function ExampleWithHistory() {
  const showPopup = () => {
    const popup = (
      <Popup
        visible
        onClosed={() => {
          console.log('popup closed')
        }}
      >
        <div style={{ padding: '20px' }}>
          <p>点击返回键可以关闭这个弹窗</p>
          <Button onClick={() => LayoutRoot.hideWith(LayoutRoot.TYPE.POPUP)}>
            关闭
          </Button>
        </div>
      </Popup>
    )

    // 使用 renderWith 方法，用户点击手机返回键时可以自动关闭弹窗
    LayoutRoot.renderWith(
      LayoutRoot.TYPE.POPUP,
      popup,
      {
        onPopStateCallback: () => {
          console.log('用户点击了返回键，弹窗已关闭')
        }
      }
    )
  }

  return (
    <Button onClick={showPopup}>
      显示弹窗（支持返回键关闭）
    </Button>
  )
}
```

### 选择器与键盘配合
```jsx
import { LayoutRoot, Button, Picker } from '@gm-mobile/react'

function ExampleWithPicker() {
  const showPicker = () => {
    const picker = (
      <Picker
        visible
        columns={[
          { text: '选项1', value: '1' },
          { text: '选项2', value: '2' },
          { text: '选项3', value: '3' },
        ]}
        onConfirm={(value) => {
          console.log('选择了：', value)
          LayoutRoot.hideWith(LayoutRoot.TYPE.PICKER)
        }}
        onCancel={() => {
          LayoutRoot.hideWith(LayoutRoot.TYPE.PICKER)
        }}
      />
    )

    LayoutRoot.renderWith(LayoutRoot.TYPE.PICKER, picker)
  }

  return (
    <Button onClick={showPicker}>
      显示选择器
    </Button>
  )
}
```

## 注意事项

1. **必须初始化**：LayoutRoot 必须在应用初始化时渲染，否则静态方法会输出警告 "LayoutRoot is uninitialized"

2. **唯一实例**：应用中只能有一个 LayoutRoot 实例，通常放在根组件的最外层

3. **层级顺序**：浮层按照代码中定义的顺序渲染，高层级的浮层会覆盖在低层级之上

4. **历史记录管理**：
   - 使用 `renderWith` 方法渲染的浮层会自动添加浏览器历史记录
   - 用户点击返回键时会自动关闭浮层
   - 多个浮层共存时，只有最上层的浮层会响应返回键
   - 使用 `hideWith` 方法关闭浮层会同时回退历史记录

5. **手动清理**：
   - 使用 `setComponent` 渲染的浮层需要手动调用 `removeComponent` 清理
   - 使用 `renderWith` 渲染的浮层建议使用 `hideWith` 清理，以保持历史记录一致

6. **组件更新**：
   - 同一类型的浮层再次调用 `setComponent` 会自动移除旧的浮层
   - 可以通过多次调用 `setComponent` 来更新浮层内容

7. **类型安全**：使用时建议使用 `LayoutRoot.TYPE` 常量，避免硬编码字符串导致错误

## 相关组件
- [Dialog](/docs/dialog) - 模态对话框组件
- [Popup](/docs/popup) - 弹出层组件
- [Picker](/docs/picker) - 选择器组件
- [Toast](/docs/toast) - 轻提示组件
- [Keyboard](/docs/keyboard) - 自定义键盘组件
