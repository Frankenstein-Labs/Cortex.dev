#!/usr/bin/env bash
set -Eeuo pipefail

SCRIPT_DIR="$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd -- "$SCRIPT_DIR/../.." && pwd)"

case "$(uname -s)" in
  Linux*|Darwin*) ;;
  CYGWIN*|MINGW*|MSYS*)
    echo 'Run scripts/cortex/setup-environment.ps1 from PowerShell on Windows.' >&2
    exit 1
    ;;
  *)
    printf 'Unsupported operating system: %s\n' "$(uname -s)" >&2
    exit 1
    ;;
esac

printf 'Preparing Cortex.dev in %s\n' "$ROOT_DIR"
"$SCRIPT_DIR/install-dependencies.sh"
