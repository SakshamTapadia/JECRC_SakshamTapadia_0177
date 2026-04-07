import React, { useState, useEffect } from 'react';
import { useEmployee } from '../hooks/useEmployee';
import { useTheme } from '../hooks/useTheme';
import './EmployeeForm.css';

const EmployeeForm = ({ editingId, onComplete }) => {
  const { addEmployee, updateEmployee, getEmployeeById, loading } = useEmployee();
  const { theme } = useTheme();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    department: '',
    salary: ''
  });

  useEffect(() => {
    if (editingId) {
      const employee = getEmployeeById(editingId);
      if (employee) {
        setFormData(employee);
      }
    }
  }, [editingId, getEmployeeById]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? parseFloat(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      alert('Please fill in all fields');
      return;
    }

    if (editingId) {
      updateEmployee(editingId, formData);
    } else {
      addEmployee(formData);
    }

    setFormData({ name: '', email: '', department: '', salary: '' });
    onComplete();
  };

  const formStyle = {
    backgroundColor: theme.surfaceColor,
    padding: '1.5rem',
    borderRadius: '8px',
    marginBottom: '2rem',
    border: `1px solid ${theme.borderColor}`
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem',
    marginBottom: '1rem',
    border: `1px solid ${theme.borderColor}`,
    borderRadius: '4px',
    backgroundColor: theme.backgroundColor,
    color: theme.textColor,
    boxSizing: 'border-box',
    fontSize: '1rem'
  };

  const buttonContainerStyle = {
    display: 'flex',
    gap: '1rem'
  };

  const buttonStyle = {
    padding: '0.75rem 1.5rem',
    border: 'none',
    borderRadius: '4px',
    cursor: loading ? 'not-allowed' : 'pointer',
    fontSize: '1rem',
    opacity: loading ? 0.7 : 1
  };

  return (
    <form style={formStyle} onSubmit={handleSubmit}>
      <h3 style={{ marginBottom: '1rem', color: theme.textColor }}>
        {editingId ? 'Edit Employee' : 'Add New Employee'}
      </h3>

      <input
        type="text"
        name="name"
        placeholder="Full Name"
        value={formData.name}
        onChange={handleChange}
        style={inputStyle}
        disabled={loading}
      />

      <input
        type="email"
        name="email"
        placeholder="Email Address"
        value={formData.email}
        onChange={handleChange}
        style={inputStyle}
        disabled={loading}
      />

      <input
        type="text"
        name="department"
        placeholder="Department"
        value={formData.department}
        onChange={handleChange}
        style={inputStyle}
        disabled={loading}
      />

      <input
        type="number"
        name="salary"
        placeholder="Salary"
        value={formData.salary}
        onChange={handleChange}
        style={inputStyle}
        disabled={loading}
      />

      <div style={buttonContainerStyle}>
        <button
          type="submit"
          style={{
            ...buttonStyle,
            backgroundColor: theme.primaryColor,
            color: '#ffffff',
            flex: 1
          }}
          disabled={loading}
        >
          {loading ? 'Saving...' : editingId ? 'Update' : 'Add'}
        </button>
      </div>
    </form>
  );
};

export default EmployeeForm;
