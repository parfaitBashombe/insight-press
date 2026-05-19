# Insight Press

A full-stack multi-author publishing platform where every voice is verified. Readers can apply to become writers, writers publish articles, and admins manage the platform.

## Structure

```
insight-press/
├── client/     # React + Vite frontend
└── server/     # Express + Prisma backend
```

## Quick Start

### 1. Backend

```bash
cd server
pnpm install
cp .env.example .env        # fill in DATABASE_URL, JWT secrets, ImageKit keys
pnpm prisma:migrate         # run DB migrations
pnpm prisma:generate        # generate Prisma client
npx tsx prisma/seed.ts      # seed roles (READER, WRITER, ADMIN)
pnpm dev                    # starts on http://localhost:4001
```

### 2. Frontend

```bash
cd client
pnpm install
pnpm dev                    # starts on http://localhost:5173
```

The Vite dev server proxies `/api` requests to `http://localhost:4001`.

## User Roles

| Role | Capabilities |
|------|-------------|
| READER | Read articles, request writer promotion |
| WRITER | Publish articles, manage own content |
| ADMIN | Full platform access: manage users, roles, promotions |

## Tech Stack

| Layer | Tech |
|-------|------|
| Frontend | React 19, Vite 8, TypeScript, Tailwind CSS 4, React Router 7 |
| Rich text | react-quill-new |
| Backend | Express 5, TypeScript, Node.js |
| Database | PostgreSQL via Prisma 7 |
| Auth | JWT (access + refresh tokens in HTTP-only cookies) |
| Media | ImageKit |
| Validation | Zod (both client and server) |
