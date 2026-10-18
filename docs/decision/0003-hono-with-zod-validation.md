# 0003: Hono with Zod request validation

- **Status:** accepted
- **Date:** 2026-10-18

## Context

The API needs a small HTTP framework that runs on Node today and could move to
edge runtimes later. Request bodies must be validated and the validated types
must flow into handlers without casts.

## Decision

Use Hono as the HTTP framework and `@hono/zod-validator` with Zod schemas for
request validation:

```ts
app.post("/echo", zValidator("json", echoSchema), (c) => {
  const { message } = c.req.valid("json"); // fully typed
});
```

Handlers return `c.json(...)` and the app exports `type AppType = typeof app`
for future typed clients.

## Consequences

- Validation and typing live in one place; handlers never re-parse input.
- Invalid requests return `400` before the handler runs.
- Hono's `fetch`-based interface allows deployment to Node, Bun, Deno, and edge
  runtimes with the same code.
- Zod is a runtime dependency of the API and, where schemas are shared, of the
  frontend as well.

## Alternatives considered

- **Express/Fastify** — mature, but heavier and less portable across runtimes.
- **tRPC** — excellent end-to-end types, but couples the frontend to the
  backend's TypeScript types and is awkward for non-TS consumers or public
  endpoints. Revisit if the frontend and API remain the only consumers.
- **Manual validation** — rejected; duplicated checks and untyped inputs.
