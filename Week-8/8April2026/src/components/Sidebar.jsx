import React from 'react';

export const Sidebar = ({ currentPage, setCurrentPage }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊' },
    { id: 'employees', label: 'Employees', icon: '👥' },
    { id: 'analytics', label: 'Analytics', icon: '📈' },
    { id: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  return (
    <nav className="navbar">
      {navItems.map(item => (
        <a
          key={item.id}
          className={`nav-item ${currentPage === item.id ? 'active' : ''}`}
          onClick={() => setCurrentPage(item.id)}
        >
          <span>{item.icon}</span> {item.label}
        </a>
      ))}
    </nav>
  );
};
