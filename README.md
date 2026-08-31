# THIS IS MY VERY PROFESSIONAL SITE

My professional portfolio site, built with Next.js and TypeScript.

- [`michaelryanvillanueva.com`](https://michaelryanvillanueva.com)

## Stack

Next.js 16 (Pages Router) · React 19 · TypeScript 5.9 · CSS Modules · pnpm

## Running locally

Requires **Node 24+** and **pnpm 11+**.

```bash
git clone https://github.com/mvill025/portfoliosite.git
cd portfoliosite
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command         | What it does                    |
| --------------- | ------------------------------- |
| `pnpm dev`      | Dev server on :3000             |
| `pnpm build`    | Production build                |
| `pnpm start`    | Serve the production build      |
| `pnpm check`    | Typecheck + lint + format check |
| `pnpm lint:fix` | Autofix lint issues             |
| `pnpm format`   | Autofix formatting              |

CI runs `pnpm check` and `pnpm build` on every push and pull request.

## Structure

- `pages/` — routes (Pages Router)
- `components/` — components, each with a co-located CSS module
- `models/` — shared TypeScript interfaces
- `styles/` — global CSS
- `public/` — static assets

The `/projects` page pulls the six most recently updated repos from the GitHub
REST API at build time and revalidates hourly (ISR).

## Working with AI agents

Project conventions, version constraints, and gotchas live in
[`AGENTS.md`](AGENTS.md), which `CLAUDE.md` imports.

## Deploying

Deployed on [Vercel](https://vercel.com). Pushes to `main` deploy automatically.
