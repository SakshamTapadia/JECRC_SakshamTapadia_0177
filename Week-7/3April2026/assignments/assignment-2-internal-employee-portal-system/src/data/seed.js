// Mock user accounts used for login authentication
export const USERS = [
  { id: 1, email: "admin@corp.com",   password: "admin123", role: "admin",    name: "Admin User",    empId: null   },
  { id: 2, email: "john@corp.com",    password: "emp123",   role: "employee", name: "John Smith",    empId: "E001" },
  { id: 3, email: "jane@corp.com",    password: "emp123",   role: "employee", name: "Jane Doe",      empId: "E002" },
  { id: 4, email: "bob@corp.com",     password: "emp123",   role: "employee", name: "Bob Johnson",   empId: "E003" },
  { id: 5, email: "alice@corp.com",   password: "emp123",   role: "employee", name: "Alice Brown",   empId: "E004" },
];

export const INITIAL_EMPLOYEES = [
  { id: "E001", name: "John Smith",    email: "john@corp.com",    department: "Engineering", phone: "+1-555-0101", joinDate: "2022-01-15", status: "Active",   salary: "85000" },
  { id: "E002", name: "Jane Doe",      email: "jane@corp.com",    department: "Marketing",   phone: "+1-555-0102", joinDate: "2021-06-20", status: "Active",   salary: "75000" },
  { id: "E003", name: "Bob Johnson",   email: "bob@corp.com",     department: "Finance",     phone: "+1-555-0103", joinDate: "2023-03-10", status: "Active",   salary: "70000" },
  { id: "E004", name: "Alice Brown",   email: "alice@corp.com",   department: "HR",          phone: "+1-555-0104", joinDate: "2020-09-05", status: "Active",   salary: "65000" },
  { id: "E005", name: "Charlie Wilson",email: "charlie@corp.com", department: "Engineering", phone: "+1-555-0105", joinDate: "2022-11-18", status: "Inactive", salary: "90000" },
  { id: "E006", name: "Diana Prince",  email: "diana@corp.com",   department: "Legal",       phone: "+1-555-0106", joinDate: "2019-04-22", status: "Active",   salary: "95000" },
];

export const DEPARTMENTS = ["Engineering", "Marketing", "Finance", "HR", "Legal", "Operations", "Design", "Sales"];
