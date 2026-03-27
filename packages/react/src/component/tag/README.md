# TagWrap

## 简介
标签包裹组件 - 用于为任意内容添加标签装饰，支持标签显示在右上角或底部。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| tag | 标签内容，可以是字符串或 React 元素 | `string \| React.element` | - | 是 |
| bottom | 标签是否显示在底部，默认显示在右上角 | `boolean` | `false` | 否 |
| block | 是否为块级显示 | `boolean` | `false` | 否 |
| className | 自定义类名 | `string` | - | 否 |
| style | 自定义样式 | `object` | - | 否 |

## 示例

### 基础用法

```jsx
import { TagWrap } from '@gm-mobile/react'

<TagWrap tag="标签">
  <div>这里是被包裹的内容</div>
</TagWrap>
```

### 标签显示在底部

```jsx
import { TagWrap } from '@gm-mobile/react'

<TagWrap tag="底部标签" bottom>
  <div>内容区域</div>
</TagWrap>
```

### 块级显示

```jsx
import { TagWrap } from '@gm-mobile/react'

<TagWrap tag="块级标签" block>
  <div>
    <div>第一行内容</div>
    <div>第二行内容</div>
    <div>第三行内容</div>
  </div>
</TagWrap>
```

### 使用 React 元素作为标签

```jsx
import { TagWrap } from '@gm-mobile/react'

<TagWrap tag={<span style={{ color: 'red' }}>自定义标签</span>}>
  <div>内容区域</div>
</TagWrap>
```

### 自定义样式

```jsx
import { TagWrap } from '@gm-mobile/react'

<TagWrap
  tag="样式标签"
  className="custom-tag-wrap"
  style={{ backgroundColor: '#f0f0f0' }}
>
  <div>内容区域</div>
</TagWrap>
```

## 注意事项

- tag 属性为必填项，必须传入字符串或 React 元素
- 标签默认显示在右上角，设置 bottom 属性为 true 后标签会显示在底部
- block 属性会改变组件的布局方式，使其呈现块级显示
- 可以通过 className 和 style 属性自定义组件样式
- 组件内部使用 div 元素包裹，注意语义化使用场景
