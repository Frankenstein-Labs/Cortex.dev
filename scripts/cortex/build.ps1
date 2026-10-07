param(
    [Parameter(ValueFromRemainingArguments = $true)]
    [string[]] $GulpTasks
)

$ErrorActionPreference = 'Stop'

if (-not $GulpTasks -or $GulpTasks.Count -eq 0) {
    Write-Error 'Usage: scripts/cortex/build.ps1 <gulp-task> [gulp-task ...]'
    Write-Error 'Example: scripts/cortex/build.ps1 vscode-win32-x64-system-setup'
    exit 2
}

$rootDir = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$setupScript = Join-Path $PSScriptRoot 'setup-environment.ps1'
$agentDir = Join-Path $rootDir 'extensions\Cortex-Agent'
$requiredNodeModules = @(
    (Join-Path $rootDir 'node_modules'),
    (Join-Path $agentDir 'node_modules'),
    (Join-Path $agentDir 'webview-ui\node_modules')
)

if ($requiredNodeModules | Where-Object { -not (Test-Path $_) }) {
    & $setupScript
} else {
    & npm.cmd run build --prefix $agentDir
    if ($LASTEXITCODE -ne 0) { throw 'The Cortex Agent build failed.' }
}

Push-Location $rootDir
try {
    & yarn.cmd gulp @GulpTasks
    if ($LASTEXITCODE -ne 0) {
        throw "Gulp packaging failed (exit code $LASTEXITCODE)."
    }
}
finally {
    Pop-Location
}
