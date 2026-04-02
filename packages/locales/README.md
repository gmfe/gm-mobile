# @gm-mobile/locales

## 简介
国际化工具包 - 提供多语言支持和国际化工具函数，被其他组件库内部使用。

## 安装

```bash
npm install @gm-mobile/locales
```

## 使用

### 快速开始

```jsx
import { getLocale, setLocale } from '@gm-mobile/locales'

// 设置当前语言
setLocale('en')

// 获取翻译文本
const text = getLocale('确定') // 返回 "OK"
```

## API

### 导出列表

| 导出项 | 类型 | 说明 |
|--------|------|------|
| `getLocale` | 函数 | 根据当前语言获取翻译文本 |
| `setLocale` | 函数 | 设置当前语言 |

### 函数

#### `setLocale(lng)`

设置当前语言。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| lng | 语言标识 | `string` | 是 |

#### `getLocale(text)`

根据当前语言获取翻译文本，找不到翻译时返回原文。

| 参数 | 说明 | 类型 | 必填 |
|------|------|------|------|
| text | 需要翻译的中文文本 | `string` | 是 |

**返回值**：`string` - 翻译后的文本

### 支持的语言

| 语言标识 | 说明 |
|----------|------|
| `zh` | 简体中文（默认） |
| `zh-HK` | 繁体中文（香港） |
| `en` | 英文 |
| `th` | 泰文 |
| `ug` | 维吾尔文 |

## 示例

### 切换语言

```jsx
import { getLocale, setLocale } from '@gm-mobile/locales'

const App = () => {
  return (
    <div>
      <button onClick={() => setLocale('zh')}>中文</button>
      <button onClick={() => setLocale('en')}>English</button>
      <button onClick={() => setLocale('th')}>ไทย</button>

      <p>{getLocale('确定')}</p>
      <p>{getLocale('取消')}</p>
    </div>
  )
}
```

## 注意事项
- 默认语言为简体中文（`zh`）
- 找不到对应翻译时会返回原文（中文 key）
- 语言包文件由脚本自动生成，位于 `src/lng/` 目录下
- 其他组件库（如 `@gm-mobile/c-react`、`@gm-mobile/react`）内部依赖此包进行国际化

## 相关包
- [@gm-mobile/c-react](../c-react) - 基础 React 组件
- [@gm-mobile/react](../react) - 主组件库
