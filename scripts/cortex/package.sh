#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"

if (($# == 0)); then
  echo 'Usage: scripts/cortex/package.sh <gulp-task> [gulp-task ...]' >&2
  echo 'Example: scripts/cortex/package.sh vscode-linux-x64-min' >&2
  exit 2
fi

if [[ ! -d "$ROOT_DIR/node_modules" || ! -d "$ROOT_DIR/extensions/Cortex-Agent/node_modules" || ! -d "$ROOT_DIR/extensions/Cortex-Agent/webview-ui/node_modules" ]]; then
  "$SCRIPT_DIR/install-dependencies.sh"
else
  npm --prefix "$ROOT_DIR/extensions/Cortex-Agent" run build
fi

cd "$ROOT_DIR"
yarn gulp "$@"
