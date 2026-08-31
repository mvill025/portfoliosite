// Static asset module declarations (*.png, *.svg, ...) for `next/image` imports.
//
// Next writes the same references into `next-env.d.ts`, but that file is
// generated and gitignored, so it does not exist on a fresh clone. Without
// this, `pnpm typecheck` fails on a clean checkout until someone runs a build.
// Tracked deliberately so `pnpm check` works standalone.

/// <reference types="next" />
/// <reference types="next/image-types/global" />
