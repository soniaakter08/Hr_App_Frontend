import { useState } from "react";
import { useNavigate } from "react-router";
// import axios from "axios"; 
import useAxios from "../../hooks/useAxios";
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
    skills: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: name === 'salary' ? Number(value) : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newEmployee = {
      ...formData,
      skills: formData.skills.split(',').map(skill => skill.trim())  
    };

    axios
      .post("http://localhost:3002/employees", newEmployee)
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
          skills: ''
        });
      })
      .catch((error) => {
        console.error("Error adding employee:", error);
      });
  };

  return (
    <>
      <h1 className={styles.title}>Add New Employee</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          name="name"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Title"
          value={formData.title}
          onChange={handleChange}
          name="title"
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          name="salary"
          className={styles.input}
        />
        <input
          type="number"
          placeholder="Phone Number"
          value={formData.phone}
          onChange={handleChange}
          name="phone"
          className={styles.input}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          name="email"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Animal"
          value={formData.animal}
          onChange={handleChange}
          name="animal"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Start Date"
          value={formData.startDate}
          onChange={handleChange}
          name="startDate"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          name="location"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Department"
          value={formData.department}
          onChange={handleChange}
          name="department"
          className={styles.input}
        />
        <input
          type="text"
          placeholder="Skills (comma-separated)"
          value={formData.skills}
          onChange={handleChange}
          name="skills"
          className={styles.input}
        />

        <button type="submit" className={styles.submitButton}>
          Add Employee
        </button>
      </form>
    </>
  );
};

export default AddEmployee;
