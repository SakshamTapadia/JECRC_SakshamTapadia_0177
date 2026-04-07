import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useNotification } from '../context/NotificationContext';

export const Settings = () => {
  const { user } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { success } = useNotification();
  const [preferences, setPreferences] = useState({
    emailNotifications: true,
    darkMode: theme === 'dark',
    language: 'en',
    notifications: true,
  });

  const handlePreferenceChange = (e) => {
    const { name, checked, type, value } = e.target;
    setPreferences(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSaveSettings = () => {
    // Sync dark mode preference with theme context
    if (preferences.darkMode !== (theme === 'dark')) {
      toggleTheme();
    }
    success('Settings saved successfully');
  };

  return (
    <div>
      <h2>Settings</h2>

      <div className="card">
        <h3 className="card-title">👤 Account Information</h3>
        <div style={{ display: 'grid', gap: '1rem' }}>
          <div>
            <label className="form-label">Name</label>
            <input
              type="text"
              className="form-input"
              value={user?.name || ''}
              disabled
              style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>
          <div>
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-input"
              value={user?.email || ''}
              disabled
              style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>
          <div>
            <label className="form-label">Role</label>
            <input
              type="text"
              className="form-input"
              value={user?.role || ''}
              disabled
              style={{ backgroundColor: 'var(--bg-primary)', opacity: 0.7, cursor: 'not-allowed' }}
            />
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">⚙️ Preferences</h3>
        <div style={{ display: 'grid', gap: '1.5rem' }}>
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="darkMode"
                checked={preferences.darkMode}
                onChange={handlePreferenceChange}
              />
              <span>Dark Mode</span>
            </label>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Switch between light and dark theme
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="emailNotifications"
                checked={preferences.emailNotifications}
                onChange={handlePreferenceChange}
              />
              <span>Email Notifications</span>
            </label>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Receive email notifications for important updates
            </p>
          </div>

          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
              <input
                type="checkbox"
                name="notifications"
                checked={preferences.notifications}
                onChange={handlePreferenceChange}
              />
              <span>In-App Notifications</span>
            </label>
            <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Show notifications within the application
            </p>
          </div>

          <div>
            <label className="form-label">Language</label>
            <select
              name="language"
              className="form-select"
              value={preferences.language}
              onChange={handlePreferenceChange}
            >
              <option value="en">English</option>
              <option value="es">Spanish</option>
              <option value="fr">French</option>
              <option value="de">German</option>
            </select>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">📋 About</h3>
        <div>
          <p><strong>Application:</strong> Employee Portal</p>
          <p><strong>Version:</strong> 1.0.0</p>
          <p><strong>Technology:</strong> React with Context API</p>
          <p><strong>Features:</strong> Authentication, Theme Management, Employee CRUD, Analytics</p>
          <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
            This application demonstrates advanced React Context API patterns for enterprise state management.
          </p>
        </div>
      </div>

      <button className="button btn-primary" onClick={handleSaveSettings} style={{ marginTop: '2rem' }}>
        Save Settings
      </button>
    </div>
  );
};
