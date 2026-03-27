# Label

## 简介

Label 标签组件 - 用于显示不同类型标签的轻量级组件，支持多种预设样式，适用于商品标签、状态标识、分类标记等场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| text | 标签显示的文字 | string | - | 否 |
| type | 标签样式种类 | oneOf(['default', 'plain', 'accent', 'primary']) | 'default' | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Label } from '@gm-mobile/react'

// 默认样式
<Label text='默认' />

// 主色样式
<Label text='自提' type='primary'/>
```

### 常见用法

```jsx
import { Label } from '@gm-mobile/react'

// 朴素样式 - 适用于提示性标签
<Label text='限购' type='plain' />

// 强调样式 - 适用于特殊标识
<Label text='组合商品' type='accent' />

// 多种标签组合使用
<div>
  <Label text='新品' type='primary' />
  <Label text='热销' type='accent' style={{ marginLeft: '4px' }} />
  <Label text='限量' type='plain' style={{ marginLeft: '4px' }} />
</div>
```

### 高级用法

```jsx
import { Label } from '@gm-mobile/react'

// 自定义样式
<Label
  text='自定义标签'
  type='primary'
  style={{
    padding: '4px 8px',
    fontSize: '12px',
    borderRadius: '2px'
  }}
/>

// 在列表中使用
{products.map(product => (
  <div key={product.id}>
    <span>{product.name}</span>
    {product.isNew && <Label text='新品' type='primary' style={{ marginLeft: '8px' }} />}
    {product.isLimited && <Label text='限购' type='plain' style={{ marginLeft: '4px' }} />}
  </div>
))}

// 根据条件显示不同标签
const getStatusLabel = (status) => {
  const statusMap = {
    pending: { text: '待处理', type: 'plain' },
    processing: { text: '处理中', type: 'primary' },
    completed: { text: '已完成', type: 'accent' }
  }
  const { text, type } = statusMap[status] || { text: status, type: 'default' }
  return <Label text={text} type={type} />
}

<Label text='促销' type='accent' className='custom-label' />
```

## 注意事项

1. **type 属性的使用**：
   - `default`：默认灰色样式，适用于普通标签
   - `plain`：朴素边框样式，适用于不需要过于突出的提示性标签
   - `accent`：强调色样式，适用于需要引起注意的特殊标识
   - `primary`：主色调样式，适用于重要的品牌标识或状态标签

2. **样式自定义**：
   - 优先使用 `type` 属性选择预设样式，保持视觉一致性
   - 如需自定义样式，建议使用 `className` 配合 CSS 文件修改
   - 使用 `style` 属性适合动态样式场景（如根据数据计算间距等）

3. **文字内容**：
   - `text` 属性建议控制在 2-4 个字符，以保持标签美观
   - 如需要显示较长文字，建议通过自定义样式调整标签尺寸

4. **组合使用**：
   - 同一行展示多个标签时，建议使用 `style` 或 `className` 添加适当间距
   - 避免在同一位置使用过多标签，以免影响视觉体验

5. **可访问性**：
   - Label 组件本质上是一个 `<span>` 元素
   - 如需屏幕阅读器支持，可以自行添加 `aria-label` 等属性通过 `{...rest}` 传递
