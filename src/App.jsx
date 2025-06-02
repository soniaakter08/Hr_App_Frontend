
import React, { useEffect, useState } from 'react';
import PersonList from './Employees/Personlist/Personlist';
import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './pages/Root';
import About from './pages/About/About';
import AddEmployee from './pages/AddEmployee/AddEmployee';
import axios from 'axios';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function App() {
  const [employeeData, setEmployeeData] = useState([]);
 

  useEffect(() => {
    axios.get('http://localhost:3002/employees')
      .then((res) => setEmployeeData(res.data))
      .catch((err) => console.error('Failed to fetch data', err));
  }, []);

  const addEmployeeHandler = (newEmployee) => {
    axios.post('http://localhost:3002/employees', newEmployee)
      .then((res) => setEmployeeData((prev) => [...prev, res.data]))
      .catch((err) => console.error('Error adding employee:', err));
  };

  const updateEmployeeHandler = async (id, updatedFields) => {
    const employee = employeeData.find(emp => emp.id === id);
    if (!employee) return;

    const updatedEmployee = { ...employee, ...updatedFields };

    try {
      const response = await axios.patch(`http://localhost:3002/employees/${id}`, updatedEmployee);
      const updated = response.data;

  
      setEmployeeData((prev) =>
        prev.map((emp) => (emp.id === updated.id ? updated : emp))
      );
    } catch (err) {
      console.error('Failed to update employee:', err);
    }
  };

return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Root />}>
          <Route index element={<About />} />
          <Route path="/person"
               element = { <PersonList employeeData={employeeData} onUpdateEmployee={updateEmployeeHandler} />  }              
            />
          <Route path="/add" element={<AddEmployee onAddEmployee={addEmployeeHandler} />} />
        
      </Route>
    </Routes>
  </BrowserRouter>
)
}

export default App;