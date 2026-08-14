---
name: i18n-collect
description: Use when 需要扫描 packages/*/src 中 @gm-mobile/locales 的 getLocale('中文') 调用,把中文 key 以保守并集同步进 packages/locales/src/en.json 与 th.json——例如新增文案后 locale 文件未注册、en/th key 集合漂移、定期回扫。只追加缺失 key(新 key 空 value 待翻译),不删/不改/不重排已有条目;默认只读预览,确认后写入;可选起草 en/th 翻译。Do NOT use for 裸中文包裹(用 i18n-wrap)、拼接式动态文案改造(用 i18n-fix-tpl)、运行时语言切换调试、新增语言文件、删除历史 key。
---

# 收集 getLocale 中文 key 并同步多语言文件

## 1. 目标与边界

扫描 `packages/*/src/**/*.{js,jsx,ts,tsx}` 中来自 `@gm-mobile/locales` 的 `getLocale('中文')` 调用,把可静态确定的中文字面量 key 以**保守并集**同步进 `packages/locales/src/en.json` 与 `packages/locales/src/th.json`:

```text
最终 en.json / th.json
= 文件已有 key/value(原样保留)
∪ 源码中可静态确定的中文 key(新增,value 置空 "")
```

**只追加、不覆盖、不删除、不重排。** 孤儿 key(文件有、源码无)只报告不删除;已有 value(译文)绝不被改动。

不处理:裸中文首次包裹(→ **i18n-wrap**)、拼接式动态文案改造(→ **i18n-fix-tpl**)、运行时语言切换问题、新增语言文件(需改 `index.js`,属另一决策)、删除历史 key。`zh-HK.json` 与 `ug.json` 默认不在写入范围,用户明确要求时按同一规则处理。

## 2. 项目多语言机制(已核实的事实)

- 运行时:`packages/locales/src/index.js`,`getLocale(text)` 返回 `moduleMap[当前语言][text] || text`。**key 即中文原文**,查不到或 value 为空字符串时回退显示 key 本身——所以新 key 置空 value 是运行时安全的。
- `zh.json` 当前为 `{}`,无需维护(中文 key 自身即兜底显示)。
- 标准调用形态:`import { getLocale } from '@gm-mobile/locales'`,第一参数为中文字符串字面量。可能存在 `as` 别名,必须查 import 来源确认,不能只按函数名归类。
- `getLocale` **不支持插值**;`` `${getLocale('请输入大于')} ${min}` `` 这类拼接里,各字面量片段各自是独立 key,照常收集;拼接/动态句改造不在本技能范围。
- 多行调用存在(如 `getLocale(\n  '或等于'\n)`),禁止凭 Grep 单行命中截断提取。

## 3. 用法

| 用法 | 说明 |
|------|------|
| `/i18n-collect` | 全量扫描,输出只读 dry-run 预览 |
| `/i18n-collect write` | 输出写入计划;用户确认该计划后写入 en.json + th.json |
| `/i18n-collect translate` | 在收集基础上为**空 value** 条目起草 en/th 译文(同样先只读预览,确认后写入) |

**首次执行永远只读。**「执行」「收集」「运行」或调用 `write`/`translate`,都不等于确认当前计划。

## 4. 工具与禁止项

优先 `Glob`(文件清单)、`Grep`(定位 import/调用)、`Read`(确认来源与完整字面量)、`Edit`/`Write`(确认后主流程单点写入);`Bash` 仅用于只读搜索与写后 `JSON.parse` / `git diff` 校验。当前规模(约 24 个候选文件)主流程直接处理;候选文件 >30 时可用只读 Agent 互斥分片(每片 ≤20 文件,Agent 只回传 key 与位置,禁止写任何文件)。

禁止:新建/运行自定义提取脚本;AST/Babel;凭 Grep 命中直接写 JSON;Agent 写共享文件;多执行单元并发写同一文件;覆盖已有 value;删除/重排历史 key。

## 5. 提取规则

1. **候选文件** = 含 `getLocale` import 或调用的 `packages/*/src/**/*.{js,jsx,ts,tsx}`,排除 `packages/locales/**`、`**/node_modules/**`、storybook stories 文件。逐个 Read 确认 `getLocale` 来自 `@gm-mobile/locales`(含 `as` 别名);来源不明的同名调用只报告不收集。
2. **只收集字符串字面量参数**:单/双引号字面量、跨行的纯字面量。变量、表达式、整体传入的 template literal 等无法静态确定的 → 未决清单,只报告不猜。
3. 字面量含 `"` / `\` 时按 JSON 规则转义;禁止在转义字符处截断 key。
4. 过滤与分类:
   - 空/纯空白字面量:跳过,记 `filtered`。
   - 不含任何 CJK 字符的字面量(如 `getLocale('OK')`):可疑清单,默认不收集,用户确认后才纳入。
   - 同一 key 多处调用:按 key 去重,记录首处位置与调用次数。

## 6. 合并规则(对每个目标文件独立执行)

- 已有 key:value 与顺序原样保留;**已有 value 永不覆盖**(含 value==key 的未翻译占位条目)。
- 源码有、文件无的 key:按(文件路径, 行号)顺序追加到文件末尾,value = `""`。
- 文件有、源码无的孤儿 key:只报告,不删。
- en.json 与 th.json 的 key 集合漂移(仅一边存在的 key)在报告中单列;**默认不互相补齐**(孤儿可能是有意为之),用户确认后执行。
- 待翻译清单 = value 为空或 value === key 的条目,报告中列出供翻译跟进。

## 7. 验证

**写入前**:候选文件全部成功读取;每个拟新增 key 都有源码位置;filtered/可疑/未决项已分类列出。任一候选文件读取失败 = 扫描不完整,**禁止写入**。

**写入后**:两个目标文件 `JSON.parse` 通过;`git diff` 显示仅有末尾追加、无已有行改动;实际新增 key 数 = 计划数;两文件 key 集合 = 各自原有 key ∪ 源码 key。

## 8. Dry-run 报告 → 确认 → 写入

```md
## getLocale key 收集预览

### 扫描
- 候选文件 / 调用点 / 唯一 key:X / X / X
- filtered / 可疑 / 未决动态调用:X / X / X

### 待新增 key(en.json 缺 X 条 / th.json 缺 X 条)
| # | key | 首处位置 | 调用次数 |

### 孤儿 key(只报告,不删)
| key | 所在文件 |

### en/th key 集合漂移
| key | 仅存在于 |

### 可疑与非字面量调用
| 类型 | 位置 | 内容 |

### 待翻译(value 为空或 value==key)
- en.json:X 条;th.json:X 条

尚未写入。确认后写入 packages/locales/src/en.json 与 th.json。
```

预览条目必须完整展示(过多时分批),不能只给数量就要求确认。用户明确确认计划后,主流程**串行单点**写两个文件,写后按 §7 校验并贴 diff 摘要。

## 9. 可选:起草翻译

用户要求 `translate` 时,为待翻译条目起草译文——en:简洁 UI 英语;th:参考已有条目风格(如 `今天→วันนี้`、`确定→ตกลง`、`取消→ยกเลิก`)。只填空 value,不动已有译文;产出报告中标注「草稿,待人工校对」。已有非空译文即使看着过时也不改,只可在报告中建议。

## 10. 红灯(出现即停)

| 念头 | 现实 |
|------|------|
| 「用户说『执行』了,直接写」 | 首次永远只读;确认当前计划后才写 |
| 「这个 key 像孤儿,顺手删」 | 只报告不删;清孤儿是单独决策 |
| 「已有译文过时,换个更好的」 | 已有 value 永不覆盖,只可报告建议 |
| 「Grep 到 `getLocale('x')` 直接收」 | 先 Read 确认 import 来源与完整字面量(多行/转义/别名) |
| 「新 key 的 value 填 key 本身更保险」 | 新 key 一律空 value;`|| text` 回退已保证运行时显示中文 |
| 「变量 key 猜一个写进去保险」 | 非字面量调用只进未决清单,不猜 |
| 「顺手把 zh-HK/ug 也补齐」 | 默认只写 en.json 与 th.json;其他目标需用户明确要求 |
| 「候选文件读取失败,跳过继续」 | 扫描不完整禁止写入;先解决读取失败 |
