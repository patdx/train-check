# Train Check

A Vue 3 application for checking train schedules, built with Vite and deployed on Cloudflare Workers.

## Tech Stack

- **Frontend**: Vue 3 + TypeScript + Vite
- **Backend**: Cloudflare Workers (Hono)
- **Styling**: Tailwind CSS
- **Package Manager**: pnpm

## Project Setup

```sh
pnpm install
```

## Development

### Frontend Development (Vite dev server)

```sh
pnpm dev
```

This runs the Vue app with hot-reload. The frontend will proxy API requests to the Cloudflare Worker.

### Full Stack Development (with Cloudflare Worker)

```sh
pnpm preview
```

This builds the frontend and runs both the Vue app and Cloudflare Worker together using `wrangler dev`.

## Building

```sh
pnpm build
```

This will:
1. Type-check the codebase
2. Build the Vue frontend
3. Prepare the Cloudflare Worker

## Deployment

```sh
pnpm deploy
```

Deploys the application to Cloudflare Workers.

## Environment Variables

Copy `.env.example` to `.env` and configure:

- `VITE_API_URL`: API base URL (leave empty for relative URLs with Cloudflare Workers)

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)

## Type Support for `.vue` Imports in TS

TypeScript cannot handle type information for `.vue` imports by default, so we replace the `tsc` CLI with `vue-tsc` for type checking. In editors, we need [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) to make the TypeScript language service aware of `.vue` types.

## Linting

```sh
pnpm lint
```
