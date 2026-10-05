# Cortex.dev — Open-source AI code editor

Cortex.dev is an independent VS Code-derived desktop editor with a built-in **Cortex Agent** for code understanding, planning, editing, terminal workflows, debugging and MCP-powered tools.

## What is included

- The VS Code/Electron editor shell and desktop build configuration.
- The `Cortex Agent` extension in [`extensions/Cortex-Agent`](extensions/Cortex-Agent).
- Cortex-branded Linux, Windows and macOS icon assets in [`branding`](branding).
- Cortex Dark and Cortex Light theme variants.
- Build, development and CI scripts under [`scripts/cortex`](scripts/cortex).

The editor remains compatible with the existing PearAI service endpoints and legacy configuration keys while the service layer is migrated. Those compatibility identifiers are intentionally retained so existing projects and accounts do not stop working.

## Development

```bash
npm install
./scripts/cortex/setup-environment.sh
npm run watch
```

See [`CONTRIBUTING.md`](CONTRIBUTING.md) for platform-specific setup and the extension development workflow.

## Credits and licensing

Cortex.dev is a downstream project built from Microsoft Visual Studio Code and incorporates open-source agent technology derived from Roo Code/Cline. Their copyright notices, license files and required attributions remain in the repository. See [`LICENSE.txt`](LICENSE.txt), [`extensions/Cortex-Agent/LICENSE`](extensions/Cortex-Agent/LICENSE) and [`ThirdPartyNotices.txt`](ThirdPartyNotices.txt).

The Cortex.dev name, icons and product branding are maintained in this repository by Frankenstein Labs.
