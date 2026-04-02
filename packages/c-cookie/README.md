# @gm-mobile/c-cookie

## 简介
Cookie 工具包 - 跨平台的 Cookie 读写工具，封装了 `js-cookie` 库。

## 安装

```bash
npm install @gm-mobile/c-cookie
```

### peerDependencies

```json
{
  "js-cookie": "^2.2.1",
  "weapp-cookie": "^1.4.6"
}
```

## 使用

### 快速开始

```jsx
import { Cookie } from '@gm-mobile/c-cookie'

// 设置 Cookie
Cookie.set('name', 'value')

// 获取 Cookie
const value = Cookie.get('name')

// 删除 Cookie
Cookie.remove('name')
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `Cookie` | 对象 | Cookie 操作工具 |

### Cookie 方法

| 方法 | 说明 | 参数 | 返回值 |
|------|------|------|--------|
| `Cookie.get(key)` | 获取 Cookie 值 | `key: string` | `string \| undefined` |
| `Cookie.set(key, value)` | 设置 Cookie 值 | `key: string, value: string \| object` | - |
| `Cookie.remove(key)` | 删除 Cookie | `key: string` | - |

## 示例

### 基础用法

```jsx
import { Cookie } from '@gm-mobile/c-cookie'

// 设置
Cookie.set('token', 'abc123')
Cookie.set('user', JSON.stringify({ name: '张三' }))

// 获取
const token = Cookie.get('token')

// 删除
Cookie.remove('token')
```

## 注意事项
- Web 端使用 `js-cookie` 实现
- 小程序端使用 `weapp-cookie` 实现
- 需要根据运行环境安装对应的 peerDependencies

## 相关包
- [@gm-mobile/c-tool](../c-tool) - 工具函数库
