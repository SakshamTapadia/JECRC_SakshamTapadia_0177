import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearAuthError, selectAuthError } from '../redux/authSlice';
import { loginUser } from '../redux/thunks';
import './Login.css';

const Login = () => {
  const dispatch = useDispatch();
  const authError = useSelector(selectAuthError);

  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(clearAuthError());
    dispatch(loginUser(formData));
  };

  return (
    <section className="login-screen">
      <div className="login-card">
        <h1>Employee Management System</h1>
        <p className="login-subtitle">Enterprise dashboard powered by Redux Toolkit</p>

        <form onSubmit={handleSubmit} className="login-form">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="admin or user"
            required
          />

          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter password"
            required
          />

          {authError && <p className="login-error">{authError}</p>}

          <button type="submit">Login</button>
        </form>

        <div className="credential-hint">
          <p>Admin: admin / admin123</p>
          <p>User: user / user123</p>
        </div>
      </div>
    </section>
  );
};

export default Login;
