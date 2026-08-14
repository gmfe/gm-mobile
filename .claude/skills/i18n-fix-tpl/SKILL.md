---
name: i18n-fix-tpl
description: Use when @gm-mobile/locales 的 getLocale() 调用混入动态内容导致 key 永远无法匹配翻译——如 getLocale(`共${count}件`)、getLocale(变量)——或发现旧 gm-i18n 的 t() 残留调用(如 packages/react/src/component/counter/index.js)。先只读扫描分类,用户确认后修复为静态字面量或片段式调用。Do NOT use for 裸中文首次包裹(用 i18n-wrap)、key 收集与翻译(用 i18n-collect)、引号/格式统一等纯格式调整。
---

# 修复 getLocale 调用中的动态 key 错误

## 1. 职责与原则

处理已经位于 `getLocale()` 中、但因动态内容混入翻译 key 而**运行时永远无法命中 locale 文件**的调用,以及旧 `gm-i18n` 体系的残留调用。

机制前提(已核实):`getLocale(text)` 返回 `moduleMap[当前语言][text] || text`,**key 即中文原文,无插值**。因此 key 必须能在编写源码时静态确定;任何把运行时值拼进 key 的调用都是坏的——locale 文件里不可能存在对应的条目。

只修复真实的 i18n 语义错误,不做:

- 不包裹裸中文(→ **i18n-wrap**)
- 不统一单/双/反引号风格
- 不重命名业务变量、不重构表达式
- 不写 locale 文件(新 key 注册交 **i18n-collect**)
- 不改 `packages/locales/src/index.js` 运行时(加插值支持是另一决策)

两阶段执行:只读扫描出分类清单 → 用户确认条目 → 只改确认项。

## 2. 用法

| 用法 | 说明 |
|------|------|
| `/i18n-fix-tpl` | 扫描全部 `packages/*/src/**/*.{js,jsx}` |
| `/i18n-fix-tpl packages/react/src/` | 扫描指定目录 |
| `/i18n-fix-tpl packages/react/src/component/counter/index.js` | 扫描指定文件 |

排除 `packages/locales/**`、`**/node_modules/**`、`*stories*` 文件。

## 3. 分类与处理规则

### 类型 A:纯静态反引号调用——跳过

`getLocale(\`暂无数据\`)` 无 `${}`,与 `getLocale('暂无数据')` 语义一致。保持原样;仅改引号属于格式调整,不制造无价值 diff。用户明确要求统一风格时另行处理,不计入修复结果。

### 类型 B:动态内容混入 key——修复

**特征:** `getLocale` 参数中同时包含中文和运行时表达式。

```js
getLocale(`共${count}件商品`)
getLocale('共' + count + '件商品')
```

运行时每种 `count` 都产生不同的 key,locale 文件不可能覆盖,翻译永远落空。

**修复方式(按优先级):**

1. 分支有限且可枚举 → 整句静态字面量:

```js
status === 'full' ? getLocale('库存已满') : getLocale('库存不足')
```

2. 开放变量 → 片段式拆分(仓库既有约定,参照 `keyboard/keyboard.js`),变量边界切分、标点跟随前一片段:

```js
`${getLocale('共')}${count}${getLocale('件商品')}`
```

规则:

- 不改变表达式求值顺序;表达式含副作用/复杂分支时列「需人工判断」
- 每片尽量是可独立理解的短语;禁止把单字碎拆(如 `getLocale('共')` + `getLocale('同')` 拼「共同」)
- 片段式语序固定为中文语序;若目标语言语序可能不同,在报告中说明,不擅自改运行时

### 类型 C:纯变量调用——默认跳过

```js
getLocale(text)
getLocale(`${resname}`)
```

`text` 可能是后端下发的文案(此时 `getLocale` 是无害透传),也可能是误用。默认保持原样。只有同时满足以下条件,才能在用户确认后去掉调用:

1. 已追踪变量来源,确认它是最终展示文案而非翻译 key
2. 删除调用不改变输出(该变量值本就不在任何 locale 文件中)

即使满足,也作为独立的「确认性清理」报告,不计入自动修复项。

### 类型 D:旧 gm-i18n 残留——条件迁移

**特征:** `import { t } from 'gm-i18n'` 及其 `t('中文')` 调用。

已知实例:`packages/react/src/component/counter/index.js`(2 处 `t('下单数量超出当前库存')`)。`gm-i18n` 未在任何 `packages/*/package.json` 声明,是幻影依赖;其 `t()` 不消费 `@gm-mobile/locales` 的 `index.js` 运行时,语言切换对它不生效。

**处理:** 报告并建议迁移为 `getLocale`:

```js
// before
import { t } from 'gm-i18n'
{t('下单数量超出当前库存')}
// after
import { getLocale } from '@gm-mobile/locales'
{getLocale('下单数量超出当前库存')}
```

迁移需用户明确确认;确认后同文件所有 `t()` 一并迁移并移除 `gm-i18n` import。key 与中文原文相同,行为等价且进入统一语言切换。

### 类型 E:误匹配——跳过

- 非 getLocale 调用:`Request(\`...\`)`、`LocalStorage.get(\`...\`)` 等
- 注释、JSDoc
- import/require 路径、URL、日志、埋点、内部标识
- 已是静态字面量的正常 `getLocale('中文')` 调用

## 4. 扫描方法

1. Glob 目标范围 `.js`/`.jsx`,按 §2 排除
2. Grep 定位候选:`getLocale(\``、`getLocale(` 后接变量/拼接、`from 'gm-i18n'`、`\bt(\` 或 `\bt('`
3. 每个候选 Read 完整调用与变量来源;确认 `getLocale` 来自 `@gm-mobile/locales`、`t` 来自 `gm-i18n`,不处理同名局部函数或被遮蔽的调用
4. 按 A–E 分类;A/C/E 默认跳过,B/D 满足条件时列为可修复
5. 输出确认清单后停止,不改文件

报告格式:

```md
## getLocale 动态调用扫描报告

### 可修复
| # | 位置 | 类型 | 当前调用 | 建议调用 |

### 需人工判断
| # | 位置 | 类型 | 不确定原因 | 建议 |

### 默认跳过(统计)
| 类型 | 数量 | 原因 |

尚未修改文件,等待确认条目编号或范围。修复产生的新 key 不写 locale 文件,完成后可运行 /i18n-collect 注册。
```

## 5. 确认后修复与验证

1. 只处理确认条目;修改前重新 Read,内容已变化则停止该项并报告
2. 不做无关重构、变量重命名、调用风格调整或格式化
3. 类型 D 迁移后检查 `gm-i18n` import 已无残留引用再移除
4. 验证:
   - [ ] Grep 复扫确认范围,已确认项不再保留错误形式
   - [ ] Read 逐项检查修改后的完整调用、括号、引号
   - [ ] 动态句转换后表达式求值顺序不变
   - [ ] A/C 及未确认存量未被修改
   - [ ] `git diff` 只包含确认的修改
   - [ ] 项目已有 Prettier/ESLint 可对修改文件运行;无依赖则不安装、跳过并说明
5. 提示用户:新产生的静态 key 可通过 `/i18n-collect` 注册进 en.json/th.json

## 6. 红灯(出现即停)

| 念头 | 现实 |
|------|------|
| 「`getLocale(\`共${n}件\`)` 能跑,不用管」 | 运行时 key 含变量值,locale 文件永远命不中,是坏的 |
| 「变量 key 多半是文案,直接删 getLocale」 | 必须追踪来源并满足 §类型C 全部条件,且用户确认 |
| 「顺手给 index.js 加个插值功能」 | 改运行时是另一决策,需用户明确提出 |
| 「`t()` 和 `getLocale` 差不多,混用没事」 | gm-i18n 是幻影依赖且不受统一语言切换控制;禁止新增,存量报类型 D |
| 「反引号没插值,顺手统一成单引号」 | 纯格式调整制造无价值 diff,默认不做 |
| 「Grep 到可疑调用直接改」 | 必须 Read 确认来源与上下文;不确定只报告 |
