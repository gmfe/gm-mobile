---
name: i18n-wrap
description: Use when packages/*/src 源码中存在未进入 getLocale() 的用户可见中文(裸中文、硬编码中文)需要国际化包裹——例如新增/存量组件补齐 i18n、code review 发现裸中文。包裹为 @gm-mobile/locales 的 getLocale('中文原文');两阶段执行:先只读扫描出报告,用户确认后才改源码。Do NOT use for 收集已包裹 key 到 en/th.json(用 i18n-collect)、翻译文案(i18n-collect translate)、修复 getLocale 动态调用或旧 gm-i18n 残留(用 i18n-fix-tpl)、运行时语言切换调试。
---

# 裸中文 getLocale 包裹

## 1. 职责与边界

扫描 `packages/*/src/**/*.{js,jsx}` 中**未被 `getLocale()` 包裹的用户可见中文**,经用户确认后包裹为 `getLocale('中文原文')` 并补全 import。仅用 Claude Code 原生工具,不装插件、不调外部服务。

**两阶段:** 第一阶段只读扫描、在聊天输出分类报告,**不改任何文件**;用户确认编号后,第二阶段只改确认项。

边界与交接:

- 裸中文首次包裹:本技能处理
- 已包裹 key 收集进 `en.json`/`th.json`:交 **i18n-collect**(本技能不写 locale 文件)
- `getLocale()` 内混入动态内容、旧 `gm-i18n` 残留:交 **i18n-fix-tpl**
- 已在 `getLocale()` 内的不规范但可用调用:跳过,不重构

## 2. 项目机制事实(已核实)

- 运行时:`packages/locales/src/index.js`,`getLocale(text)` 返回 `moduleMap[当前语言][text] || text`。**key 即中文原文**,无 locale 条目时回退显示 key 本身——所以**包裹后无需立即写任何 locale 文件**,中文环境下行为不变。
- `getLocale` **不支持插值**,只接受一个字符串参数。
- 标准 import:`import { getLocale } from '@gm-mobile/locales'`(named import,全仓库统一形态)。
- `@gm-mobile/react`、`@gm-mobile/business`、`@gm-mobile/service_time` **均已声明** `@gm-mobile/locales` 依赖,补 import 不涉及 package.json。
- 仓库既有的动态句约定是**片段式**(见 `packages/react/src/component/keyboard/keyboard.js`):`` `${getLocale('请输入大于')} ${min} ${getLocale('或等于')}` ``。
- 唯一例外:`packages/react/src/component/counter/index.js` 使用旧 `gm-i18n` 的 `t()`(该依赖未在任何 package.json 声明,属幻影依赖)。**不跟随、不新增这种用法**,发现时只报告(迁移交 i18n-fix-tpl)。

## 3. 用法

| 用法 | 说明 |
|------|------|
| `/i18n-wrap` | 扫描全部 `packages/*/src` |
| `/i18n-wrap packages/react/src/component/calendar/` | 扫描指定目录 |
| `/i18n-wrap packages/react/src/component/canvas/index.js` | 扫描指定文件 |

指定路径必须位于某个 `packages/*/src/` 下,只处理 `.js`/`.jsx`。

## 4. 核心原则(纪律,不可妥协)

### 4.1 候选命中 ≠ 应修改

Grep 只用于定位候选。每处候选必须先 Read 所在函数/组件的完整上下文,判断:

- 是否已位于 `getLocale()` 内(禁止二次包裹)
- 中文是否最终进入用户界面
- 修改是否会改变数据协议、控制逻辑、DOM 结构或求值顺序

**禁止仅凭 Grep 结果或正则批量替换。** 用途不明、上下文不足时只报告不修改。

### 4.2 扫描与修改严格分离

第一次执行只输出扫描报告并明确「尚未修改文件,等待确认」。用户确认后只能改确认编号范围内的条目,不能把「确认文件」扩张成「修改文件内所有候选」。

## 5. 扫描范围与排除

默认排除:

- `packages/locales/**`(locale 资源自身)
- `**/node_modules/**`
- storybook 文件:`*stories*`(如 `stories.js`、`classname_stories.js`;其中大量中文是 demo 数据)
- 生成/压缩/vendored 源码
- 非 `.js`/`.jsx` 后缀

排除项中的文件如被用户明确指定,纳入扫描但在报告中单列。

## 6. 结果分类

**应处理**(确认进入用户界面后):

- JSX 渲染文本:`<Button>保存</Button>`
- 用户可见 JSX 属性:`placeholder` `title` `aria-label` `alt`
- `Toast`/`Tip`/`Dialog`/`Modal` 等提示内容
- 菜单、下拉项、状态标签、空状态等最终展示字段
- 最终展示给用户的错误信息

`label`/`text`/`name`/`title` 等字段不能仅凭字段名判断,必须确认消费端。

**明确跳过**:

- 注释、JSDoc
- 已被 `getLocale()` 包裹的内容
- `console.*` 和内部 logger 调试文本
- 埋点事件名和埋点属性值
- API 协议值、状态码、内部枚举、storage key
- 路由/URL/文件路径/import/require 路径
- `className`/`id`/selector/`data-*`
- 对象属性名和代码标识符

**需人工判断**(只报告,确认后处理):

- `throw new Error('中文')`
- store/storage 中保存的默认文本(如 `storage.get(key) || '元'`)
- 对象、数组中用途待追踪的中文值
- 旧 `gm-i18n` 的 `t()` 调用(报告,交 i18n-fix-tpl)

## 7. 包裹规则

### 7.1 静态中文:原文作 key

```jsx
// before
<Button>保存</Button>
// after
<Button>{getLocale('保存')}</Button>
```

```js
// before
Toast.tip({ children: '保存成功' })
// after
Toast.tip({ children: getLocale('保存成功') })
```

无插值模板字符串按静态处理,统一改为单引号:`Tip.info(\`暂无数据\`)` → `Tip.info(getLocale('暂无数据'))`。

key 用中文原文,不臆造英文/大写 key;同一文件已存在的 key 直接复用同一写法。

### 7.2 动态句:getLocale 无插值,按以下优先级

1. **有限分支 → 整句静态字面量**(翻译质量最高):

```js
// before
`当前状态:${isOk ? '正常' : '异常'}`
// after
isOk ? getLocale('当前状态:正常') : getLocale('当前状态:异常')
```

2. **开放变量 → 片段式拆分**(仓库既有约定):在变量边界切分,标点跟随前一片段,每片尽量是可独立理解的短语:

```js
// before
`共${count}件商品`
// after
`${getLocale('共')}${count}${getLocale('件商品')}`
```

3. 表达式含副作用、复杂分支或跨嵌套标签无法整体提取时,列「需人工判断」,禁止机械逐片包裹。

**不得改变表达式求值顺序。** 片段式语序固定为中文语序,若某目标语言语序可能不同,在报告中说明,但不擅自改造运行时(那是另一决策)。

## 8. import 规则

- 只在文件有实际包裹时改 import
- 已有 `import { getLocale } from '@gm-mobile/locales'` 不重复添加
- 无 import 时在文件顶部 import 区追加:`import { getLocale } from '@gm-mobile/locales'`,位置与风格跟随该文件既有 import 块
- `getLocale` 被局部变量遮蔽时,停止该文件修改并报告
- 禁止引入 `gm-i18n` 的 `t()`(见 §2 幻影依赖说明)

## 9. 两阶段执行(检查清单)

**第一阶段 — 只读扫描**

- [ ] Glob 列出目标范围文件,按 §5 排除
- [ ] Grep 中文得候选行(不得直接用于批量替换)
- [ ] 每个候选 Read 完整上下文,按 §6 分类
- [ ] 查文件既有 `getLocale` import 与调用风格
- [ ] 动态句按 §7.2 提出具体转换形式
- [ ] 聊天输出报告(下方格式),然后**停止,等待确认**(尚未修改源码)

```md
## 裸中文扫描报告

### 可安全包裹
| # | 位置 | 类型 | 当前内容 | 建议转换 | import 变化 |

### 需人工判断
| # | 位置 | 原因 | 建议 |

### 明确跳过(统计)
| 原因 | 数量 |

尚未修改源码。等待确认条目编号或范围;确认后仅修改确认项。
包裹产生的新 key 不写 locale 文件,完成后可运行 /i18n-collect 注册进 en.json/th.json。
```

**第二阶段 — 确认后修改**

- [ ] 修改前重新 Read 对应文件;内容已变化则停止该项并报告
- [ ] 只改确认编号,不顺带处理未确认候选,不做无关重构/格式化/文案润色
- [ ] 按 §8 补 import
- [ ] 执行 §10 验证
- [ ] 提示用户:新 key 可通过 `/i18n-collect` 注册进 en.json/th.json

## 10. 修改后验证

- [ ] Grep 复扫确认范围,剩余中文逐项确认是已包裹、合法跳过还是遗漏
- [ ] Read 检查无二次包裹、无反引号形式 `getLocale(\`...\`)`、动态句转换后求值顺序不变
- [ ] Read 检查修改文件的 import:无缺失、无重复
- [ ] `git diff` 只包含确认的源码与 import 修改
- [ ] 项目已有的 Prettier/ESLint 可对修改文件运行;无对应依赖则不安装、跳过并说明

## 11. 红灯(出现即停)

| 念头 | 现实 |
|------|------|
| 「Grep 命中很多,批量正则替换更快」 | 必须逐条 Read 判断;正则替换是禁令 |
| 「这处中文看着像要翻译」 | 必须确认进入用户界面,否则只报告不修改 |
| 「给动态句造个 `ORDER_COUNT` 大写 key」 | getLocale 无插值;只能整句静态或片段式 |
| 「片段式拆开翻译质量差,顺便改 index.js 加插值」 | 改运行时是另一决策,需用户明确提出 |
| 「用户确认了这个文件,顺手把其他候选也改了」 | 只改确认编号,不扩张范围 |
| 「包裹完顺手把 key 写进 en.json」 | locale 文件由 i18n-collect 负责,本技能不写 |
| 「counter 里用了 `t()`,新代码也用它吧」 | gm-i18n 是幻影依赖,禁止新增;统一 `getLocale` |
| 「stories 里的中文也包一下」 | stories 是 demo 数据,默认排除;用户指定才处理 |
