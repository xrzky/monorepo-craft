# Documentation

This directory holds the written record of how and why the product is built.

```
docs/
├── decision/   # Architecture and engineering decisions (ADRs)
├── product/    # Product decisions and ongoing notes
└── README.md
```

## Decision records

Decisions live in `decision/` and follow the naming convention:

```
decision/xxxx-meaningful-name.md
```

- `xxxx` is a zero-padded, monotonically increasing number (`0001`, `0002`, ...).
- `meaningful-name` is a short kebab-case summary of the decision.
- Numbers are never reused. A decision that is replaced keeps its number.

### Statuses

Every decision record has exactly one status:

| Status       | Meaning                                                               |
| ------------ | --------------------------------------------------------------------- |
| `accepted`   | The decision is in effect and should be followed.                     |
| `superseded` | The decision was replaced by a newer record. Link to its replacement. |
| `deprecated` | The decision is no longer recommended, but no replacement exists yet. |

When a decision changes, write a new record and set the old one to `superseded`,
linking both ways. Do not rewrite the history of an accepted record.

### Template

```markdown
# NNNN: Title

- **Status:** accepted | superseded | deprecated
- **Date:** YYYY-MM-DD
- **Supersedes:** NNNN (optional)
- **Superseded by:** NNNN (optional)

## Context

What situation forced a decision? Include constraints and forces at play.

## Decision

What was decided, stated in one or two sentences.

## Consequences

What becomes easier, what becomes harder, and what we accept as a trade-off.

## Alternatives considered

What else was on the table and why it was not chosen.
```

## Product records

Product documents live in `product/` and use the same numbering scheme:

```
product/xxxx-meaningful-name.md
```

They cover:

- **Product decisions** — scope, target users, behaviour, and prioritisation.
  Written like an ADR: context, decision, consequences.
- **Notes** — exploratory thinking, research, open questions, and meeting
  outcomes. Notes are append-only; promote conclusions into a product decision
  once they settle.

## Index

### Decisions

| ID   | Title                                        | Status   |
| ---- | -------------------------------------------- | -------- |
| 0001 | Use a pnpm workspace monorepo                | accepted |
| 0002 | Ship internal packages as TypeScript source  | accepted |
| 0003 | Hono with Zod request validation             | accepted |
| 0004 | TanStack Router with file-based routing      | accepted |
| 0005 | Custom logger instead of a logging framework | accepted |
| 0006 | Oxlint, Oxfmt, and a pre-commit gate         | accepted |
| 0007 | Playwright E2E suite at the repository root  | accepted |

### Product

| ID   | Title                 |
| ---- | --------------------- |
| 0001 | Initial product scope |
| 0002 | Product notes         |
