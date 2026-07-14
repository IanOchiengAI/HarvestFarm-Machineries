# Agent Instructions — Master Template

> The global agent architecture. All projects inherit from this.

## The 3-Layer Architecture

```
┌─────────────────────────────────────────────┐
│  Layer 1: DIRECTIVE (What to do)            │
│  → Markdown SOPs in directives/             │
│  → Natural language, goals, inputs, outputs │
├─────────────────────────────────────────────┤
│  Layer 2: ORCHESTRATION (Decision making)   │
│  → The AI agent itself                      │
│  → Reads directives, calls tools, handles   │
│    errors, updates directives               │
├─────────────────────────────────────────────┤
│  Layer 3: EXECUTION (Doing the work)        │
│  → Deterministic scripts in execution/      │
│  → API calls, data processing, file ops     │
│  → Reliable, testable, fast                 │
└─────────────────────────────────────────────┘
```

## Operating Principles

1. **Check for tools first** — Look in `execution/` and `skills/` before writing new scripts
2. **Self-anneal when things break** — Fix, test, update directive
3. **Update directives as you learn** — Living documents, not static specs
4. **Progressive disclosure** — Don't load everything into context; read what you need

## Per-Project Directory Structure

```
[Project Name]/
├── AGENTS.md              # Project-specific agent config (inherits from master)
├── .agent/
│   └── workflows/         # Skills (inherited from master + project-specific)
├── directives/            # Project-specific SOPs
├── execution/             # Project-specific scripts
├── .tmp/                  # Temporary files (never commit)
└── .env                   # Project-specific API keys
```

## Shared Skills Registry

All projects can inherit these skills from the master template:

| Skill | Purpose | Contains |
|-------|---------|----------|
| `brand-extractor` | Extract brand identity from any website | Firecrawl scraping scripts |
| `brand-guidelines` | Enforce consistent brand styling | Color/typography/accent rules |
| `frontend-design` | Build distinctive, production-grade UIs | Design philosophy + anti-AI-slop rules |
| `skill-creator` | Create new skills following best practices | init/package/validate scripts |
| `code-review` | Review code for quality, security, performance | Review checklist + patterns |
| `project-planner` | Decompose tasks, estimate effort, track progress | Planning templates |

## Project Types

The setup script supports these project types, each with tailored defaults:

| Type | Default Skills | Default Directives |
|------|---------------|-------------------|
| `website` | brand-extractor, brand-guidelines, frontend-design | design-system, page-builder, responsive-testing |
| `webapp` | frontend-design, code-review | architecture, testing, deployment |
| `api` | code-review | api-design, data-modeling, security |
| `mobile` | brand-guidelines, code-review | platform-guidelines, performance |
| `data` | code-review | data-pipeline, validation, documentation |
| `general` | code-review, project-planner | (none — add your own) |

## How to Set Up a New Project

```powershell
# From anywhere:
~\.agent-template\setup-project.ps1 -Name "My Project" -Path "F:\Work\Projects" -Type "webapp"
```

## File Organization

- **Deliverables**: Final outputs (deployed sites, exported reports)
- **Intermediates**: `.tmp/` folder (never commit)
- **Credentials**: `.env`, `credentials.json`, `token.json` (in `.gitignore`)

---

*Be pragmatic. Be reliable. Self-anneal.*
