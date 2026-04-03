import { useAuth } from "../context/AuthContext";
import { useEmployees } from "../context/EmployeeContext";
import { UserX, Info } from "../components/Icons";

// Shows the logged-in employee's own profile in a read-only view
export default function EmployeeProfile() {
  const { user } = useAuth();
  const { getEmployee } = useEmployees();
  const emp = getEmployee(user.empId);

  if (!emp) {
    return (
      <div className="page center-page">
        <div className="not-found-card">
          <UserX size={40} />
          <h2>Profile Not Found</h2>
          <p>No employee record is linked to your account. Please contact HR.</p>
        </div>
      </div>
    );
  }

  // Extracts initials from the employee's full name for the avatar
  const initials = emp.name.split(" ").map(w => w[0]).join("").toUpperCase();
  // Calculates how many full years the employee has been with the company
  const tenure = Math.floor((new Date() - new Date(emp.joinDate)) / (365.25 * 24 * 3600 * 1000));

  return (
    <div className="page">
      <div className="page-header">
        <div>
          <h1 className="page-title">My Profile</h1>
          <p className="page-sub">Your employee information</p>
        </div>
        <span className={`status-badge status-${emp.status.toLowerCase()} badge-lg`}>{emp.status}</span>
      </div>

      <div className="profile-layout">
        <div className="profile-card">
          <div className="avatar-lg">{initials}</div>
          <h2 className="profile-name">{emp.name}</h2>
          <p className="profile-email">{emp.email}</p>
          <div className="profile-dept">{emp.department}</div>
          <div className="profile-meta">
            <div className="meta-item">
              <span className="meta-val">{tenure}</span>
              <span className="meta-lbl">Years</span>
            </div>
            <div className="meta-divider" />
            <div className="meta-item">
              <span className="meta-val">{emp.id}</span>
              <span className="meta-lbl">Employee ID</span>
            </div>
          </div>
        </div>

        <div className="profile-details">
          <div className="detail-section">
            <h3 className="section-title">Personal Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Full Name</span>
                <span className="detail-value">{emp.name}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Email Address</span>
                <span className="detail-value">{emp.email}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Phone Number</span>
                <span className="detail-value">{emp.phone}</span>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <h3 className="section-title">Work Information</h3>
            <div className="detail-grid">
              <div className="detail-item">
                <span className="detail-label">Department</span>
                <span className="detail-value">{emp.department}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Join Date</span>
                <span className="detail-value">{new Date(emp.joinDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Annual Salary</span>
                <span className="detail-value salary-highlight">${Number(emp.salary).toLocaleString()}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Status</span>
                <span className={`status-badge status-${emp.status.toLowerCase()}`}>{emp.status}</span>
              </div>
            </div>
          </div>

          <div className="info-notice">
            <Info size={15} />
            <span>To update your information, please contact your HR administrator.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
