  import React, { useEffect, useState } from 'react';
  import PersonList from './Employees/Personlist/Personlist';
  import './App.css';
  import Root from './pages/Root';
  import About from './pages/About/About';
  import AddEmployee from './pages/AddEmployee/AddEmployee';
  import axios from 'axios';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';

  function App() {
    const [employeeData, setEmployeeData] = useState([]);
    const [message, setMessage] = useState({ text: '', type: '' });


const showMessage = (text, type = 'success') => {
  setMessage({ text, type });
  setTimeout(() => setMessage({ text: '', type: '' }), 3000);
};


    useEffect(() => {
      axios.get('https://hr-app-backend-9g16.onrender.com/employees')
        .then((res) => setEmployeeData(res.data))
        .catch((err) => console.error('Failed to fetch data', err));
    }, []);

    const addEmployeeHandler = (newEmployee) => {
      axios.post('https://hr-app-backend-9g16.onrender.com/employees', newEmployee)
        .then((res) => {
          setEmployeeData((prev) => [...prev, res.data]);
          showMessage('Employee added successfully!', 'add');
        })
        .catch((err) => {
          console.error('Error adding employee:', err);
          showMessage('Failed to add employee.', 'error');
        });
    };

    const updateEmployeeHandler = async (id, updatedFields) => {
      const employee = employeeData.find(emp => emp.id === id);
      if (!employee) return;

      const updatedEmployee = { ...employee, ...updatedFields };

      try {
        const response = await axios.patch(`https://hr-app-backend-9g16.onrender.com/employees/${id}`, updatedEmployee);
        const updated = response.data;

        setEmployeeData((prev) =>
          prev.map((emp) => (emp.id === updated.id ? updated : emp))
        );
        showMessage('Employee updated successfully!', 'edit');
      } catch (err) {
        console.error('Failed to update employee:', err);
        showMessage('Failed to edit employee.', 'error');
      }
    };

    const deleteEmployeeHandler = async (id) => {
      try {
        await axios.delete(`https://hr-app-backend-9g16.onrender.com/employees/${id}`);
        setEmployeeData((prev) => prev.filter(emp => emp.id !== id));
        showMessage('Employee deleted successfully!', 'delete');
      } catch (error) {
        console.error('Failed to delete employee:', error);
        showMessage('Failed to delete employee.', 'error');
      }
    };

    return (
      <BrowserRouter>
      {message.text && (
  <div className={`message-box ${message.type}`}>
    {message.text}
  </div>
)}
      
        <Routes>
          <Route path="/" element={<Root />}>
            <Route index element={<About />} />
            <Route
              path="/person"
              element={
                <PersonList
                  employeeData={employeeData}
                  onUpdateEmployee={updateEmployeeHandler}
                  onDeleteEmployee={deleteEmployeeHandler}
                />
              }
            />
            <Route path="/add" element={<AddEmployee onAddEmployee={addEmployeeHandler} />} />
          </Route>
        </Routes>
      </BrowserRouter>
    );
  }

  export default App;
