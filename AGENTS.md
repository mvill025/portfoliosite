<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Portfolio Site

Personal portfolio for Michael Ryan Santos Villanueva. Deployed on Vercel.

## Stack

| Thing | Version | Notes |
| --- | --- | --- |
| Next.js | 16.3.3 | **Pages Router**, not App Router |
| React | 19.2.8 | |
| TypeScript | 5.9.3 | Pinned — see Version ceilings |
| ESLint | 9.x | Pinned — see Version ceilings |
| Prettier | 3.9.6 | |
| Package manager | pnpm 11.21.0 | Do not use npm or yarn |

## Commands

```bash
pnpm dev          # dev server on :3000
pnpm build        # production build
pnpm check        # typecheck + lint + format:check — run this before declaring work done
pnpm lint:fix     # autofix lint
pnpm format       # autofix formatting
```

`pnpm check` is the gate. If it passes, the change is structurally sound.

## Version ceilings — do not "helpfully" upgrade these

Both are held back by real, verified incompatibilities, not caution:

- **TypeScript stays on 5.x.** `typescript-eslint` hard-refuses TS 7 (`typescript-eslint does not support TS 7.0`), which breaks `pnpm lint` entirely. `tsc` itself works fine on 7 — linting is what breaks.
- **ESLint stays on 9.x.** ESLint 10 changed the rule context API; `eslint-plugin-react@7.37.5` (a transitive dep of `eslint-config-next`) throws `contextOrFilename.getFilename is not a function`.

Re-check both when `eslint-config-next` ships updated plugin ranges.

## Layout

```
pages/            Pages Router routes
  index.tsx       Home
  projects/       Projects — getStaticProps, ISR revalidate 3600
  404/            Custom 404
  api/hello.ts    Unused scaffold leftover
components/       One dir per component + CSS module + index.ts barrel
models/           Shared TS interfaces
styles/           Global CSS + Home module
public/           Static assets, incl. resume PDF
```

## Conventions

- **CSS Modules only.** No Tailwind, no CSS-in-JS. Co-locate a `.module.css` next to its component.
- **Components are function expressions** returning JSX, with a default export plus an `index.ts` barrel.
- Import static images and pass them to `next/image` — never a bare `src` string for local assets.
- `next/link` renders its own `<a>`. Never nest an `<a>` inside `<Link>` — that was the Next 11 pattern and it is now an error.

## Gotchas

- `pages/projects` calls the GitHub REST API **unauthenticated at build time** (60 req/hr shared by IP). Failures are caught and degrade to an empty project list rather than failing the build.
- `@octokit/core` v7 types repo `id` as `number | bigint`; it is coerced with `Number()` in `getStaticProps`.
- `next-env.d.ts` and `tsconfig.json` are rewritten by `next build`. Don't hand-edit and expect it to stick.
- There is **no test framework**. Verify changes with `pnpm check` plus a real browser pass on `/`, `/projects`, and a missing route.
- The 404 page overflows its card at narrow viewports (`.fourOhFour` is `font-size: 15rem` inside a `width: 45%` card). Pre-existing; fix only if asked.

## Branching — never push to main

**`main` is protected. You may open pull requests against it. You may never push to it.**

This is enforced by a `pre-push` hook in `.githooks/`, wired up by `core.hooksPath`
(set automatically by the `prepare` script on `pnpm install`).

The workflow, every time:

```bash
git switch -c descriptive-branch-name
# ...work...
pnpm check
git commit
git push -u origin descriptive-branch-name
gh pr create --base main
```

Then **stop**. Opening the PR is where an agent's job ends.

Do not, under any circumstances:

- `git push --no-verify` (bypasses the hook)
- `gh pr merge` in any form, including `--auto`
- `git config core.hooksPath` to something else, or edit/delete `.githooks/pre-push`
- Push to `main` from a detached HEAD or via a refspec like `HEAD:main`

Merging is a human decision. If a change seems urgent enough to justify pushing
straight to `main`, it isn't — say so and let a human decide.
