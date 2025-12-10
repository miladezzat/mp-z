# Marketplace Frontend - Key Points

## Tech Stack

- **Framework**: Next.js 15 (App Router), RTK Query, NextUI v2, Tailwind CSS
- **Backend**: Express.js (JWT auth, in-memory DB)
- **Ports**: Frontend (3001), Backend (3000)

## Authentication

- JWT tokens in Redux state (XSS-resistant)
- Protected: cart, orders, checkout, profile
- Public: products, login
- Test user: `john.doe@example.com` / `password123`

## Core Features

- User auth with persistent session (Redux persist)
- Product catalog with search/filters
- Shopping cart with optimistic updates
- Order management and checkout
- Auth guards for protected routes
- Next.js API proxy (hides backend URL)

## Architecture

- RTK Query for server state & caching (5min stale, 10min GC)
- Tag-based cache invalidation
- Server/Client component split
- Responsive design with NextUI
- React Hook Form + Zod validation

## Setup

```bash
# Backend: http://localhost:3000
cd backend && npm install && npm start

# Frontend: http://localhost:3001
cd frontend && npm install && npm run dev
```

## Key Decisions

- In-memory tokens (not localStorage)
- API proxy for security
- Optimistic UI updates
- Image optimization with `unoptimized` flag for external URLs
- Client-side hydration checks for Next.js SSR
