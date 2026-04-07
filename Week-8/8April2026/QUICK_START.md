# Quick Start Checklist

## ✅ Pre-requisites
- [ ] Node.js (v16 or higher) installed
- [ ] npm or yarn package manager
- [ ] Code editor (VS Code recommended)
- [ ] Modern web browser

## 🚀 Getting Started

### Step 1: Navigate to Project
```bash
cd /e/CapG/Week-8/8April2026
```

### Step 2: Install Dependencies
```bash
npm install
```
- This installs React, React DOM, Vite, and all dependencies
- Takes 1-2 minutes depending on internet speed
- Creates `node_modules/` folder (safe to delete, reinstall with npm install)

### Step 3: Start Development Server
```bash
npm run dev
```
- Application opens at http://localhost:3000
- Hot reload is enabled (changes auto-refresh)
- Keep terminal running while developing

## 🔑 Login Credentials

**Try these accounts:**

| Email | Password | Role |
|-------|----------|------|
| admin@company.com | password123 | Admin |
| manager@company.com | password123 | Manager |
| employee@company.com | password123 | Employee |

## 📋 First Steps in App

### 1. Dashboard
- [ ] Click "Dashboard" in sidebar
- [ ] View employee statistics
- [ ] Check recent employees table

### 2. Employees Management
- [ ] Click "Employees" in sidebar
- [ ] View current employees
- [ ] Try adding a new employee:
  - [ ] Click "+ Add Employee"
  - [ ] Fill in form fields
  - [ ] Click "Add Employee"
  - [ ] See success notification
- [ ] Try searching employees:
  - [ ] Type in search box
  - [ ] Results filter in real-time
- [ ] Try editing an employee:
  - [ ] Click "Edit" on any row
  - [ ] Modify fields
  - [ ] Click "Update Employee"
- [ ] Try deleting an employee:
  - [ ] Click "Delete" on any row
  - [ ] Confirm in dialog
  - [ ] See employee removed

### 3. Analytics
- [ ] Click "Analytics" in sidebar
- [ ] View department statistics
- [ ] View salary distributions
- [ ] View role distributions
- [ ] View key metrics

### 4. Settings
- [ ] Click "Settings" in sidebar
- [ ] Review account information
- [ ] Toggle dark mode
- [ ] Try language selection
- [ ] Click "Save Settings"

### 5. Theme Switching
- [ ] Click theme button (🌙/☀️) in header
- [ ] Watch page colors change
- [ ] Refresh page
- [ ] Theme persists (saved to localStorage)

### 6. Logout
- [ ] Click "Logout" button in header
- [ ] Return to login page
- [ ] Try logging in again with different user

## 🛠️ Development Commands

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## 📂 Project Files to Explore

### Contexts (Global State)
- [ ] `src/context/AuthContext.jsx` - Authentication
- [ ] `src/context/ThemeContext.jsx` - Theme
- [ ] `src/context/EmployeeContext.jsx` - Employee data
- [ ] `src/context/NotificationContext.jsx` - Notifications

### Pages
- [ ] `src/pages/Dashboard.jsx` - Overview
- [ ] `src/pages/Employees.jsx` - CRUD management
- [ ] `src/pages/Analytics.jsx` - Reports
- [ ] `src/pages/Settings.jsx` - Preferences

### Components
- [ ] `src/components/Header.jsx` - Top bar
- [ ] `src/components/Sidebar.jsx` - Navigation
- [ ] `src/components/Login.jsx` - Login form
- [ ] `src/components/Notifications.jsx` - Toast display

### Main App
- [ ] `src/App.jsx` - App routing and layout
- [ ] `src/main.jsx` - React entry point
- [ ] `src/styles/global.css` - All styling

## 📚 Documentation to Read

In order of reading:

1. [ ] **README.md** (5 min)
   - Overview and features
   - Getting started
   - Architecture overview

2. [ ] **PROJECT_SUMMARY.md** (10 min)
   - Complete summary of implementation
   - Files created and their purposes
   - Architecture breakdown

3. [ ] **DEVELOPER_GUIDE.md** (10 min)
   - Quick reference for developers
   - Common patterns
   - Code examples

4. [ ] **ARCHITECTURE.md** (15 min)
   - Deep dive into architecture
   - Data flow diagrams
   - Component patterns

## 🎯 Key Concepts to Understand

### 1. Context API
- [ ] Understand what Context API is
- [ ] Review how providers work
- [ ] Study custom hooks (useAuth, useTheme, etc.)

### 2. State Management
- [ ] Global state in contexts
- [ ] Local state in components
- [ ] Derived/computed state

### 3. CRUD Operations
- [ ] How employees are created
- [ ] How employees are updated
- [ ] How employees are deleted
- [ ] How employees are searched

### 4. Authentication Flow
- [ ] Login process
- [ ] Logout process
- [ ] Session persistence
- [ ] Protected routes (basic)

### 5. Theme System
- [ ] CSS variables for theming
- [ ] Theme toggle mechanism
- [ ] Theme persistence

## 🔍 Debugging Tips

### Open Browser DevTools
```
Windows/Linux: F12 or Ctrl+Shift+I
Mac: Cmd+Option+I
```

### Check React State
- Install React DevTools extension
- Go to Components tab
- Click on component
- View props and state on right side

### Common Issues & Solutions

**Issue:** "Cannot read useAuth()"
- **Solution:** Check that component is inside `<AuthProvider>` in App.jsx

**Issue:** Theme not changing
- **Solution:** Make sure theme button is working, check browser console for errors

**Issue:** Form not submitting
- **Solution:** Check form validation, look for error notifications

**Issue:** Employees not showing
- **Solution:** Check EmployeeContext is loaded, verify employees array has data

## ✨ Try These Exercises

### Exercise 1: Add a New Form Field
1. Open `src/pages/Employees.jsx`
2. Add new field to formData state
3. Add input field to form
4. Test adding employee with new field
5. See how easy it is to extend!

### Exercise 2: Change Theme Colors
1. Open `src/styles/global.css`
2. Find `:root[data-theme='light']`
3. Change `--accent-color` value
4. See change instantly (hot reload)
5. Toggle theme to compare

### Exercise 3: Add New Page
1. Create `src/pages/NewPage.jsx`
2. Add it to `src/App.jsx` switch
3. Add navigation link to `src/components/Sidebar.jsx`
4. Test navigation
5. You've extended the app!

### Exercise 4: Understand Data Flow
1. Add console.log in EmployeeContext.addEmployee()
2. Add employee
3. Watch console for your log
4. See how data flows through app

## 🎓 Learning Path

**Beginner** (1-2 hours)
- [ ] Run the app
- [ ] Try all features
- [ ] Read README.md

**Intermediate** (2-3 hours)
- [ ] Read ARCHITECTURE.md
- [ ] Study Context files
- [ ] Do exercises 1-2

**Advanced** (3-4 hours)
- [ ] Deep dive into all components
- [ ] Understand state management
- [ ] Complete all exercises
- [ ] Plan API integration

## 🚀 Next Steps After Learning

1. **Connect to Backend**
   - Add real login API
   - Fetch employees from database
   - Implement real CRUD

2. **Add TypeScript**
   - Type all components
   - Type context values
   - Type props

3. **Improve UI**
   - Add icons
   - Improve animations
   - Better loading states

4. **Add Features**
   - Employee details page
   - Export to CSV
   - Bulk operations

5. **Performance**
   - Code splitting
   - Lazy loading
   - Image optimization

## ❓ Getting Help

### If You Get Stuck

1. **Check the Docs**
   - README.md
   - ARCHITECTURE.md
   - DEVELOPER_GUIDE.md

2. **Check Browser Console**
   - Press F12
   - Look for red error messages
   - Read error details

3. **Check React DevTools**
   - Install React DevTools extension
   - Check component tree
   - View context values

4. **Check Code**
   - Look for typos
   - Check file imports
   - Verify providers are nested correctly

## ✅ Project Status

- [x] All files created
- [x] All features implemented
- [x] All documentation written
- [x] Ready to run
- [x] Ready to learn from
- [x] Ready to extend

---

**You're all set! Run `npm install && npm run dev` to get started!** 🎉
