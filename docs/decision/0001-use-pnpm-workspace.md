# 0001: Use a pnpm workspace monorepo

- **Status:** accepted
- **Date:** 2026-10-18

## Context

The project needs a backend API and a web frontend that will share code
(logging, types, validation schemas). We want a single repository, consistent
tooling, and a fast install/CI story without publishing internal packages to a
registry.

## Decision

Use a pnpm workspace with two top-level groups:

- `apps/*` for deployable applications (`api`, `platform`)
- `packages/*` for shared libraries (`logger`)

Internal dependencies are declared with the `workspace:*` protocol.

## Consequences

- Shared code is linked locally, so changes propagate without a publish step.
- A single lockfile keeps dependency versions consistent across apps.
- pnpm's content-addressed store makes installs fast and disk-efficient.
- Contributors need pnpm installed; npm and Yarn are not supported.
- pnpm 10+ blocks dependency build scripts by default, so new native
  dependencies must be explicitly approved via `allowBuilds` in
  `pnpm-workspace.yaml`.

## Alternatives considered

- **Separate repositories** — rejected because shared code would need versioned
  publishing or git submodules, adding friction for a small team.
- **npm workspaces** — workable, but slower installs and weaker workspace
  filtering than pnpm.
- **Turborepo/Nx** — deferred. A plain pnpm workspace is sufficient at this
  size; a task runner can be layered on later without restructuring.
