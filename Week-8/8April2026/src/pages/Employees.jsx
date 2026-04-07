import React, { useState } from 'react';
import { useEmployee } from '../context/EmployeeContext';
import { useNotification } from '../context/NotificationContext';

export const Employees = () => {
  const { employees, addEmployee, updateEmployee, deleteEmployee, searchEmployees } = useEmployee();
  const { success, error: showError } = useNotification();
  const [searchTerm, setSearchTerm] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: '',
    department: '',
    salary: '',
    joinDate: '',
  });

  const filteredEmployees = searchTerm ? searchEmployees(searchTerm) : employees;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) {
      showError('Name and email are required');
      return;
    }

    if (editingId) {
      updateEmployee(editingId, { ...formData, salary: Number(formData.salary) });
      success('Employee updated successfully');
    } else {
      addEmployee({ ...formData, salary: Number(formData.salary) });
      success('Employee added successfully');
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: '',
      department: '',
      salary: '',
      joinDate: '',
    });
    setShowForm(false);
    setEditingId(null);
  };

  const handleEdit = (emp) => {
    setFormData(emp);
    setEditingId(emp.id);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this employee?')) {
      deleteEmployee(id);
      success('Employee deleted successfully');
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h2>Employees</h2>
        <button className="button btn-primary" onClick={() => setShowForm(true)}>
          + Add Employee
        </button>
      </div>

      <div className="form-group" style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          className="form-input"
          placeholder="Search by name, email, or department..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      {showForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h3 className="card-title">{editingId ? 'Edit Employee' : 'Add New Employee'}</h3>
          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-input"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Role</label>
                <input
                  type="text"
                  name="role"
                  className="form-input"
                  value={formData.role}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Department</label>
                <input
                  type="text"
                  name="department"
                  className="form-input"
                  value={formData.department}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Salary</label>
                <input
                  type="number"
                  name="salary"
                  className="form-input"
                  value={formData.salary}
                  onChange={handleInputChange}
                />
              </div>
              <div className="form-group">
                <label className="form-label">Join Date</label>
                <input
                  type="date"
                  name="joinDate"
                  className="form-input"
                  value={formData.joinDate}
                  onChange={handleInputChange}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="button btn-primary">
                {editingId ? 'Update' : 'Add'} Employee
              </button>
              <button type="button" className="button btn-secondary" onClick={resetForm}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        {filteredEmployees.length > 0 ? (
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Department</th>
                <th>Salary</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map(emp => (
                <tr key={emp.id}>
                  <td>{emp.name}</td>
                  <td>{emp.email}</td>
                  <td>{emp.role}</td>
                  <td>{emp.department}</td>
                  <td>${emp.salary?.toLocaleString() || 0}</td>
                  <td>{emp.joinDate}</td>
                  <td>
                    <button className="button btn-secondary" onClick={() => handleEdit(emp)} style={{ marginRight: '0.5rem' }}>
                      Edit
                    </button>
                    <button className="button btn-danger" onClick={() => handleDelete(emp.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No employees found.</p>
        )}
      </div>
    </div>
  );
};
