# i18n-collect 报告格式与写后验证

> 按需加载:dry-run 预览与确认后写入阶段使用。

## Dry-run 预览报告(必须完整展示;过多时分批,不能只给数量后要求确认)

```md
## i18n key 扫描预览

### 扫描
- 源码/候选文件:X/X
- 分片成功/失败:X/X
- project/external/unknown 调用点:X/X/X
- 调用点集合一致:是/否

### base 合并
- base 当前 key:X
- 源码静态唯一 key:X
- 动态有限枚举新增 key:X
- zh key:X
- 待新增/待补 value/保留历史:X/X/X

### 待新增 key
| # | key | value | 来源 | 位置 |

### 待补 value
| # | key | 当前值 | 新值 | 来源 |

### 未决调用与冲突
| 分类 | 位置/key | 原因 | 建议处理 |

### 未决文档计划
- 当前/新增/更新/建议复核:X/X/X/X
- 路径:docs/i18n/unresolved-calls.md

### 验证
- 扫描完整性:通过/失败
- zh 全覆盖:是/否
- 历史 key/value 保留:是/否
- 模板参数一致:是/否

尚未修改 base.json 或未决文档,等待确认当前计划。
```

Dry-run 记录 base、zh、候选源码内容 hash,以及 key/value/未决文档变更集合。确认后重新检查:源码变化则重跑受影响分片;base/zh 变化则重新合并;计划变化则重新展示并等待确认。**确认不能扩展到新 key。**

## 确认后写入

扫描完整性通过且用户明确确认后:

1. 主流程单点更新 `src/locales/base.json`
2. 只追加缺失 key、补全确认的空 value
3. 不删除、覆盖或重排历史内容,优先精确 Edit
4. 主流程单点创建或更新未决文档,保留人工字段
5. Agent 始终禁止写共享文件

扫描完整性失败时禁止写 base;用户单独确认后,可以只记录失败范围和未决项。

## 写后验证(必须)

- Read 并验证最终 base JSON
- 确认计划 key/value、zh 全覆盖和历史 key/value 保留
- 确认 external、unknown、未解决动态调用未误写
- 确认未决文档未覆盖人工字段
- 源码未变化时不重复全仓 Agent 复扫
- 执行可用的项目 JSON/Prettier 检查
- 执行:

```bash
git diff --check -- src/locales/base.json docs/i18n/unresolved-calls.md .claude/skills/i18n-collect
```

最终报告包含:新增、补 value、最终/历史 key、未决文档新增/更新、调用点/zh/模板验证、未解决动态、external/unknown、冲突失败和格式校验结果。
