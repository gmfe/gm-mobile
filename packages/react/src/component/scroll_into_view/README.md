# ScrollIntoView

## 简介

ScrollIntoView 滚动视图组件 - 用于包装表单控件的高阶组件，在控件获得焦点时自动滚动到可视区域，避免被移动端键盘遮挡。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 需要被包装的子元素（通常是表单控件） | React.element | - | 是 |

## 示例

### 基础用法

```jsx
import { ScrollIntoView } from '@gm-mobile/react'
import { Input } from '@gm-mobile/react'

// 包装 Input 组件，聚焦时自动滚动到可视区域
<ScrollIntoView>
  <Input placeholder="输入内容时会自动滚动" />
</ScrollIntoView>
```

### 常见用法

```jsx
import { ScrollIntoView } from '@gm-mobile/react'
import { Input, Textarea } from '@gm-mobile/react'

// 表单场景：包装多个表单控件
<ScrollIntoView>
  <Input placeholder="用户名" />
</ScrollIntoView>

<ScrollIntoView>
  <Input type="password" placeholder="密码" />
</ScrollIntoView>

<ScrollIntoView>
  <Textarea placeholder="详细地址" rows={3} />
</ScrollIntoView>

// 在长表单中使用，防止输入框被键盘遮挡
<div style={{ height: '100vh', overflow: 'auto' }}>
  <div style={{ height: '800px' }}>顶部内容</div>
  <ScrollIntoView>
    <Input placeholder="这个输入框在底部，聚焦时会自动滚动上来" />
  </ScrollIntoView>
</div>
```

### 高级用法

```jsx
import { ScrollIntoView } from '@gm-mobile/react'
import { Input, Button } from '@gm-mobile/react'

// 结合表单验证使用
const FormExample = () => {
  return (
    <form>
      <ScrollIntoView>
        <Input name="username" placeholder="用户名" />
      </ScrollIntoView>

      <ScrollIntoView>
        <Input name="phone" type="tel" placeholder="手机号" />
      </ScrollIntoView>

      <ScrollIntoView>
        <Input name="code" type="number" placeholder="验证码" />
      </ScrollIntoView>

      <ScrollIntoView>
        <Textarea name="remark" placeholder="备注" rows={4} />
      </ScrollIntoView>

      <Button type="primary" block>
        提交
      </Button>
    </form>
  )
}

// 包装自定义表单控件
<ScrollIntoView>
  <CustomSelect placeholder="选择选项" />
</ScrollIntoView>
```

## 注意事项

1. **iOS 设备兼容性**：
   - 组件内部已处理 iOS 逻辑，iOS 设备上不会执行额外滚动（使用系统原生处理）
   - 主要针对 Android 设备优化

2. **使用场景**：
   - 特别适用于移动端长表单，输入框可能在屏幕下方的情况
   - 当表单内容较多，键盘可能遮挡输入框时建议使用
   - 短表单或顶部输入框一般不需要包装

3. **子元素要求**：
   - children 必须是单个 React 元素
   - 子元素应该支持 onFocus 事件（大部分表单控件都支持）
   - 如果子元素已有 onFocus 处理，会被保留并继续执行

4. **性能考虑**：
   - 组件使用 cloneElement 注入事件处理，性能开销很小
   - 滚动操作延迟 500ms 执行，避免过早滚动导致键盘布局未完成
   - 组件卸载时会自动清理定时器，不会造成内存泄漏

5. **与其他组件配合**：
   - 可与任何表单组件配合使用（Input、Textarea、Select 等）
   - 不影响子组件的原有功能和事件处理
   - 可以安全地与表单验证库（如 Formik）配合使用
