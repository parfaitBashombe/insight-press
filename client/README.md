# Insight Press — Client

React 19 + Vite 8 frontend for the Insight Press publishing platform.

## Requirements

- Node.js 20+
- pnpm

## Setup

```bash
pnpm install
pnpm dev      # starts on http://localhost:5173
```

The dev server proxies `/api` to `http://localhost:4001` (configurable in `vite.config.ts`).

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start development server |
| `pnpm build` | Production build to `dist/` |
| `pnpm preview` | Preview production build |
| `pnpm lint` | Run ESLint |

## Path Alias

`@/` resolves to `src/`. Example: `import { useAuth } from "@/context/AuthContext"`.

## Project Structure

```
src/
├── components/
│   ├── dashboard/
│   │   ├── views/       # One component per dashboard view
│   │   ├── sidebar.tsx  # Role-aware navigation sidebar
│   │   ├── types.ts     # View union types (WriterView, AdminView, ReaderView)
│   │   └── mock-data.tsx
│   ├── navbar.tsx
│   └── footer.tsx
├── context/
│   └── AuthContext.tsx  # Global auth state (user, loading, logout)
├── lib/
│   ├── api/             # API call functions (one file per domain)
│   │   ├── index.ts     # apiFetch utility with token refresh
│   │   ├── auth.ts      # Auth endpoints
│   │   ├── admin.ts     # Admin endpoints
│   │   ├── writer.ts    # Writer endpoints
│   │   └── reader.ts    # Public reader endpoints
│   └── validators/      # Zod schemas with inferred types
│       ├── auth.ts
│       └── article.ts
├── pages/               # Route-level page components
├── types/               # TypeScript declaration files
│   ├── auth.d.ts
│   ├── admin.d.ts
│   ├── writer.d.ts
│   └── reader.d.ts
└── main.tsx
```

## Routing

| Path | Component | Auth |
|------|-----------|------|
| `/` | HomePage | — |
| `/blogs` | BlogsPage | — |
| `/about` | AboutPage | — |
| `/contact` | ContactPage | — |
| `/signin` | SignInPage | — |
| `/signup` | SignUpPage | — |
| `/verify-request` | VerifyPage | — |
| `/dashboard` | DashboardPage | ✓ |

The `/dashboard` route is role-aware — it renders the admin, writer, or reader workspace based on the authenticated user's role.

## Design System

- **Colors**: Amber (`#FBBF24`) as accent, `#0C0C0C` as dark background, `#F8F6F1` as light background
- **Fonts**: Playfair Display (headings), DM Sans (body)
- **Components**: Tailwind CSS utility classes, dark-first design
