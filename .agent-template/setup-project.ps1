# ═══════════════════════════════════════════════════════════════
# Global Agent Template — Project Setup Script
# ═══════════════════════════════════════════════════════════════
#
# Usage:
#   ~\.agent-template\setup-project.ps1 -Name "My Project" -Path "F:\Work\Projects" -Type "webapp"
#   ~\.agent-template\setup-project.ps1 -Name "My Project"  # Uses defaults from config.json
#
# Project Types: website, webapp, api, mobile, data, general
# ═══════════════════════════════════════════════════════════════

param(
    [Parameter(Mandatory=$true)]
    [string]$Name,

    [Parameter(Mandatory=$false)]
    [string]$Path,

    [Parameter(Mandatory=$false)]
    [ValidateSet("website", "webapp", "api", "mobile", "data", "general")]
    [string]$Type,

    [Parameter(Mandatory=$false)]
    [switch]$SkipSkills,

    [Parameter(Mandatory=$false)]
    [switch]$WithPersonas
)

# ── Resolve template home ──
$templateHome = $PSScriptRoot
$configPath = Join-Path $templateHome "config.json"

if (-not (Test-Path $configPath)) {
    Write-Host "ERROR: config.json not found at $configPath" -ForegroundColor Red
    exit 1
}

$config = Get-Content $configPath -Raw | ConvertFrom-Json

# ── Apply defaults from config ──
if (-not $Type) { $Type = $config.defaultType }
if (-not $Path) { $Path = $config.defaultProjectRoot }

$projectPath = Join-Path $Path $Name

Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Cyan
Write-Host "║  Agent Template — Project Setup              ║" -ForegroundColor Cyan
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Cyan
Write-Host ""
Write-Host "  Project:  $Name" -ForegroundColor White
Write-Host "  Type:     $Type" -ForegroundColor White
Write-Host "  Path:     $projectPath" -ForegroundColor White
Write-Host ""

# ── Create project directory ──
if (-not (Test-Path $projectPath)) {
    New-Item -ItemType Directory -Path $projectPath -Force | Out-Null
    Write-Host "  [+] Created project directory" -ForegroundColor Green
} else {
    Write-Host "  [=] Project directory already exists" -ForegroundColor Yellow
}

# ── Create subdirectories ──
$dirs = @(".agent\workflows", "directives", "execution", ".tmp")
foreach ($dir in $dirs) {
    $fullPath = Join-Path $projectPath $dir
    if (-not (Test-Path $fullPath)) {
        New-Item -ItemType Directory -Path $fullPath -Force | Out-Null
        Write-Host "  [+] Created: $dir" -ForegroundColor Green
    }
}

# ── Copy skills ──
if (-not $SkipSkills) {
    $skillsSource = Join-Path $templateHome "skills"
    $skillsDest = Join-Path $projectPath ".agent\workflows"

    # Get skills for this project type from config
    $typeConfig = $config.projectTypes.$Type
    $skillsToCopy = @($typeConfig.skills) + @($config.alwaysIncludeSkills) | Select-Object -Unique

    Write-Host ""
    Write-Host "  Copying skills for type '$Type':" -ForegroundColor Yellow

    foreach ($skill in $skillsToCopy) {
        $skillSource = Join-Path $skillsSource $skill
        $skillDest = Join-Path $skillsDest $skill

        if (Test-Path $skillSource) {
            Copy-Item $skillSource -Destination $skillDest -Recurse -Force
            Write-Host "  [+] Skill: $skill" -ForegroundColor Green
        } else {
            Write-Host "  [!] Skill not found: $skill (skipped)" -ForegroundColor Yellow
        }
    }
}

# ── Copy .env.example ──
$envSource = Join-Path $templateHome ".env.example"
$envDest = Join-Path $projectPath ".env.example"
if (Test-Path $envSource) {
    Copy-Item $envSource -Destination $envDest -Force
    Write-Host "  [+] Copied .env.example" -ForegroundColor Green
}

# ── Create .gitignore entries ──
$gitignorePath = Join-Path $projectPath ".gitignore"
$gitignoreContent = @"
# Agent template
.env
.tmp/
credentials.json
token.json

# OS
.DS_Store
Thumbs.db
"@

if (-not (Test-Path $gitignorePath)) {
    Set-Content -Path $gitignorePath -Value $gitignoreContent -Force
    Write-Host "  [+] Created .gitignore" -ForegroundColor Green
}

# ── Generate project AGENTS.md ──
$typeDescription = $typeConfig.description
$skillsList = ($skillsToCopy | ForEach-Object { "| ``$_`` | *(inherited from master)* |" }) -join "`n"
$today = Get-Date -Format "yyyy-MM-dd"

$agentsContent = @"
# Agent Instructions — $Name

> This project inherits from the global agent template at ``~\.agent-template\AGENTS.md``

## Project Info

| Field | Value |
|-------|-------|
| **Name** | $Name |
| **Type** | $Type — $typeDescription |
| **Created** | $today |
| **Template** | ``C:\Users\User\.agent-template`` |

## Architecture

This project uses the **3-Layer Architecture**:

1. **Directive** — SOPs in ``directives/`` tell the AI what to do
2. **Orchestration** — The AI reads directives, makes decisions, calls tools
3. **Execution** — Deterministic scripts in ``execution/`` do the actual work

## Active Skills

| Skill | Source |
|-------|--------|
$skillsList

## Project-Specific Directives

Add your SOPs to ``directives/``:

``````
directives/
├── (add your .md files here)
``````

## Directory Structure

``````
$Name/
├── AGENTS.md              # This file
├── .agent/workflows/      # Skills (inherited + project-specific)
├── directives/            # Project-specific SOPs
├── execution/             # Project-specific scripts
├── .tmp/                  # Temporary files (gitignored)
└── .env                   # API keys (copy from .env.example)
``````

## Operating Principles

1. **Read ``AGENTS.md`` first** at the start of every conversation
2. **Check ``directives/``** for specific SOPs before starting work
3. **Check ``execution/``** for existing scripts before writing new ones
4. **Self-anneal** — when something breaks, fix it, test it, update the directive

---

*See master template at ``~\.agent-template\AGENTS.md`` for full architecture docs.*
"@

$agentsPath = Join-Path $projectPath "AGENTS.md"
Set-Content -Path $agentsPath -Value $agentsContent -Force
Write-Host "  [+] Generated AGENTS.md" -ForegroundColor Green

# ── Update global registry ──
$registryPath = Join-Path $templateHome "registry.md"
if (Test-Path $registryPath) {
    $registry = Get-Content $registryPath -Raw
    $count = ([regex]::Matches($registry, "^\| \d+")).Count + 1
    $newEntry = "| $count | $Name | $Type | ``$projectPath`` | $today | `u{1F7E2} Active |"

    # Insert before the --- line at the end
    $registry = $registry -replace "(\r?\n---)", "`n$newEntry`$1"
    Set-Content -Path $registryPath -Value $registry -Force
    Write-Host "  [+] Updated global registry" -ForegroundColor Green
}

# ── Summary ──
Write-Host ""
Write-Host "╔══════════════════════════════════════════════╗" -ForegroundColor Green
Write-Host "║  Setup complete!                             ║" -ForegroundColor Green
Write-Host "╚══════════════════════════════════════════════╝" -ForegroundColor Green
Write-Host ""
Write-Host "  Next steps:" -ForegroundColor Cyan
Write-Host "  1. cd `"$projectPath`""
Write-Host "  2. Copy .env.example to .env and add your API keys"
Write-Host "  3. Create directives in directives/ for your project SOPs"
Write-Host "  4. Add execution scripts in execution/ as needed"
Write-Host "  5. Start coding! The AI will read AGENTS.md automatically"
Write-Host ""
