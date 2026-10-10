$ErrorActionPreference = 'Stop'

$rootDir = (Resolve-Path (Join-Path $PSScriptRoot '..\..')).Path
$agentDir = Join-Path $rootDir 'extensions\Cortex-Agent'

foreach ($tool in @('node.exe', 'npm.cmd', 'yarn.cmd')) {
    if (-not (Get-Command $tool -ErrorAction SilentlyContinue)) {
        throw "Required tool not found: $tool. Install Node.js 20.18.0, npm, and Yarn 1 first."
    }
}

$lockFiles = @(
    (Join-Path $rootDir 'package-lock.json'),
    (Join-Path $agentDir 'package-lock.json'),
    (Join-Path $agentDir 'webview-ui\package-lock.json'),
    (Join-Path $agentDir 'e2e\package-lock.json')
)
foreach ($lockFile in $lockFiles) {
    if (-not (Test-Path $lockFile)) {
        throw "Required lockfile not found: $lockFile"
    }
}

Push-Location $rootDir
try {
    Write-Host 'Installing Cortex.dev dependencies with npm ci...'
    & npm.cmd ci
    if ($LASTEXITCODE -ne 0) { throw 'npm ci failed in the Cortex.dev repository.' }

    Write-Host 'Installing Cortex Agent dependencies with npm ci...'
    foreach ($directory in @($agentDir, (Join-Path $agentDir 'webview-ui'), (Join-Path $agentDir 'e2e'))) {
        & npm.cmd ci --prefix $directory
        if ($LASTEXITCODE -ne 0) { throw "npm ci failed in $directory." }
    }

    Write-Host 'Building the bundled Cortex Agent extension...'
    & npm.cmd run build --prefix $agentDir
    if ($LASTEXITCODE -ne 0) { throw 'The Cortex Agent build failed.' }

    Write-Host 'Dependency installation and Cortex Agent build completed.'
}
finally {
    Pop-Location
}
