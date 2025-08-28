# React + shadcn + React Query Boilerplate

A minimal, practical starter for building React apps with TypeScript, Vite, Tailwind + shadcn-style UI components (Radix + CVA), and data fetching with @tanstack/react-query and axios. This repo includes a simple auth flow with axios interceptors and refresh-token handling, React Query devtools, and a collection of prebuilt UI components under `src/components/ui`.

## Quick plan

- Confirm stack and scripts from `package.json`.

- Explain API/axios configuration and refreshing auth flow (hooks in `src/hooks`).
- Show example of using React Query with the app's axios instance.

## Features

- React 18 + TypeScript
- Vite build tooling
- Tailwind CSS + shadcn-style components (Radix primitives + CVA)
- @tanstack/react-query (v5) for server state and caching
- Axios instances with built-in upload instance and interceptors
- Token refresh flow using a mutex to avoid concurrent refreshes
- React Query Devtools and Sonner toaster prewired

## Prerequisites

- Node.js (recommend v18+)
- npm or a compatible package manager

## Setup (PowerShell)

```powershell
npm install
```

Start dev server:

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

Linting:

```powershell
npm run lint
```
