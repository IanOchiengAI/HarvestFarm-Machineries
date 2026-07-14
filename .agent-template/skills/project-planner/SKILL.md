---
name: project-planner
description: Decompose projects into actionable tasks, estimate effort, plan sprints, and track progress. Use this when starting a new project, breaking down a feature, creating a roadmap, or when the user asks for task planning, estimation, or project organization.
license: MIT
---

# Project Planner

## Overview

Turns vague project ideas into structured, actionable plans. Handles task decomposition, dependency mapping, effort estimation, and progress tracking.

## Workflow

### 1. Understand the Scope
- What is the end goal?
- Who is the audience/user?
- What are the hard constraints (deadline, budget, tech stack)?
- What already exists vs. what needs to be built?

### 2. Decompose into Phases
Break the project into 2-5 sequential phases:

```markdown
## Phase 1: Foundation (Days 1-3)
- [ ] Task 1.1 — Description [2h]
- [ ] Task 1.2 — Description [4h]

## Phase 2: Core Features (Days 4-7)
- [ ] Task 2.1 — Description [3h]
  - Depends on: Task 1.1
```

### 3. Estimate Effort
Use t-shirt sizes for quick estimation:

| Size | Time | Example |
|------|------|---------|
| XS | < 30 min | Fix a typo, update a color |
| S | 30 min - 2h | Add a component, write a function |
| M | 2-4h | Build a page, implement a feature |
| L | 4-8h | Complex feature, multi-file refactor |
| XL | 1-2 days | New subsystem, major redesign |

### 4. Identify Dependencies & Parallelism
- Which tasks block other tasks?
- Which tasks can run in parallel?
- What are the critical path items?

### 5. Track Progress
Update task status as work progresses:

```markdown
- [x] ~~Task 1.1~~ ✅ Done
- [ ] Task 1.2 🔄 In Progress
- [ ] Task 1.3 ⏳ Blocked by Task 1.2
- [ ] Task 1.4 📋 To Do
```

## Output Format

Generate a `STATUS.md` file in the project root:

```markdown
# Project Status — [Project Name]

**Last Updated:** YYYY-MM-DD
**Overall Progress:** ██████░░░░ 60%

## Phase 1: Foundation ✅ Complete
- [x] Task 1.1 — Description
- [x] Task 1.2 — Description

## Phase 2: Core Features 🔄 In Progress
- [x] Task 2.1 — Description
- [ ] Task 2.2 — Description (IN PROGRESS)

## Blockers
- (none currently)

## Next Actions
1. Complete Task 2.2
2. Start Phase 3: Polish
```
