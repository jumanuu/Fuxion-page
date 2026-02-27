# AGENTS.md - FuxionPage Development Guide

## Project Overview

This is a **Vite + React** project with **Tailwind CSS** for styling. It uses **React Router** for navigation and **Axios** for HTTP requests. The project is deployed to GitHub Pages from the `dist` folder.

## Build / Lint / Test Commands

### Development
```bash
npm run dev          # Start Vite dev server
npm run build        # Build for production
npm run preview      # Preview production build locally
```

### Running a Single Test
```bash
# If using Vitest
npm run test -- --run single          # Run single test file
npm run test -- --run --testNamePattern="test name"  # Run specific test

# If using Jest
npm test -- --testPathPattern="filename"   # Run specific test file
npm test -- --testNamePattern="test name"  # Run specific test by name
```

### Linting
```bash
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint issues automatically
```

### Type Checking
```bash
npm run typecheck     # Run TypeScript type checking
npm run build         # Production build also type-checks
```

## Code Style Guidelines

### General Principles
- Use **functional components** with hooks instead of class components
- Keep components small and focused (single responsibility)
- Use **TypeScript** for all new code (project uses TS patterns in React)
- Prefer **composition** over inheritance

### Imports
- Use absolute imports with path aliases (configure in `tsconfig.json`/`vite.config.ts`)
- Order imports: external libraries → internal modules → relative imports
- Group imports: React/framework → components → hooks → utilities → styles
- Example:
```tsx
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import axios from 'axios'

import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { formatDate } from '@/utils/date'
import './styles.css'
```

### Naming Conventions
- **Components**: PascalCase (`UserProfile`, `HeaderNav`)
- **Hooks**: camelCase with `use` prefix (`useAuth`, `useFetch`)
- **Utilities**: camelCase (`formatCurrency`, `validateEmail`)
- **Constants**: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`, `API_BASE_URL`)
- **Files**: kebab-case for utilities (`date-utils.ts`), PascalCase for components

### Types & Interfaces
```tsx
// Prefer interfaces for object shapes
interface User {
  id: string
  name: string
  email: string
}

// Use type for unions, primitives, etc.
type Status = 'pending' | 'active' | 'disabled'

// Props should be explicit
interface ButtonProps {
  variant?: 'primary' | 'secondary'
  onClick: () => void
  children: React.ReactNode
}
```

### Error Handling
- Use **try-catch** for async operations
- Create custom error classes for domain-specific errors
- Handle API errors with proper error boundaries
- Display user-friendly error messages
```tsx
try {
  const response = await api.get('/users')
} catch (error) {
  if (axios.isAxiosError(error)) {
    // Handle axios error
    console.error('API Error:', error.response?.data)
  } else {
    // Handle unknown error
    console.error('Unknown Error:', error)
  }
}
```

### React Patterns
- Use **Error Boundaries** for component-level error handling
- Memoize expensive computations with `useMemo`
- Memoize callback functions with `useCallback` when passing to child components
- Use **custom hooks** to extract and reuse stateful logic

### CSS / Tailwind
- Use Tailwind utility classes for styling
- Extract repeated class combinations into reusable components
- Use CSS variables for theme colors when needed
- Keep custom CSS minimal and in component-specific files

### File Organization
```
src/
├── components/      # Reusable UI components
│   ├── ui/         # Base UI components (Button, Input, etc.)
│   └── features/   # Feature-specific components
├── hooks/          # Custom React hooks
├── pages/          # Route page components
├── services/       # API services (Axios instances)
├── types/          # TypeScript type definitions
├── utils/          # Utility functions
└── App.tsx         # Root component
```

### Git Conventions
- Use meaningful commit messages
- Branch naming: `feature/description`, `fix/description`, `chore/description`
- Run `npm run lint` and `npm run build` before committing

### CI/CD
- GitHub Actions automatically deploys to Git Pages from `dist/` folder
- Ensure `dist/` is up-to-date before merging to master
- Workflow file: `.github/workflows/deploy.yml`

## Notes
- The `dist/` folder contains the production build (committed to git for GitHub Pages)
- Environment variables go in `.env` (see `.env.example`)
- Node modules should not be committed (already in `.gitignore`)
