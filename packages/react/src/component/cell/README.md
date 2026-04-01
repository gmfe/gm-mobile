# Cell

## 简介
Cell 单元格组件 - 用于构建列表和表单的基础组件，支持多种布局样式、图标、箭头指示器和表单验证展示。

## API

### Cell

基础单元格组件，用于构建列表项。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| access | 右侧带箭头指示器 | boolean | - | 否 |
| icon | 左侧图标 | ReactElement | - | 否 |
| left | 左侧内容（文本或组件） | ReactElement \| string | - | 否 |
| right | 右侧内容（文本或组件） | ReactElement \| string | - | 否 |
| href | 点击跳转链接 | string | - | 否 |
| children | 主体内容 | ReactElement \| string | - | 否 |
| onClick | 点击事件回调 | function | () => {} | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

### CellForm

表单单元格组件，基于 Cell 封装，用于表单场景，支持标签显示和错误提示。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| label | 标签文本 | string | - | 否 |
| labelWidth | 标签宽度，如 '100px' | string | - | 否 |
| error | 错误提示信息 | string | - | 否 |
| required | 是否显示必填标记（红色星号） | boolean | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |

**注意**：CellForm 继承了 Cell 的所有 props，包括 access、right、onClick 等。

### Cells

单元格容器组件，用于包裹一组 Cell。

#### Props

| 属性 | 说明 | 类型 | 默认值 | 必填 |
|------|------|------|--------|------|
| title | 容器标题 | string | - | 否 |
| mini | 是否使用迷你样式（更紧凑的间距） | boolean | - | 否 |
| className | 自定义类名 | string | - | 否 |
| style | 自定义样式 | object | - | 否 |
| children | 子元素 | ReactElement | - | 否 |

### CellsForm

表单容器组件，基于 Cells 封装，专门用于表单场景。

#### Props

继承 Cells 的所有 props（title、mini、className、style、children）。

**注意**：不要向 CellsForm 传递 onSubmit 属性，如需表单提交功能，请在外层包裹 `<form>` 元素。

## 示例

### 基础用法

最简单的单元格列表，展示文本内容：

```jsx
import { Cell, Cells } from '@gm-mobile/react'

<Cells title='基本信息'>
  <Cell>用户名</Cell>
  <Cell right={'已认证'}>手机号</Cell>
  <Cell access right={'查看详情'}>
    账户余额
  </Cell>
</Cells>
```

### 带图标和跳转

带图标和箭头的列表项，支持点击跳转：

```jsx
import { Cell, Cells } from '@gm-mobile/react'
import SVGSearch from '@gm-mobile/react/svg/search.svg'

<Cells title='常用功能'>
  <Cell
    access
    icon={<SVGSearch style={{ fontSize: '20px' }} />}
    right={'搜索'}
    onClick={() => console.log('点击搜索')}
  >
    搜索功能
  </Cell>
  <Cell
    access
    right={'进入官网'}
    href='https://www.guanmai.cn'
  >
    官网链接
  </Cell>
</Cells>
```

### 表单场景

使用 CellForm 和 CellsForm 构建表单：

```jsx
import { CellForm, CellsForm } from '@gm-mobile/react'
import { Input } from '@gm-mobile/react'

<CellsForm title='个人信息'>
  <CellForm required label='姓名' labelWidth='100px'>
    <Input
      type='text'
      form
      value={name}
      onChange={(e) => setName(e.target.value)}
      placeholder='请输入姓名'
    />
  </CellForm>
  <CellForm label='年龄' labelWidth='100px'>
    <Input
      type='number'
      form
      value={age}
      onChange={(e) => setAge(e.target.value)}
      placeholder='请输入年龄'
    />
  </CellForm>
  <CellForm
    label='地区'
    labelWidth='100px'
    access
    right={<div>请选择</div>}
    onClick={() => console.log('选择地区')}
  >
    {area || <div className='m-text-placeholder'>省市区县、乡镇</div>}
  </CellForm>
</CellsForm>
```

### 表单验证

显示错误提示的表单：

```jsx
import { CellForm, CellsForm } from '@gm-mobile/react'
import { InputPassword } from '@gm-mobile/react'

<CellsForm title='账号设置'>
  <CellForm
    label='密码'
    labelWidth='100px'
    required
    error='密码长度不能少于6位'
  >
    <InputPassword
      form
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      placeholder='请输入密码'
    />
  </CellForm>
</CellsForm>
```

### 迷你样式

使用 mini 属性创建更紧凑的列表：

```jsx
import { Cell, Cells } from '@gm-mobile/react'

<Cells title='订单信息' mini>
  <Cell
    access
    right={<div className='m-text-accent m-text-12'>兑换商品</div>}
  >
    <div className='m-text-desc'>积分已1000，可兑换商品</div>
  </Cell>
  <Cell
    access
    right={<div className='m-text-desc m-text-12'>共 20 件</div>}
  >
    商品列表
  </Cell>
  <Cell
    right={<div className='m-text-12'>-￥100</div>}
  >
    <div className='m-text-desc'>限时优惠</div>
  </Cell>
</Cells>
```

### 自定义左右内容

灵活使用 left、right 和 children：

```jsx
import { Cell, Cells } from '@gm-mobile/react'
import Flex from '@gm-mobile/react'

<Cells>
  <Cell
    left={<div style={{ color: 'red' }}>重要</div>}
    right={<span className='m-text-desc'>2024-01-01</span>}
  >
    这是一条重要通知
  </Cell>
  <Cell
    left={
      <Flex>
        <img src='avatar.png' style={{ width: '40px', height: '40px' }} />
      </Flex>
    }
    right={<div>></div>}
  >
    用户信息
  </Cell>
</Cells>
```

## 注意事项

- Cell 组件的 `href` 和 `onClick` 可以同时使用，href 会优先触发页面跳转，然后再执行 onClick 回调
- CellForm 的 `labelWidth` 建议统一设置，以保持表单对齐美观（如统一为 '100px' 或 '120px'）
- CellForm 的 `required` 只显示红色星号标记，不包含实际的验证逻辑，验证需要自行实现
- CellsForm 不接受 `onSubmit` 属性，如需表单提交，请在外层使用 `<form>` 元素包裹
- mini 样式适用于信息密度较高的场景，如订单详情、数据列表等
- `right` 属性支持字符串和 React 元素，如果是字符串会自动添加样式类名 `m-cell-right`
- 使用 `access` 属性时会自动显示右箭头图标，不需要手动添加

## 相关组件

- [List](../list/README.md) - 列表组件
- [Input](../input/README.md) - 输入框组件
- [Textarea](../textarea/README.md) - 文本域组件
- [Flex](../flex/README.md) - 弹性布局组件
