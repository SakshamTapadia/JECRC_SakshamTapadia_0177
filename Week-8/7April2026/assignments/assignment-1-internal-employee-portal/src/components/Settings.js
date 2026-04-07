import React from 'react';
import { useSettings } from '../hooks/useSettings';
import { useTheme } from '../hooks/useTheme';
import './Settings.css';

const Settings = () => {
  const { settings, updateSetting, resetSettings } = useSettings();
  const { theme } = useTheme();

  const containerStyle = {
    padding: '2rem'
  };

  const sectionStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '1.5rem',
    border: `1px solid ${theme.borderColor}`
  };

  const settingRowStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: '1rem',
    borderBottom: `1px solid ${theme.borderColor}`,
    marginBottom: '1rem'
  };

  const lastRowStyle = {
    ...settingRowStyle,
    borderBottom: 'none',
    marginBottom: 0,
    paddingBottom: 0
  };

  const toggleStyle = {
    position: 'relative',
    display: 'inline-block',
    width: '50px',
    height: '24px'
  };

  const switchStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: settings.notifications ? theme.primaryColor : theme.borderColor,
    transition: 'background-color 0.3s',
    borderRadius: '24px'
  };

  const sliderStyle = {
    position: 'absolute',
    cursor: 'pointer',
    top: '2px',
    left: settings.notifications ? '26px' : '2px',
    height: '20px',
    width: '20px',
    backgroundColor: 'white',
    transition: 'left 0.3s',
    borderRadius: '50%'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: '#e74c3c',
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  const selectStyle = {
    padding: '0.5rem',
    borderRadius: '4px',
    border: `1px solid ${theme.borderColor}`,
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    fontSize: '1rem'
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ color: theme.textColor, marginBottom: '2rem' }}>Settings</h2>

      <div style={sectionStyle}>
        <h3 style={{ color: theme.textColor, marginTop: 0 }}>Preferences</h3>

        <div style={settingRowStyle}>
          <label style={{ color: theme.textColor }}>Notifications</label>
          <label style={toggleStyle}>
            <input
              type="checkbox"
              checked={settings.notifications}
              onChange={(e) => updateSetting('notifications', e.target.checked)}
              style={{ display: 'none' }}
            />
            <div style={switchStyle}>
              <div style={sliderStyle}></div>
            </div>
          </label>
        </div>

        <div style={settingRowStyle}>
          <label style={{ color: theme.textColor }}>Auto-save</label>
          <input
            type="checkbox"
            checked={settings.autoSave}
            onChange={(e) => updateSetting('autoSave', e.target.checked)}
            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
          />
        </div>

        <div style={settingRowStyle}>
          <label style={{ color: theme.textColor }}>Language</label>
          <select
            value={settings.language}
            onChange={(e) => updateSetting('language', e.target.value)}
            style={selectStyle}
          >
            <option value="en">English</option>
            <option value="es">Español</option>
            <option value="fr">Français</option>
          </select>
        </div>

        <div style={lastRowStyle}>
          <label style={{ color: theme.textColor }}>Items per page</label>
          <input
            type="number"
            value={settings.itemsPerPage}
            onChange={(e) => updateSetting('itemsPerPage', parseInt(e.target.value))}
            style={{
              ...selectStyle,
              width: '80px'
            }}
            min="5"
            max="50"
          />
        </div>
      </div>

      <button
        style={buttonStyle}
        onClick={resetSettings}
      >
        Reset to Defaults
      </button>
    </div>
  );
};

export default Settings;
