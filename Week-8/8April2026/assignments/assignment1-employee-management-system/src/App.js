import { useSelector } from 'react-redux';
import EmployeeForm from './components/EmployeeForm';
import EmployeeList from './components/EmployeeList';
import Header from './components/Header';
import LoadingSpinner from './components/LoadingSpinner';
import Login from './components/Login';
import Notification from './components/Notification';
import { selectIsAuthenticated } from './redux/authSlice';
import { selectTheme } from './redux/uiSlice';
import './App.css';

function App() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const theme = useSelector(selectTheme);

  if (!isAuthenticated) {
    return (
      <div className={`App ${theme}`}>
        <LoadingSpinner />
        <Notification />
        <Login />
      </div>
    );
  }

  return (
    <div className={`App ${theme}`}>
      <LoadingSpinner />
      <Notification />
      <main className="dashboard-container">
        <Header />
        <section className="dashboard-grid">
          <EmployeeForm />
          <EmployeeList />
        </section>
      </main>
    </div>
  );
}

export default App;
