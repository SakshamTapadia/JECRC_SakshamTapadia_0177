import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clearSelectedEmployee, selectSelectedEmployee } from '../redux/employeeSlice';
import { createEmployee, editEmployee } from '../redux/thunks';
import './EmployeeForm.css';

const emptyEmployee = {
  name: '',
  department: '',
  role: '',
  email: '',
};

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const selectedEmployee = useSelector(selectSelectedEmployee);

  const [formData, setFormData] = useState(emptyEmployee);

  useEffect(() => {
    if (selectedEmployee) {
      setFormData({
        name: selectedEmployee.name,
        department: selectedEmployee.department,
        role: selectedEmployee.role,
        email: selectedEmployee.email,
      });
    } else {
      setFormData(emptyEmployee);
    }
  }, [selectedEmployee]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (selectedEmployee) {
      dispatch(editEmployee({ id: selectedEmployee.id, updates: formData }));
    } else {
      dispatch(createEmployee(formData));
    }

    setFormData(emptyEmployee);
  };

  const handleCancelEdit = () => {
    dispatch(clearSelectedEmployee());
    setFormData(emptyEmployee);
  };

  return (
    <section className="employee-form-section">
      <h2>{selectedEmployee ? 'Edit Employee' : 'Add Employee'}</h2>

      <form className="employee-form" onSubmit={handleSubmit}>
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Employee name"
          required
        />
        <input
          name="department"
          value={formData.department}
          onChange={handleChange}
          placeholder="Department"
          required
        />
        <input
          name="role"
          value={formData.role}
          onChange={handleChange}
          placeholder="Role"
          required
        />
        <input
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
        />

        <div className="form-actions">
          <button type="submit">{selectedEmployee ? 'Update Employee' : 'Add Employee'}</button>
          {selectedEmployee && (
            <button type="button" className="cancel-btn" onClick={handleCancelEdit}>
              Cancel
            </button>
          )}
        </div>
      </form>
    </section>
  );
};

export default EmployeeForm;
