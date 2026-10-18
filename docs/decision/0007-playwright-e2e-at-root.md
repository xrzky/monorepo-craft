# 0007: Playwright E2E suite at the repository root

- **Status:** accepted
- **Date:** 2026-10-18

## Context

The API and platform are separate apps with separate unit-level checks, but
nothing verified that they run together or that the platform works in a real
browser. The workspace also needed a place for tests that exercise the system
end to end rather than a single package.

## Decision

Use Playwright at the repository root:

- Tests live in `e2e/`, outside both apps, because they span the whole system.
- `playwright.config.ts` starts both apps with `webServer` entries: the API via
  `pnpm --filter @repo/api start` and the platform via Vite on a strict port.
  Playwright waits for `/health` and `/` before running.
- `baseURL` points at the platform; API tests use absolute URLs derived from
  `E2E_API_URL`.
- Only Chromium is configured. More projects can be added without restructuring.
- Traces and screenshots are captured on failure, and the HTML report is
  written to `playwright-report/` (ignored by git).
- E2E is **not** part of the pre-commit hook. It runs via `pnpm test:e2e`, and
  `pnpm typecheck` type-checks the specs and config.

## Consequences

- One command exercises both apps and the browser, catching integration
  breakage that per-package checks miss.
- `webServer` with `reuseExistingServer` outside CI means a developer's running
  `pnpm dev` is reused instead of fighting over ports.
- `--strictPort` makes a port collision fail loudly rather than silently moving
  Vite to 5174 and testing the wrong server.
- The suite needs browsers installed once per machine (`pnpm e2e:install`).
- Keeping E2E out of the hook keeps commits fast; CI is the right place to
  enforce it once a pipeline exists.
- Tests that need the platform to call the API will require a Vite dev proxy or
  CORS configuration, neither of which exists yet. Current tests hit the API
  directly via Playwright's `request` fixture.

## Alternatives considered

- **Cypress** — good developer experience, but heavier and less convenient for
  pure HTTP assertions alongside browser tests.
- **Per-app Playwright configs** — would duplicate the startup orchestration and
  cannot cover a flow that crosses both apps.
- **Running E2E in the pre-commit hook** — adds tens of seconds to every commit
  and requires browsers on every contributor machine; better suited to CI.
