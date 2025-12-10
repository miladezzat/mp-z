# Marketplace Frontend

A modern e-commerce frontend built with Next.js 15, TypeScript, Redux Toolkit, and NextUI.

> 📚 **See Also**: [ASSUMPTION.md](./ASSUMPTION.md) - Key architectural decisions, tech stack details, and setup summary

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **State Management**: Redux Toolkit + RTK Query
- **UI Library**: NextUI v2
- **Styling**: Tailwind CSS
- **Form Validation**: React Hook Form + Zod
- **Testing**: Jest + React Testing Library
- **Notifications**: Sonner

## 📋 Prerequisites

- Node.js 20.x+
- npm or yarn
- **Backend API running on `http://localhost:3000`**

### Backend Setup (Required)

The frontend requires the backend API to be running. Follow these steps:

1. **Navigate to backend directory**

   ```bash
   cd ../backend
   ```

2. **Install backend dependencies**

   ```bash
   npm install
   ```

3. **Configure backend environment**

   ```bash
   cp .env.example .env
   ```

   Edit `.env` with your configuration:

   ```env
   PORT=3000
   NODE_ENV=development
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRES_IN=7d
   ```

4. **Start the backend server**

   ```bash
   npm start
   ```

   Backend will be available at `http://localhost:3000`

> 📖 **Backend Documentation**: See `../backend/README.md` for full API documentation, endpoints, and features

## 🛠️ Frontend Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Configuration

Create a `.env.local` file in the frontend root directory:

```env
# Backend API URL (used by Next.js proxy)
BACKEND_API_URL=http://localhost:3000/api

# App Configuration
NEXT_PUBLIC_APP_NAME=Marketplace
NEXT_PUBLIC_APP_URL=http://localhost:3001
```

**Environment Variables Explained:**

- `BACKEND_API_URL` - Backend API endpoint (proxied through Next.js rewrites)
- `NEXT_PUBLIC_APP_NAME` - Application name (accessible in browser)
- `NEXT_PUBLIC_APP_URL` - Frontend URL

> ⚠️ **Note**: Variables prefixed with `NEXT_PUBLIC_` are exposed to the browser. Keep sensitive data in server-only variables.

### 3. Start Development Server

```bash
npm run dev
```

The application will be available at `http://localhost:3001`

> ⚠️ **Important**: Ensure the backend is running on port 3000 before starting the frontend

## 📝 Available Scripts

### Development

```bash
npm run dev          # Start development server on port 3001
```

### Production

```bash
npm run build        # Build for production
npm start            # Start production server on port 3001
```

### Code Quality

```bash
npm run lint           # Run ESLint
npm run lint:fix       # Run ESLint and auto-fix issues
npm run format         # Format code with Prettier
npm run format:check   # Check code formatting
npm run type-check     # Run TypeScript type checking
```

### Testing

```bash
npm test               # Run all tests
npm run test:watch     # Run tests in watch mode
npm run test:coverage  # Run tests with coverage report
```

## 🎨 Code Quality Tools

### ESLint + Prettier

The project uses ESLint for linting and Prettier for code formatting.

**Configuration:**

- `.eslintrc.json` - ESLint rules with Next.js and TypeScript
- `.prettierrc` - Prettier formatting rules
- `.prettierignore` - Files to ignore for formatting

**Usage:**

```bash
# Check for linting issues
npm run lint

# Auto-fix linting issues
npm run lint:fix

# Format all files
npm run format

# Check if files are formatted
npm run format:check
```

### Git Hooks with Husky

Automated quality checks run on git hooks:

**Pre-commit Hook:**

- Runs `lint-staged` on staged files
- Auto-fixes ESLint issues
- Formats code with Prettier
- Only affects files you're committing

**Pre-push Hook:**

- Runs TypeScript type checking
- Runs ESLint on entire codebase
- Runs all tests
- Prevents push if checks fail

**Bypass hooks (use sparingly):**

```bash
# Skip pre-commit
git commit --no-verify

# Skip pre-push
git push --no-verify
```

### Lint-staged

Only lints and formats files that are staged for commit:

```json
{
  "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
  "*.{json,css,md}": ["prettier --write"]
}
```

## 🧪 Testing

The project uses Jest and React Testing Library for unit testing.

### Running Tests

```bash
# Run all tests once
npm test

# Run tests in interactive watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

Tests are located in `__tests__` directories alongside the code:

```
src/
  components/
    common/
      __tests__/
        Pagination.test.tsx
  hooks/
    __tests__/
      useAuth.test.ts
  utils/
    __tests__/
      helpers.test.ts
```

### Current Test Coverage

- ✅ Component tests (Pagination)
- ✅ Hook tests (useAuth)
- ✅ Utility function tests (helpers)

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── products/          # Products listing & details
│   │   ├── cart/              # Shopping cart
│   │   ├── checkout/          # Checkout flow
│   │   ├── orders/            # Order history
│   │   ├── login/             # Authentication
│   │   └── profile/           # User profile
│   │
│   ├── components/            # React components
│   │   ├── products/          # Product components
│   │   ├── cart/              # Cart components
│   │   ├── checkout/          # Checkout components
│   │   ├── orders/            # Order components
│   │   ├── common/            # Shared components
│   │   └── guards/            # Route guards
│   │
│   ├── hooks/                 # Custom React hooks
│   │   ├── useAuth.ts         # Authentication hook
│   │   ├── useCart.ts         # Cart logic hook
│   │   ├── useCheckout.ts     # Checkout logic hook
│   │   ├── useOrders.ts       # Orders logic hook
│   │   └── useProductsPage.ts # Products page logic
│   │
│   ├── store/                 # Redux store
│   │   ├── api/               # RTK Query API slices
│   │   ├── slices/            # Redux slices
│   │   └── constants/         # API routes & tags
│   │
│   ├── types/                 # TypeScript types
│   │   ├── entities.types.ts  # Domain entities
│   │   ├── api.requests.ts    # API request types
│   │   └── api.responses.ts   # API response types
│   │
│   ├── utils/                 # Utility functions
│   └── schemas/               # Validation schemas
│
├── .env.local                 # Environment variables (create this)
├── jest.config.js             # Jest configuration
├── next.config.js             # Next.js configuration
├── tailwind.config.ts         # Tailwind CSS configuration
└── tsconfig.json              # TypeScript configuration
```

## 🎨 Key Features

### Architecture

- **Component-Based Design**: Modular, reusable components
- **Custom Hooks**: Business logic separated from UI
- **Type Safety**: Full TypeScript coverage
- **State Management**: Redux Toolkit with RTK Query for API caching

### Pages

- **Products**: Browse products with filters and pagination
- **Product Details**: View product information and add to cart
- **Shopping Cart**: Manage cart items with quantity controls
- **Checkout**: Complete orders with shipping information
- **Orders**: View order history and status
- **Profile**: User account management

### API Integration

- Tag-based cache invalidation
- Optimistic updates
- Error handling with toast notifications
- Request/response type safety

### Authentication

- JWT-based authentication
- Protected routes with AuthGuard
- Persistent sessions with Redux Persist

## 🔧 Configuration Files

### `next.config.js`

- API proxy configuration (rewrites `/api/*` to backend)
- Image optimization settings
- React strict mode enabled

### `tailwind.config.ts`

- NextUI theme integration
- Custom color schemes
- Responsive breakpoints

### `jest.config.js`

- Next.js Jest integration
- Path aliases (`@/*`)
- Coverage settings

## 🚨 Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3001 (frontend)
lsof -ti:3001 | xargs kill -9

# Kill process on port 3000 (backend)
lsof -ti:3000 | xargs kill -9
```

### API Connection Issues

- **Ensure backend is running**: Navigate to `../backend` and run `npm start`
- **Check backend health**: Visit `http://localhost:3000/api/health` in your browser
- **Verify environment variables**: Check `BACKEND_API_URL` in `.env.local`
- **CORS errors**: Backend is configured to accept requests from `http://localhost:3001`
- **Authentication issues**: Use test credentials from backend's mock data:
  - Email: `john.doe@example.com`
  - Password: `password123`

### Test Failures

```bash
# Clear Jest cache
npm test -- --clearCache

# Run with verbose output
npm test -- --verbose
```

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## 📚 Additional Documentation

- **[ASSUMPTION.md](./ASSUMPTION.md)** - Architecture decisions, tech stack rationale, and setup summary
- **[TECHNICAL_DECISIONS.md](./TECHNICAL_DECISIONS.md)** - Detailed technical choices and trade-offs
- **[ARCHITECTURE.md](./ARCHITECTURE.md)** - System architecture and component design
- **[CACHING_STRATEGY.md](./CACHING_STRATEGY.md)** - RTK Query caching and invalidation strategy
- **[UX_DESIGN.md](./UX_DESIGN.md)** - User experience design decisions
- **Backend README**: `../backend/README.md` - Complete API documentation

## 🧑‍💻 Test Credentials

Use these credentials to test the application (from backend mock data):

**Regular User:**

- Email: `john.doe@example.com`
- Password: `password123`

**Admin User:**

- Email: `admin@marketplace.com`
- Password: `password123`

> 💡 **Tip**: The backend uses in-memory storage, so data resets when the server restarts
