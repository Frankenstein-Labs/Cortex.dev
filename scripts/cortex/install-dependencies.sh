#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"
AGENT_DIR="$ROOT_DIR/extensions/Cortex-Agent"

for tool in node npm yarn; do
  if ! command -v "$tool" >/dev/null 2>&1; then
    printf 'Required tool not found: %s\n' "$tool" >&2
    exit 1
  fi
done

for lock_file in \
  "$ROOT_DIR/package-lock.json" \
  "$AGENT_DIR/package-lock.json" \
  "$AGENT_DIR/webview-ui/package-lock.json" \
  "$AGENT_DIR/e2e/package-lock.json"; do
  if [[ ! -f "$lock_file" ]]; then
    printf 'Required lockfile not found: %s\n' "$lock_file" >&2
    exit 1
  fi
done

printf '\nInstalling Cortex.dev dependencies with npm ci...\n'
npm ci --prefix "$ROOT_DIR"

printf '\nInstalling Cortex Agent dependencies with npm ci...\n'
npm ci --prefix "$AGENT_DIR"
npm ci --prefix "$AGENT_DIR/webview-ui"
npm ci --prefix "$AGENT_DIR/e2e"

printf '\nBuilding the bundled Cortex Agent extension...\n'
npm --prefix "$AGENT_DIR" run build

printf '\nDependency installation and Cortex Agent build completed.\n'
