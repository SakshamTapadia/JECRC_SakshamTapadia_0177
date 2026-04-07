# Architecture Documentation

## Advanced Context API Implementation

This document provides a detailed technical overview of the Employee Portal architecture.

## System Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                       index.html                             │
│                    React DOM Mount                           │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                      main.jsx                                │
│              Set up Provider Hierarchy                       │
└─────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────┐
│                    Provider Stack                            │
├─────────────────────────────────────────────────────────────┤
│ ┌──────────────────────────────────────────────────────────┐│
│ │          NotificationProvider (Outermost)                ││
│ │  ┌────────────────────────────────────────────────────┐ ││
│ │  │          ThemeProvider                            │ ││
│ │  │  ┌──────────────────────────────────────────────┐ │ ││
│ │  │  │          AuthProvider                        │ │ ││
│ │  │  │  ┌──────────────────────────────────────────┐│ │ ││
│ │  │  │  │      EmployeeProvider                    ││ │ ││
│ │  │  │  │  ┌──────────────────────────────────────┐││ │ ││
│ │  │  │  │  │         App.jsx                       │││ │ ││
│ │  │  │  │  │  ┌──────────────────────────────────┐│││ │ ││
│ │  │  │  │  │  │  Header + Sidebar + Content      ││││ │ ││
│ │  │  │  │  │  │  (All Pages & Components)        ││││ │ ││
│ │  │  │  │  │  └──────────────────────────────────┘│││ │ ││
│ │  │  │  │  └──────────────────────────────────────┘││ │ ││
│ │  │  │  └──────────────────────────────────────────┘│ │ ││
│ │  │  └──────────────────────────────────────────────┘ │ ││
│ │  └────────────────────────────────────────────────────┘ ││
│ └──────────────────────────────────────────────────────────┘│
└─────────────────────────────────────────────────────────────┘
```

## Context API Layer Architecture

### LayerDefinition

```
┌─────────────────────────────────────────────────────────┐
│                    Context Layer                         │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  │
│  │  AuthContext │  │ ThemeContext │  │ EmployeeCtx  │  │
│  ├──────────────┤  ├──────────────┤  ├──────────────┤  │
│  │ - user       │  │ - theme      │  │ - employees  │  │
│  │ - isAuthed   │  │ - isDarkMode │  │ - loading    │  │
│  │ - loading    │  │              │  │              │  │
│  │              │  │ Methods:     │  │ Methods:     │  │
│  │ Methods:     │  │ - toggle()   │  │ - add()      │  │
│  │ - login()    │  │              │  │ - update()   │  │
│  │ - logout()   │  │ Hook:        │  │ - delete()   │  │
│  │              │  │ useTheme()   │  │ - search()   │  │
│  │ Hook:        │  │              │  │              │  │
│  │ useAuth()    │  │              │  │ Hook:        │  │
│  │              │  │              │  │ useEmployee()│  │
│  └──────────────┘  └──────────────┘  └──────────────┘  │
│                                                          │
│  ┌──────────────────────────────────────────────────┐  │
│  │         NotificationContext                      │  │
│  ├──────────────────────────────────────────────────┤  │
│  │ - notifications array                            │  │
│  │                                                   │  │
│  │ Methods:                                         │  │
│  │ - add() | success() | error() | warn() | info() │  │
│  │                                                   │  │
│  │ Hook: useNotification()                          │  │
│  └──────────────────────────────────────────────────┘  │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Component Hierarchy

```
App
├── Header
│   ├── useAuth() - Get user info
│   └── useTheme() - Toggle theme
├── Sidebar
│   └── Page navigation
└── Pages (based on currentPage state)
    ├── Dashboard
    │   ├── useEmployee() - Get stats
    │   └── useAuth() - User info
    ├── Employees
    │   ├── useEmployee() - CRUD ops
    │   └── useNotification() - Show feedback
    ├── Analytics
    │   └── useEmployee() - Get statistics
    └── Settings
        ├── useAuth() - Show user info
        ├── useTheme() - Toggle settings
        └── useNotification() - Save feedback

Notifications (Overlay)
└── useNotification() - Show toasts
```

## Data Flow Patterns

### 1. Authentication Flow

```
Login.jsx Component
    ↓
Form Submit: login(email, password)
    ↓
AuthContext.login() method
    ↓
Validate credentials against mock data
    ↓
    ├─ Valid:
    │   ├ Set user state
    │   ├ Set isAuthenticated = true
    │   ├ Store in localStorage
    │   └ Return { success: true }
    │
    └─ Invalid:
        └ Return { success: false, message: "..." }
    ↓
Component receives response
    ↓
Show notification (success/error)
    ↓
Navigate to dashboard
```

### 2. Employee CRUD Flow

```
Employees.jsx Component
    ↓
User Action: Add/Edit/Delete Employee
    ↓
Call useEmployee() method
    ├─ addEmployee(data)
    ├─ updateEmployee(id, data)
    └─ deleteEmployee(id)
    ↓
EmployeeContext updates state
    ├ Array of employees updated
    └ All consumers re-render
    ↓
Component detects new state
    ↓
Show success notification
    ↓
Table updates immediately
```

### 3. Theme Toggle Flow

```
Header.jsx - User clicks theme button
    ↓
Call useTheme().toggleTheme()
    ↓
ThemeContext.toggleTheme() method
    ├ Update state: theme = light/dark
    ├ Update localStorage
    └ Apply CSS: document.documentElement.setAttribute()
    ↓
All components consuming useTheme() re-render
    ↓
CSS variables update:
    ├ --bg-primary
    ├ --text-primary
    ├ --border-color
    └ --accent-color
    ↓
Page renders with new theme colors
```

### 4. Notification Flow

```
Any component
    ↓
Action: success/error/info/warning
    ↓
Call useNotification().success("message")
    ↓
NotificationContext.addNotification()
    ├ Create notification object with ID
    ├ Add to notifications array
    └ Set auto-dismiss timer
    ↓
Notifications.jsx component re-renders
    ↓
Toast appears on screen
    ↓
3 seconds (default) → Auto-dismiss
    ↓
Remove from notifications array
```

## State Management Details

### AuthContext State
```javascript
{
  user: {
    id: number,
    email: string,
    name: string,
    role: string // 'admin' | 'manager' | 'employee'
  } | null,
  isAuthenticated: boolean,
  loading: boolean
}
```

### ThemeContext State
```javascript
{
  theme: 'light' | 'dark',
  isDarkMode: boolean
}
```

### EmployeeContext State
```javascript
{
  employees: [
    {
      id: number,
      name: string,
      email: string,
      role: string,
      department: string,
      salary: number,
      joinDate: string
    }
  ],
  loading: boolean
}
```

### NotificationContext State
```javascript
{
  notifications: [
    {
      id: number,
      message: string,
      type: 'success' | 'error' | 'info' | 'warning'
    }
  ]
}
```

## Performance Considerations

### 1. Context Splitting
- **Why:** Prevents unnecessary re-renders when unrelated state changes
- **How:** Each context only contains related state
- **Benefit:** Notification changes don't re-render entire app

### 2. Custom Hooks
- **Why:** Encapsulates context retrieval and error handling
- **How:** useAuth(), useTheme(), etc. wrap useContext()
- **Benefit:** Cleaner component code, easier refactoring

### 3. Local vs Global State
- **Local:** Search term, form data, modal visibility (component state)
- **Global:** User, theme, employees, notifications (context)
- **Why:** Only truly shared state in context

### 4. Memoization Opportunities
```javascript
// Could be optimized with useMemo
const value = useMemo(() => ({
  theme,
  toggleTheme,
  isDarkMode: theme === 'dark',
}), [theme]);
```

## Integration Points

### 1. localStorage Integration
- **What:** Persists user session and theme preference
- **Where:** AuthContext.useEffect() and ThemeContext.useEffect()
- **When:** On app mount, restore from localStorage

### 2. CSS Variables System
- **What:** Dynamic theming without component-level styling
- **Where:** ThemeContext applies variables via document.documentElement
- **How:** CSS files use `var(--primary-color)` etc.

### 3. Form Validation
- **What:** Validates employee data before submission
- **Where:** Employees.jsx component
- **How:** Check required fields and show error notifications

### 4. Computed Selectors
- **What:** Derived data (totals, averages, filters)
- **Where:** EmployeeContext provides methods
- **Why:** Avoid recalculating in components

## Testing Strategy

### Unit Tests (Context)
```javascript
// Test AuthContext
- login with valid credentials
- login with invalid credentials
- logout clears user
- localStorage persists user

// Test ThemeContext
- toggleTheme switches theme
- localStorage persists theme
- CSS variables update correctly

// Test EmployeeContext
- addEmployee adds to array
- updateEmployee modifies correctly
- deleteEmployee removes item
- searchEmployees filters results
- Selectors calculate correctly
```

### Integration Tests
```javascript
- Login flow: Form → Context → Navigation
- Theme toggle: Button → Context → CSS update
- Employee CRUD: Form → Context → Table update
- Notification: Action → Context → Display
```

## Deployment Considerations

### Build Configuration
- **Bundler:** Vite (for fast development and optimized production builds)
- **Output:** dist/ folder with optimized assets
- **Environment:** Can set via environment variables

### Production Optimizations
```javascript
// Lazy load pages (if needed)
const Dashboard = React.lazy(() => import('./pages/Dashboard'));

// Code splitting in Vite is automatic

// Connect to real API
const login = async (email, password) => {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    body: JSON.stringify({ email, password })
  });
  // ...
};
```

## Security Notes

1. **Authentication:** Mock in demo; use tokens (JWT) in production
2. **localStorage:** User data stored locally (acceptable for session)
3. **XSS:** React escapes JSX by default, no script injection risks
4. **CORS:** Need backend CORS configuration for API calls

## Future Enhancements

1. **Redux/Zustand:** For more complex state management
2. **TypeScript:** For type safety
3. **Error Boundaries:** Global error handling
4. **API Integration:** Connect to real backend
5. **Authentication:** JWT tokens, OAuth, MFA
6. **Database:** Persist employee data
7. **Testing:** Comprehensive unit/integration tests
8. **Analytics:** Track user behavior
9. **Caching:** Implement service workers
10. **Accessibility:** WCAG compliance improvements
