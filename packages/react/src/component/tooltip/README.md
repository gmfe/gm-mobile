# Tooltip

## 简介

Tooltip 提示框组件 - 用于在点击某个元素时弹出底部浮层显示提示内容的组件，通过包装子元素并为其添加点击事件来触发弹窗。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 弹窗标题 | string | - | 否 |
| content | 弹窗内容，支持任意 React 元素 | element | - | 是 |
| onClick | 点击事件回调函数 | function | - | 否 |
| children | 被包装的子元素，点击该元素会触发弹窗 | node | - | 是 |

## 示例

### 基础用法

```jsx
import { Tooltip } from '@gm-mobile/react'

// 基础提示框
<Tooltip
  title='提示'
  content={<div>这是提示内容</div>}
>
  <div>点我提示</div>
</Tooltip>

// 无标题提示
<Tooltip content={<div>只有内容的提示</div>}>
  <Button>显示提示</Button>
</Tooltip>
```

### 常见用法

```jsx
import { Tooltip } from '@gm-mobile/react'

// 详细信息提示
<Tooltip
  title='使用说明'
  content={
    <div style={{ padding: '16px' }}>
      <p>这里是详细的使用说明内容</p>
      <p>可以包含多行文本</p>
    </div>
  }
>
  <span style={{ color: '#1890ff' }}>使用说明</span>
</Tooltip>

// 表单字段说明
<Tooltip
  title='字段说明'
  content={
    <div>
      <p>请输入您的手机号码</p>
      <p>用于接收验证码和重要通知</p>
    </div>
  }
>
  <Input placeholder='手机号' />
</Tooltip>

// 带点击回调
<Tooltip
  title='确认操作'
  content={<div>点击确认后将执行此操作</div>}
  onClick={() => {
    console.log('Tooltip 被点击')
  }}
>
  <Button type='primary'>点击查看</Button>
</Tooltip>
```

### 高级用法

```jsx
import { Tooltip } from '@gm-mobile/react'

// 复杂内容
<Tooltip
  title='商品详情'
  content={
    <div>
      <h3>商品名称</h3>
      <p>价格：¥99.00</p>
      <p>库存：充足</p>
      <Button type='primary' size='small'>
        立即购买
      </Button>
    </div>
  }
>
  <div className='product-item'>
    <Image src='product.jpg' />
    <span>查看详情</span>
  </div>
</Tooltip>

// 列表项操作提示
<Tooltip
  title='操作提示'
  content={
    <div>
      <p>确定要删除此项目吗？</p>
      <p style={{ color: 'red', fontSize: '12px' }}>
        此操作不可恢复
      </p>
    </div>
  }
>
  <a>删除</a>
</Tooltip>

// 富文本内容
const richContent = (
  <div>
    <h4>帮助信息</h4>
    <ul>
      <li>功能一：xxx</li>
      <li>功能二：xxx</li>
      <li>功能三：xxx</li>
    </ul>
    <p>如有疑问，请联系客服</p>
  </div>
)

<Tooltip title='帮助' content={richContent}>
  <Button type='link'>帮助</Button>
</Tooltip>
```

## 注意事项

1. **子元素要求**：
   - children 必须是单个可点击的 React 元素
   - 组件会通过 `React.cloneElement` 为子元素添加点击事件
   - 如果子元素本身已有 onClick，会被覆盖

2. **弹窗位置**：
   - Tooltip 固定从底部弹出（`bottom: true`）
   - 弹窗内容区域默认最小高度为 100px

3. **content 属性**：
   - content 是必填属性，必须是 React 元素类型
   - 简单文本需要包裹在 div 或其他元素中
   - 支持复杂的 JSX 结构，包括按钮、图片等

4. **使用场景**：
   - 适合需要在点击时展示额外信息的场景
   - 不适合需要自动触发的提示，应考虑使用其他组件
   - 弹窗是全屏浮层，会遮挡页面内容

5. **事件处理**：
   - onClick 回调会在弹窗显示的同时触发
   - 如果需要在点击时执行额外逻辑，可以使用 onClick 属性

## 相关组件

- **Popup** - Tooltip 底层使用的弹窗组件，提供更灵活的配置
- **Dialog** - 用于模态对话框场景
- **ActionSheet** - 用于底部动作列表场景
- **Toast** - 用于轻量级消息提示
