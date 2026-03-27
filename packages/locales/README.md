# @gm-mobile/locales

## 简介

@gm-mobile/locales 是 gm-mobile 组件库的国际化（i18n）资源包，提供了多种语言的翻译文件。

## 安装

```bash
npm install @gm-mobile/locales
# 或
yarn add @gm-mobile/locales
```

## 包含的语言

- **zh** - 简体中文
- **zh-HK** - 繁体中文（香港）
- **en** - 英语
- **th** - 泰语
- **ug** - 维吾尔语

## 文件结构

```
locales/
├── index.js         # 主入口文件
├── zh.json         # 简体中文翻译
├── zh-HK.json      # 繁体中文（香港）翻译
├── en.json         # 英语翻译
├── th.json         # 泰语翻译
└── ug.json         # 维吾尔语翻译
```

## 使用方式

### 在组件中使用

通常配合 `gm-i18n` 库使用：

```jsx
import { setLocale } from 'gm-i18n'
import zh from '@gm-mobile/locales/zh.json'

// 设置语言
setLocale('zh', zh)

// 使用翻译
import { t } from 'gm-i18n'
const title = t('button.confirm')  // 获取"确认"的翻译
```

### 直接导入使用

```jsx
import zh from '@gm-mobile/locales/zh.json'
import en from '@gm-mobile/locales/en.json'

const translations = {
  zh,
  en,
}

// 根据用户选择加载对应语言
const userLang = navigator.language || 'zh'
const currentTranslation = translations[userLang] || translations.zh
```

## 翻译文件格式

每个语言文件都是 JSON 格式，包含键值对：

```json
{
  "button.confirm": "确认",
  "button.cancel": "取消",
  "dialog.title": "提示",
  ...
}
```

## 开发依赖

- **gm-i18n**: ^2.8.0

## 相关包

- [@gm-mobile/react](../react/README.md) - React 组件库
- [@gm-mobile/business](../business/README.md) - 业务组件库

## 贡献翻译

如需添加新的语言支持，请：

1. 创建新的语言文件（如 `ja.json` 用于日语）
2. 参考现有语言文件的键名结构
3. 确保所有键都有对应的翻译
4. 更新 `index.js` 导出

## 许可证

ISC

---

**版本**: v1.1.12
**支持语言数**: 5种
**最后更新**: 2026-03-27
