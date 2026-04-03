import { useState, useMemo } from "react";
import { useEmployees } from "../context/EmployeeContext";
import { useAuth } from "../context/AuthContext";
import Modal from "../components/Modal";
import { Search, Pencil, Trash, AlertTriangle } from "../components/Icons";

// Admin-only page that displays all employees with search, filter, and full CRUD
export default function AdminDashboard() {
  const { employees, addEmployee, updateEmployee, deleteEmployee } = useEmployees();
  const { showAlert } = useAuth();

  const [search, setSearch]       = useState("");
  const [deptFilter, setDeptFilter] = useState("All");
  const [statusFilter, setStatus] = useState("All");
  const [modal, setModal]         = useState(null);
  const [confirmId, setConfirmId] = useState(null);

  // Derives a unique list of departments from the current employee list
  const departments = useMemo(() => ["All", ...new Set(employees.map(e => e.department))], [employees]);

  // Filters employees by search text, department, and status
  const filtered = useMemo(() => employees.filter(e => {
    const q = search.toLowerCase();
    const matchSearch = e.name.toLowerCase().includes(q) || e.email.toLowerCase().includes(q) || e.id.toLowerCase().includes(q);
    const matchDept   = deptFilter === "All" || e.department === deptFilter;
    const matchStatus = statusFilter === "All" || e.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  }), [employees, search, deptFilter, statusFilter]);

  // Computes summary counts for the stats cards at the top of the dashboard
  const stats = useMemo(() => ({
    total:    employees.length,
    active:   employees.filter(e => e.status === "Active").length,
    inactive: employees.filter(e => e.status === "Inactive").length,
    depts:    new Set(employees.map(e => e.department)).size,
  }), [employees]);

  // Calls add or update based on the current modal mode, then closes the modal
  const handleSave = (form) => {
    if (modal.mode === "add") {
      addEmployee(form);
      showAlert("success", `Employee "${form.name}" added successfully.`);
    } else {
      updateEmployee(modal.employee.id, form);
      showAlert("success", `Employee "${form.name}" updated successfully.`);
    }
    setModal(null);
  };

  // Deletes the employee by ID and closes the confirmation dialog
  const handleDelete = (id) => {
    const emp = employees.find(e => e.id === id);
    deleteEmployee(id);
    setConfirmId(null);
    showAlert("success", `Employee "${emp?.name}" removed.`);
  };

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Dashboard</h1>
          <p className="page-sub">Manage all employee records</p>
        </div>
        <button className="btn-primary" onClick={() => setModal({ mode: "add" })}>
          + Add Employee
        </button>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-card">
          <span className="stat-num">{stats.total}</span>
          <span className="stat-label">Total Employees</span>
        </div>
        <div className="stat-card stat-green">
          <span className="stat-num">{stats.active}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-card stat-red">
          <span className="stat-num">{stats.inactive}</span>
          <span className="stat-label">Inactive</span>
        </div>
        <div className="stat-card stat-blue">
          <span className="stat-num">{stats.depts}</span>
          <span className="stat-label">Departments</span>
        </div>
      </div>

      {/* Filters */}
      <div className="filters">
        <div className="search-wrap">
          <Search size={15} />
          <input
            className="search-input" type="search"
            placeholder="Search by name, email or ID..."
            value={search} onChange={e => setSearch(e.target.value)}
          />
        </div>
        <select className="filter-select" value={deptFilter} onChange={e => setDeptFilter(e.target.value)}>
          {departments.map(d => <option key={d}>{d}</option>)}
        </select>
        <select className="filter-select" value={statusFilter} onChange={e => setStatus(e.target.value)}>
          <option>All</option>
          <option>Active</option>
          <option>Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="table-wrap">
        {filtered.length === 0 ? (
          <div className="empty-state">
            <Search size={28} />
            <p>No employees found matching your criteria.</p>
          </div>
        ) : (
          <table className="emp-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Department</th>
                <th>Phone</th>
                <th>Join Date</th>
                <th>Salary</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(emp => (
                <tr key={emp.id}>
                  <td><span className="emp-id">{emp.id}</span></td>
                  <td>
                    <div className="emp-name-cell">
                      <div className="avatar-sm">{emp.name.split(" ").map(w=>w[0]).join("")}</div>
                      <span>{emp.name}</span>
                    </div>
                  </td>
                  <td className="text-muted">{emp.email}</td>
                  <td><span className="dept-tag">{emp.department}</span></td>
                  <td className="text-muted">{emp.phone}</td>
                  <td className="text-muted">{emp.joinDate}</td>
                  <td>${Number(emp.salary).toLocaleString()}</td>
                  <td>
                    <span className={`status-badge status-${emp.status.toLowerCase()}`}>
                      {emp.status}
                    </span>
                  </td>
                  <td>
                    <div className="action-btns">
                      <button className="btn-edit" title="Edit" onClick={() => setModal({ mode: "edit", employee: emp })}>
                        <Pencil size={14} />
                      </button>
                      <button className="btn-delete" title="Delete" onClick={() => setConfirmId(emp.id)}>
                        <Trash size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <p className="table-count">Showing {filtered.length} of {employees.length} employees</p>

      {modal && (
        <Modal
          mode={modal.mode}
          employee={modal.employee}
          onSave={handleSave}
          onClose={() => setModal(null)}
        />
      )}

      {confirmId && (
        <div className="modal-overlay" onClick={() => setConfirmId(null)}>
          <div className="confirm-box" onClick={e => e.stopPropagation()}>
            <div className="confirm-icon"><AlertTriangle size={32} /></div>
            <h3>Delete Employee?</h3>
            <p>This action cannot be undone. The employee record will be permanently removed.</p>
            <div className="confirm-actions">
              <button className="btn-ghost" onClick={() => setConfirmId(null)}>Cancel</button>
              <button className="btn-danger" onClick={() => handleDelete(confirmId)}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
