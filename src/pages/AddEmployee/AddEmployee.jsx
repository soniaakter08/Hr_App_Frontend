import { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import styles from './AddEmployee.module.css';

const AddEmployee = ({ onAddEmployee }) => {
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    salary: '',
    phone: '',
    email: '',
    animal: '',
    startDate: '',
    location: '',
    department: '',
    skills: '',
    profilePicture: '' 
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'salary' ? Number(value) : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      ...formData,
      salary: Number(formData.salary),
      skills: formData.skills.split(',').map(skill => skill.trim())
    };

    axios
      .post("https://hr-app-backend-9g16.onrender.com/employees", newEmployee)
      .then((response) => {
        onAddEmployee(response.data);
        navigate('/person');
        setFormData({
          name: '',
          title: '',
          salary: '',
          phone: '',
          email: '',
          animal: '',
          startDate: '',
          location: '',
          department: '',
          skills: '',
          profilePicture: '' 
        });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
        alert("Failed to add employee. Check console for details.");
      });
  };

  return (
    <>
      <h1 className={styles.title}>Add New Employee</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        {[
          { name: 'name', placeholder: 'Name' },
          { name: 'title', placeholder: 'Title' },
          { name: 'salary', placeholder: 'Salary', type: 'number' },
          { name: 'phone', placeholder: 'Phone Number', type: 'number' },
          { name: 'email', placeholder: 'Email', type: 'email' },
          { name: 'animal', placeholder: 'Animal' },
          { name: 'startDate', placeholder: 'Start Date' },
          { name: 'location', placeholder: 'Location' },
          { name: 'department', placeholder: 'Department' },
          { name: 'skills', placeholder: 'Skills (comma-separated)' },
          { name: 'profilePicture', placeholder: 'Profile Picture URL' } 
        ].map(({ name, placeholder, type = 'text' }) => (
          <input
            key={name}
            type={type}
            placeholder={placeholder}
            name={name}
            value={formData[name]}
            onChange={handleChange}
            className={styles.input}
          />
        ))}

        <button type="submit" className={styles.submitButton}>
          Add Employee
        </button>
      </form>
    </>
  );
};

export default AddEmployee;
