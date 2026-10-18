# 0001: Initial product scope

- **Type:** product decision
- **Status:** accepted
- **Date:** 2026-10-18

## Context

The repository has just been scaffolded with an API and a web platform but no
product behaviour yet. Before writing features we need to agree on what the
first version is for, so that scope decisions have something to be measured
against.

## Decision

The first version is an internal web platform backed by a typed HTTP API. It
consists of:

- a browser application at `apps/platform`
- an HTTP API at `apps/api`
- shared internal packages for cross-cutting concerns

The initial milestone is a working end-to-end slice: the platform loads a page,
fetches data from the API, and renders it. The `POST /echo` endpoint and the
`/` and `/about` routes exist as that slice.

Explicitly out of scope for the first version:

- authentication and user accounts
- persistence (the API is stateless)
- public API consumers
- multi-tenancy
- billing

## Consequences

- Work is judged by whether it moves the end-to-end slice forward.
- Statelessness keeps the API trivially deployable and testable; persistence
  becomes a separate decision when the first real feature needs it.
- Deferring auth is safe only while the API is not publicly reachable. Making it
  public requires an auth decision first.
- Requests for out-of-scope items should be captured in product notes and
  promoted to a decision rather than added silently.

## Open questions

- Who is the first user, and what is the first task they need to complete?
- Does the platform need to work offline or on mobile browsers in v1?
- Where will the API be deployed, and does that constrain the runtime?
