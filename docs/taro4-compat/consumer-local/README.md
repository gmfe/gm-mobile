# 本地 tarball 消费验证（source=local）

- 日期：2026-09-08
- tarball：docs/taro4-compat/packs/4.0.0-beta.0/（8 包）
- fixture：系统临时目录（已删除）
- 结果：首次安装生成锁文件 → 删除 node_modules → 冻结重装 PASS
- typecheck：exit 0（16 个 wx/process/png 错误经 @types/wechat-miniprogram + 最小 process 声明解决）
- build:weapp：exit 0
- verify_runtime：通过（Taro 4.2.1 / React 18.2.0 单实例，无 Taro 3 标识）
- yarn.lock SHA-256：ab2977937c2afab9623f85bf8ef4d3491a6f41b004c9076047344a9d482fb75d
