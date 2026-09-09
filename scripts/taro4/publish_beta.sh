#!/usr/bin/env bash
# Taro 4 兼容闭包 beta 发布：按固定拓扑序逐包发布 tarball，无 Git 副作用
# 用法: bash scripts/taro4/publish_beta.sh [版本号，默认 4.0.0-beta.0]
# 任一包失败立即停止；已发布版本不可覆盖，修复后整体递增下一 beta
set -u
VERSION="${1:-4.0.0-beta.0}"
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
PACK_DIR="$ROOT/docs/taro4-compat/packs/$VERSION"
LOG_DIR="$ROOT/docs/taro4-compat/publish-logs/$VERSION"
REGISTRY="https://registry.npmjs.org/"
ORDER="c-font c-tool locales c-react c-business mp mp-business mp-request"

mkdir -p "$LOG_DIR"
echo "发布版本: $VERSION"
echo "tarball 目录: $PACK_DIR"
echo "日志目录: $LOG_DIR"
echo "---"

for name in $ORDER; do
  tgz="$PACK_DIR/gm-mobile-$name-$VERSION.tgz"
  if [ ! -f "$tgz" ]; then
    echo "❌ 缺少 tarball: $tgz"
    exit 1
  fi
  echo "[$name] npm publish $(basename "$tgz") ..."
  if npm publish "$tgz" --tag beta --access public --ignore-scripts --registry "$REGISTRY" \
      > "$LOG_DIR/$name.log" 2>&1; then
    echo "[$name] ✅ 完成"
  else
    echo "[$name] ❌ 失败，日志: $LOG_DIR/$name.log"
    tail -5 "$LOG_DIR/$name.log"
    echo ""
    echo "已停止。已成功发布的包不可覆盖；修复后整体递增到下一 beta（如 4.0.0-beta.1）再发剩余包。"
    exit 1
  fi
done

echo "---"
echo "✅ 8 个包全部发布完成（tag: beta）"
echo "下一步：node scripts/taro4/fetch_registry_closure.js --version $VERSION --registry $REGISTRY --output docs/taro4-compat/registry-packs/$VERSION"
