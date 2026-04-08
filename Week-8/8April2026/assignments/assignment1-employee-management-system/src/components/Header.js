import { useDispatch, useSelector } from 'react-redux';
import { selectCurrentUser } from '../redux/authSlice';
import { logoutUser } from '../redux/thunks';
import { selectTheme, toggleTheme } from '../redux/uiSlice';
import './Header.css';

const Header = () => {
  const dispatch = useDispatch();
  const user = useSelector(selectCurrentUser);
  const theme = useSelector(selectTheme);

  return (
    <header className="dashboard-header">
      <div>
        <h1>Employee Dashboard</h1>
        <p>
          Signed in as <strong>{user?.username}</strong> ({user?.role})
        </p>
      </div>

      <div className="header-actions">
        <button type="button" onClick={() => dispatch(toggleTheme())}>
          Theme: {theme === 'light' ? 'Light' : 'Dark'}
        </button>
        <button type="button" className="logout-btn" onClick={() => dispatch(logoutUser())}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
