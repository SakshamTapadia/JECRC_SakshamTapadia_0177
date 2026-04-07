import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import EmployeeForm from './EmployeeForm';
import EmployeeList from './EmployeeList';
import './EmployeeManagement.css';

const EmployeeManagement = () => {
  const { theme } = useTheme();
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const handleEdit = (id) => {
    setEditingId(id);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
    setEditingId(null);
  };

  const containerStyle = {
    padding: '2rem'
  };

  const headerStyle = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    backgroundColor: theme.primaryColor,
    color: '#ffffff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <h2>Employee Management</h2>
        <button
          style={buttonStyle}
          onClick={() => {
            setEditingId(null);
            setShowForm(!showForm);
          }}
        >
          {showForm ? 'Cancel' : 'Add Employee'}
        </button>
      </div>

      {showForm && (
        <EmployeeForm editingId={editingId} onComplete={handleFormClose} />
      )}

      <EmployeeList onEdit={handleEdit} />
    </div>
  );
};

export default EmployeeManagement;
