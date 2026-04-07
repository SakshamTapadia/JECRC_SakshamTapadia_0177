# Developer Quick Reference Guide

## Running the Application

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm build

# Preview production build
npm preview
```

## Key Imports

### Using Auth Context
```javascript
import { useAuth } from '../context/AuthContext';

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth();

  return (
    <div>
      {isAuthenticated ? `Hello ${user.name}` : 'Please login'}
    </div>
  );
}
```

### Using Theme Context
```javascript
import { useTheme } from '../context/ThemeContext';

function MyComponent() {
  const { theme, toggleTheme, isDarkMode } = useTheme();

  return (
    <button onClick={toggleTheme}>
      Switch to {isDarkMode ? 'light' : 'dark'} mode
    </button>
  );
}
```

### Using Employee Context
```javascript
import { useEmployee } from '../context/EmployeeContext';

function MyComponent() {
  const {
    employees,
    addEmployee,
    updateEmployee,
    deleteEmployee,
    searchEmployees,
    getTotalEmployees,
    getAverageSalary
  } = useEmployee();

  return <div>Employee count: {getTotalEmployees()}</div>;
}
```

### Using Notification Context
```javascript
import { useNotification } from '../context/NotificationContext';

function MyComponent() {
  const { success, error, info, warning } = useNotification();

  const handleClick = () => {
    try {
      // Do something
      success('Operation successful!');
    } catch (err) {
      error('Something went wrong');
    }
  };

  return <button onClick={handleClick}>Click me</button>;
}
```

## Common Patterns

### Form Handling
```javascript
const [formData, setFormData] = useState({
  name: '',
  email: '',
});

const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData(prev => ({ ...prev, [name]: value }));
};

const handleSubmit = (e) => {
  e.preventDefault();
  addEmployee(formData);
  success('Employee added!');
  setFormData({ name: '', email: '' });
};
```

### Conditional Rendering Based on Auth
```javascript
if (!isAuthenticated) {
  return <Login onLoginSuccess={handleLoginSuccess} />;
}

if (user?.role !== 'admin') {
  return <AccessDenied />;
}

return <AdminPanel />;
```

### Table with Delete Confirmation
```javascript
const handleDelete = (id) => {
  if (confirm('Are you sure?')) {
    deleteEmployee(id);
    success('Deleted successfully');
  }
};

<button onClick={() => handleDelete(emp.id)}>Delete</button>
```

## CSS Classes Available

### Layout
- `.app-container` - Main app wrapper
- `.header` - Top header
- `.layout` - Flex layout wrapper
- `.sidebar-layout` - Sidebar content wrapper
- `.main-content` - Main content area
- `.navbar` - Navigation sidebar

### Components
- `.card` - Card container
- `.button`, `.btn-primary`, `.btn-secondary`, `.btn-danger`, `.btn-success`
- `.form-group`, `.form-label`, `.form-input`, `.form-select`, `.form-textarea`
- `.table` - Table styling
- `.notification`, `.notification.success`, `.notification.error`

### Utilities
- `.flex` - Flexbox container
- `.gap-1`, `.gap-2` - Gap utilities
- `.mt-1`, `.mt-2` - Margin top
- `.mb-1`, `.mb-2` - Margin bottom
- `.stats-grid` - Grid for stat cards
- `.stat-card`, `.stat-value`, `.stat-label`

### CSS Variables (Light Mode)
```css
--bg-primary: #ffffff
--bg-secondary: #f5f5f5
--text-primary: #000000
--text-secondary: #666666
--border-color: #e0e0e0
--accent-color: #2563eb
--success-color: #10b981
--error-color: #ef4444
--warning-color: #f59e0b
```

## Directory Structure Reference

```
employee-portal/
├── src/
│   ├── context/
│   │   ├── AuthContext.jsx          ← Authentication state
│   │   ├── ThemeContext.jsx         ← Theme management
│   │   ├── EmployeeContext.jsx      ← Employee data & CRUD
│   │   └── NotificationContext.jsx  ← Toast notifications
│   │
│   ├── components/
│   │   ├── Header.jsx               ← Top header
│   │   ├── Sidebar.jsx              ← Navigation
│   │   ├── Login.jsx                ← Login form
│   │   └── Notifications.jsx        ← Toast container
│   │
│   ├── pages/
│   │   ├── Dashboard.jsx            ← Overview page
│   │   ├── Employees.jsx            ← Employee management
│   │   ├── Analytics.jsx            ← Reports & statistics
│   │   └── Settings.jsx             ← User settings
│   │
│   ├── styles/
│   │   └── global.css               ← All styles
│   │
│   ├── App.jsx                      ← Main component
│   └── main.jsx                     ← Entry point
│
├── index.html                       ← HTML template
├── vite.config.js                   ← Vite configuration
├── package.json                     ← Dependencies
├── README.md                        ← Main documentation
├── ARCHITECTURE.md                  ← Architecture details
└── .gitignore
```

## Mock Credentials

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | password123 | admin |
| manager@company.com | password123 | manager |
| employee@company.com | password123 | employee |

## Common Tasks

### Add a New Page
1. Create file in `src/pages/NewPage.jsx`
2. Add context hooks as needed
3. Import in `App.jsx`
4. Add case in switch statement
5. Add navbar item in `Sidebar.jsx`

### Add a New Context
1. Create `src/context/NewContext.jsx`
2. Create provider component and hook
3. Add provider to hierarchy in `main.jsx`
4. Use hook with `useNewContext()`

### Style Changes
- Update CSS variables in `global.css`
- Use CSS classes or inline styles with `var(--variable-name)`
- Theme changes automatically apply

### Add Notifications
```javascript
const { success, error, warning, info } = useNotification();

success('Done!');        // Green toast
error('Failed!');        // Red toast
warning('Careful!');     // Yellow toast
info('Note this!');      // Blue toast
```

### localStorage Usage
Already handled in contexts:
- AuthContext saves user to `currentUser`
- ThemeContext saves theme to `theme`

To add custom storage:
```javascript
// Save
localStorage.setItem('key', JSON.stringify(value));

// Load
const value = JSON.parse(localStorage.getItem('key'));

// Clear
localStorage.removeItem('key');
```

## Debugging Tips

### Check Context Value
```javascript
const auth = useAuth();
console.log('Auth state:', auth);
console.log('User:', auth.user);
console.log('Is authenticated:', auth.isAuthenticated);
```

### Check Theme
```javascript
console.log('Current theme:', document.documentElement.getAttribute('data-theme'));
console.log('Body background:', getComputedStyle(document.body).backgroundColor);
```

### Check Notifications
```javascript
const { notifications } = useNotification();
console.log('Notifications:', notifications);
```

### React DevTools Tips
- Install React DevTools browser extension
- Check component tree
- View context values in component props
- Time travel debug state changes

## Performance Tips

1. **Avoid Inline Objects in JSX**
   ```javascript
   // Bad
   <div style={{ color: 'red' }}>Text</div>

   // Good
   const styles = { color: 'red' };
   <div style={styles}>Text</div>
   ```

2. **Use Local State for UI**
   ```javascript
   // Search input → local state
   const [searchTerm, setSearchTerm] = useState('');

   // Not global context
   ```

3. **Memoize expensive computations**
   ```javascript
   const totalSalary = useMemo(() =>
     employees.reduce((sum, emp) => sum + emp.salary, 0),
     [employees]
   );
   ```

4. **Split contexts by concern**
   - AuthContext only updates when user changes
   - ThemeContext only updates when theme changes
   - EmployeeContext only updates when employees change

## Error Messages

### "useAuth must be used within an AuthProvider"
- Make sure component is inside `<AuthProvider>`
- Check provider hierarchy in `main.jsx`

### "useEmployee must be used within an EmployeeProvider"
- Make sure `<EmployeeProvider>` wraps your component
- Check provider order in `main.jsx`

### "useTheme must be used within a ThemeProvider"
- Ensure `<ThemeProvider>` is in the hierarchy
- Check provider nesting in `main.jsx`

### "useNotification must be used within a NotificationProvider"
- Add `<NotificationProvider>` wrapper
- Must be outermost provider

## Most Common Edits

### Change button colors
Edit `global.css`: `.btn-primary`, `.btn-success`, etc.

### Change theme colors
Edit `global.css`: `:root[data-theme='light']` and `:root[data-theme='dark']`

### Add new form field
Edit `Employees.jsx`: Add to formData state and form inputs

### Add new stat to dashboard
Edit `Dashboard.jsx`: Add to statCards array

### Change employee fields
Edit `EmployeeContext.jsx` initial data and `Employees.jsx` form
