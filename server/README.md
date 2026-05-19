# Insight Press — Server

Express 5 + TypeScript REST API backed by PostgreSQL via Prisma ORM.

## Requirements

- Node.js 20+
- PostgreSQL database
- pnpm

## Setup

```bash
pnpm install
cp .env.example .env   # see Environment section below
pnpm prisma:migrate
pnpm prisma:generate
npx tsx prisma/seed.ts
pnpm dev
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_ACCESS_SECRET` | Secret for signing access tokens |
| `JWT_REFRESH_SECRET` | Secret for signing refresh tokens |
| `IMAGEKIT_PUBLIC_KEY` | ImageKit public key |
| `IMAGEKIT_PRIVATE_KEY` | ImageKit private key |
| `IMAGEKIT_URL_ENDPOINT` | ImageKit URL endpoint |
| `PORT` | Server port (default: 4001) |

## Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start with hot-reload via nodemon |
| `pnpm build` | Compile TypeScript to `dist/` |
| `pnpm start` | Run compiled output |
| `pnpm prisma:migrate` | Run database migrations |
| `pnpm prisma:generate` | Regenerate Prisma client |

## Architecture

```
src/
├── app/
│   ├── controllers/    # Request handlers (admin, writer, reader, user, promotion, media, profile)
│   ├── middlewares/    # Auth, role-check, validation middlewares
│   ├── routes/         # Route definitions (one file per endpoint)
│   └── validators/     # Zod request validators
├── core/
│   ├── base/           # BaseController, BaseMiddleware, Base (shared response helpers)
│   └── utils/          # Token, password, cookie, port utilities
└── database/
    ├── services/       # Database operations (one service per action)
    └── system/         # Prisma client singleton, BaseService
```

## API Endpoints

### Auth (`/api/auth/`)

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/auth/signup` | — | Register a new user |
| POST | `/auth/signin` | — | Sign in, returns cookies |
| POST | `/auth/logout` | ✓ | Invalidate session |
| POST | `/auth/refresh` | cookie | Refresh access token |
| GET | `/auth/profile` | ✓ | Get current user |
| PATCH | `/auth/update/:id` | ✓ | Update profile |
| PATCH | `/auth/password` | ✓ | Change password |
| POST | `/auth/forgot-password` | — | Send reset email |
| POST | `/auth/reset-password` | — | Reset with token |

### Writer (`/api/writer/articles`)

| Method | Path | Description |
|--------|------|-------------|
| POST | `/writer/articles` | Create draft |
| GET | `/writer/articles` | List own articles |
| GET | `/writer/articles/stats/overview` | Writer statistics |
| GET | `/writer/articles/:id` | Get single article |
| PATCH | `/writer/articles/:id` | Update article |
| DELETE | `/writer/articles/:id` | Delete article |
| PATCH | `/writer/articles/:id/publish` | Publish article |
| PATCH | `/writer/articles/:id/unpublish` | Unpublish article |

### Reader (public, `/api/articles`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/articles` | Paginated published articles |
| GET | `/articles/:slug` | Single article by slug |
| GET | `/articles/author/:id` | Author profile + articles |

### Admin (`/api/admin/`)

| Method | Path | Description |
|--------|------|-------------|
| GET | `/admin/stats` | Platform statistics |
| GET | `/admin/users` | Paginated user list |
| PATCH | `/admin/users/:id/role` | Update user role |
| PATCH | `/admin/users/:id/status` | Suspend or reinstate user |
| GET | `/admin/promotion-requests` | All promotion requests |
| GET | `/admin/roles` | List all roles |

### Promotions

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/promotion/request` | READER | Request writer promotion |
| POST | `/promotion/approve/:id` | ADMIN | Approve request |
| POST | `/promotion/reject/:id` | ADMIN | Reject request |
