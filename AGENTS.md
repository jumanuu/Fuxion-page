# FuxionPage - Agent Guidelines

## Project Overview
React 19 + Vite 7 + TailwindCSS 4 e-commerce with role-based access (User/Admin).

## Tech Stack
- React 19, Vite 7, TailwindCSS 4
- React Router DOM 7, Framer Motion 12, Lucide React, Axios
- ESLint 9 (flat config), TypeScript types available

## Commands

```bash
# Development
npm run dev           # Dev server at http://localhost:5173
npm run build         # Build to dist/
npm run preview       # Preview production build

# Linting
npm run lint          # Run ESLint on all .js/.jsx files
npm run lint -- --fix           # Auto-fix linting issues
npm run lint -- src/components/ # Lint specific directory
npm run lint -- src/App.jsx    # Lint single file
npx eslint src/file.jsx --fix  # Direct ESLint with fix

# Testing (no framework installed - to add:)
# npm install -D vitest @testing-library/react jsdom
# Add to package.json: "test": "vitest"
# npm test -- src/file.test.jsx --run  # Run single test
```

## Code Style

### Import Order
```javascript
// 1. React
import React, { useState, useEffect } from 'react';
// 2. Third-party
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';
// 3. Custom hooks
import { useAuth } from '../../context/AuthContext';
// 4. Services/API
import { productService } from '../../services/api';
// 5. Components
import Header from '../Header/Header';
// 6. Styles
import './ComponentName.css';
```

### Naming Conventions
- Components/Files: `PascalCase` (ProductCard.jsx)
- Hooks: `camelCase` with `use` prefix (useAuth)
- Functions: `camelCase` (handleAddToCart)
- Constants: `UPPER_SNAKE_CASE`
- CSS Classes: `kebab-case`
- Props interfaces: `ComponentNameProps`

### Formatting
- Use 2 spaces for indentation
- Max line length: 100 characters (soft limit)
- Trailing commas in arrays and objects
- Use semicolons
- Quote property names only when necessary
- Prefer arrow functions for callbacks and short functions

### Component Structure
```jsx
const ComponentName = ({ prop1, prop2 }) => {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // effect logic
  }, [dependencies]);

  const handleClick = () => {};

  return <div className="component-name">{/* JSX */}</div>;
};

export default ComponentName;
```

### Props and State
- Destructure props: `const { title, onSubmit } = props;`
- Initialize state with clear names: `const [isLoading, setIsLoading] = useState(false);`
- Avoid redundant state: derive from props or existing state when possible
- Use `useReducer` for complex state logic

### Error Handling
- Wrap async in try-catch with user-friendly error messages
- Log errors for debugging: `console.error('Error fetching products:', error)`
- Handle loading states with conditional rendering or skeleton loaders
- Provide fallback UI for failed components
- Use toast notifications for user feedback

### Conditional Rendering & Lists
- Use ternary for conditions: `isLoading ? <Spinner /> : <Content />`
- Use && for guards: `isVisible && <Component />`
- Avoid nested ternaries (use early returns)
- Always use unique `key` prop; prefer stable IDs over indices
- Extract list item components for readability

### Event Handlers
- Use arrow functions or bind to preserve context
- Name handlers with `handle` prefix: `handleSubmit`, `handleChange`
- Pass only necessary data to handlers

## Project Structure
```
src/
├── api/           # axios.js, auth.js, products.js, admin.js, mockService.js
├── components/    # layout/, UI/, ProductDetailOverlay/
├── context/       # AuthContext, CartContext, LanguageContext, ThemeContext
├── data/          # products.js
├── hooks/         # useAuth, useCart, useProduct
├── pages/         # Home, ProductDetail, Profile, Sponsor, cart, auth, admin
├── routes/        # ProtectedRoute, AdminRoute
├── sections/      # hero, productsection, productCatalog, sponsorBanner
└── index.css
```

## Patterns

### API Service
```javascript
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {/* Handle logout */}
    return Promise.reject(error);
  }
);
```

### Auth Flow
- JWT in localStorage
- Protect routes with ProtectedRoute/AdminRoute components
- Check role: `user.role === 'admin'`
- Logout: clear localStorage + redirect

### CSS
- Tailwind for layout/spacing, custom CSS for animations
- CSS variables in index.css for theme colors, mobile-first responsive

## ESLint Configuration
- Extends: ESLint recommended, react-hooks/recommended, react-refresh/vite
- Custom rule: `no-unused-vars` ignores vars starting with uppercase/underscore
- Unused vars with `_` prefix are allowed (e.g., `_unusedVar`)

## Development Notes
- All API calls via services in `src/api/`
- Use AuthContext for auth state
- Admin pages require role-based protection
- Cart via CartContext, Language via LanguageContext, Dark mode via ThemeContext
- All UI text in Spanish
- Product images: Unsplash URLs (placeholder for API)
- Mock data in `src/api/mockService.js` and `src/data/products.js`
