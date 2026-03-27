# Header

## 简介

Header 头部组件 - 用于页面顶部的导航栏组件，支持返回按钮、标题显示和右侧自定义操作区，适用于移动端页面头部场景。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 头部标题文字 | string | - | 否 |
| hideBack | 是否隐藏左侧返回按钮 | boolean | false | 否 |
| onBack | 返回按钮点击时的回调函数 | function | () => {} | 否 |
| right | 右侧自定义内容，可以是任何 React 元素 | element | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

## 示例

### 基础用法

```jsx
import { Header } from '@gm-mobile/react'

// 带返回按钮和标题
<Header
  title='页面标题'
  onBack={() => {
    console.log('点击返回')
    // 这里可以调用路由返回，如 history.goBack()
  }}
/>

// 只有标题，不显示返回按钮
<Header title='首页' hideBack />
```

### 带右侧操作区

```jsx
import { Header } from '@gm-mobile/react'

// 右侧显示按钮
<Header
  title='商品详情'
  onBack={() => history.goBack()}
  right={
    <Button
      type='link'
      onClick={() => console.log('分享')}
    >
      分享
    </Button>
  }
/>

// 右侧显示图标
<Header
  title='个人中心'
  onBack={() => history.goBack()}
  right={
    <Icon
      type='home'
      onClick={() => history.push('/home')}
    />
  }
/>

// 右侧显示多个操作
<Header
  title='订单详情'
  onBack={() => history.goBack()}
  right={
    <Flex>
      <Icon type='search' className='m-margin-right-15' />
      <Icon type='more' />
    </Flex>
  }
/>
```

### 自定义样式

```jsx
import { Header } from '@gm-mobile/react'

// 自定义背景色
<Header
  title='自定义样式'
  style={{ backgroundColor: '#ff6b00' }}
/>

// 自定义类名
<Header
  title='自定义类名'
  className='custom-header'
  onBack={() => history.goBack()}
/>
```

### 完整页面示例

```jsx
import { Header, Button } from '@gm-mobile/react'

const DetailPage = () => {
  const handleBack = () => {
    // 返回上一页
    window.history.back()
  }

  const handleShare = () => {
    // 分享逻辑
    console.log('分享页面')
  }

  return (
    <div>
      <Header
        title='商品详情'
        onBack={handleBack}
        right={
          <Button
            type='link'
            onClick={handleShare}
          >
            分享
          </Button>
        }
      />
      {/* 页面内容 */}
    </div>
  )
}
```

## 注意事项

1. **返回按钮的显示控制**：
   - 默认情况下会显示左侧返回按钮（左箭头图标）
   - 设置 `hideBack={true}` 可以隐藏返回按钮，适用于首页或根页面
   - 隐藏返回按钮时，标题左侧会自动添加适当间距

2. **onBack 回调处理**：
   - `onBack` 的默认值是空函数，不传入时点击返回按钮无反应
   - 建议总是传入 `onBack` 回调，处理页面返回逻辑
   - 常见用法：`history.goBack()`、`history.push()` 或其他路由跳转方法

3. **右侧内容自定义**：
   - `right` 属性接收任意 React 元素，灵活性很高
   - 可以是按钮、图标、文字或多个元素的组合
   - 右侧内容会自动对齐到头部右侧
   - 如需多个操作，建议使用 Flex 布局包裹

4. **样式定制**：
   - Header 使用了组件库的样式类（如 `m-header`、`m-text-white` 等）
   - 组件会自动应用内边距和白色文字样式
   - 如需完全自定义样式，建议使用 `className` 配合自定义 CSS
   - 修改 `style` 可以覆盖默认样式，但需注意样式的优先级

5. **布局结构**：
   - Header 内部使用 Flex 布局，左侧是返回按钮和标题，右侧是自定义内容
   - 左右两侧会自动分布在两端
   - 标题过长时会自动换行或截断（取决于样式设置）

## 相关组件

- **Flex** - Header 内部使用 Flex 组件进行布局
- **Button** - 常与 Header 的 right 属性配合，用于右侧操作按钮
- **Icon** - 可作为右侧操作区的图标按钮
