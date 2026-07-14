---
name: code-review
description: Review code for quality, security, performance, and maintainability. Use this when reviewing pull requests, auditing codebases, checking for bugs, or ensuring code meets quality standards. Covers TypeScript, Python, React, Node.js, and general best practices.
license: MIT
---

# Code Review

## Overview

Systematic code review skill that catches bugs, security issues, performance problems, and maintainability concerns before they ship.

## Review Checklist

When reviewing code, evaluate against these categories:

### 1. Correctness
- Does the code do what it's supposed to do?
- Are edge cases handled (null, empty, boundary values)?
- Are error states handled gracefully?

### 2. Security
- No hardcoded secrets, API keys, or credentials
- Input validation on all user-provided data
- SQL injection, XSS, and CSRF protection where applicable
- Proper authentication/authorization checks

### 3. Performance
- No unnecessary re-renders (React: memo, useMemo, useCallback)
- No N+1 queries or unbounded loops
- Lazy loading for heavy resources
- Proper pagination for large datasets

### 4. Maintainability
- Clear naming (variables, functions, files)
- Single responsibility — each function/component does one thing
- DRY without over-abstraction
- Consistent code style with the rest of the codebase

### 5. TypeScript Specific
- No `any` types without justification
- Proper interface/type definitions
- Discriminated unions over type assertions
- Null safety (optional chaining, nullish coalescing)

### 6. React Specific
- Proper key props on mapped elements
- Effects have correct dependency arrays
- State is at the right level (not too high, not too low)
- No state for derivable values

## Review Output Format

```markdown
## Code Review: [File/PR Name]

### ✅ Strengths
- (what's done well)

### ⚠️ Issues
1. **[Severity: HIGH/MED/LOW]** [Category] — Description
   - File: `path/to/file.ts:L42`
   - Fix: (suggested change)

### 💡 Suggestions
- (non-blocking improvements)

### Verdict: APPROVE / REQUEST CHANGES / NEEDS DISCUSSION
```
