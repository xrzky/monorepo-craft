# 0002: Ship internal packages as TypeScript source

- **Status:** accepted
- **Date:** 2026-10-18

## Context

Shared packages such as `@repo/logger` are only consumed by applications in this
repository. Building them to `dist/` adds a compile step, stale-output problems,
and watch-mode complexity during development.

## Decision

Internal packages expose their TypeScript source directly:

```json
{
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": { "types": "./src/index.ts", "default": "./src/index.ts" }
  }
}
```

Consumers (`tsx` for the API, Vite for the platform) compile the source as part
of their own build.

## Consequences

- No build step or watch loop for shared packages; edits are picked up
  immediately.
- Source maps and stack traces point at real source lines.
- Consumers must be able to compile TypeScript from `node_modules` links. Both
  chosen tools (tsx, Vite) do this natively.
- If a package is ever published or consumed by a plain Node process, it will
  need a build step. That can be added per package without changing the
  workspace layout.

## Alternatives considered

- **Build every package with tsc** — correct but adds orchestration: `dev` must
  run the package watcher before the app starts, and stale `dist/` output is a
  recurring failure mode.
- **Bundle shared packages into each app** — duplicates code and complicates
  debugging.
