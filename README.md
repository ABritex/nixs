# Nicholas Abeleda — Portfolio

Full-stack developer portfolio built with TanStack Router, GSAP, and Tailwind CSS v4.

## Tech Stack

- **Framework:** TanStack Start (Vite + TanStack Router)
- **Styling:** Tailwind CSS v4 + shadcn/ui
- **Animations:** GSAP + Framer Motion
- **Forms:** EmailJS
- **Language:** TypeScript

## Getting Started

```bash
npm install
npm run dev
```

The app runs at `http://localhost:3000`.

## Building for Production

```bash
npm run build
npm run preview
```

## Linting & Formatting

```bash
npm run lint
npm run format
npm run check
```

## Deploy

The project uses Nitro for server rendering. Build output is a self-contained Node server:

```bash
npm run build
node dist/server/index.mjs
```

Deploy to Vercel, Fly.io, Render, or any Node-compatible host.
