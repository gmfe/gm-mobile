# @gm-mobile 发布使用手册

## 一、发布流程概述

本项目采用 **分支推送自动发布** 模式：当代码合并或推送到 `master_v1` 分支时，GitHub Actions 会自动将包发布到 npm。

```
开发完成 → 执行版本 bump → 提交并推送 → CI 自动发布到 npm
```

---

## 二、发布前准备

### 触发条件

Release workflow 在以下情况触发：

- **分支**：推送到 `master_v1`
- **路径**：`packages/**`、`lerna.json` 或 `package.json` 有变更

---

## 三、发布步骤

### 方式一：推荐流程（一键 bump + 推送）

1. **完成代码开发并提交**

   ```bash
   git add .
   git commit -m "feat: 你的功能描述"
   ```

2. **执行版本 bump（三选一）**

   ```bash
   # patch：1.1.12 → 1.1.13（修复、小改动）
   yarn release

   # 或显式指定 patch
   yarn release:patch

   # minor：1.1.12 → 1.2.0（新功能）
   yarn release:minor

   # major：1.1.12 → 2.0.0（破坏性变更）
   yarn release:major
   ```

3. **推送代码**

   ```bash
   git push origin master_v1
   ```

4. **等待 CI 完成**

   推送后 GitHub Actions 会自动执行发布，可在 [Actions](https://github.com/gmfe/gm-mobile/actions) 查看进度。

---

### 方式二：分步执行

```bash
# 1. bump 版本（会修改 lerna.json 和 packages/*/package.json）
yarn release:patch

# 2. 提交版本变更
git add lerna.json packages/*/package.json
git commit -m "chore: release 1.1.13"

# 3. 推送
git push origin master_v1
```

---

## 四、版本号规则

| 命令 | 示例 | 适用场景 |
|------|------|----------|
| `yarn release` / `yarn release:patch` | 1.1.12 → 1.1.13 | bug 修复、小改动 |
| `yarn release:minor` | 1.1.12 → 1.2.0 | 新功能、向后兼容 |
| `yarn release:major` | 1.1.12 → 2.0.0 | 破坏性变更 |

---

## 五、常见问题

### Q1：推送后没有触发发布？

检查是否满足触发条件：

- 是否推送到 `master_v1` 分支
- 是否有 `packages/**`、`lerna.json` 或 `package.json` 的变更

### Q2：发布失败，提示 "cannot publish over the previously published versions"

说明当前版本号已在 npm 上存在，需要先 bump 版本再推送：

```bash
yarn release
git add .
git commit -m "chore: bump version"
git push origin master_v1
```

### Q3：忘记 bump 版本就推送了怎么办？

补一次 bump 并推送：

```bash
yarn release
git add .
git commit -m "chore: bump version"
git push origin master_v1
```

### Q4：如何发布 beta 版本？

使用本地发布（需先配置 npm 登录）：

```bash
yarn publish-beta
```

---

## 六、相关文件

- **Workflow 配置**：`.github/workflows/release.yml`
- **Lerna 配置**：`lerna.json`
- **发布脚本**：`package.json` 中的 `release`、`release:patch` 等
