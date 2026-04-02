# @gm-mobile/c-tool

## 简介
工具函数库 - gm-mobile 组件库的底层工具包，提供环境判断、存储、拼音转换、UUID 等通用工具函数。

## 安装

```bash
npm install @gm-mobile/c-tool
```

## 使用

### 快速开始

```jsx
import { is, UUID, pinyin, getCharLength } from '@gm-mobile/c-tool'

// 环境判断
if (is.weixin()) {
  console.log('微信环境')
}

// 生成 UUID
const id = UUID.generate()

// 汉字转拼音
const py = pinyin('你好') // "nihao"

// 计算字符长度（中文算2个字符）
const len = getCharLength('你好ab') // 6
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `is` | 对象 | 环境判断工具 |
| `UUID` | 对象 | UUID 生成器 |
| `pinyin` | 函数 | 汉字转拼音 |
| `getCharLength` | 函数 | 计算字符长度（中文算2个字符） |
| `groupByWithIndex` | 函数 | 带索引的分组 |
| `StorageFactory` | 类 | 存储工厂类 |
| `warn` | 函数 | 开发环境警告 |
| `devWarn` | 函数 | 开发环境回调 |
| `devWarnForHook` | 函数 | Hook 中开发环境回调 |

### is

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `is.web()` | 是否为 Web 环境 | `boolean` |
| `is.weApp()` | 是否为微信小程序环境 | `boolean` |
| `is.iOS()` | 是否为 iOS 设备 | `boolean` |
| `is.weixin()` | 是否为微信浏览器 | `boolean` |
| `is.phone()` | 是否为移动设备 | `boolean` |
| `is.promise(arg)` | 是否为 Promise | `boolean` |
| `is.chinese(value)` | 是否包含中文 | `boolean` |

### UUID

| 方法 | 说明 | 返回值 |
|------|------|--------|
| `UUID.generate()` | 生成 UUID v4 | `string` |

### pinyin(source, style?)

将汉字转为拼音。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| source | 汉字文本 | `string` | 是 |
| style | 转换风格，`'first_letter'` 返回首字母 | `string` | 否 |

**返回值**：`string`

### getCharLength(text)

计算字符长度，中文算 2 个字符，其他算 1 个字符。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 文本 | `string` | 是 |

**返回值**：`number`

### groupByWithIndex(list, cb)

带索引的分组函数，类似 `_.groupBy` 但回调支持 index 参数。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| list | 数组 | `any[]` | 是 |
| cb | 分组回调 | `(value, index) => any` | 是 |

**返回值**：`object`

### StorageFactory

存储工厂类，用于创建统一的存储操作实例。

### warn / devWarn / devWarnForHook

| 函数 | 说明 |
|------|------|
| `warn(...args)` | 仅开发环境输出 console.warn |
| `devWarn(callback)` | 仅开发环境执行回调 |
| `devWarnForHook(callback)` | 仅开发环境执行 useEffect 回调 |

## 注意事项
- `is.weApp()` 通过 `process.env.TARO_ENV` 判断
- `pinyin` 使用内置的汉字-拼音映射表，采用二分查找实现
- `warn` 系列函数仅在非生产环境下执行，生产环境自动忽略

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件库（依赖本包）
- [@gm-mobile/c-cookie](../c-cookie) - Cookie 工具（依赖本包）
