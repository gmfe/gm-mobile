# i18n-collect 提取 schema 与边界规则

> 按需加载:分片提取、动态追踪和主流程校验阶段使用。

## 调用点 ID 与计数

调用点 ID:

```text
相对文件路径:callee 起始行:callee 起始列
```

规则:

- 调用数按 call site 计数,唯一 key 另行去重
- `t(flag ? '是' : '否')` 为 1 个调用、2 个 key
- 动态调用解析出多个有限 key 时仍为 1 个调用
- wrapper 定义和使用点分别记录并关联
- `tpl` 注释不算调用
- `external`、`unknown` 不计入 project 调用数,单独统计

## 分片提取 Agent 返回 schema(裸 JSON,无 Markdown fence/日志/思考过程)

```json
{
  "shard": "shard-001",
  "assignedFiles": ["src/js/home/index.js"],
  "scannedFiles": ["src/js/home/index.js"],
  "callSites": [
    {
      "id": "src/js/home/index.js:10:3",
      "file": "src/js/home/index.js",
      "line": 10,
      "column": 3,
      "catalog": "project",
      "sourceModule": "gm-i18n",
      "callee": "t",
      "kind": "static",
      "keys": [{ "key": "保存", "template": null, "source": "source-static" }]
    },
    {
      "id": "src/js/stores/global.js:135:20",
      "file": "src/js/stores/global.js",
      "line": 135,
      "column": 20,
      "catalog": "project",
      "sourceModule": "gm-i18n",
      "callee": "t",
      "kind": "filtered",
      "filterReason": "api-path",
      "keys": []
    }
  ],
  "dynamicCalls": [],
  "tplComments": [],
  "suspiciousCalls": [],
  "errors": []
}
```

Agent 逐文件 Read import、作用域和完整调用,处理静态字符串、无插值模板、静态条件分支、**多行调用**、别名、可确认 wrapper 和合法模板注释。**不得依据 Grep 单行直接提取**——多行 `t()`/`i18next.t()` 调用常把中文字符串单独放一行,grep 命中续行而误判为裸中文/新调用。

**key 内嵌引号转义**:当 key 内容包含双引号 `"` 时(如源码 `'注意：使用称重筐功能时，不要在电子秤上操作"去皮"'`),Agent 必须确认字符串的完整范围(从外层引号开始到对应闭合引号),不得在内嵌 `"` 处截断。返回 JSON 中 key 值的 `"` 必须转义为 `\"`。

**kind 枚举值**: `static`(静态字符串 key)、`filtered`(被语义过滤的调用,不计入 project key)。`filteredReason` 仅在 `kind: "filtered"` 时必填,取值:`api-path`、`date-format`、`storage-key`、`empty-string`、`module-identifier`。

统计由主流程根据数组计算。主流程校验:JSON 合法、必填字段齐全、assigned/scanned 文件一致、位置不越界、ID 唯一、枚举值合法、key 中内嵌 `"` 已正确转义、`kind: "filtered"` 的调用不得计入 project key 集合。失败时让原 Agent 修正一次;再次失败则分片失败,禁止猜测补齐。

## 动态调用与模板注释

动态调用按最多 `DYNAMIC_SHARD` 个调用点分片,优先把同一直接调用链放在一起。Agent Read 参数、props、局部常量和直接调用者,默认最多追踪 `TRACE_DEPTH` 层:

| 结果 | 处理 |
|------|------|
| 有限静态数组、对象或条件分支 | 枚举全部 key,并附证据位置 |
| API、用户输入、服务端数据或开放集合 | `runtime-unbounded` |
| 超过 `TRACE_DEPTH` 层仍无法确定 | `analysis-boundary` |
| 含表达式的中文模板 | `invalid-dynamic-template` |
| wrapper/catalog 无法确认 | `unknown-wrapper` / `unknown-catalog` |

不猜测 key,不修改源码。

`tpl` 注释只有同时满足以下条件才提供模板:

1. 与后续调用之间只允许空白或普通注释
2. 绑定紧随其后的第一个 project 调用
3. 调用使用抽象 key
4. `${VARn}` 集合与调用参数完全一致
5. 一个注释只绑定一个调用点

无法唯一绑定或参数不一致时标记 `ambiguous-tpl`,不参与 value 合并。
