import React, { useState } from "react";
import EmployeeList from "./features/employee/employeeList";
import EmployeeAdd from "./features/employee/employeeAdd";
import EmployeeEdit from "./features/employee/employeeEdit";

function App() {
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  return (
    <div>
      <h1>Employee Management</h1>

      <EmployeeAdd />

      <EmployeeList
        onEdit={(employee) => setSelectedEmployee(employee)}
      />

      {selectedEmployee && (
        <EmployeeEdit
          selectedEmployee={selectedEmployee}
          onClose={() => setSelectedEmployee(null)}
        />
      )}
    </div>
  );
}

export default App;