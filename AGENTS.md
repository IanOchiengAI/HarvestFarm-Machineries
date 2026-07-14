# Agent Instructions — HarvestFarm Machineries

> This project inherits from the global agent template at `~\.agent-template\AGENTS.md`

## Project Info

| Field | Value |
|-------|-------|
| **Name** | HarvestFarm Machineries |
| **Type** | website — Static/dynamic agricultural machinery e-commerce site |
| **Created** | 2026-05-03 |
| **Template** | `C:\Users\User\.agent-template` |
| **Stack** | React 19 + Vite + TypeScript + TailwindCSS + Gemini AI |
| **Domain** | `harvestfarmnk.co.ke` |
| **Location** | Nakuru, Kenya |

## Architecture

This project uses the **3-Layer Architecture**:

1. **Directive** — SOPs in `directives/` tell the AI what to do
2. **Orchestration** — The AI reads directives, makes decisions, calls tools
3. **Execution** — Deterministic scripts in `execution/` do the actual work

## Active Skills

| Skill | Source | Purpose |
|-------|--------|---------|
| `brand-extractor` | *(inherited from master)* | Extract brand identity from websites |
| `brand-guidelines` | *(inherited from master)* | Enforce brand styling consistency |
| `frontend-design` | *(inherited from master)* | Build distinctive, production-grade UIs |
| `skill-creator` | *(inherited from master)* | Create new skills following best practices |

## Project-Specific Directives

| Directive | Purpose |
|-----------|---------|
| `brand-identity.md` | HarvestFarm color palette, typography, tone of voice |
| `design-system.md` | Component patterns, spacing, layout conventions |
| `content-guide.md` | Product catalog structure, SEO requirements, copy standards |

## Business Context

**Client:** Ian Wambugu Ochieng Sitati (Founder)
**Business:** Agricultural machinery sales — posho mills, hullers, chopper mills, roller mills, maize shellers
**Market:** Small-to-large scale Kenyan farmers
**Revenue Model:** Direct sales with pay-on-delivery, WhatsApp ordering
**Tagline:** "Powering Kenya's Farms with Reliable Machinery"
**Core Values:** Reliability, Innovation, Customer-Centric, Empowerment, Integrity

## Key Contacts & Links

| Resource | Value |
|----------|-------|
| Phone | +254780037335 |
| WhatsApp | wa.me/254780037335 |
| Location | Nakuru CBD, Kenya |
| Email | info@harvestfarm.co.ke / sales@harvestfarm.co.ke |
| AI Studio | https://ai.studio/apps/b9a1e9ca-6c46-4b49-af18-6e3dde8d8ae2 |

## Technical Notes

### Known Issues
- TailwindCSS loaded via CDN (should migrate to PostCSS)
- Dead `importmap` in index.html from AI Studio prototype
- Missing `index.css` file (referenced in HTML but doesn't exist)
- Some class names still use old `agro-*` prefix (must be `harvest-*`)

### AI Integration
- Gemini 1.5 Flash powers the "Harvest Expert" AI advisor chatbot
- API key stored in `.env.local` as `GEMINI_API_KEY`
- System prompt includes full product catalog for contextual recommendations

## Directory Structure

```
HarvestFarm Machineries/
├── AGENTS.md              # This file
├── .agent/workflows/      # Skills (inherited + project-specific)
├── directives/            # Project-specific SOPs
│   ├── brand-identity.md  # Colors, fonts, voice
│   ├── design-system.md   # Component patterns
│   └── content-guide.md   # Copy & SEO standards
├── execution/             # Project-specific scripts
├── components/            # React UI components
├── pages/                 # Route pages (Home, Shop, ProductDetail, Services, Contact)
├── services/              # API services (Gemini AI)
├── constants.ts           # Product catalog, testimonials, contact info
├── types.ts               # TypeScript interfaces
├── App.tsx                # Root component with routing
├── index.tsx              # React entry point
├── index.html             # HTML shell
├── vite.config.ts         # Vite build config
├── .env.local             # API keys (gitignored)
├── .tmp/                  # Temporary files (gitignored)
└── logo.png               # Brand logo
```

## Operating Principles

1. **Read `AGENTS.md` first** at the start of every conversation
2. **Check `directives/`** for specific SOPs before starting work
3. **Check `execution/`** for existing scripts before writing new ones
4. **Respect the brand** — all UI work must follow `directives/brand-identity.md`
5. **Use `harvest-*` prefix** for all Tailwind custom colors (never `agro-*`)
6. **Self-anneal** — when something breaks, fix it, test it, update the directive

---

*See master template at `~\.agent-template\AGENTS.md` for full architecture docs.*
