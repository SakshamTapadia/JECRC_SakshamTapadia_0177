# Employee Portal - Advanced React Context API

A comprehensive enterprise React application demonstrating advanced Context API patterns for global state management. This application includes authentication, theme management, employee CRUD operations, and analytics features.

## 📋 Features

✅ **Authentication System**
- Login/Logout functionality
- Role-based access (Admin, Manager, Employee)
- Session persistence with localStorage
- Mock authentication with demo credentials

✅ **Theme Management**
- Light/Dark mode toggle
- Theme persistence
- CSS variables for easy customization
- Automatic theme application

✅ **Employee Management (CRUD)**
- Create, Read, Update, Delete employees
- Search functionality
- In-memory data management
- Fields: Name, Email, Role, Department, Salary, Join Date

✅ **Dashboard**
- Employee statistics
- Department count
- Average salary calculation
- Recent employees table

✅ **Analytics & Reports**
- Department-wise statistics
- Salary range distribution
- Role distribution
- Key metrics (total salary, average salary)

✅ **Settings Page**
- User account information
- Preference management
- Application information
- Language selection (demo)

✅ **Notifications System**
- Toast notifications (success, error, info, warning)
- Auto-dismiss functionality
- Global notification management

## 🏗️ Architecture

### Context Structure

The application uses 4 main Context providers, each handling a specific domain of global state:

```
App.jsx
├── NotificationProvider (Global notifications)
├── ThemeProvider (Light/Dark theme)
├── AuthProvider (Authentication & user)
└── EmployeeProvider (Employee data & CRUD)
    └── All pages and components
```

### Context Providers

#### 1. AuthContext (`src/context/AuthContext.jsx`)
- **State:** user, isAuthenticated, loading
- **Methods:** login(), logout()
- **Hook:** useAuth()
- **Purpose:** Manages user authentication and session state

```javascript
const { user, isAuthenticated, loading, login, logout } = useAuth();
```

#### 2. ThemeContext (`src/context/ThemeContext.jsx`)
- **State:** theme (light/dark)
- **Methods:** toggleTheme()
- **Hook:** useTheme()
- **Purpose:** Manages application theme and applies CSS variables

```javascript
const { theme, toggleTheme, isDarkMode } = useTheme();
```

#### 3. EmployeeContext (`src/context/EmployeeContext.jsx`)
- **State:** employees, loading
- **Methods:** addEmployee(), updateEmployee(), deleteEmployee(), searchEmployees()
- **Selectors:** getTotalEmployees(), getAverageSalary(), getDepartments()
- **Hook:** useEmployee()
- **Purpose:** Manages employee data and CRUD operations

```javascript
const {
  employees,
  loading,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  getEmployeeById,
  searchEmployees,
  getTotalEmployees,
  getAverageSalary,
  getDepartments
} = useEmployee();
```

#### 4. NotificationContext (`src/context/NotificationContext.jsx`)
- **State:** notifications array
- **Methods:** addNotification(), removeNotification(), success(), error(), info(), warning()
- **Hook:** useNotification()
- **Purpose:** Manages application-wide toast notifications

```javascript
const { notifications, success, error, info, warning } = useNotification();
```

## 📁 Project Structure

```
src/
├── context/
│   ├── AuthContext.jsx          # Authentication state management
│   ├── ThemeContext.jsx          # Theme state management
│   ├── EmployeeContext.jsx       # Employee data state management
│   └── NotificationContext.jsx   # Notifications state management
├── components/
│   ├── Header.jsx               # Top header with theme toggle
│   ├── Sidebar.jsx              # Navigation sidebar
│   ├── Login.jsx                # Login form
│   └── Notifications.jsx        # Toast notifications display
├── pages/
│   ├── Dashboard.jsx            # Dashboard overview
│   ├── Employees.jsx            # Employee management (CRUD)
│   ├── Analytics.jsx            # Analytics & reports
│   └── Settings.jsx             # User settings
├── styles/
│   └── global.css               # Global styles with CSS variables
├── App.jsx                      # Main app component
├── main.jsx                     # React DOM render entry point
└── index.html                   # HTML entry point
```

## 🎯 Key Concepts Demonstrated

### 1. Context API with Multiple Providers
- Proper context provider hierarchy
- Avoiding prop drilling
- Separation of concerns per context

### 2. Custom Hooks
- useAuth() for authentication
- useTheme() for theme management
- useEmployee() for employee data
- useNotification() for notifications
- All with proper error handling

### 3. State Management Patterns
- Reducer-like pattern for employee CRUD
- Computed selectors (getTotalEmployees, getAverageSalary)
- Efficient state updates using spread operator

### 4. Performance Optimization
- Separate contexts for separate concerns
- Memoization of context values (can be enhanced with useMemo)
- Local component state for UI (forms, search)
- Global state only for shared data

### 5. localStorage Integration
- User session persistence
- Theme preference persistence
- Automatic restoration on app reload

### 6. Error Handling
- useContext hooks validate context usage
- Proper error messages if hooks used incorrectly
- Form validation in components

## 🚀 Getting Started

### Installation

```bash
cd employee-portal
npm install
```

### Development

```bash
npm run dev
```

The application will open at `http://localhost:3000`

### Demo Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | password123 | Admin |
| manager@company.com | password123 | Manager |
| employee@company.com | password123 | Employee |

## 💡 Best Practices Implemented

1. **Context Separation:** Each context handles a single responsibility
2. **Custom Hooks:** Wrapped useContext for cleaner component code
3. **Error Handling:** Proper error messages if hooks used outside providers
4. **Performance:** State updates only trigger re-renders of consuming components
5. **Immutability:** Spread operators used for state updates
6. **CSS Variables:** Easy theme switching via CSS custom properties
7. **localStorage:** Automatic session and preference persistence
8. **Responsive Design:** Mobile-friendly layout
9. **Accessibility:** Semantic HTML and proper ARIA patterns
10. **Type Safety:** Component prop validation (in comments)

## 📊 Data Flow Example

### Adding an Employee
```
Component (Employees.jsx)
    ↓
User clicks "Add Employee"
    ↓
Form submitted with employee data
    ↓
addEmployee() called from useEmployee()
    ↓
EmployeeContext state updated
    ↓
All components consuming useEmployee() re-render
    ↓
notification.success() called
    ↓
NotificationContext displays toast
```

### Switching Theme
```
User clicks theme toggle button (Header.jsx)
    ↓
toggleTheme() called from useTheme()
    ↓
ThemeContext state updated
    ↓
localStorage updated
    ↓
CSS variables updated (--bg-primary, --text-primary, etc.)
    ↓
All components re-render with new styles
```

## 🎨 Theming System

The application uses CSS custom properties (variables) for theming:

```css
:root[data-theme='light'] {
  --bg-primary: #ffffff;
  --text-primary: #000000;
  --accent-color: #2563eb;
  /* ... more variables */
}

:root[data-theme='dark'] {
  --bg-primary: #1a1a1a;
  --text-primary: #ffffff;
  --accent-color: #3b82f6;
  /* ... more variables */
}
```

Components use these variables dynamically:
```css
.button {
  background-color: var(--accent-color);
  color: var(--text-primary);
}
```

## 🔐 Authentication Flow

1. User enters email and password in Login component
2. login() method called with credentials
3. Mock validation against hardcoded user data
4. If valid:
   - User object stored in state
   - isAuthenticated set to true
   - User data persisted to localStorage
5. App component detects isAuthenticated change
6. User redirected to Dashboard

## 📈 Scalability Considerations

To scale this application:

1. **Replace Mock Data:** Connect to real API endpoints
2. **Add Redux/Zustand:** For more complex state needs
3. **Implement Middleware:** For async operations
4. **Add TypeScript:** For type safety
5. **Database Integration:** Persist employee data
6. **Authentication Service:** Real authentication (JWT, OAuth)
7. **Error Boundaries:** Global error handling
8. **Code Splitting:** Lazy load pages with React.lazy()

## 🎓 Learning Outcomes

By studying this project, you'll understand:

✓ How to create and use React Context API
✓ Custom hook patterns for context usage
✓ Multiple context providers organization
✓ Form handling and validation in React
✓ Theme management with CSS variables
✓ localStorage integration
✓ CRUD operations in React
✓ Component composition and reusability
✓ Separation of concerns in React applications
✓ Global state management without Redux

## 📝 Notes

- This uses in-memory data; refresh the page and employee changes are reset
- Mock authentication accepts any user in the credentials list
- Notifications auto-dismiss after 3 seconds by default
- Theme preference is saved and restored on page reload
- The application is fully responsive and mobile-friendly

## Version

**1.0.0** - Initial release with all core features

---

**Built with:** React 18 + Context API + Vite
