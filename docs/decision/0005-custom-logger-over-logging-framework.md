# 0005: Custom logger instead of a logging framework

- **Status:** accepted
- **Date:** 2026-10-18

## Context

Both the API and the platform need consistent, low-ceremony logging. Full
logging frameworks (pino, winston) bring transports, serializers, and worker
threads that are not yet needed, and they complicate the browser build.

## Decision

Provide `@repo/logger`, a small dependency-free package with:

- levels `debug`, `info`, `warn`, `error`
- a minimum level from `options.level` or `LOG_LEVEL`
- an optional name prefix
- `.child(name)` for scoped loggers
- one-line output: `<ISO timestamp> <LEVEL> [name] message {json meta}`

## Consequences

- No extra runtime dependencies in either app.
- Identical API on the server and in the browser.
- The output format is ours to change, but we also own structured logging,
  redaction, and transport concerns if they become necessary.
- If we later need JSON logs, sampling, or log shipping, this package is the
  single place to add it or to replace with pino behind the same interface.

## Alternatives considered

- **pino** — fast and battle-tested, but adds a dependency, browser shims, and
  configuration we do not need yet.
- **console directly** — no levels, no consistent prefix, no way to silence
  debug output in production.
