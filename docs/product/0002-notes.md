# 0002: Product notes

- **Type:** notes
- **Date:** 2026-10-18

Running log of exploratory thinking. Notes are append-only; new entries go at
the top under a dated heading. Once a note settles into a decision, write a
product decision document and link back to it here.

---

## 2026-10-18 — Scaffolding complete

The workspace, API, platform, and logger are in place and verified:

- `pnpm dev` runs both apps; API on `:3000`, platform on `:5173`.
- `pnpm typecheck` passes across all three packages.
- `POST /echo` validates its body with Zod and returns `400` on invalid input.

### Observations

- The API and platform currently have no shared types. `AppType` is exported but
  unused. The first real endpoint is the natural point to decide how the
  frontend consumes API types (hand-written types, a typed Hono client, or a
  shared schema package).
- There is no CORS configuration. The Vite dev server and API run on different
  ports, so the first fetch from the platform will fail until CORS or a Vite
  proxy is configured. A Vite proxy keeps the browser on one origin and avoids
  CORS entirely in development.
- `routeTree.gen.ts` is generated and committed. It must be regenerated after
  adding a route; `pnpm build` and the dev server both do this.

### Open questions

- What is the first real feature, and does it need persistence?
- Should API schemas live in `packages/` so both apps validate identically?
- What is the deployment target for each app?

### Parking lot

- Auth approach (session vs token) — blocked on the first-user question.
- Error response format — worth standardising before the API grows.
- Environment configuration — currently `process.env` read inline; may want a
  validated config module.
