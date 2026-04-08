import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectAllEmployees,
  selectEmployee,
  selectSearchTerm,
  setSearchTerm,
} from '../redux/employeeSlice';
import { removeEmployee } from '../redux/thunks';
import './EmployeeList.css';

const EmployeeList = () => {
  const dispatch = useDispatch();
  const employees = useSelector(selectAllEmployees);
  const searchTerm = useSelector(selectSearchTerm);

  const filteredEmployees = useMemo(() => {
    if (!searchTerm.trim()) {
      return employees;
    }

    const normalized = searchTerm.toLowerCase();
    return employees.filter((emp) =>
      [emp.name, emp.department, emp.role, emp.email]
        .join(' ')
        .toLowerCase()
        .includes(normalized)
    );
  }, [employees, searchTerm]);

  return (
    <section className="employee-list-section">
      <div className="list-header">
        <h2>Employees ({filteredEmployees.length})</h2>
        <input
          value={searchTerm}
          onChange={(event) => dispatch(setSearchTerm(event.target.value))}
          placeholder="Search by name, department, role"
        />
      </div>

      {filteredEmployees.length === 0 ? (
        <p className="empty-state">No matching employees found.</p>
      ) : (
        <div className="employee-grid">
          {filteredEmployees.map((employee) => (
            <article className="employee-card" key={employee.id}>
              <h3>{employee.name}</h3>
              <p><strong>Department:</strong> {employee.department}</p>
              <p><strong>Role:</strong> {employee.role}</p>
              <p><strong>Email:</strong> {employee.email}</p>

              <div className="card-actions">
                <button type="button" onClick={() => dispatch(selectEmployee(employee))}>
                  Edit
                </button>
                <button
                  type="button"
                  className="delete-btn"
                  onClick={() => dispatch(removeEmployee(employee.id))}
                >
                  Delete
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default EmployeeList;
