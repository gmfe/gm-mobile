# Page

## 简介

Page 页面布局容器 - 用于构建完整的移动端页面布局，支持头部、内容区、顶部、底部和导航栏的灵活组合，是移动端页面开发的基础布局组件。

## API

### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| children | 页面主要内容区域 | node | - | 否 |
| className | 自定义类名 | string | - | 否 |
| pageClassName | 内容区域的自定义类名 | string | - | 否 |
| white | 是否使用白色背景 | boolean | false | 否 |
| header | 头部内容区域（固定在顶部） | node | - | 否 |
| tabbar | 底部导航栏（固定在底部） | node | - | 否 |
| top | 顶部区域（在 header 下方） | node | - | 否 |
| bottom | 底部区域（在 tabbar 上方） | node | - | 否 |

## 示例

### 基础用法

```jsx
import { Page } from '@gm-mobile/react'

// 基础页面布局
<Page>
  <div>页面内容</div>
</Page>
```

### 完整布局

```jsx
import { Page } from '@gm-mobile/react'

<Page
  header={<div>顶部标题栏</div>}
  tabbar={<div>底部导航栏</div>}
  top={<div>顶部提示区域</div>}
  bottom={<div>底部操作区域</div>}
>
  <div>页面主要内容</div>
  <div>可以放置任何内容</div>
</Page>
```

### 常见用法

```jsx
import { Page } from '@gm-mobile/react'

// 带标题栏的页面
<Page header={<div>我的页面</div>}>
  <div>页面内容</div>
</Page>

// 带底部导航的页面
<Page
  header={<div>首页</div>}
  tabbar={
    <div>
      <span>首页</span>
      <span>发现</span>
      <span>我的</span>
    </div>
  }
>
  <div>页面内容</div>
</Page>

// 白色背景页面
<Page white header={<div>标题</div>}>
  <div>页面内容</div>
</Page>

// 自定义内容区域样式
<Page
  header={<div>标题</div>}
  pageClassName='custom-content'
  className='custom-page'
>
  <div>页面内容</div>
</Page>

// 带搜索框的顶部区域
<Page
  header={<div>标题</div>}
  top={<input type='text' placeholder='搜索...' />}
>
  <div>页面内容</div>
</Page>

// 带底部按钮的页面
<Page
  header={<div>确认订单</div>}
  bottom={<button>提交订单</button>}
>
  <div>订单详情内容</div>
</Page>
```

### 高级用法

```jsx
import { Page } from '@gm-mobile/react'

// 完整的应用页面布局
<Page
  white
  header={
    <div>
      <button>返回</button>
      <span>商品详情</span>
      <button>分享</button>
    </div>
  }
  top={
    <div>
      <span>优惠信息</span>
    </div>
  }
>
  {/* 页面主要内容 */}
  <div>
    <img src='product.jpg' alt='商品图片' />
    <h2>商品名称</h2>
    <p>商品描述</p>
    <div>商品详情...</div>
  </div>
</Page>

// 固定头部和底部的表单页面
<Page
  header={<div>用户注册</div>}
  bottom={
    <div>
      <button type='submit'>提交注册</button>
    </div>
  }
  pageClassName='form-page'
>
  <form>
    <input type='text' placeholder='用户名' />
    <input type='password' placeholder='密码' />
    <input type='tel' placeholder='手机号' />
  </form>
</Page>

// 带标签栏导航的主页
<Page
  header={<div>应用首页</div>}
  tabbar={
    <div>
      <div>首页</div>
      <div>分类</div>
      <div>购物车</div>
      <div>我的</div>
    </div>
  }
>
  <div>首页内容</div>
</Page>
```

## 注意事项

1. **布局顺序**：
   - 页面从上到下的布局顺序为：header → top → children（内容区）→ bottom → tabbar
   - header 和 tabbar 会固定在页面的顶部和底部
   - top 和 bottom 区域也会固定，不会被内容区滚动覆盖

2. **内容区滚动**：
   - children（内容区）默认可以滚动，当内容超出视口高度时会出现滚动条
   - 使用 pageClassName 可以自定义内容区的样式，如背景色、内边距等

3. **背景色设置**：
   - 默认情况下，Page 使用浅灰色背景
   - 设置 `white` 属性为 true 时，使用白色背景，适合内容型页面

4. **区域使用建议**：
   - `header`：用于放置页面标题、返回按钮、操作按钮等
   - `top`：用于放置搜索框、提示信息、筛选条件等
   - `bottom`：用于放置操作按钮、统计信息等
   - `tabbar`：用于放置导航菜单，通常有多个导航项
   - 不需要的区域可以不传，布局会自动适应

5. **样式自定义**：
   - 使用 `className` 自定义整个 Page 容器的样式
   - 使用 `pageClassName` 自定义内容区域的样式
   - 建议通过 className 而非直接修改 style，便于统一管理样式

6. **Flex 布局**：
   - Page 内部使用 Flex 布局，自动处理各区域的高度分配
   - header、top、bottom、tabbar 区域会根据内容自动调整高度
   - children（内容区）会自动占据剩余空间

## 相关组件

- **Header** - 专门用于页面头部的组件
- **Tabbar** - 专门用于底部导航的组件
- **Flex** - Page 内部使用的 Flex 布局组件
- **LayoutRoot** - 应用根布局组件
