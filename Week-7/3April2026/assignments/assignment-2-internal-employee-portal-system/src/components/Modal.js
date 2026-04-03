import { useState, useEffect } from "react";
import { DEPARTMENTS } from "../data/seed";
import { X } from "./Icons";

const EMPTY = { name: "", email: "", department: "", phone: "", joinDate: "", salary: "", status: "Active" };

// Checks all required employee form fields and returns an error map
function validate(form) {
  const errs = {};
  if (!form.name.trim())                          errs.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Valid email required.";
  if (!form.department)                           errs.department = "Department is required.";
  if (!form.phone.trim())                         errs.phone = "Phone is required.";
  if (!form.joinDate)                             errs.joinDate = "Join date is required.";
  if (!form.salary || isNaN(form.salary))         errs.salary = "Valid salary required.";
  return errs;
}

// Reusable modal dialog for adding or editing an employee record
export default function Modal({ mode, employee, onSave, onClose }) {
  const [form, setForm]     = useState(EMPTY);
  const [errs, setErrs]     = useState({});
  const [saving, setSaving] = useState(false);

  // Resets the form when switching between add and edit modes
  useEffect(() => {
    setForm(employee ? { ...employee } : EMPTY);
    setErrs({});
  }, [employee]);

  // Updates a single form field and clears its validation error
  const change = (e) => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
    if (errs[name]) setErrs(p => ({ ...p, [name]: undefined }));
  };

  // Validates the form and calls onSave if there are no errors
  const submit = async (e) => {
    e.preventDefault();
    const validation = validate(form);
    if (Object.keys(validation).length) { setErrs(validation); return; }
    setSaving(true);
    await new Promise(r => setTimeout(r, 600));
    onSave(form);
    setSaving(false);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>{mode === "add" ? "Add New Employee" : "Edit Employee"}</h2>
          <button className="modal-close" onClick={onClose}><X size={14} /></button>
        </div>
        <form className="modal-form" onSubmit={submit}>
          <div className="form-row">
            <div className="field">
              <label>Full Name</label>
              <input name="name" value={form.name} onChange={change} placeholder="e.g. John Smith" />
              {errs.name && <span className="field-error">{errs.name}</span>}
            </div>
            <div className="field">
              <label>Email</label>
              <input name="email" value={form.email} onChange={change} placeholder="john@corp.com" />
              {errs.email && <span className="field-error">{errs.email}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Department</label>
              <select name="department" value={form.department} onChange={change}>
                <option value="">Select department</option>
                {DEPARTMENTS.map(d => <option key={d} value={d}>{d}</option>)}
              </select>
              {errs.department && <span className="field-error">{errs.department}</span>}
            </div>
            <div className="field">
              <label>Status</label>
              <select name="status" value={form.status} onChange={change}>
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Phone</label>
              <input name="phone" value={form.phone} onChange={change} placeholder="+1-555-0100" />
              {errs.phone && <span className="field-error">{errs.phone}</span>}
            </div>
            <div className="field">
              <label>Join Date</label>
              <input type="date" name="joinDate" value={form.joinDate} onChange={change} />
              {errs.joinDate && <span className="field-error">{errs.joinDate}</span>}
            </div>
          </div>
          <div className="form-row">
            <div className="field">
              <label>Annual Salary ($)</label>
              <input name="salary" value={form.salary} onChange={change} placeholder="75000" />
              {errs.salary && <span className="field-error">{errs.salary}</span>}
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn-ghost" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? <span className="spinner-sm" /> : null}
              {saving ? "Saving..." : mode === "add" ? "Add Employee" : "Save Changes"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
