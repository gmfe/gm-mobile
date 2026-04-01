# Flex

## 简介

Flex 弹性布局组件 - 用于创建灵活的布局容器，支持 Flex 布局的各种对齐方式和方向设置，简化移动端弹性布局的开发。

## API

### Flex Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| flex | flex 值，true 表示 flex:1 | number or boolean | - | 否 |
| auto | 设置 flex: auto | boolean | false | 否 |
| none | 禁用 flex（等同于 flex: none） | boolean | false | 否 |
| width | 设置宽度 | string | - | 否 |
| height | 设置高度 | string | - | 否 |
| row | 设置为行布局（主轴为水平方向） | boolean | false | 否 |
| column | 设置为列布局（主轴为垂直方向） | boolean | false | 否 |
| wrap | 允许换行 | boolean | false | 否 |
| nowrap | 不允许换行 | boolean | false | 否 |
| justifyStart | 主轴起点对齐 | boolean | false | 否 |
| justifyEnd | 主轴终点对齐 | boolean | false | 否 |
| justifyCenter | 主轴居中对齐 | boolean | false | 否 |
| justifyBetween | 主轴两端对齐 | boolean | false | 否 |
| justifyAround | 主轴分散对齐 | boolean | false | 否 |
| alignStart | 交叉轴起点对齐 | boolean | false | 否 |
| alignEnd | 交叉轴终点对齐 | boolean | false | 否 |
| alignCenter | 交叉轴居中对齐 | boolean | false | 否 |
| alignBaseline | 交叉轴基线对齐 | boolean | false | 否 |
| alignStretch | 交叉轴拉伸 | boolean | false | 否 |
| alignContentStart | 多行交叉轴起点对齐 | boolean | false | 否 |
| alignContentEnd | 多行交叉轴终点对齐 | boolean | false | 否 |
| alignContentCenter | 多行交叉轴居中对齐 | boolean | false | 否 |
| alignContentBetween | 多行交叉轴两端对齐 | boolean | false | 否 |
| alignContentAround | 多行交叉轴分散对齐 | boolean | false | 否 |
| alignContentStretch | 多行交叉轴拉伸 | boolean | false | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 子元素 | any | - | 否 |

## 示例

### 基础用法

```jsx
import { Flex } from '@gm-mobile/react'

// 行布局（水平排列）
<Flex row>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>

// 列布局（垂直排列）
<Flex column>
  <div>项目 1</div>
  <div>项目 2</div>
  <div>项目 3</div>
</Flex>
```

### 常见用法

```jsx
import { Flex } from '@gm-mobile/react'

// 等分容器
<Flex row>
  <Flex flex={1}>项目 1</Flex>
  <Flex flex={1}>项目 2</Flex>
  <Flex flex={1}>项目 3</Flex>
</Flex>

// 不同比例分配
<Flex row>
  <Flex flex={1}>占比 1</Flex>
  <Flex flex={2}>占比 2</Flex>
  <Flex flex={3}>占比 3</Flex>
</Flex>

// 固定宽度 + 自适应
<Flex row>
  <div style={{ width: '100px' }}>固定宽度</div>
  <Flex auto>自适应</Flex>
</Flex>

// 居中对齐
<Flex row justifyCenter alignCenter>
  <div>水平垂直居中</div>
</Flex>

// 两端对齐
<Flex row justifyBetween>
  <div>左侧</div>
  <div>右侧</div>
</Flex>

// 自动换行
<Flex row wrap>
  <Flex width="30%">项目 1</Flex>
  <Flex width="30%">项目 2</Flex>
  <Flex width="30%">项目 3</Flex>
  <Flex width="30%">项目 4</Flex>
</Flex>
```

### 高级用法

```jsx
import { Flex } from '@gm-mobile/react'

// 典型的移动端布局结构
<Flex column style={{ height: '100vh' }}>
  {/* 固定高度的头部 */}
  <div style={{ height: '50px' }}>头部</div>

  {/* 自适应的中间内容区 */}
  <Flex auto column>
    <div>内容区域</div>
  </Flex>

  {/* 固定高度的底部 */}
  <div style={{ height: '50px' }}>底部</div>
</Flex>

// 卡片布局
<Flex column style={{ padding: '16px' }}>
  <Flex row justifyBetween alignCenter style={{ marginBottom: '12px' }}>
    <span>标题</span>
    <span>更多</span>
  </Flex>
  <div>内容区域</div>
</Flex>

// 表单行布局
<Flex row alignCenter style={{ marginBottom: '12px' }}>
  <div style={{ width: '80px' }}>标签：</div>
  <Flex auto>
    <input style={{ width: '100%' }} placeholder="请输入" />
  </Flex>
</Flex>

// 垂直居中的弹窗内容
<Flex column justifyCenter alignCenter style={{ height: '200px' }}>
  <div>提示信息</div>
  <Flex row justifyAround style={{ marginTop: '20px', width: '100%' }}>
    <button>取消</button>
    <button>确定</button>
  </Flex>
</Flex>

// 侧边栏布局
<Flex row style={{ height: '100vh' }}>
  {/* 固定宽度的侧边栏 */}
  <div style={{ width: '200px' }}>侧边栏</div>
  {/* 自适应的主内容区 */}
  <Flex auto column>
    <div>主内容</div>
  </Flex>
</Flex>
```

## 注意事项

1. **方向设置**：
   - `row` 和 `column` 互斥，同时使用时后者会覆盖前者
   - 默认情况下是块级元素，不设置方向时不会有 flex 布局效果
   - 必须设置 `row` 或 `column` 才能启用 flex 布局

2. **flex 属性的使用**：
   - `flex={true}` 等同于 `flex={1}`，表示占据剩余空间的 1 份
   - `flex={2}` 表示占据 2 份空间
   - `auto` 表示 `flex: auto`，元素会根据内容自动伸缩
   - `none` 禁用 flex，配合 `width`/`height` 使用固定尺寸

3. **对齐方式**：
   - `justify*` 系列属性控制主轴（水平方向 row 时）对齐
   - `align*` 系列属性控制交叉轴（垂直方向 row 时）对齐
   - `alignContent*` 系列仅在有多个行/列时生效（需要 wrap）

4. **尺寸控制**：
   - 设置 `width` 或 `height` 时会自动添加 `m-flex-none` 类
   - 建议使用字符串形式的尺寸值（如 '100px'、'50%'）
   - 可以通过 `style` 自定义更复杂的尺寸

5. **性能考虑**：
   - Flex 组件是对原生 flex 布局的封装，性能与原生 flex 相当
   - 避免在多层嵌套中过度使用复杂的 flex 属性
   - 对于简单的布局，直接使用 CSS 可能更高效

## 相关组件

- **Divider** - 分割线组件，常用于 flex 布局中的分隔
- **List** - 列表组件，内部使用 flex 布局
- **Header** - 头部组件，常与 flex 布局配合实现固定头部+自适应内容的页面结构
- **LayoutRoot** - 根布局组件，提供完整的页面布局解决方案
